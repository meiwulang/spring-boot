# sweet-core

### 1. Introduction
**sweet-core**是sweet应用核心框架，它具有如下**组件和功能**：

+ 全局统一配置加载
+ 嵌入式Web容器
+ Spring MVC
+ HTTP请求全链路跟踪
+ Mybatis集成
+ Mybatis分页插件
+ DataSourceTransaction
+ Validation(JSR-349)
+ 应用安全防护(XSS、CSRF)
+ 应用状态报告(Actuator)

### 2. QuickStart

参考[sweet-framework说明](../README.md)

### 3. 启动

参考[sweet-framework说明](../README.md)

### 4. Sweet应用的MVC
**sweet-core**集成了Spring MVC，倡导**"前后端分离"**的开发模式，后端服务仅提供Restful API而不包含任何视图逻辑，数据格式建议使用JSON替代XML。

#### 4.1 @RestController
使用@RestController替代@Controller，用于标识一个@Controller为Restful接口，@ResultController中的@RequestMapping方法的Content-Type为：**application/json**，并使用JSON序列化方法返回值。

##### 使用APIResponse作为Restful API统一响应
强烈推荐所有的Restful API返回**APIResponse**对象以方便前端统一处理接口返回值。

```java
@RestController
public class GreetingsController {
	private static final Logger logger = LoggerFactory.getLogger(GreetingsController.class);
	
	@RequestMapping("/greetings")
	public APIResponse sayGreetings() throws Exception{
	    //返回一个通用成功响应
	    return APIResponse.success("返回数据");
	
	    //返回一个通用错误响应, 自定义message
	    return APIResponse.fail("自定义错误消息");
	
	    //返回一个自定义code
	    return APIResponse.response("sweet.framework.core.greetings.success");
	
	    //返回一个自定义code和数据
	    return APIResponse.response("sweet.framework.core.greetings.success", "自定义的code和数据");
	}
}
```

