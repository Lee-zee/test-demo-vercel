---
title: 你不知道的javascript-对象
date: 2023-12-21 10:13:40
tags:
  - 读书笔记
categories:
  - 读书笔记
cover: https://bu.dusays.com/2023/12/19/6581510674877.png
---


# 对象

## 语法

对象的定义, 有两种形式:

- 声明形式

``` javascript
var obj = {
  key: 'value'
}
```

- 构造形式

``` javascript
var obj = new Object()
obj.key = 'value'
```

## 类型

> `JavaScript` 中一共有 `6` 种基本类型(语言类型)

- string
- number
- **object**
- boolean
- null
- undefined

对象就是其中的一种, 我们可以使用 `typeof` 语句来判断某变量属于什么类型

``` javascript
typeof 'str'     // < "string"
typeof 1         // < "number"
typeof true      // < "boolean"
typeof undefined // < "undefined"

typeof {}        // < "object"
typeof []        // < "object"
typeof null      // < "object"

typeof function(){}  // < "function"
```

> 原来数组也是对象

我们经常会遇到判断某个变量是 数组还是对象, 这让我们自然而然觉得数组应该是一种基本类型;

我们可以由 `typeof []` 的返回值看出, 实际上数组也是 `object` 类型, 它也具备一些额外的行为, 并且其组织方式比一般的对象要稍微复杂一些;

以下就是数组作为对象时所表现出的行为的铁证!

`[].length`

`[].map(...)`

``` javascript
[1, 2].length      // 2

[1, 2].map(...)

var a = [1, 2, 3]  // (3)[1, 2, 3]
a.bar = 4          // (4)[1, 2, 3, bar: 4]
a.bar              // 4
```

> 为什么 `null` 的类型也是 `object`?

`null` 有时会被当做对象, 这其实是语言本身的一个 `bug`, 不同的对象在底层都表示为二进制, `JavaScript` 中二进制前三位都为0的话, 会判断为 `object` 类型, `null` 的二进制表示全是 0, 自然前三位也是 0, 所以执行 `typeof` 时会返回 `object`

### 内置对象

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

他们实际上只是一些内置函数, 这些内置函数可以当做构造函数来使用, 如: `var str = new String('str')`

#### 文字形式和构造形式

我们在声明一个变量时, 通常是可以选择**文字形式**或**构造形式**声明的, 如下:

**文字形式**

``` javascript
var str = 'str'     // type = "string"
var boolean = true  // type = "boolean"
var num = 1         // type = "number"
var obj = {}        // type = "object"
var arr = []        // type = "object"
```

**构造形式**

``` javascript
var str = new String('str')     // type = "object"
var boolean = new Boolean(true) // type = "object"
var number = new Number(1)      // type = "object"
var obj = new Object({})        // type = "object"
var arr = new Array(1, 2)       // type = "object"
```

我们可以看到, **文字形式** 声明的 字符串, 布尔值, 数值, 他们都对应的是自己的基础类型, 这些类型只是普通的**字面量**, 他们是不具备任何方法的;

> 但事实上, 我么可以通过 `'str'.length` 的方式, 访问到该字符串的长度, 这是为什么?

这是因为, 引擎会自动把字符串字面量转换成一个 `String` 对象, 所以我们才可以访问字符串的属性和方法, 同样, 布尔值和数值也是.

**总的来说:**
- String, Boolean, Number 的**文字形式**, 会被引擎自动转换为**构造形式**的对象
- null, undefined 没有对应的**构造形式**, 它们只有**文字形式**
- Date 只有**构造形式**
- Object, Array, Function, RegExp, 无论使用**文字形式**还是**构造形式**, 它们都是对象, 不是字面量

## 对象的内容

> 对象的内容是由一些存储在特定命名位置的值(任意类型)组成的, 我们称之为属性;

> 当我们说内容的时候, 似乎暗示它们是存储在对象内部的, 但实际上存储在对象容器内部的只有这些**属性的名称**, 这些名称就是**指针**, 指向值真正存储的位置

对对象属性的访问, 有两种形式:

`var obj = { a: 1 }`

- 属性访问: `obj.a`
- 键访问: `obj['a']`

### [[GET]] [[PUT]]

> `[[GET]]` 和 `[[PUT]]` 都是语言自身已经实现了的方法

- `[[GET]]`
当我们访问对象时(`obj.name`), 会调用类似 `[[GET]]()` 的方法, 引擎首先会在对象内部查找名称相同的属性, 如果找到就会立刻返回, 没找到就会继续在对象的 `[[Prototype]]`链 中查找, 如果还没找到, 就会返回 `undefined`

