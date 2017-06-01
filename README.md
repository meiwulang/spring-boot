# 关于sweet-framework

**sweet-framework**是应用程序核心框架，基于Spring Boot开发。**sweet-framework**包含以下组件：

+ [sweet-framework-common](modules/common/README.md) -> Java语言基础工具包
	
+ [sweet-framework-core](modules/core/README.md) -> 应用核心框架、启动器
	
+ [sweet-framework-session](modules/session/README.md) -> Redis分布式Session支持
	
+ [sweet-framework-redis](modules/redis/README.md) -> Redis访问组件，支持缓存、分布式计数器、分布式锁、队列、Topic(pub/sub队列)

+ [sweet-framework-redis-autoconfiguration](modules/redis-autoconfiguration/README.md) -> Redis访问组件自动配置
	
+ [sweet-framework-rabbitmq](modules/rabbitmq/README.md) -> RabbitMQ访问组件

+ [sweet-framework-rabbitmq-autoconfiguration](modules/rabbitmq-autoconfiguration/README.md) -> RabbitMQ访问组件自动配置

+ [sweet-framework-dubbo](modules/dubbo/README.md) -> 支持dubbo服务

+ [sweet-framework-session-cds](modules/session-cds/README.md) -> 跨站单点登录组件

+ [sweet-framework-auth](modules/auth/README.md) -> 权限模块

+ [sweet-framework-storage](modules/storage/README.md) -> 分布式存储组件

## Release Notes

### 2.1.1
+ **sweet-framework-auth**模块可以支持用户多租户环境下动态切换模型了
+ 去除了验证失败错误的错误吗统一设置为200，因为在Hystrix认为这也是一种错误，会加入到它的熔断计数逻辑中
+ 新增了模块**sweet-framework-storage**，定义了分布式存储通用接口，提供了默认的FastDFS实现
+ 云服务查找可以支持“本地服务优先策略”了, 默认它是关闭的
+ 云服务调用日志支持外部扩展了
+ Freemarker可以支持自动Escape了
+ 云服务请求可以支持外部拦截了

### 2.1.0
+ 新增了模块**sweet-framework-session-cds**, 支持跨站单点登录
+ 新增了模块**sweet-framework-auth**, 集成了Apache Shiro，业务系统的权限模型可以无缝与Sweet框架集成了
+ **sweet-framework-session**支持SSO了
+ Mybatis Mapper扫描的目标`Annotation`可以自定义了，默认还是`@Mapper`
+ Cloud模式下，引入了`Hystrix`实现分布式应用请求的熔断机制(降级暂不支持)
+ 应用间传递错误（通过`@CloudServiceClient`调用）更完善了
+ 错误处理支持责任链模式了，更多细节请参考`cn.evun.sweet.framework.core.mvc.error.chain.ChainedErrorHandler`
+ `APIResponse`国际化处理变得更加优雅了
+ 白名单过滤器已经被移除了，它的功能已经在**sweet-framework-auth**中被重新实现
+ 优化了RequestTraceLog，日志信息更加有效和完善
+ 优化了`BusinessException`的处理规则，业务系统使用`BusinessException`将更加简单便捷
+ 对`sweet-cloud-join`的支持升级到**0.0.2**版本协议，支持平台共享配置
+ 修正了以前版本的一些Bug

### 2.0.2
+ 支持多数据库, mybaits mapper locations 默认值为: classpath\*:sql-mappers/\*\*/\*.xml,classpath\*:sql-mappers-${spring.datasource.db-type:mysql}/\*\*/\*.xml
+ APIResponse支持加载依赖jar包下的国际化资源文件
+ 异常信息可以正常在各系统间传递了(使用@CloudServiceClient)

### 2.0.1
+ sweet-dubbo : 支持dubbo服务请求链路跟踪
+ sweet-framework-core : logback日志默认可以输出应用ID和请求ID了
+ sweet-framework-core : 日志统一输出到文件系统, 不再输出到队列, 即便它是Cloud模式
+ sweet-framework-core : Feign代理Contract默认使用Spring MVC注解

### 2.0.0

+ sweet-framework : 标准化artifact-id及对应包名
+ sweet-framework-core : 去除规则化的配置项加载链, 支持Spring Boot应用标准方式
+ sweet-framework-core : 支持接入sweet云平台
+ + 支持云配置
+ + 支持云服务发现和注册
+ + 支持云服务客户端自动发现和代理(使用Feign)
+ + 支持云服务降级和服务熔断, 支持根据不同外部服务配置不同的降级和熔断策略
+ + 支持云服务接口本地实现/代理实现自动转换
+ + 支持服务分层&服务依赖分析
+ + 支持客户端负载均衡, 支持按版本匹配,随机,加权随机,轮循负载均衡算法, 默认使用加权随机算法, 应用权重可在运行时修改, 范围0-100
+ + 支持从classpath:config-metadata*.json加载模块配置元数据
+ + 增加活跃检测服务`TouchController`用于云平台主动侦测服务状态
+ + 可在云服务之间跟踪请求, 跟踪请求的Filter可以对所有非静态资源生效了
+ + 删除了暂未开发的mongo模块
+ + redis, session和rabbitmq模块的默认配置使用metadata表述了
+ + 支持查看应用配置元数据及默认值, 需要打开Spring Profile "configuration", 访问/sweet-framework/configuration/metadata/preview查看配置元数据, 生产环境请务必关闭"configuration" Profile
+ + 支持优雅停机, 访问/sweet-framework/shutdown(限定127.0.0.1访问)
+ + 支持白名单过滤功能
+ 修正了1.x版本的一些BUG
+ 支持通过META-INF/sweet-module*.properties模块化开发应用
+ redis和rabbitmq的自动配置已移动到sweet-framework-redis-autoconfiguration和sweet-framework-rabbitmq-autoconfiguration两个项目中
+ 新增dubbo模块, 支持dubbo服务

