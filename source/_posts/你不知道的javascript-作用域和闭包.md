---
title: 你不知道的javascript-作用域和闭包
date: 2023-12-21 10:13:40
tags:
  - 读书笔记
categories:
  - 读书笔记
cover: https://bu.dusays.com/2023/12/19/6581510674877.png
---

# 作用域和闭包

## 作用域是什么?
> 一套设计好的规则来存储变量, 并在之后能够方便的找到这些变量, 这套规则被称之为作用域

### Javascript 引擎

`JavaScript` 在处理代码时, 会与以下三个角色进行协同工作:

- **JavaScript 引擎**
从头到尾负责整个 `JavaScript` 程序的编译以及**执行**过程

<br/>

- **编译器**
负责语法分析及代码生成, 每个程序源代码在 (引擎) 执行之前, 都会经历以下三个步骤:
    1. **分词/词法分析** (Tokenizing/Lexing)
    这个过程将由字符组成的字符串分解为(对编程语言来说)有意义的代码块, 这些代码块被称为**词法单元**. 如, `var a = 2;`, 将被分解为 `var、a、=、2、;`
    2. **语法分析** (Parsing)
    这个过程将 **词法单元流(数组)** 转换成一个由元素逐级嵌套组成的**抽象语法树** (AST, Abstract Syntax Tree)
    3. **代码生成**
    将 `AST` 转换为可执行的代码, 简单的说就是有某种方法可以将 `var a = 2` 的 `AST` 转换为一组**机器指令**, 用来创建一个叫做 `a` 的变量(包括分配内存), 并将一个值储存在 `a` 中.

<br/>

- **作用域**
负责收集并维护所有声明的标识符 *(变量)* 组成的一系列查询.

<br/>

``` javascript
var a = 2;
```

#### 引擎与编译器

上面这段代码，引擎会认为这是两个完全不同的声明, 一个 `var a` 由**编译器**在编译时处理, 一个 `a = 2` 由**引擎**在运行(执行)时处理:

- 编译器首先会将这段程序分解为 `词法单元`, 然后将词法单元解析成 `抽象语法树(AST)`;
- 编译过程中(三个步骤), 遇到 `var a`, 编译器会询问**作用域**是否已经有一个该名称的变量存在于同一个作用域的集合中, 有, 则忽略声明, 继续编译, 没有, 则声明一个新的变量 *(此时变量在执行代码之前已经存在, 这也是接下来要讲的**变量提升**的原理)*;
- 到编译的第三部(代码生成), 编译器为**引擎**生成了运行时所需的代码, 这些代码用来处理 `a = 2` 这个赋值操作; 引擎会询问**作用域**是否存在 `a` 变量, 如果存在, 则将值赋值给它, 否则抛出异常.

#### 引擎与作用域

我们知道, 当编译器完成了编译, 并返回给引擎代码后, 引擎需要协同作用域, 对生成的变量进行**查询**和**赋值**;

如果目的是对变量进行赋值, 引擎使用 `LHS` 查询;
如果目的是获取变量的值, 引擎使用 `RHS` 查询;

如, `var a = 2`, `var a` 会在编译过程中声明, `a = 2` 是赋值操作, 我们需要为 `= 2` 找到一个目标, 所以使用了 `LHS` 查询;

如, `console.log(a)`, 在这里我们向作用域询问 `a` 的值, 所以使用了 `RHS` 查询.


### 作用域嵌套
> 作用域是根据名称查找变量的一套规则, 实际情况中, 通常需要同时顾及几个作用域

``` javascript
function foo(a) {
    console.log(a + b)
}

var b = 2
foo(2) // 4
```

- `foo(2)` 传参的操作, 实际上为参数 `a` 进行了隐式的赋值操作 `a = 2`
- 变量 `a` 存在于 `foo` 的函数作用域中, 外部无法访问
- `foo` 函数中引用了 `b` 变量, 引擎会先尝试在 `foo` 函数作用域中查找(RHS)该变量, 如果找不到, 就会往上一级作用域查找, 以此类推, 直到找到为止, 而这里的 `b` 变量, 存在于 **全局作用域** 中.

根据以上示例, 我们可以把作用域比作一个建筑, 这个建筑代表程序中的嵌套作用域链, 第一层代表当前的执行作用域, 建筑的顶层代表全局作用域

LHS 和 RHS 引用都会在当前楼层进行查找, 如果没找到, 就会坐电梯上一层, 以此类推, 最后到达顶楼(全局作用域), 无论程序是否已经找到你所需的变量, 都为到此为止.