- `[[PUT]]`
该方法会在编辑对象属性的时候被触发(`obj.name = 'muzi'`), 该方法比想象中要复杂的多, 被触发后主要执行以下操作:
  - 属性是否是访问**描述符**(❓后面会讲到什么是描述符)? 如果是并存在 `setter`, 即调用 `setter`
  - 属性的数据描述符中 `writable` 是否为 `false`? 如果是, 在非严格模式下静默失败, 严格模式下抛出 `TypeError` 异常
  - 如果都不是, 将该值设置为属性的值

### 可计算的属性名

> 可以在文字形式中使用 [] 包裹一个表达式来当作属性名:

``` javascript
var prefix = 'foo'

var obj = {
  foobar: 1,
  foobaz: 2
}

obj[prefix + 'bar']  // 1
obj[prefix + 'baz']  // 2
```

> ES6 增加了*可计算属性名*:

``` javascript
const prefix = 'foo'

const obj = {
  [`${prefix}bar`]: 1,
  [`${prefix}baz`]: 2
}

obj.foobar     // < 1
obj['foobar']  // < 1
obj['foobaz']  // < 2
```

### 浅拷贝和深拷贝

#### 浅拷贝

JavaScript 引擎为了避免一次性复制过大的**对象副本**, 在对**对象**进行赋值时, 只是`引用`了目标对象的内存地址, 并没有创建全新的副本

``` javascript
var foo = {
    name: 'muzi'
}

var bar = { foo: foo }

bar.foo.name = 'yaya'
console.log(foo.name)  // yaya

foo.name = 'dundun'
console.log(bar.foo.name)  // dundun
```

无论你通过何种途径去修改 原始对象 `foo` 中的属性值, 操作都将同步到原始对象以及引用该对象的变量上.

##### Object.assign(...)

> `assign` 英文释义: vt. 赋值

ES6 定义了 `Object.assign` 方法来实现浅拷贝, 该方法的第一个参数是**目标对象**, 之后可以跟多个源对象;

它会遍历一个或多个源对象的所有**可枚举**的自有键, 并把它们复制 *(使用 = 操作符赋值)* 到目标对象, 最后返回目标对象;

仔细看以下案例:

``` javascript
var foo = {
    name: 'muzi',
    info: {
        age: 25,
        local: 'cq'
    }
}

var bar = Object.assign({}, foo)
bar.name = 'yaya'
bar.info.local = 'bj'

console.log(bar.name)  // yaya
console.log(foo.name)  // muzi

console.log(bar.info.local)  // bj
console.log(foo.info.local)  // bj
```

- 脚本首先会遍历 `foo` 对象中所有可枚举的属性
- 将 `foo.name` 赋值给 `bar`, 这是一个普通的**字面量赋值**, 所以脚本会为 `bar` 创建一个全新的属性
- 将 `foo.info` 赋值给 `bar`, 这是一个对象赋值, 所以 `bar` 只是引用了 `foo.info` 对象

> `Object.assign` 的行为:

``` javascript
var foo = {
    info: {
        name: 'muzi',
        age: 25
    }
}

var bar = {
    id: '123',
    info: {
        name: 'yaya',
        age: 29
    }
}

var baz = Object.assign({
    info: {
        name: 'dundun',
        age: 2,
        local: 'cq',
        attr: 'dog'
    }
}, foo, bar)

console.log(baz)  // { id: '123', info: { name: 'yaya', age: 29 } }
```

- `Object.assign` 会以最后一个**源对象**为最优先赋值
- 最后一个**源对象**会完全替换之前对象已有的属性, 保留没有的属性

#### 深拷贝

但是这对于普通字面量的值就不同了, 新的对象会完全拷贝旧对象中的值, 作为一个新的属性存在, 如下:

``` javascript
var name = 'muzi'

var person = {
  name: name,
  age: 25
}

person.name = 'yaya'
console.log(name)  // muzi
console.log(person.name)  // yaya
```

> 由此我们能得到一个巧妙的`深拷贝`的方法:

``` javascript
var num = 1

var foo = {
    name: 'muzi'
}

var bar = {
    foo: JSON.parse(JSON.stringify(foo))
}

bar.foo.name = 'yaya'
console.log(bar.foo.name)  // yaya
console.log(foo.name)      // muzi
```