### 1.1.5

+ sweet-common : 功能优化 - 更新JSON序列化配置选项, 对象字段为空时能正确反序列化
+ sweet-core : 默认配置变更 - dev环境不再默认启动Spring Boot Actuator

### 1.1.4

+ sweet-core : 功能新增 - 增加文件上传Bean和配置项
+ sweet-core : 缺陷修正 - Spring Boot在定义了ServletRegistrationBean(MVCConfiguration)时, multipart不能经过MultipartResolver,导致上传文件失败
+ sweet-core : 功能优化 - JUnit单元测试集成
+ sweet-framework : 依赖优化 - JUnit依赖scope设置为test
+ sweet-rabbitmq : 增加集群配置项

### 1.1.2

+ sweet-core : 功能新增 - 增加国际化支持(动态模板)
+ sweet-rabbitmq : 功能新增 - 增加消费者并发数量配置

### 1.1.1

+ sweet-redis : 缺陷修正 - 非utf-8字符集乱码
+ sweet-rabbitmq : 功能新增 - 并发Consumer

### 1.1.0

+ sweet-core : 功能变更 - 默认模板改成Freemarker

### 1.0.21

+ sweet-core : 缺陷修正 - 安全性提升, 配置参数不能覆盖JVM启动时定义的系统参数, 因此从启动命令java -Dxxxx=XXX设置的配置项将具有最高优先级

### 1.0.18

+ sweet-core : 功能优化 - 现在发布新版本只要替换一次版本字符串描述符
+ sweet-core : 功能优化 - 当系统参数"system.properties.print"为`true`时，启动时打印所有配置参数


### 1.0.16

+ sweet-core : 功能优化 - 默认支持多数据源, 且spring.datasource定义的数据源为主要数据源

### 1.0.14

+ sweet-redis : 功能优化 - 当使用redis队列的listen功能时，队列没数据会因为SocketTimeout抛出异常，虽然能够正常执行功能，但控制台异常栈输出太多，静默pop时的SocketTimeout异常

### 1.0.12

+ sweet-redis : 缺陷修正 - RedisServiceMetrics并发访问NullPointerException

### 1.0.10

+ sweet-core : 支持从文件系统加载配置文件, 配置文件目录: ${pwd}/etc/, 配置文件命名与classpath的配置文件命名方式一致, 文件系统配置文件具有最高优先级

### 1.0.8

+ sweet-core : 缺陷修正 - APIResponse的国际化资源打包后找不配置报错
+ sweet-core : 支持从环境变量"sweet-profile"读取profile

### 1.0.6
+ sweet-core : 缺陷修正 - 跨域请求Chrome浏览器支持

### 1.0.4
+ sweet-core : 重要更新 - 修改默认应用名称(-Dapp.name)为"sweet-application", 应用启动时, -Dapp.name也是非必要参数. 建议应用统一使用sweet-application作为配置文件前缀

### 1.0.2

+ sweet-core : 增加"BusinessException"类型, 建议应用业务异常使用此类型抛出
+ sweet-core : 增加BusinessException默认错误处理
+ sweet-core : 增加跨域请求支持, dev环境下默认开启
+ sweet-core : 修改Actuator默认开启状态, 现在默认只在dev环境下开启

### 1.0.0

初版发布

## Quick Start

### pom.xml引用

```
<dependency>
    <groupId>cn.evun.sweet.framework</groupId>
    <artifactId>sweet-framework-core</artifactId>
    <version>${sweet.framework.version}</version>
</dependency>
```

### 概念转变

WEB应用部署方式从"WEB容器部署war包应用"变成"从JAVA应用程序中启动嵌入式WEB Server", 一个容器中部署多个不同应用的时代已经过去, 新一代JAVA WEB应用的核心理念是"轻量级", 核心技术是嵌入式的WEB Server(如Tomcat
和Jetty等). 我们推崇将项目打成jar包并以JAVA应用程序的方式去构建, 部署和启动WEB应用.

### 使用maven插件打包

```
<artifactId>${maven-project}</artifactId>
<!-- 注意: 这里声明打包成jar, 不是war -->
<packaging>jar</packaging>
<version>${version}</version>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>2.3.2</version>
            <configuration>
                <source>1.7</source>
                <target>1.7</target>
            </configuration>
        </plugin>
        
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>1.3.5.RELEASE</version>
            <configuration>
                <mainClass>cn.evun.sweet.framework.core.SweetApplicationEntry</mainClass>
                <layout>JAR</layout>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

命令: `mvn clean package`, ${maven-project}/target目录下将生成jar包${maven-project}-${version}.jar

### 启动

命令: `java -jar ${maven-project}-${version}.jar`, 访问: http://localhost:8080

### 使用IDE开发和调试

IDEA : `Run` -> `Debug...` -> `Edit Configuration` -> `Add New Configuration` -> `Application`

Eclipse : `Run` -> `Debug Configurations` -> `Java Application` -> `New`

main class : `cn.evun.sweet.framework.core.SweetApplicationEntry`


## 进阶开发指南

进阶开发指南请点击[传送门](./HELP.md)

Copyright © 2016-2018 吉利易云技术中心基础架构组
