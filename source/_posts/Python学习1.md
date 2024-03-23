---
title: Python学习1
date: 2023-12-22 17:05:13
tags:
  -  python
cover: https://bu.dusays.com/2023/12/22/6585a5ccdff04.webp
---


# Python——列表、元组、字典、条件、循环、输入、函数

## 列表

### 列表基础

```python
#创建列表
friends = ['ah','leao','zhang','wang']
print(friends)

#访问列表元素
print(friends[0])#索引从0开始
print(friends[-1])#反向索引从-1开始

#修改列表元素
friends[0] = 'ahchan'

#添加与删除列表元素
friends.append('zhou')#在末尾添加
friends.insert(1,'cos0')#在指定索引位置添加

del friends[1]#使用del删除指定位置的元素
popped_friends = friends.pop(1)#使用pop”弹出“指定位置的元素
print(friends)
print(popped_friends)

friends.remove('zhou')#根据值删除元素

#组织列表
friends.sort()#按首字母排序,永久性的
print(friends)
friends.sort(reverse=True)#可以传入reverse参数使其逆序
print(friends)

print(sorted(friends))#临时按首字母排序

friends.reverse()#reverse只是反转列表元素的排列顺序
print(friends)

print(len(friends))#使用len()确定列表有多少元素
```

### 列表操作

```python
members = ['krau','ah','hanmiao']
#for循环遍历列表
for member in members: #for循环将把members中的元素依次与member关联，并都执行下面的操作
    print(member)
    print(f'{member.title()},welcome to yuzunion!')#title()将首字母大写


#range()生成数字序列
for i in range(1,10):
    print(i)
#这个循环将会依次打印1-9，因为range是在10停止的，不包括10

#使用range()创建数字列表
nums_list_1to10 = list(range(1,10))
print(nums_list_1to10)

#range()指定步长（公差）
nums_list_1to10_2 = list(range(1,10,2))#第三个数字指定了步长，即每次加2
print(nums_list_1to10_2)

#for与range结合，可以生成各种数列。如下是整数1~10的平方
nums_list_1to100 = []
for num in range(1,11):
    nums_list_1to100.append(num**2)#**表示乘方运算
print(nums_list_1to100)

#数字列表简单统计运算，以上面的nums_list_1to100为例
print(min(nums_list_1to100))#最小值
print(max(nums_list_1to100))#最大值
print(sum(nums_list_1to100))#求和

#列表解析，一种一行代码生成列表的方法（其实就是合并起来写）
list_analysis = [value**2 for value in range(1,11)]
print(list_analysis)
#这种语法的使用方法是
# 列表名 = [表达式 for 变量 in 数列]

#切片，圈定列表某一部分
phones = ['pixel3','mix4','k20p','pixel2','honor8']
print(phones[0:3])#输出包含索引为0，1，2的元素的’子列表‘
print(phones[:3])#不指定第一个索引会自动从0开始
print(phones[1:])#不指定第二个索引会自动到最后
print(phones[:])#都不指定就是从头到尾，可利用此创建列表的副本
phones_copy = phones[:]
print(phones_copy)
#这和直接把phones赋值给phones_copy是不一样的，若直接赋值，实际上只是给同一个列表关联了两个变量名字，当修改列表时，这两个变量都会同步修改
#例如，给phones添加一个元素
phones.append('readmi')
#然后看看phones和phones_copy这两个列表现在是什么样的
print('phones列表',phones)
print('phones_copy列表',phones_copy)
#但如果直接赋值将是下面的效果
my_phones = phones
phones.append('oppo')
print(phones)
print('可以看到即使是对phones进行修改，my_phones也将输出和phones一样的列表',my_phones)


#遍历切片
for phone in phones[0:3]:
    print(phone.title())


#元组，不能变的列表
#创建元组，使用圆括号
dimensions = (10,20)
print(dimensions[0])
print(dimensions[1])

#元组中的数据是不能被修改的，如果尝试修改将会报错，以下被注释的代码将会报错
# dimensions[0] = 20
#但是可以重新定义元组来修改元组的值
l = 20
w = 10
dimensions = (l,w)#重新定义元组是合法的
print(dimensions)
#但即使改变元组中存储的变量的值，元组也不会改变
l = 500
w = 200
print(dimensions)#可以看到元组还是没变

#如果需要创建只有一个元素的元组，也需要带上逗号，因为元组使用逗号来标识
onlyonetuple = (1,)

#遍历元组，和遍历列表没有什么区别
```