我们将原始对象转换成一个`JSON 字符串`, 再将该字符串解析成一个结构与原始对象一模一样的对象, 完成了`深拷贝`

### 属性描述符

> 从 ES5 开始, JavaScript 提供了可以直接检测或设置属性特性的方法, 比如判断属性是否可读

#### 描述符的三个特性

- `writable`
可写, 决定是否可以修改属性的值
- `enumberable`
可枚举, 决定属性能否被枚举, 如果为 false, 则在 `for...in` 循环中不会枚举出该属性
- `configurable`
  - 可配置, 该值为 `true` 时, 才能使用 `Object.defineProperty` 进行修改
  - 如果该值为 `false`, 不仅不能修改其描述, 也不能删除这个属性
  - 需要注意的是, 把 `configurable` 修改成 false 是单向操作, 无法撤销!

#### 描述符方法

- Object.**getOwnPropertyDescriptor**(obj = `Object`, property = `String`)
返回目标对象属性的所有特性

``` javascript
var obj = { name: 'muzi' }
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))

// {
//     value: 'muzi',      # 值
//     writable: true,     # 可写
//     enumerable: true,   # 可枚举
//     configurable: true  # 可配置
// }
```

- Object.**defineProperty**(obj = `Object`, property = `String`, descriptor = `Object`)
用于定义一个新属性, 或者修改一个已有属性的值或特性(如果它的 configurable 为 true 的话)

``` javascript
var obj = { name: 'muzi' }

Object.defineProperty(obj, 'name', {
  value: 'yaya',
  writable: false  // 不可写
})

obj.name = 'dundun'
console.log(obj.name)  // yaya
```

``` javascript
var obj = { name: 'muzi' }

Object.defineProperty(obj, 'age', {
  value: 25,
  writable: true,
  enumerable: false  // 不可枚举
})

console.log(obj.age)  // 25

for (var key in obj) {
  console.log(key)  // name
}
```

- Object.**defineProperties**(obj = `Object`, descriptors = `Object`)
用于定义或修改某个对象多个属性

``` javascript
var obj = { name: 'muzi' }
Object.defineProperties(obj, {
  // 修改 name 属性
  name: {
    value: 'yaya',
    enumerable: false
  },
  // 新增 age 属性
  age: {
    value: 25,
    writable: false
  }
})

console.log(obj.name) // yaya
console.log(obj.age)  // 25
```

#### getter setter 和 双向绑定

##### getter setter

> `getter` 和 `setter` 是两个隐藏函数, 分别在**获取属性**和**设置属性**时被调用

``` javascript
var obj = {}

Object.defineProperty(obj, 'name', {
  get() {
    console.log('execute getter')
    return this._name_ || 'muzi'
  },
  set(newVal) {
    console.log('execute setter')
    this._name_ = newVal
  }
})

> obj.name
< "execute getter"
< "muzi"
> obj.name = 'yaya'
< "execute setter"
< "yaya"
```

`get` 和 `set` 函数, 能够在访问或设置对象属性时, 进行拦截, 这意味着我们可以在这个过程中做很多事, 比如可以在设置属性值的时候进行运算:

``` javascript
var obj = {}
Object.defineProperty(obj, 'name', {
    get() {
        return this._name_ || 'Tom Jack'
    },
    set(newVal) {
        var firstName = 'Tom'
        this._name_ = firstName + ' ' + newVal
    }
})

obj.name = 'Hannibal'
console.log(obj.name) // Tom Hannibal
```

##### 双向绑定

这里简单提一下 `MVVM`, 它是 `Model-View-ViewModel` 的缩写, 这种模式将 `Model`(数据) 和 `View`(前端显示) 最大限度的分离, 而 `ViewModel`(双向绑定) 则负责将两者关联起来.

看以下示例:

``` html
<body>
  <p id="el"></p>
  <input id="model" type="text" placeholder="type your name." />
</body>
```

``` javascript
var doc = document
var el = doc.getElementById('el')
var model = doc.getElementById('model')

// 双向绑定
var data = {}
Object.defineProperty(data, 'name', {
  get() {
    console.log('execute getter.')
    return this._name_
  },
  set(newVal) {
    console.log('execute getter')

    el.textContent = newVal
    model.value = newVal

    this._name_ = newVal
  }
})
```

我们在浏览器中打开这个页面, 在控制台输入: `data.name = 'muzi'`, 我们会发现, 对应在页面中的 `Dom` 元素也发生了变化 *(数据驱动)*,

如果我们想在用户输入的过程中, 将 `Dom` 的内容与输入内容同步怎么办?

