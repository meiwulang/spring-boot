# 进阶开发指南

## 使用配置文件

### 理解三个JVM属性(java -Dxxx=xxx)

+ app.name : 应用程序名称, 默认"sweet-application" 
+ app.id : 应用程序集群部署服务ID, 默认"1" 
+ app.profile : 应用程序运行时环境, "dev"/"test"/"production"分别代表应用程序的"开发环境"/"测试环境"/"生产环境", 默认"dev"

### 配置文件加载优先级(`低` -> `高`)

配置文件加载策略: `按优先级从低至高顺序加载, 相同配置项时覆盖(高优先级配置文件中的配置项覆盖低优先配置文件中的配置项), 配置文件不存在则忽略`

+ classpath:sweet-core.properties
    + 框架预定义, 该配置文件已随着sweet-core打包发布, 定义了Sweet应用所有的配置项和默认值
+ classpath:sweet-core-${app.profile}.properties
    + 框架预定义, 该配置文件已随着sweet-core打包发布, 定义了Sweet应用在开发/测试/生产三个环境下的默认行为, 如: 是否启动Actuator, 是否生成Swagger API文档等
+ classpath:${app.name}.properties
    + 应用程序自定义, ${app.name}默认值为"sweet-application"
+ classpath:${app.name}-${app.profile}.properties
    + 应用程序自定义, ${app.name}默认值为"sweet-application", ${app.profile}默认为"dev"
+ classpath:${app.name}-${app.id}-${app.profile}.properties
    + 应用程序自定义, ${app.name}默认值为"sweet-application", ${app.id}的默认值为"1", ${app.profile}默认为"dev"
+ file:${wd}/etc/${app.name}.properties
    + 应用程序自定义, ${wd}表示当前工作目录Working Directory
+ file:${wd}/etc/${app.name}-${app.profile}.properties
    + 应用程序自定义
+ file:${wd}/etc/${app.name}-${app.id}-${app.profile}.properties
    + 应用程序自定义
    
### 配置文件举例

启动命令 : `java -Dapp.name=sweet-feedback -Dapp.id=2 -Dapp.profile=production -jar sweet-feedback-1.0.0.jar`

+ classpath:sweet-core.properties
+ classpath:sweet-core-production.properties
+ classpath:sweet-feedback.properties(Optional)
+ classpath:sweet-feedback-production.properties(Optional)
+ classpath:sweet-feedback-2-production.properties(Optional)
+ file:etc/sweet-feedback.properties(Optional)
+ file:etc/sweet-feedback-production.properties(Optional)
+ file:etc/sweet-feedback-2-production.properties(Optional)

### 配置项定义原则

#### classpath配置文件使用原则

+ classpath:${app.name}.properties
    + 定义应用程序代码相关的"静态"的配置, 这些配置项与应用运行环境无关, 定义了应用的最基本配置, 如: 代码扫包路径, sql-mapper扫描路径, dao接口扫包路径
    + 定义应用程序自定义配置项的默认值
+ classpath:${app.name}-${app.profile}.properties
    + 定义应用程序在不同运行环境下的"动态"配置, 这些配置项与应用运行环境紧密相关, 不同的运行环境具有完全不同的配置, 如: 数据库配置, redis配置, 服务端口配置等
+ classpath:${app.name}-${app.id}-${app.profile}.properties
    + 定义应用程序某个特定服务实例的特殊配置, 我们不太建议使用这样的配置项, 因为你的应用程序服务实例在集群环境下应当是完全对等的服务, 但是, 我们保留这样的机制
    
#### file(文件系统)配置文件使用原则

我们支持从文件系统读取配置文件并比classpath配置文件具有更高的优先级, 但是, 这并不意味着建议你在任何运行环境下都使用文件系统配置项. 我们建议在生产环境中
使用文件系统配置, 因为jar包内的配置项是开发人员能够修改的, 同时配置项中必定会存在信息安全敏感信息(端口, 用户名, 密码等), 这些配置项应只有发布管理员或运维技术人员修改,
不应暴露给开发人员和构建人员. 如有必要, 测试环境也可以定义文件系统配置项.

### 最高优先级的配置项 - 启动命令

命令 : `java -Dserver.port=10000 -jar xxxx.jar`

这里定义的配置项"server.port"将覆盖任何配置文件中定义的配置项

### 配置项清单

#### classpath:sweet-core.properties