## 条件语句——if

```python
#判断两个值是否相等，用==（两个等号），相等时返回True，否则返回False
wife = 'Miku'
print(wife =='Miku')
# == 判断是大小写敏感的
print(wife == 'miku')#将会输出False
#如果不希望大小写影响判断，可以在判断时都转换为小写
print(wife.lower()=='miku')#lower()不会直接修改变量的值，只是读取变量的值并将其小写再进行后续操作
#若要都大写可使用.upper()方法

#判断是否不相等，使用!=。!常常是表示‘非’的
print(wife != 'Miku')

#判断多条件
#and 和，都为True时返回True
age_0 = 16
age_1 = 14
print(age_0 > 15 and age_1 <=15)
#or 或，至少有一个真就返回真
print(age_0 == 15 or age_1 > 12)

#in检查特定值是否在列表中，如果在，返回True
waifus = ['miku','ayanami','sakira']
print('sakira' in waifus)
#not in检查特定值是否不在列表中，如果不在，将返回Ture
print('miku' not in waifus)

#布尔表达式，如下
Miku_is_my_wife = True
Krau_love_miku = True

#if-else语句
if 'miku' in waifus:
    print('miku is my wife')
else:
    print('miku is also my wife')
#if-elif-else语句，判断多种条件之一
if wife == waifus[0]:
    print(f'{waifus[0]} is my wife!'.title())#此处f'{}'可以在字符串中输出变量的值
elif wife == waifus[1]:
    print(f'{waifus[1]} is my wife!'.title())
elif wife == waifus[2]:
    print(f'{waifus[2]} is my wife!'.title())#elif可以是多个
else:
    print('you are all my wife'.title())
#else是可以省略不写的，如果省略，程序会在所有条件都不符合时不进行任何操作
#if-elif-else结构一旦遇到为真的条件时将会执行对应的代码块，之后跳过整个结构，即使之后还有为真的条件
#如果你不想让它这样，那不妨多写几个if
```

## 字典

```python
#创建字典，使用花括号{}
human_1 = {'color':'yellow','height':175}# 用 : 关联两个值，即键值对
print(human_1['color'])
print(human_1['height'])#通过 键 查找 值 ，就是“字典”的含义

#向字典中添加键值对
human_1['weight'] = 65 #直接 字典[新键]=值，即可把新的键值对添加到字典末尾
print(human_1)
#修改字典中的值也是类似的
human_1['height'] = 180

#字典可以包含任意数量的键值对，包括空字典
human_2 = {}

#删除键值对
#与列表类似，可使用del
del human_1['color']
print(human_1)

#字典的格式可以是多行，这会让代码更加美观，尤其是字典内容很多的时候
human_2 = {
    'height':177,
    'weight':68,
    'age':18,
    'gender':'male',
}

#使用get()访问字典，避免引发错误
#当要访问的键值对在字典中不存在时，使用方括号访问便会引发错误。
#可以使用get()，使之返回一个默认值，避免错误
print(human_2.get('color','不存在该值'))
#当color在字典中不存在时，将会输出“不存在该值”，如果不给出get()的第二个参数，将会返回None
#遍历字典
#遍历键值对
for key,value in human_2.items(): #item()方法用于返回一个键值对列表
    print(key)
    print(value)#可以看到，字典中的每个键和值分别 依次赋给了key和value，当然这两个变量是可以随意命名的

#遍历所有键，使用keys()方法
for key in human_2.keys():
    print(key)
#实际上，默认遍历时便是只遍历所有键，但最好加上keys方法，便于阅读
#keys()方法返回的是一个包含所有键的列表，正如题item()方法返回的是一个包含所有键值对的列表

#遍历所有值，使用values()方法
for value in human_2.values():
    print(value)

#使用特定顺序遍历列表
#比如可以使用sorted()方法，按照字母顺序遍历
for key in sorted(human_2.keys()):
    print(key)


#当字典中的值出现重复时候，可以使用集合剔除重复项
humangender = {
    'krau':'me',
    'ah':'he',
    'xiaolv':'she',
    'hanmiao':'he',
}
#可以看到这个字典中两个值都是he，可以使用set()方法创建一个集合，集合中的元素都是独一无二的
for gender in set(humangender.values()):
    print(gender)

#集合，也使用花括号创建，但存储的不是键值对
langs = {'c','py','go'}
print(langs)


#嵌套
#在列表中嵌套字典
humans = [human_1,human_2]
print(humans)
#同样的，可以在字典中嵌套列表，在字典中嵌套字典......
```