道理很简单, 之所以 `data.name = 'muzi'` 能让 `Dom` 响应式变化, 是因为这是一个赋值操作, 赋值的过程被 `setter` 拦截并赋予了新的行为,

那么, 我们监听 `<input />` 元素每一次的 `keyup` 事件, 并在事件回调中触发 `setter` 不就行了么?

``` javascript
model.addEventListener('keyup', function() {
  data.name = this.value
})
```

打开页面, 在输入框中输入内容, 你会发现 `Dom` 与输入框是完全同步的, `双向绑定` 就是这么简单!

### 不变性

> 所谓不变性, 是指我们希望对象中的某一属性能够真正的做到不可篡改(常量)

以下"锁定🔐"属性的方法, 对于**字面量**来说, 可以做到完全不可篡改, 但对于**对象(包括数组, 函数等)属性**, 其内部内容是不受影响的,

例如我们知道 `ES6` 中的 `const` 已经能够为我们创建**常量**了.

对于**字面量**, 一旦创建, 就不可更改, 否则会抛出错误.

``` javascript
const name = 'muzi'
name = 'yaya'
// < TypeError: Assignment to constant variable
```

而对于**对象**, 我们仍然可以改变其内部的属性.

``` javascript
const arr = []
arr[0] = 1
// < 1
```

接下来, 我们进入正题.

#### 1.对象常量

- `writable: false` 和 `configurable: false`
  - 🚫禁止编辑现有属性
  - 🚫禁止重新配置属性
  - 🚫禁止删除任何现有属性

``` javascript
var obj = {}
Object.defineProperty(obj, 'NAME', {
    value: 'muzi',
    writable: false,
    configurable: false,
})

// console
> obj.NAME = 'yaya'
< 'yaya'
> obj.NAME
< 'muzi'

> delete obj.NAME
< false

> Object.defineProperty(obj, 'NAME', { writable: true })
< TypeError: Cannot redefine property: NAME
```

#### 2.禁止扩展

- Object.**preventExtensions**(obj = `Object`)
  - 🚫禁止一个对象添加新属性
  - ✅可编辑现有属性
  - ✅可删除现有属性

``` javascript
var obj = {
  name: 'muzi'
}

Object.preventExtensions(obj)

obj.name = 'yaya'
obj.age = 28

console.log(obj)  // { name: 'yaya' }
```

注意, 在**严格模式**下, 添加新属性会抛出 `TypeError` 错误.

#### 3.密封

- Object.**seal**(obj = `Object`)
  - 🚫禁止一个对象添加新属性
  - 🚫禁止重新配置任何现有属性
  - 🚫禁止删除任何现有属性
  - ✅可编辑现有属性

与以下代码等同:

``` javascript
var obj = {
  name: 'muzi'
}

Object.preventExtensions(obj)
for (var key in obj) {
  Object.defineProperty(obj, key, {
    configurable: false,
  })
}
```

#### 4.冻结

- Object.**freeze**(obj = `Object`)
  - 🚫禁止一个对象添加新属性
  - 🚫禁止编辑任何现有属性
  - 🚫禁止重新配置任何现有属性
  - 🚫禁止删除任何现有属性

这个方法是最高级别的不可变性, 前面我们讨论过, 这个对象引用的其他对象是不受影响的.

与以下代码等同:

``` javascript
var obj = {
  name: 'muzi'
}

Object.preventExtensions(obj)
for (var key in obj) {
  Object.defineProperty(obj, key, {
    writable: false,
    configurable: false,
  })
}
```

### 存在性

> 我们可以通过一些方法, 在不访问属性值的情况下, 判断对象中是否存在这个属性

#### 判断属性是否存在

- `in` 操作符会检查属性是否在对象及其 `[[Prototype]]` 对象中

``` javascript
var obj = {
  name: 'muzi'
}
obj.__proto__.age = 25

// console
> ("name") in obj
< true
> ("age") in obj
< true
```

> 还记得我们说过, 数组也是对象么? 所以 `in` 操作符同样能够在数组上使用:

``` javascript
var arr = [1, 2, 3]

// console
> ("0") in arr
< true
> ("3") in arr
< false
```

- `[obj]`**hasOwnProperty** 只会检查属性是否在对象中, 不会检查 `[[Prototype]]` 链 *(从英文语义就能看出, 是否具有自身属性)*

``` javascript
var obj = {
  name: 'muzi'
}
obj.__proto__.age = 25

// console
> obj.hasOwnProperty('name')
< true
> obj.hasOwnProperty('age')
< false
```