### 作用域的异常

#### ReferenceError

`ReferenceError` 同作用域判别失败相关

``` javascript
> const a = 1
> b

< Uncaught ReferenceError: b is not defined
```

#### TypeError

`TypeError` 则代表作用域判别成功了, 但是对结果的操作是非法或不合理的:
- 引用 null 或 undefined 类型值中的属性
``` javascript
> null.a
< Uncaught TypeError: Cannot read property 'a' of null
```
- 对一个非函数类型的值进行函数调用
``` javascript
> const a = 1
> a()
< Uncaught TypeError: a is not a function
```

---

## 词法作用域

> 词法, 指的书写代码的阶段, 就是说, 你写代码的时候将变量和块作用域写在哪里, 将决定 **词法作用域**

``` javascript
function foo(a) {
    var b = a * 2

    function bar(c) {
        console.log(a, b, c)
    }

    bar(b * 3)
}

foo(2) // 2, 4, 12
```

### 遮蔽效应
> 在多层的嵌套作用域中可以定义同名的标识符, 这叫"遮蔽效应"(内部的标识符"遮蔽"了外部的标识符)

``` javascript
var a = 1
function foo() {
    var a = 2
    console.log(a)
}

foo()         // 2
console.log(a) // 1
```

> 我们再来看一个容易混淆的例子:

``` javascript
var a = 1

function foo() {
    console.log(a)
}

function bar() {
    var a = 2
    foo()
}

bar()
```

这个例子, 你可能以为最终会输出 `2`, 因为在 `bar` 函数内部我们又声明了一次 `var a = 2`, 但事实上输出的是 `1`;

我们要牢牢记住, **词法作用域**只关注函数在何处被声明, 而不是在何处被调用, 以上例子, `foo` 函数位于全局作用域被声明, 所以它对 `a` 变量的 RHS 查找当然是在 **全局作用域** 中.

### 欺骗词法

理解**欺骗词法**很简单, 即我们定义作用域时, 并不是通过书写代码的阶段定义的, 而是在运行的阶段定义, 如下示例:

``` javascript
function foo(str, a) {
    eval(str)
    console.log(a + b)
}

foo('var b = 2', 3)  // 5
```

该示例, `foo` 函数内部作用域中在书写代码时没有定义变量 `b`, 而是在运行过程中, 执行了 `eval` 函数, 通过解析传入字符串 `var b = 2` 得到了这一变量

---

## 函数作用域

> 函数内部的全部变量都可以在整个函数范围内使用和复用, 函数外部无法访问到这些变量

``` javascript
function bar() {
    var a = 1
    function foo(b) {
        console.log(a + b)
    }

    foo(3)
}

bar() // 4

// 外部访问这些变量, 会抛出异常
> console.log(a)
< ReferenceError: a is not defined
> foo(3)
< ReferenceError: b is not defined
```

---

## 块作用域

> ES6 以前, Javascript 并不存在块作用域

``` javascript
for (var i = 0; i < 10; i ++) {
    console.log(i)
}

> window.i
< 10
```

我们预期只想在循环中使用变量 `i`, 但它却被声明为一个全局变量

``` javascript
if (true) {
    var a = 1
}

> window.a
< 1
```

同样的情况也出现在 `if` 代码块中

> ES5 以下如何实现块作用域?

我们知道, ES3 的 `try/catch` 的 `catch` 语句中会形成一个天然的 **块作用域**, 但这样的写法不仅丑陋, 而且让人难以理解:

``` javascript
try { throw undefined } catch(a) {
    a = 2
    console.log(a) // 2
}
```

### let/const

> 为了解决这个问题, ES6 引入了 `let/const` 关键字, 他们可以将变量绑定到所在的任意作用域中, 通常是`{...}`内部, 换句话说, `let` 为其声明的变量隐式劫持了所在的块作用域

``` javascript
// for 循环头部的 let 不仅将 i 绑定到了 for 循环中, 事实上它将其重新绑定到了循环的每一个迭代中, 确保使用上一个循环迭代结束时的值重新进行赋值
for (let i = 0; i < 10; i ++) {
    console.log(i)
}

> window.i
< ReferenceError: i is not defined
```

``` javascript
if (true) {
    const a = 1
}

> window.a
< ReferenceError: a is not defined
```

``` javascript
{
    const a = 1
    const b = 2
}

let c = a + b

< ReferenceError: a is not defined
```

---

