---
title: Linux环境变量
date: 2023-12-21 10:13:40
tags:
  - Linux
cover: https://bu.dusays.com/2023/12/19/6581510674877.png
---

## 设置环境变量

```shell
foo=bianliang;
```

## 取消变量

```shell
unset foo
```

## 打印变量

```shell
[root@iZ2zebqeq8f5murg3r515qZ ~]# echo $foo bianliang
```

## 查看环境变量

`env`命令：env命令主要用来显示当前用户的环境变量，也就是说，它会列出所有当前用户的系统环境变量。这些变量通常包括一些默认设置，如PATH、HOME等。env命令还可以用来设置或者修改这些环境变量。

`export`命令：export命令则是用来将一个shell变量（或者叫做进程变量）导出成为一个环境变量。一旦一个变量被export，那么它便可以被该shell的子进程访问到。也就是说，export命令允许你在子进程中使用这个变量。


## 查询变量值

`export`命令显示当前系统定义的所有环境变量
`echo $PATH`命令输出当前的PATH环境变量的值

## 环境变量的分类

环境变量可以简单的分成用户自定义的环境变量以及系统级别的环境变量。

- 用户级别环境变量定义文件：`~/.bashrc`、`~/.bash_profile`
- 系统级别环境变量定义文件：`/etc/bashrc`、`/etc/bash_profile`、`/etc/environment`
  
另外在用户环境变量中，系统会首先读取`~/.bash_profile`文件，如果没有该文件则读取`~/.bash_login`，如果也没有该文件，则读取`~/.profile`，根据这些文件中内容再去读取`~/.bashrc`。

## Linux环境变量配置

### 方法一: `export PATH`

普通变量的作用域只局限于当前程序。
通过export命令，可以将普通变量升级为环境变量，环境变量就可以作用于整个操作系统内啦。

使用export命令直接修改PATH的值，配置MySQL进入环境变量的方法:

```shell
export PATH=/home/uusama/mysql/bin:$PATH
```
 
>生效时间：立即生效
生效期限：当前终端有效，窗口关闭后无效
生效范围：仅对当前用户有效
配置的环境变量中不要忘了加上原来的配置，即$PATH部分，避免覆盖原来配置

**$PATH变量**

我们在命令行下运行某个命令的时候，这个命令往往不在当前目录下，那os怎么知道去哪找这个命令呢，总不能搜索所有目录吧。

`$PATH`变量就是用于保存搜索目录的变量，如果输入的命令不在当前目录下，那么os就会读取`$PATH`变量对应的目录，依次从目录中寻找命令，如果`$PATH`变量对应的目录中也没有找到命令，那就说明真的没有这个命令啦

我们可以将常用的命令保存在`$PATH`变量中，这样就不需要进入特定的目录啦，但是注意不要覆盖系统原有的变量，否则一些系统命令就执行不了啦，比如cd命令。

所以我们一般选择在原有的`$PATH`上追加上我们的新环境变量。

### 方法二：`vim /etc/profile`

不写入文件的变量或环境变量在注销shell之后就会失效，如果想要变量一直保留，就要写入配置文件
`/etc/profile`是系统的变量配置文件，被所有用户共享。

```shell
# 如果/etc/profile文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/profile

vim /etc/profile

# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin

```

source或.使配置文件立即生效

由于变量配置文件只会在shell启动的时候读取一次，所以如果不想退出当前shell的话，要用source或.命令主动读取配置文件并生效。

```shell
source /etc/profile
```

> 生效时间：新开终端生效，或者手动source /etc/profile生效
生效期限：永久有效
生效范围：对所有用户有效

### 方法三：`vim ~/.bashrc`

通过修改用户目录下的`~/.bashrc`文件进行配置：

```shell
vim ~/.bashrc
# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

>生效时间：使用相同的用户打开新的终端时生效，或者手动`source ~/.bashrc`生效
生效期限：永久有效
生效范围：仅对当前用户有效
如果有后续的环境变量加载文件覆盖了PATH定义，则可能不生效

### 方法四：`vim ~/.bash_profile`

和修改`~/.bashrc`文件类似，也是要在文件最后加上新的路径即可：

```shell
vim ~/.bash_profile
# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

>生效时间：使用相同的用户打开新的终端时生效，或者手动`source ~/.bash_profile`生效
生效期限：永久有效
生效范围：仅对当前用户有效
如果没有`/.bash_profile`文件，则可以编辑`/.profile`文件或者新建一个

### 方法五：`vim /etc/bashrc`

该方法是修改系统配置，需要管理员权限（如root）或者对该文件的写入权限：

如果`/etc/bashrc`文件不可编辑，需要修改为可编辑

```shell
chmod -v u+w /etc/bashrc vim /etc/bashrc
# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

>生效时间：新开终端生效，或者手动`source /etc/bashrc`生效
生效期限：永久有效
生效范围：对所有用户有效

### 方法六：`vim /etc/environment`

该方法是修改系统环境配置文件，需要管理员权限或者对该文件的写入权限：

如果`/etc/bashrc`文件不可编辑，需要修改为可编辑

```shell
chmod -v u+w /etc/environmentvim /etc/profile
# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

>生效时间：新开终端生效，或者手动`source /etc/environment`生效
生效期限：永久有效
生效范围：对所有用户有效