**APIResponse**支持国际化，国际化**.properties**文件默认搜索路径为**classpath:i18n/**，文件前缀为**api**。如：**zh_CN**的国际化配置文件路径为**classpath:i18n/api\_zh_CN.properties**。

**classpath:i18n/api\_zh_CN.properties**

```properties
success=API调用成功
fail=API调用失败
sweet.framework.core.greetings.success=API[Greetings]调用成功
```

**APIResponse(JSON)**

```json
{
	"code": "sweet.framework.core.greetings.success",
	"data": "自定义的code和数据",
	"message": "API[Greetings]调用成功"
}
```

#### 4.2 @Service
使用**@Service**作为**Service**层统一标识，注解请加在具体实现类上。**sweet-core**会自动跟踪使用**@Service**注解的类的调用过程和性能。

**Service**接口

```java
public interface SweetSampleService {
    SweetSampleModel getSampleByName(String name);
    Page<SweetSampleModel> listAll();
}
```

**Service**实现

```java
@Service
public class SweetSampleServiceImpl implements SweetSampleService {
    private static final Logger logger = LoggerFactory.getLogger(SweetSampleServiceImpl.class);

    @Autowired
    private SweetSampleDAO sweetSampleDAO;

    @Override
    public SweetSampleModel getSampleByName(String name) {
        return this.sweetSampleDAO.getByName(name);
    }
    
    @Override
    public Page<SweetSampleModel> listAll() {
        PageHelper.startPage(0,10);
        Page<SweetSampleModel> result = (Page<SweetSampleModel>) sweetSampleDAO.listAll();
        return result;
    }
}
```

#### 4.3 @Repository
使用**@Repository**作为**DAO**接口的注解，尽管配合**Mybatis**使用不需要任何实现代码。**Mybatis**配置与集成请参考第**6**节**"Mybatis集成"**。

```java
@Repository
public interface SweetSampleDAO {
    SweetSampleModel getByName(String name);
}
```

#### 4.4 @ComponentScan配置
配置项：**sweet.app.basePackage**

```properties
# 应用程序包的基础路径, 用于ComponentScan, 多个包使用","分隔。
# 请不要在此加入"cn.evun.sweet", 因为其已经被默认加入扫包路径。
sweet.app.basePackage=root.to.your.app,root.to.your.another.app
```

#### 4.5 自定义错误处理
实现接口`cn.evun.sweet.framework.core.mvc.error.ErrorHandler`并将实现类定义为一个**Bean**，**sweet-core**将在异常发生时将相应错误发送到该实现类的`handleError($TYPE, HttpServletRequest, HttpServletResponse)`方法处理，这里的`$TYPE`即为错误类型，如果该方法未定义，则调用接口的错误处理方法`handleError(Throwable t, HttpServletRequest, HttpServletResponse)`处理错误。

请参考**cn.evun.sweet.framework.core.mvc.error.DefaultErrorHandler**实现

```java
public class DefaultErrorHandler implements ErrorHandler {
    private static final Logger logger = LoggerFactory.getLogger(DefaultErrorHandler.class);

    private static JSONSerializer jsonSerializer = new JSONSerializer();

    private boolean outputStackTrace = false;

    public DefaultErrorHandler() {
        this(false);
    }

    public DefaultErrorHandler(boolean outputStackTrace) {
        this.outputStackTrace = outputStackTrace;
    }

    public void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse = new APIResponse(APIResponse.FAIL, t.getClass().getName(), this.getErrorDetailInfo(t));
        this.outputAPIResponse(apiResponse, response);
    }

    public void handleError(BindException bindException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        BindingResult bindingResult = bindException.getBindingResult();
        APIResponse apiResponse = APIResponse.fail(bindingResult);
        this.outputAPIResponse(apiResponse, response);
    }

    public void handleError(MissingServletRequestParameterException missingServletRequestParameterException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse = new APIResponse(APIResponse.BAD_PARAMETER, null, this.getErrorDetailInfo(missingServletRequestParameterException));
        this.outputAPIResponse(apiResponse, response);
    }


    protected String getErrorDetailInfo(Throwable t) throws Exception {
        String errorMessage = t.getMessage();
        if (this.outputStackTrace) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            t.printStackTrace(pw);
            errorMessage = sw.toString();
            sw.close();
        }
        return errorMessage;
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletResponse response) throws Exception {
        this.outputAPIResponse(apiResponse, response, response.getStatus());
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletResponse response, int httpStatus) throws Exception {
        byte[] data = jsonSerializer.serialize(apiResponse);
        response.setStatus(httpStatus);
        response.setContentType("application/json;charset=utf8");
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }
}
```

### 5. Validation
**sweet-core**使用JSR-349规范作为验证器，集成了**hibernate-validator**实现。

**GreetingsController.java**

```java
@RestController
public class GreetingsController {
    private static final Logger logger = LoggerFactory.getLogger(GreetingsController.class);

    @Autowired
    private ApplicationInfo applicationInfo;

    @Autowired
    private SweetSampleService sweetSampleService;

    public void setApplicationInfo(ApplicationInfo applicationInfo) {
        this.applicationInfo = applicationInfo;
    }

    public ApplicationInfo getApplicationInfo() {
        return this.applicationInfo;
    }

    @RequestMapping("/greetings")
    public APIResponse sayGreetings(
            @Valid					/*这里表示请求参数需要验证*/
            SweetSampleModel sampleModel
    ) throws Exception{
        return APIResponse.response("sweet.framework.core.greetings.success", "Greetings!!! Welcome to application " + applicationInfo.toString());
    }
}
```

**SweetSampleModel.java**

```java
public class SweetSampleModel {
    @SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(SweetSampleModel.class);

    @Min(2)
    private int id;

    @NotNull
    @Length(min = 2, max = 5)
    private String name;

    @Min(18)
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getId() {
        return id;
    }

    @Override
	public String toString() {
		return "id:" + id + ";name:" + this.name + ";age:" + this.age;
	}

	public void setId(int id) {
        this.id = id;
    }   
}
```

#### 5.1 验证错误统一处理
**sweet-core**的**@RestController**不需要在**@Valid**参数后紧接着一个**BindingResult**要求Spring MVC注入验证结果，并通过**BindingResult.hasErrors()**方法判定其是否有错再输出

以下代码是**`错误`**的

```java
@RequestMapping("/greetings")
public APIResponse sayGreetings(
        @Valid
        SweetSampleModel sampleModel,
        BindingResult bindingResult		/*不需要处理此参数，发生验证错误时由框架统一处理*/
) throws Exception{

    if(bindingResult.hasErrors()) {
        return APIResponse.fail(bindingResult);
    }

    return APIResponse.response("sweet.framework.core.greetings.success", "Greetings!!! Welcome to application " + applicationInfo.toString());
    }
```

以下代码是**`正确`**的

```java
@RequestMapping("/greetings")
public APIResponse sayGreetings(
        @Valid					/*这里仅声明请求参数需要验证即可*/
        SweetSampleModel sampleModel
) throws Exception{
    return APIResponse.response("sweet.framework.core.greetings.success", "Greetings!!! Welcome to application " + applicationInfo.toString());
}
```

##### 综合验证示例

```java
@RestController
public class GreetingsController {
    private static final Logger logger = LoggerFactory.getLogger(GreetingsController.class);

    @Autowired
    private ApplicationInfo applicationInfo;

    @Autowired
    private SweetSampleService sweetSampleService;

