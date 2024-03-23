---
title: front_matter相关配置
date: 2023-12-19 13:33:20
tags: 
  - 电脑
cover: https://bu.dusays.com/2023/12/19/6581445e848ca.png
---

## 1.打开注册表编辑器
**Win + R**，输入<code>regedit</code>

<img src="https://bu.dusays.com/2024/03/23/65fec0ce98453.png"/>

## 2. 修改注册表文件

1.找到以下路径：
<code>计算机\HKEY_CURRENT_USER\Software\Classes\CLSID\</code>

2.新建一个项目：
<code>86ca1aa0-34aa-4e8b-a509-50c905bae2a2</code>

<img src="https://bu.dusays.com/2024/03/23/65fec1b385673.png"/>

3.<code>{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}</code>上点击右键，在打开的菜单项中，选择新建名为<code>InprocServer32</code>的项

4.点击<code>InprocServer32</code>–>在默认名称上双击–>编辑字符串–>数值数据留空不填写–>直接点击确定保存.

<img src="https://bu.dusays.com/2024/03/23/65fec272ab4b2.png"/>

5.重启电脑即可生效。

<img src="https://bu.dusays.com/2024/03/23/65fec2e8bfa9f.png"/>

## 还原

如果想还原为Win11鼠标右键，只需要把 <code>InprocServer32</code>这一项删除。