## 提升

### 变量提升

> 我们都认为, `Javascript` 会从上到下一行一行地执行, 但实际上并不完全正确

看以下两个示例:

``` javascript
a = 1
console.log(a)
var a

< 1
```

``` javascript
console.log(a)
var a = 1

< undefined
```

> 为何第一个示例会出现如此匪夷所思的结果?

当我们在代码中看到 `var a = 1` 时, `Javascript` 实际上会将其看成两个声明 `var a`; `a = 1`;

- `var a` 是在编译阶段进行的;

- `a = 1` 赋值声明会在**原地**等待**执行**阶段, 才进行处理

所以, 就算 `var a` 放在了代码最后, 它在浏览器解析过程中, 仍会比**赋值或其他运行逻辑**快一步, *被放在了代码的最前面*, 也就是**变量提升**, 所以第一个示例输出了正确的值;(无论作用域中的声明出现在什么地方, 都将在代码本身被执行前首先进行处理)

而第二个示例, 虽然 `var a` 被**提升**了, 但查询 `a` 比赋值 `a` 早了一步, 所以输出是 `undefined`.

### 函数提升

同样的, 函数声明也会被**提升**.

``` javascript
foo()
function foo() {
    console.log(1)
}

< 1
```

结合前面**变量提升**的知识, 我们可以看到, 通过 `var` 声明的函数, 同样适用变量提升的原则:

``` javascript
foo()
var foo = function() {
    console.log(1)
}

< TypeError
```

> 但为什么是 `TypeError` 而不是 `ReferenceError` ?

- `var foo` 因为**变量提升**, 已经被分配到了其所在的全局作用域, 作用域中已经存在 `foo` 变量了, 所以不会导致 `ReferenceError`;
- 但执行 `foo()` 的时候, 赋值操作并未执行, 实际上我们执行的是一个 `undefined`, 浏览器当然会抛出 `TypeError`

#### 函数优先

> 函数声明和变量声明都会被提升, 但函数会首先被提升, 然后才是变量

``` javascript
foo()

var foo

foo = function() {
  console.log('Var')
}

function foo() {
  console.log('Function')
}

< Function
```

当然, 后面的函数声明是可以覆盖前面的:

``` javascript
foo()

function foo() {
    console.log(1)
}

function foo() {
    console.log(2)
}

< 2
```

---

## 闭包

### 基本概念
> 当函数可以记住并访问所在的词法作用域时, 就产生了闭包, 即使函数是在当前词法作用域之外执行(你不知道的 JavaScript 上)

> 闭包就是能够读取其他函数内部变量的函数(百度百科)

我们知道, **函数作用域**中的变量, 我们在外部是无法访问到的, 如以下示例, 常规手段, 我们永远无法在外部访问 `foo` 函数内部的*计算结果(res 变量)*

``` javascript
function foo() {
    const res = 1 + 1
}

console.log(res)

< ReferenceError
```

但我们知道, 通过回调函数可以做到这一点:

``` javascript
function foo(callback) {
    const res = 1 + 1
    callback(res)
}

foo(function(res) {
    result = res
})

console.log(result)

// 还记得变量提升么?
var result

< 2
```

当执行函数 `foo` 时, 实际上我们隐式为 `callback` 参数赋值了一个方法, 该方法不属于 `foo` 函数的作用域, 但它却能访问到 `foo` 函数内部的变量, 所以这就是一个**闭包**!

我们知道 `Javascript` 存在**垃圾回收**机制, 原本 `foo` 函数执行完毕后, 整个内部作用域应该被销毁掉, 但由于 `callback` 函数拥有涵盖 `foo` 函数内部作用域的闭包, 所以内部作用域被神奇的保存了下来, 并为 `callback` 所用

### 闭包的形式
- 分配给全局变量

``` javascript
var fn
function foo() {
  var a = 1
  function bar() {
    console.log(a)
  }

  fn = bar
}

foo()

fn() // 1
```

- 通过内部返回函数方法

``` javascript
function foo() {
    var a = 2
    function bar() {
        console.log(a)
    }

    return bar
}

var baz = foo()

baz() // 2
```

- 回调函数

``` javascript
function foo(callback) {
    var a = 3
    callback(a)
}

foo(function (p) {
    console.log(p)
})  // 3
```

### 循环和闭包

看如下示例代码:

``` javascript
for (var i = 0; i <= 5; i++) {
    setTimeout(function() {
        console.log(i)
    }, i * 1000)
}
```