    public void setApplicationInfo(ApplicationInfo applicationInfo) {
        this.applicationInfo = applicationInfo;
    }

    public ApplicationInfo getApplicationInfo() {
        return this.applicationInfo;
    }

    @RequestMapping("/greetings")
    public APIResponse sayGreetings(
            @Valid SweetSampleModel sampleModel
    ) throws Exception {
        return APIResponse.response("sweet.framework.core.greetings.success", "Greetings!!! Welcome to application " + applicationInfo.toString());
    }

    @RequestMapping("/greetings1")
    //请注意在Controller方法上加上@Valid标注
    @Valid
    public APIResponse sayGreetings2(
            @RequestParam(name = "xxx") @NotNull @Length(min=3) String name,
            @Length(min = 5)  String ppp
    ) {
        return APIResponse.response("sweet.framework.core.greetings.success", ppp);
    }

    @RequestMapping("/greetings2")
    @Valid
    public APIResponse sayGreetings1(
            @NotNull String ppp,
            @Valid SweetSampleModel sampleModel
    ) {
        return APIResponse.response("sweet.framework.core.greetings.success", "OK");
    }
}
```

#### 5.2 验证错误发生时的响应处理
**sweet-core**在验证错误时默认将验证结果以标准**@APIResponse**响应给前端(除非你将参数`sweet.framework.core.mvc.error.handle.json`设置为`false`)，响应`code`统一为`validation-fail`。

```json
{
	code: "validation-fail",
	data: {
		age: "最小不能小于18"
	},
	message: "请求参数验证失败"
}
```


### 6. Mybatis集成
**sweet-core**集成了Mybatis数据访问组件，推荐定义DAO接口并在Mybatis的**mapper.xml**中配置接口实现。

#### 6.1 Mybatis配置

```properties
# Mybatis sql map文件路径
mybatis.mapperLocations=classpath:sql-mapper-*.xml

# Mybatis 类型映射别名包，多个包请使用","分隔
mybatis.typeAliasesPackage=cn.evun.sweet.framework.core.mvc.sample.model

# MapperScan base packages, 请设置到DAO接口目录, 支持通配符及以","或";"分隔的多个包
sweet.framework.core.mybatis.mapper.scan.basePackage=cn.evun.sweet.framework.core.mvc.sample.dao
```

#### 6.2 Mybatis分页插件PageHelper

**sweet-core**集成了Mybatis分页插件PageHelper，**Sweet应用**只需要在@Service层中简单地调用PageHelper的静态方法startPage(int pageNum/* 0 based */, int pageSize)即可。

```java
@Override
public Page<SweetSampleModel> listAll() {
    PageHelper.startPage(0,10);			//取第一页的数据，每页10条
    Page<SweetSampleModel> result = (Page<SweetSampleModel>) sweetSampleDAO.listAll();
    return result;
}
```

#### 6.3 Mybatis Mapper配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>   
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  
<mapper namespace="cn.evun.sweet.framework.core.mvc.sample.dao.SweetSampleDAO">
	<resultMap id="sampleModelResult" type="SweetSampleModel" >
		<result column="name" property="name" />
		<result column="user_name" property="name" />
		<result column="age" property="age" />
	</resultMap>

	<select id="getByName" parameterType="java.lang.String" resultMap="sampleModelResult" resultType="SweetSampleModel">
		select *
		from user where user_name = #{name}
	</select>
</mapper>
```
更多**Mapper**配置方式请参考**Mybatis**文档。

### 7. HTTP请求全链路跟踪
**sweet-core**支持HTTP请求全链路跟踪并默认开启，HTTP请求全链路跟踪记录如下数据：

```
1. 收到请求时生成全局唯一请求ID("Request-Id")，用于唯一标识一次HTTP请求
2. 请求总体执行时间，是否包含错误，错误消息内容
3. 调用了哪些@Service的方法，每个方法的执行耗时，是否出错
4. 调用了哪些@Repository方法，每个方法的执行耗时，是否出错
5. "Request-Id"传递
	5.1. 请求外部系统的HTTP服务时，传递当前"Request-Id"(sweet-common模块支持)
	5.2. 调用外部系统Dubbo服务时，传递当前"Request-Id"(sweet-dubbo模块支持)
```
**注：**对**sweet-core**的HTTP请求完成后，可通过Response Header的**X-SWEET-REQUEST-ID**获取本次请求的Request-Id。

### 8. 安全防御
#### 8.1 XSS攻击防御 & SQL注入防御
**sweet-core**默认开启了XSS攻击防御和SQL注入防御，**Sweet应用**只需要保证配置项**sweet.framework.core.http.defence.xss**为**true**即可。

```properties
# XSS + SQL注入防御
sweet.framework.core.http.defence.xss=true
```