#### 枚举

- `[obj]`propertyIsEnumerable(property = `String`) 检查给定属性是否直接存在在对象中(而不是原型链), 并且满足 `enumerable: true`

- 枚举属性, 这两个方法只会查找对象直接包含的属性(而不是原型链)
  - Object.**keys**(obj = `Object`) 返回一个包含所有**可枚举属性**的 `key`
  - Object.**getOwnPropertyNames**(obj = `Object`) 返回一个包含所有属性 `key` 的数组, 无论他们是否可枚举

``` javascript
var obj = {}
Object.defineProperties(obj, {
    name: {
        value: 'muzi',
        enumerable: false,
    },
    age: {
        value: 25,
        enumerable: true,
    }
})

obj.__proto__.loc = 'cq'

console.log(Object.keys(obj))                   // (1)["age"]
console.log(Object.getOwnPropertyNames(obj))    // (2)["name", "age"]
```

### for...of

ES6 中新增了 `for...of` 方法, 该方法能帮助我们更快的循环数组, 但我们只知道它能循环数组, 如果说身为对象的数组能够被 `for...of` 循环, 那么对象也当然可以, 如何实现? 我们先从 `iterator` 对象说起.

#### 数组的 [Symbol.iterator] 迭代器

数组内置了一个 `Symbol.iterator` 方法, 我们可以通过查看数组的**原型链**来找到该方法, 我们可以使用该方法来手动调用数组, 看看它是怎么工作的:

``` javascript
var arr = [1, 2, 3]
var it = arr[Symbol.iterator]()

// console
> it.next()
< { value: 1, done: false }
> it.next()
< { value: 2, done: false }
> it.next()
< { value: 3, done: false }
> it.next()
< { value: undefined, done: true }
```

当数组中的所有值遍历完毕, 再执行 `it.next()` 就会返回 `done: true`.

`for...of` 方法, 事实上就是调用 `iterator` 迭代器对象的 `next()` 的方法来遍历所有的值, 直到 `done` 属性返回 `true`, 便停止遍历

#### 对象的迭代器

和数组不同, 普通的对象没有内置**迭代器**, 传统对对象遍历的方法只能取出对象的 `key`(枚举), 要访问对象的值, 我们必须手动调用 `key` *(obj[key])* 来访问,

利用 `for...of` 我们可以手动为对象定义一个迭代器, 这样我们就可以遍历对象并直接访问对象的值了:

``` javascript
var obj = {
  name: 'muzi',
  age: 25
}

Object.defineProperty(obj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this
        var idx = 0
        var ks = Object.keys(o)
        return {
            next() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length),
                }
            }
        }
    }
})

for (var value of obj) {
    console.log(value)
}
// "muzi"
// 25
```

## 小结

> 声明和内置对象

对象或其他类型的变量声明, 分为 **文字形式**(`var obj = {}`) 和 **构造形式**(`var obj = new Object()`),

两种声明产生的效果是完全相同的, 唯一不同的是, `string`, `number`, `boolean` 类型使用 **文字形式** 声明后, `typeof` 进行检查时会发现他们一一对应自己的类型,

但 `JavaScript` 引擎在编译时会将他们自动转换为 **构造形式** 声明, 生成一个对象; 所以这些变量都具备自己的方法.

> 浅拷贝, 深拷贝

`JavaScript` 引擎为避免一次性复制过大的**对象副本**, 对对象赋值时, 只是 `引用` 了目标对象的内存地址, 并没有创建全新的副本, 这叫做 **浅拷贝**;

`Object.assign` 是 ES6 新增的 **浅拷贝** 的方法;

相反, 当 `JavaScript` 在拷贝一个普通的字面量时, 它会为其创建一个全新的副本,

所以, 我们可以通过将原始对象转换成一个 `JSON 字符串`, 再将该字符串解析成一个结构与原始对象一摸一样的对象的方法, 来实现 `深拷贝`.

> 属性描述符

**属性描述符**能够设置对象**属性**的特性 *(可枚举, 可写, 可配置)* 以及值, 甚至我们可以通过 `getter setter` 来实现 `MVVM` 模式的 **双向绑定**.

**属性描述符**中也有许多方法, 能够帮助我们创建一个真正不可变的**常量属性**.

我么学习了如何使用 `Object.defineProperty` 方法, 为普通对象创建 `iterator` 接口, 使普通对象也能被 `for...of` 遍历.