正常情况下, 我们对这段代码行为的预期是分别输出 1~5, 每秒一次, 每次一个;

但实际上这段代码在运行时会以每秒一次的频率输出五次6;

> 是什么导致了如此它的行为同语义暗示的不一致呢?

- 首先, 我们知道, `var` 的声明下, `for` 循环没有自己的块作用域, 也就是说, `i` 位于全局作用域中, 整段程序只有唯一一个 `i`;
- `setTimeout` 作为异步函数, 在程序执行过程中, 会被推到**任务队列**中, 等待所有同步函数执行完毕后再执行, 所以, 当 `for` 完成循环后, 全局变量 `i` 已经变成了 6, 自然在执行异步函数时输出的都是6了.

> 如何使用**闭包**解决这个问题?

`LIFE` 函数会通过声明立即执行一个函数来创建**函数作用域**, 通过这个特性, 我们可以在每次循环时, 将当前状态的 `i` 传递到 `LIFE` 函数中, 在内部为 `setTimeout` 创建一个新的作用域;

以下代码能够获得我们预期的结果:

``` javascript
for (var i = 0; i <= 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j)
        }, j * 1000)
    })(i)
}
```

> 有更简单的解决方案么?

答案是肯定的! 前面我们说到过 `let` 声明, 它可以用来劫持块作用域;

for 循环头部的 let 不仅将 i 绑定到了 for 循环中, 事实上它将其重新绑定到了循环的每一个迭代中, 确保使用上一个循环迭代结束时的值重新进行赋值;

以下代码能够获得我们预期的结果:

``` javascript
for (var i = 0; i <= 5; i++) {
    // i 被劫持了, 现在每次循环都形成一个封闭的块作用域
    let j = i

    setTimeout(function() {
        console.log(j)
    }, j * 1000)
}
```

### 模块

> 我们平时所使用的**第三方框架**, 为了使自身的变量不会污染到全局中, 都会将所有方法封闭到一个内部私有的作用域中, `LIFE` 函数就能提供这样的一个作用域, 来实现框架的**模块化**

``` javascript
var _ = (function() {
    var a = 1
    var b = 2

    function add() {
        console.log(a + b)
    }

    function decrease() {
        console.log(a - b)
    }

    return {
        add: add,
        decrease: decrease
    }
}())

_.add() // 3
_.decrease() // -1
```

这也是一个典型的**闭包**, `_.add()` 在全局作用域下执行, 但它却能够访问到 `LIFE` 函数内部的变量.

## 小结

> 作用域嵌套

我们可以把作用域比作一个建筑, 这个建筑代表程序中的嵌套作用域链, 第一层代表当前的执行作用域, 建筑的顶层代表全局作用域;

LHS 和 RHS 引用都会在当前楼层进行查找, 如果没找到, 就会坐电梯上一层, 以此类推, 最后到达顶楼(全局作用域), 无论程序是否已经找到你所需的变量, 都为到此为止.

> 作用域异常

`ReferenceError`: 作用域判别失败时抛出, 如查询一个不存在的变量

`TypeError`: 作用域判别成功了, 但对结果的操作非法, 如将一个字符串变量当做函数来执行

> 词法作用域

当我们书写代码的时候, 就已经决定了函数的作用域在哪里, 而不是在我们执行函数之后

> 函数作用域

函数内部的作用域是私有的, 外部无法访问到它们

> 块作用域

ES6 之前, 并不存在生成 **块作用域** 的直接方法, 我们使用 `try/catch` 来代替;

ES6 之后, 有了 `let/const`, 这两个关键字事实上并没有生成真正的块作用域, 而是隐式的劫持了关键字所在的快作用域

> 变量提升

`var a = 1`, 会被引擎解析为 `var a;a = 1` 两条语句, 而 `var a` 会在编译时执行, 而 `a = 1` 则会在执行阶段才被处理, 这就造成了变量的提升;

同样, 函数声明也会被提升, 它的优先级甚至还高于变量;

> 闭包

我们知道, **函数作用域** 是不能被外界所访问到的, 但我们可以通过*回调函数* 或 *全局变量* 等方法, 在函数外部访问到函数内部的变量, 这就是**闭包**;

我们经常使用的 `$.ajax`, 就是典型的闭包, 甚至整个 `jQuery` 包或其他第三方包的编写, 为了避免污染全局变量, 都会使用 `LIFE` 函数创建一个闭包, 并返回包含插件所有方法的 `$` (每个框架变量名不同) 对象.