#### 8.2 CSRF攻击防御
##### 8.2.1 **sweet-core**的CSRF攻击防御流程：

```txt
1. 接收到动态资源的HTTP请求
2. 如果HttpMethod是GET/HEAD/OPTIONS则直接访问资源(不防御)
3. 获取Session中存储的CSRF token，不存在则直接访问资源，资源访问结束后更新CSRF token
4. 获取HTTP请求的CSRF token
	3.1. Body["_csrf"]，即可以通过request.getParameter("_csrf")获取
	3.2. Header["X-CSRF-TOKEN"]，即可以通过request.getHeader("X-CSRF-TOKEN")获取
5. 比较Session中和HTTP请求的CSRF token
	5.1. 相同则访问资源并更新CSRF token
	5.2. 不同则返回403
```

##### 8.2.2 前端的CSRF token存储与传递
建议前端封装javascript应用级的ajax函数，在前端调用POST/PUT/DELETE等ajax请求时通过HEADER(X-CSRF-TOKEN)传递存储的CSRF token（请使用local storage而不要使用javascript全局变量，防止用户手动刷新页面后值丢失）

### 9. 模板引擎(FreeMarker)
**sweet-core**推荐使用**"前后端分离"**的开发模式，也支持动态页面模板引擎，默认支持**FreeMarker**模板引擎。

### 10. 应用状态报告(Actuator)
**sweet-core**集成了Spring Boot Actuator实现应用状态报告，**Sweet应用**启动后可访问Actuator服务查看应用状态，Actuator服务Base URL: http://ip.of.server:9000/endpoints，Actuator服务接口清单：

```
1. /beans -> Spring Context中生成的Bean清单
2. /autoconfig -> 自动配置Bean清单
3. /mappings -> @RestController和@Controller的@RequestMapping清单
4. /env -> 系统参数及环境变量清单
5. /env/{name:.*} -> 指定的系统参数或环境变量值
6. /metrics -> 进程指标
7. /metrics/{name:.*} -> 指定的进程指标
8. /trace -> 最近的HTTP请求
9. /health -> 服务健康指标（可自定义）
10. /dump -> JVM线程栈
11. /info -> 应用程序信息
12. /logfile -> 日志文件
13. /configprops -> 配置项清单
```

### 11. Restful API接口文档
**sweet-core**集成了**SpringFox**，使用**Swagger**`2.0`规范自动生成**@RestController**中定义的**@RequestMapping**(即：Rest接口)文档。默认设置下，接口文档地址为：[http://127.0.0.1:8080/swagger-ui.html](http://127.0.0.1:8080/swagger-ui.html)。

![MacDown Screenshot](http://7xvgjm.com1.z0.glb.clouddn.com/swagger-screen-snapshot.png)

使用更多**Swagger**`2.0`注解可创建更完整、清晰的API文档，注解类型和使用方式请参考**Swagger**`2.0`官方API。

接口文档默认是`开启`的，生产环境下请**务必**关闭它 - 配置项：`sweet.framework.core.http.restful.doc`请设置为`false`。

### 12. 国际化
**sweet-core**支持国际化应用, 国际化消息配置文件默认目录及格式`classpath:i18n/messages_${locale}.properties`, 例`classpath:i18n/message_zh_CN.properties`, 文件编码默认UTF-8, 不再需要`native2ascii`转换

Freemarker国际化使用参考

```
<#import "include/spring.ftl" as spring />
<html>
    <body>
        <@spring.message "hello" /><br/>
        <@spring.messageText "notExist", "defaultText" />
    </body>
</html>
```

`spring.ftl`可从sweet-core的jar包的templates目录中找到, 要改变Locale, 建议通过如下方式:

 + 使用lang参数, 例: http://xxxx.xxx.com/page?lang=zh_CN, 如该参数与应用冲突, 可考虑修改`sweet.framework.core.i18n.locale.param`配置项
 
### 13. 使用Junit单元测试(since 1.1.4)

```
public class BPSRestTestMain {
    private static final Logger logger = LoggerFactory.getLogger(BPSRestTestMain.class);

    @Autowired
    RepositoryService repositoryService;

    @Before
    public void beforeTest() throws Exception{
        SweetApplicationEntry.run();
        SweetApplicationTestCase.enable(this);
    }

    @Test
    public void testIntegration() throws Exception {
        logger.info("HELLO, Junit -> " + repositoryService);

        List<Deployment> deployments = repositoryService.createDeploymentQuery().list();
        for(Deployment deployment : deployments) {
            logger.info("已部署 -> " + deployment.getName());
        }
    }
}
```

### 14. 配置项清单

参考[sweet-framework进阶开发指南](../HELP.md)