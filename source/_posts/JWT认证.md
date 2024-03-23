---
title: JWT认证
date: 2023-12-22 17:05:13
tags:
  -  计算机网络
cover: https://bu.dusays.com/2023/12/22/6585a5ccdff04.webp
---

## 什么是 JWT

JWT: JSON Web Tokens,它是一种将 JSON 对象编码为没有空格，且难以理解的长字符串的标准。在具体上,它就是一段字符串,下面就是 FastAPI 文档中给出的例子

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

抽象地把它看成是这样的

```txt
aaaaaaaaaaaa.bbbbbbbbbbbb.cccccccccccc
```

jwt 由三个部分组成,这三个部分之间用点.拼接起来,这三个部分分别是

- Header — 头,定义了 jwt 使用的算法等信息
- Payload — 载荷,存储有效信息的地方
- Signature — 签名,用于校验 jwt 令牌

这三个部分中,只有第三个部分是无法还原的,前两个部分只是简单的进行了 base64 编码,把上面例子中的前两部分解码之后,看起来是这样的:

**Header**

```json
{
    "alg":"HS256",
    "typ":"JWT"
}
```

alg 即为算法,这里使用了 HS256 算法

typ 即为类型,指明这里是一个 JWT 字符串

**Payload**

```json
{
    "sub":"1234567890",
    "name":"John Doe",
    "iat":1516239022
}
```

可以看到 Payload 中存储了主要的信息

> **提示**
> 根据 JWT 规范, Payload 中的 `sub` 是一个预定义的声明（Claim），表示JWT的主题（Subject）。它指定了JWT所代表的实体或主题，通常是用户或客户端应用程序。 `sub`声明的值是字符串类型，通常是唯一标识用户或客户端应用程序的ID。

**Signature**

Signature 则是通过加盐加密得到的,加密由服务端实现

## JWT 有什么用

其实它与 token ,cookie 的作用类似,就是用来免密码认证客户端

比如你去上学,学校是服务端,你是客户端.你完成学籍注册之后,学校发给你一个学生证,学生证就是你的 jwt 令牌.

你使用学校的很多服务,都要出示学生证.

而在实际业务中,jwt 令牌是有过期时间的,过期之后,需要客户端再次登录,获取新的 jwt