## 用户输入与while循环

```python
#用户输入，使用inpu()函数

name = input('请输入你的名字： ')
print(f'hello {name}')

#判断一个数是奇数还是偶数
num = int(input('请输入一个数：　'))#int()用于将字符串转化为整数
if num % 2 == 0: #%是求模运算，即返回两个数相除的余数
    print(f'{num}是偶数')
else:
    print(f'{num}是奇数')

#while循环
#示例，使用while循环让用户控制程序何时结束
print('我是复读机，输入quit以退出程序')
msg = ''
while msg != 'quit':
    msg = input('请输入：')
    if msg != 'quit':
        print(msg)
    else:
        pass

#使用标志，清晰地控制程序运行
print('我是复读机二号')
msg = ''
status0 = True #这里的status0是为了方便控制循环运行的，便被称为标志
while status0:
    msg = input('请输入： ')
    if msg == 'quit':
        status0 = False
    else:
        print(msg)

#使用break退出循环
print('我是复读机三号')
msg = ''
while True:
    msg = input('请您输入： ')
    if msg == 'quit':
        break
    else:
        print(msg)

#使用continue从头开始循环
#输出所有偶数
num0 = 0
while num0 < 10:
    num0 += 1
    if num0 % 2 != 0:
        continue #与break不同的是，它会使循环返回第一行重新执行（从num0+=1）
    print(num0)
```

## 函数

