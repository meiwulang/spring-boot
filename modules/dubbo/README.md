# sweet-framework-dubbo

### 1. Introduction

**sweet-framework-dubbo** 支持dubbo服务,约定dubbo配置文件入口地址(classpath:META-INF/dubbo/dubbo.xml)

### 2. QuickStart
#### pom.xml

```xml
<dependency>
    <groupId>cn.evun.sweet.framework</groupId>
    <artifactId>sweet-framework-dubbo</artifactId>
    <version>2.0.0</version>
</dependency>
```
e.g. dubbo.xml
```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:jee="http://www.springframework.org/schema/jee"
           xmlns:tx="http://www.springframework.org/schema/tx"
           xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
           xmlns:context="http://www.springframework.org/schema/context"
           xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
        http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.1.xsd
        http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.1.xsd
        http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd"
           default-lazy-init="false" >
        <!-- 提供方应用名称信息，这个相当于起一个名字，我们dubbo管理页面比较清晰是哪个应用暴露出来的  -->
        <dubbo:application name="sweet-dubbo-demo-provider"></dubbo:application>
        <!-- 使用zookeeper注册中心暴露服务地址 -->
        <dubbo:registry address="${dubbo.zookeeper.address}" protocol="zookeeper" timeout="120000"></dubbo:registry>
        <dubbo:provider timeout="12000"/>
        <!-- 暴露服务的端口 -->
        <dubbo:protocol name="dubbo" port="20880" />
        <!--要暴露的服务接口-->
        <!-- base发布服务包 -->
        <import resource="dubbo-provider-service.xml"/>
    </beans>
```