# sweet-common

### 1. Introduction

**sweet-common**是sweet的基础工具包，包结构如下：

+ data structure包 -> 提供常用的数据结构

+ document parser包 -> 文件解析函数包。如xml、dom 等 
               
+ email包 -> 邮件相关                  
                              
+ network包 -> 提供网络操作相关方法包
    
+ serialize包 -> 对象序列化，提供Java原生序列化、JSON序列化及Hessian序列化实现，建议使用JSON序列化

+ web包 -> j2ee web编程函数库, 包括cookie html 等封装操作

+ util包 -> 通用基础函数库

### 2. QuickStart
#### pom.xml
```xml
<dependency>
    <groupId>cn.evun.sweet.framework</groupId>
    <artifactId>sweet-framework-common</artifactId>
    <version>${sweet.framework.version}</version>
</dependency>
```
### 3. API Documetation
**(尚未发布)**