```python
#定义函数，使用def，最简单的一个例子如下
def hello():
    #输出问候语
    print('Hello!')

hello()

#向函数传递参数
def hello(username):
    print(f'Hello,{username.title()}!')
#在这里，username被称为形参，而下面传入的’krau’就称为实参
hello('krau')


#传递实参
#位置实参，按实参的顺序传递给形参
def human_info(name,height,weight,gender):
    #显示一个人的信息
    print(f'''
My name is {name.title()}
My height is {height},and weight is {weight}
Im a {gender}''')

human_info('krau','178','65','male')
#可以看到实参按照顺序依次传递给了形参

#关键字实参，按照名称传递实参
human_info(height='178',name='krau',gender='male',weight='65')


#给参数确定默认值
def pet_info(pet_name,pet_animal='cat'):
    #显示宠物信息
    print(f'{pet_name.title()} is my pet , it is a {pet_animal}')

#若不给出pet_animal，则会使用默认值cat
pet_info('ah')
#也可以给默认值为空字符串，即''，这样做的话，这个参数将变成可选的


#返回值，函数处理数据并返回的值
#让函数返回值，使用return
def name_format(first_name,last_name):
    #返回格式化好的姓名
    full_name = f'{first_name} {last_name}'
    return full_name.title()

print(name_format('acher','krau'))
#这里只是一个示例，所以未免有些脱裤子放屁

#函数可以返回任意类型的值，比如返回字典
def build_human(name,age):
    person = {'name':name,'age':age}
    return person
me = build_human('krau',18)
print(me)


#传递列表
def yuzu_hello(names):
    for name in names:
        print(f'Hello,{name.title()}!')

members = ['krau','ah','hanmiao']
yuzu_hello(members)

#当需要处理一个列表，但不想让函数对列表产生影响时，可以传入列表的副本
yuzu_hello(members[:])


#传递任意数量的实参，不需首先指定多少形参
def do_math1(*derivatives):
    #什么都导不出来
    for derivative in derivatives:
        print(f'{derivative} 导不出来')

do_math1('lnx','2x','ex')
#可以看到，*derivatives创建了一个名为derivatives的元组，传入的实参都存入其中

'''
如果要让函数接受不同类型的实参，必须在函数定义中将接纳任意 数量实参的形参放在最后。
Python先匹配位置实参和关键字实参， 再将余下的实参都收集到最后一个形参中。
'''
def do_math2(diffculity,*integrals):
    #什么都积不回去
    for integral in integrals:
        print(f'{integral}积不回去，因为它的难度是{diffculity}')

#Python先匹配位置实参和关键字实参， 再将余下的实参都收集到最后一个形参中。
do_math2('easy','fx','gx','hx')

#使用任意数量的关键字实参
#有时候，需要接受任意数量的实参，但预先不知道传递给函数的会是什么样的信息。
#可以使用字典中的键值对解决这一问题
def build_profile(first,last,**user_info):
    '''创建一个包含用户所有信息的字典'''
    user_info['first_name'] = first
    user_info['last_name'] = last
    return user_info

krau_info = build_profile('acher','krau',age=18,gender='male')
print(krau_info)
#可以看到**user_info使python创建了一个名为user_info的字典，age和gender都存入了其中

'''
注意 你经常会看到形参名**kwargs 
它常常用于收集任意数量的关键字实参。
'''
```

## 模块

将函数存储在独立文件中，称其为模块。 要创建一个模块，首先创建.py文件，在.py中仅编写函数，这便是一个模块。 然后在同级目录下的其他代码中，便可以使用import导入这个模块。 例如，我们创建一个greet.py文件，在文件中编写以下内容。

```python
def hello(name):
    print(f'Hello {name}!')

def nohello(name):
    print(f'Not good {name}')
```

然后，我们在同级目录下编写另一个.py文件

```python
import greet
greet.hello('krau')
```

Python读取这个文件时，代码行import greet让Python打开文件 greet.py，并将其中的所有函数都复制到这个程序中。 你看不到复制的代码，因为在这个程序即将运行时，Python在幕后复制了这些代码。 你只需知道，在现在这个文件中，可使用greet.py中定义的所有函数。 使用模块中的函数时，要指定模块名greet和函数名hello，并使用点分割 即 模块名.函数名()

上面的方法是导入了模块中的所有函数，如果不需要全部导入，可以使用下面的语句 from 模块名 import 函数名

如果要导入函数的名称可能与程序中现有的名称冲突，或者函数的名称太长，可指定简短而独一无二的别名 类似于外号。要给函数取这种特殊外号，需要在导入它时指定。 import 模块名 as 模块外号 from 模块名 import 函数名 as 函数外号

## 函数编写指南（规范）

编写函数需要牢记几个细节：

1.给函数指定描述性名称，只在其中使用小写字母和下划线。——模块命名也需要遵循此约定。

2.每个函数都应包含简要地阐述其功能的注释，该注释应紧跟在函数定义后面，并采用文档字符串格式。

3.给形参指定默认值时，等号两边不要有空格。——关键字实参也应遵循此约定。

4.PEP8建议代码行的长度不要超过79字符，这样编辑器窗口适中就能看到整行代码。如果形参定义的长度超过了79个字符，可在函数定义中输入左括号后按回车键，并在下一行按两次Tab键，从而将形参列表和只缩进一层的函数体区分开。

5.如果程序或模块包含多个函数，可使用两个空行将相邻的函数分开，这样便于阅读和查看函数的开始和结束的地方。

6.所有的import语句都应放在文件开头，唯一例外情形是，在文件开头使用了注释来描述整个程序。