```
#配置文件优先级从低到高为, 默认${app.name}为"sweet-application":
#classpath:/sweet-framework.properties
#classpath:/${app.name}.properties
#classpath:/${app.name}-${app.profile}.properties
#classpath:/${app.name}-${app.id}-${app.profile}.properties
#file:./etc/${app.name}.properties
#file:./etc/${app.name}-${app.profile}.properties
#file:./etc/${app.name}-${app.id}-${app.profile}.properties

#应用程序包的基础路径, 用于ComponentScan, 多个包使用","分隔, 请不要在此加入"cn.evun.sweet", 因为其已经被默认加入扫包路径
sweet.app.basePackages=

# 应用Banner路径
sweet.banner.location=classpath:sweet-banner.txt

#Spring的Active Profile配置, 以","分隔
spring.profiles=

################################ HTTP服务器配置 ##################################
#HTTP服务器端口, 默认8080
server.port=8080
#HTTP服务contextPath, 默认"/"
server.context-path=/
#绑定到某个网卡的IP段启动HTTP服务, 默认"0.0.0.0"(在所有网卡上启动HTTP服务)
server.address=0.0.0.0
#session过期时间(in seconds), 默认30分钟
server.session.timeout=1800

# SSL配置
#server.ssl.enabled=false
#server.ssl.client-auth=
#server.ssl.key-alias=
#server.ssl.ciphers=
#server.ssl.key-password=
#server.ssl.key-store=
#server.ssl.key-store-password=
#server.ssl.key-store-provider=
#server.ssl.key-store-type=
#server.ssl.protocol=TLS
#server.ssl.trust-store=
#server.ssl.trust-store-password=
#server.ssl.trust-store-provider=
#server.ssl.trust-store-type=

# Tomcat配置
#server.tomcat.access-log-pattern=
#server.tomcat.access-log-enabled=false
#server.tomcat.internal-proxies=10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\192\\.168\\.\\d{1,3}\\.\\d{1,3}|\\169\\.254\\.\\d{1,3}\\.\\d{1,3}|\\127\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}
#server.tomcat.protocol-header=x-forwarded-proto
#server.tomcat.port-header=
#server.tomcat.remote-ip-header=x-forwarded-for
#server.tomcat.basedir=/tmp
#server.tomcat.background-processor-delay=30
#server.tomcat.max-http-header-size=
#server.tomcat.max-threads=300
#server.tomcat.uri-encoding=UTF-8

#跨域请求支持
sweet.framework.core.http.crossSite=false

#HTTP服务错误页面配置
sweet.framework.core.mvc.error.handle=true
#输出错误栈(建议生产环境下关闭)
sweet.framework.core.mvc.error.handler.outputStackTrace=true
#使用json输出错误(cn.evun.sweet.framework.core.mvc.DefaultErrorHandler)
#设置为"false"后将看到"原始"的异常输出
sweet.framework.core.mvc.error.handle.json=true

# HTTP请求跟踪
sweet.framework.core.http.request.trace=true

# APIResponse的国际化文件路径, 多个路径以","分隔, 资源文件请使用"UTF-8"
sweet.framework.core.mvc.api.i18n.basename=classpath:i18n/api
# APIResponse的国际化名
sweet.framework.core.mvc.api.i18n.locale=zh_CN

#i18n配置
sweet.framework.core.i18n.enabled=true
#国际化Message配置文件存放目录
sweet.framework.core.i18n.resources.baseName=i18n/messages
#国际化Message配置文件编码
sweet.framework.core.i18n.resources.encoding=utf-8
#默认Locale
sweet.framework.core.i18n.defaultLocale=zh_CN
#转换语言时传参名称, http://xxx.xxx.com/page?lang=zh_CN
sweet.framework.core.i18n.locale.param=lang

# 安全配置
# XSS + SQL注入防御
sweet.framework.core.http.defence.xss=false
# CSRF防御
sweet.framework.core.http.defence.csrf=false

# 使用Swagger2 在线Restful文档, 访问: http://localhost:8080/swagger-ui.html
sweet.framework.core.http.restful.doc=true

# Model包名, 多个包使用","分隔
sweet.framework.core.http.restful.doc.modelPackages=

# swagger文档属性
sweet.framework.core.http.restful.doc.swagger.title=${sweet.app.name}[$groupName]Restful API Documentation
sweet.framework.core.http.restful.doc.swagger.description=
sweet.framework.core.http.restful.doc.swagger.termsOfServiceUrl=http://swagger.io/terms/
sweet.framework.core.http.restful.doc.swagger.contract=sweet-group@geely.com
sweet.framework.core.http.restful.doc.swagger.license=Apache 2.0
sweet.framework.core.http.restful.doc.swagger.licenseUrl=http://www.apache.org/licenses/LICENSE-2.0
# spring-fox 文档json数据地址
springfox.documentation.swagger.v2.path=/v2/api-docs
# docket group配置, 格式: [接口组名1:]接口URI正则表达式1;[接口组名2:]接口URI正则表达式2; "[]"中的表示可选项, 接口组名不可重复
sweet.framework.core.http.restful.doc.api.groups=

# api uri pattern
sweet.framework.core.mvc.api.pattern=/api/*

# dynamic resource pattern
sweet.framework.core.mvc.dynamic-resource.pattern=/api/*

# SpringMVC日期型参数解析
# 是否使用GMT时区, 注意: 开启此选项会将传入时间字符串全部当作GMT时间处理, 默认使用当前时区
# 请注意配置的时间格式需要使用":"区分"时,分,秒,毫秒"字段
sweet.framework.core.mvc.data-binder.date.useGMTTimeZone=false
# 不含时间
sweet.framework.core.mvc.data-binder.date.shortDateFormat=yyyy-MM-dd
# 不含秒
sweet.framework.core.mvc.date-binder.date.middleDateFormat=yyyy-MM-dd HH:mm
# 含时分秒
sweet.framework.core.mvc.date-binder.date.longDateFormat=yyyy-MM-dd HH:mm:ss
# 含毫秒
sweet.framework.core.mvc.date-binder.date.fullDateFormat=yyyy-MM-dd HH:mm:ss:SSS

# 文件上传配置
# 上传文件的最大字节数, 单位支持K,M
sweet.framework.core.mvc.upload.maxFileSize=10MB
# 上传请求的最大字节数, 单位支持K,M
sweet.framework.core.mvc.upload.maxRequestSize=100MB
# 上传的临时文件存储位置
sweet.framework.core.mvc.upload.storageLocation=


################################ 日志配置 ##################################
#控制台颜色
spring.output.ansi.enabled=always
#日志配置
#日志级别(TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF)
logging.level.root=INFO
#ProcessTrace日志级别默认为INFO
logging.level.cn.evun.sweet.common.tracer.ThreadLocalProcessTracer=INFO
#logback配置文件路径
# logging.config=classpath:logback.xml
#日志文件目录(日志文件10M)
logging.file=./logs/${sweet.app.name}/${sweet.app.name}-${sweet.app.id}-${sweet.app.profile}.log

# Freemarker配置
spring.freemarker.allow-request-override=false
spring.freemarker.allow-session-override=false
spring.freemarker.cache=true
spring.freemarker.charset=UTF-8
spring.freemarker.check-template-location=true
spring.freemarker.content-type=text/html
spring.freemarker.enabled=true
spring.freemarker.expose-request-attributes=false
spring.freemarker.expose-session-attributes=false
spring.freemarker.expose-spring-macro-helpers=true
spring.freemarker.prefer-file-system-access=true
spring.freemarker.suffix=.ftl
spring.freemarker.template-loader-path=classpath:/templates/
spring.freemarker.settings.template_update_delay=0
spring.freemarker.settings.default_encoding=UTF-8
spring.freemarker.settings.classic_compatible=true
spring.freemarker.order=1


#内置管理服务EndPoints配置
management.contextPath=/endpoints
#管理服务端口
management.port=-1
#管理服务绑定IP(0.0.0.0表示绑定到所有网卡)
management.address=0.0.0.0


######数据源配置#######
#数据源名称
spring.datasource.name=${sweet.app.name}.DataSource.${sweet.app.id}
#阿里Druid数据源
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
#数据库类型
spring.datasource.db-type=mysql
#JDBC驱动程序
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
#JDBC Connection URL
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/geely?useUnicode=true&characterEncoding=UTF-8
#JDBC 用户名
spring.datasource.username=root
#JDBC 密码
spring.datasource.password=Juning1516
#初始化连接数
spring.datasource.initialSize=5
#最大连接数
spring.datasource.maxActive=5
#最小不活动连接数
spring.datasource.minIdle=1
#连接池占满时,最大等待时间(毫秒), "-1"表示一直等待直到有可用连接
spring.datasource.maxWait=-1
#Idle检测
spring.datasource.timeBetweenEvictionRunsMillis=60000
spring.datasource.minEvictableIdleTimeMillis=30000
#有效连接验证SQL
spring.datasource.validationQuery=select '1'
#有效性验证-Pool-Object Borrow阶段
spring.datasource.testOnBorrow=false
#有效性验证-Pool-Object Return阶段
spring.datasource.testOnReturn=false
#有效性验证-Pool-Object Idle阶段
spring.datasource.testWhileIdle=true
#池化PreparedStatement
spring.datasource.poolPreparedStatements=true
#最大打开的PreparedStatement数
spring.datasource.maxOpenPreparedStatements=50
# Mybatis sql map文件路径, 多个路径请使用","分隔
mybatis.mapperLocations=
# Mybatis 类型映射别名包，多个包请使用","分隔
mybatis.typeAliasesPackage=
# MapperScan base packages, 请设置到DAO接口目录, 支持通配符及以","或";"分隔的多个包
sweet.framework.core.mybatis.mapper.scan.basePackages=
# Mybatis 类型转换包
mybatis.typeHandlersPackage=cn.evun.sweet.framework.core.mvc.data.mybatis.handler

# TracableRestTemplate Restful API调用参数设置
# 连接超时时间, -1表示不超时
sweet.framework.core.rest.invocation.connectTimeout=3000
# 请求发出后,响应超时时间,-1表示不超时
sweet.framework.core.rest.invocation.readTimeout=-1
# 慢请求
sweet.framework.core.rest.invocation.warning.limit=2000
```

#### classpath:sweet-core-dev.properties

```
#跨域请求支持
sweet.framework.core.http.crossSite=true

#开启Actuator管理服务端口
management.port=9000
```

#### classpath:sweet-core-test.properties

```
# 空的, 与classpath:sweet-core.properties的配置项一致
```

#### classpath:sweet-core-production.properties

```
# 禁用swagger文档
sweet.framework.core.http.restful.doc=false

# 不输出异常栈
sweet.framework.core.mvc.error.handler.outputStackTrace=false
```