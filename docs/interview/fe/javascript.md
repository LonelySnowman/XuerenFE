# JavaScript

## JS执行机制

### 基本执行机制

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/30/16589b4a4cce8b3e~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

1. JS代码分为同步任务和异步任务
2. 同步任务会进入主线程，异步任务会进入Event Table（事件表），当事件表中的异步任务完成后会在Event Queue（事件队列）中注册回调函数
3. 主线程任务全部完成后，才会完成Event Queue中的任务
4. js解析器会不断地重复检查主线程执行栈是否为空，然后重复第3步，这就是Event Loop（事件循环）

### JS代码类型

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/30/16589b575216a917~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

- 异步任务中的宏任务和微任务会进入不同的Event Queue事件队列，即Event Queue又可以分为宏任务队列和微任务队列

**常见宏任务**

- script (可以理解为外层同步代码)
- setTimeout/setInterval
- UI rendering/UI事件
- postMessage、MessageChannel
- setImmediate、I/O（Node.js）

**常见微任务**

- Promise.then
- async/await
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）
- process.nextTick（Node.js）

### 微任务与宏任务执行机制

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/30/16589b5fb735c388~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

- 第一轮事件循环：

1. 主线程执行js整段代码（宏任务），将ajax、setTimeout、promise等回调函数注册到Event Queue，并区分宏任务和微任务。
2. 主线程提取并执行Event Queue 中的ajax、promise等所有微任务，并注册微任务中的异步任务到Event Queue。

- 第二轮事件循环：

1. 主线程提取Event Queue 中的**第一个**宏任务（通常是setTimeout）。
2. 主线程执行setTimeout宏任务，并注册setTimeout代码中的异步任务到Event Queue（如果有）。
3. 执行Event Queue中的所有微任务，并注册微任务中的异步任务到Event Queue（如果有）。

**宏任务每执行完一个，就清空一次事件队列中的微任务**。

## 数据类型

### 分类

**基本类型**：基本数据类型的特 点： 直接存储在栈（stack）中的数据

- **Number （数字）**
- **String （字符串）**
- **Boloean （布尔值）**
- **Null （空）**
- **Undefined （未定义）**
- **BigInt （可以表示任意大的整数）**
- **Symbol（表示独一无二的值）**

**对象类型**：引用数据类型的特点：存储的是该对象在栈中引用，真实的数据存放在堆内存里

- **Array（数组）**
- **Function（函数）**
- **Object（对象）**
- **Date（日期）**
- **RegExp（正则）**

### 如何判断数据类型

- `typeof`： 在基本数据类型（null除外）和Function时，返回其对应类型；对于引用数据类型（Function除外）都返回为object；
- `instanceof`：无法判断基本数据类型；对于引用数据类型（除判断数据类型是否是Objcet类型外）均可；
- `constructor`： 在基本数据类型（null 与 undefined 除外）/引用数据类时，均返回其对应类型；
- `Object.prototype.toString`： 无论基本数据类型还是引用类型返回其对应类型；

#### typeof

- `typeof` 判断基本数据类型：**null 返回 object 其余均返回对应数据类型；**
- `typeof` 判断引用数据类型：**function 返回 function 其余均返回object；**

#### instanceof

- `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上； 基本数据类型 不存在`prototype` 因此不能使用 `instanceof` 来判断基本数据类型；

```js
const obj = {name: '1212'}; 
const fun = () => {}; 
const regexp = /[0-9]{1,2}/

console.log(obj instanceof Object) // true 
console.log(fun instanceof Function) // true 
console.log(regexp instanceof  RegExp) // true

console.log(regexp instanceof  Date) // false
console.log(regexp instanceof  Function) // false
```

- **所有引用数据都是 Object 的实例，因此通过 instanceof 操作符检测任何引用数据和Object 构造函数都会返回 true**

```js
console.log(obj instanceof Object) // true 
console.log(fun instanceof Object) // true 
console.log(regexp instanceof  Object) // true
```

#### constructor

- **使用构造器的对比判断数据类型**

```js
// constructor 判断引用数据类型
const arr = [1,2,3,4];
console.log(arr.constructor === Array) // true 

// constructor 判断基本数据类型
// null 与 undefined 不存在 原型
const string = '321'; 
console.log(string.constructor === String) // true 
```

- **如果对象改变了原型，那么使用constructor不再准确；**

```js
function Functions() {}
// 改变原型
Functions.prototype = new Array();
let tempF = new Functions();
console.log(tempF.constructor === Functions); // false
console.log(tempF.constructor === Array); // true
```

#### Object.protype.toString

- `Object.prototype.toString` 判断基本数据类型 (统一返回格式“[object Xxx]”的字符串；)

```js
//可以封装一个函数进行判断
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();

const arr = [1,2,3,4];
const string = '321'; 
const number = 321;
console.log(checkedType(arr)); // array
console.log(checkedType(string)); // string
console.log(checkedType(number)); // number
```

### null 与 undefined

- 全等判断

```js
x === null
x === undefined
```

- 封装判断

```js
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();
checkedType(null) // null
checkedType(undefined) // undefined
```

### 浮点数精度

```js
console.log(0.1+0.2);  //0.30000000000000004
```

```js
算法：
0.1*2=0.2 ----------- 取出整数部分0
0.2*2=0.4 ----------- 取出整数部分0
0.4*2=0.8 ----------- 取出整数部分0
0.8*2=1.6 ----------- 取出整数部分1
0.6*2=1.2 ----------- 取出整数部分1

0.2*2=0.4 ----------- 取出整数部分0
0.4*2=0.8 ----------- 取出整数部分0
0.8*2=1.6 ----------- 取出整数部分1
0.6*2=1.2 ----------- 取出整数部分1

我们可以发现在无限循环
0.1的二进制结果 0.0 0011 0011 0011 .....  "0011的无限循环"
0.2的二进制结果 0.0011 0011 0011 0011 .... "0011的无限循环"

取52位进行计算
0.1  =  0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001
0.2 =   0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011

计算的结果是： 0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 ...也是无限循环

将二进制转换为十进制：
浮点型数据存储转换为十进制的话 只会取前17位
0.300000000000000044408920958 .... = 0.30000000000000004（四舍五入）
所以0.1+0.2的结果是等于0.30000000000000004
```

- 解决方案

```js
// toFixed 转化为字符串
// 参数为保留几位小数 默认为零 多出补零
let x = parseFloat((0.1+0.2).toFixed(1));
console.log(x===0.3);
```


## V8

### 执行机制

- **预分析**：检查语法错误但不生成 AST
- **生成 AST** ： 词法/语法2分析后，生成抽象语法树，AST 为每一行代码定义键值对。初始类型标识符定义 AST 属于一个程序，然后所有代码行将定义在主体内部，主体是一个对象数组。
- **生成字节码**：基线编译器（Ignition）将 AST 转换为字节码
- **生成机器代码**：优化编译器 (Turbofan) 将字节码转换为优化的机器代码。另外，在逐行执行字节码的过程中，如果一段代码经常被执行，V8会直接将这段代码转换并保存为机器码，下次执行不需要经过字节码，优化了执行速度

### 内存管理

- V8中申请的内存分堆内存和栈内存

![new_large_object_space](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71e24b843ec84f02b616fae0c8d723f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 栈

- 用于存放JS中的基本类型和引用类型指针
- 空间连续，增加删除只需要移动指针，操作速度非常快
- 空间有限，当栈满了，就会抛出一个错误
- 栈一般是在执行函数时创建的，在函数执行完毕后，栈就会被销毁

#### 堆

- 如果不需要连续空间，或者申请的内存较大，可以使用堆
- 堆主要用于存储JS中的引用类型

### 垃圾回收机制

**常见垃圾回收策略**：

- 标记清除 标记整理
- scanvenger
- 引用计数

#### 分代式

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b9b378eb7384fadaaadaa72fd9b0044~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 新生代

- 新生代内存有两个区域，分别是对象区域(from) 和 空闲区域(to)
- 新生代内存使用`Scavenger`算法来管理内存
    - **广度优先遍历** From-Space 中的对象，从根对象出发，广度优先遍历所有能到达的对象，把存活的对象复制到 To-Space
    - 遍历完成后，清空 From-Space
    - From-Space 和 To-Space 角色互换

- **复制后的对象在 To-Space 中占用的内存空间是连续的，不会出现碎片问题**
- 这种垃圾回收方式快速而又高效，但是会造成空间浪费
- 新生代的 GC 比较频繁
- 新生代的对象转移到老生代称为**晋升**，判断晋升的情况有两种
    - 对象是否经历过一次`Scavenge`算法，此对象会被认定为生命周期较长的对象。
    - `To`空间的内存占比是否已经超过`25%`，**25%的红线要求是为了保证进行空闲区和使用区翻转时对于新的对象分配空间操作不会被影响。**

#### 老生代

- 存放的就是一些生命周期比较长，经过多次新生代垃圾回收还存在的对象
- 同样的相比于新生代不仅垃圾**回收频率较低**，**存储空间大**。老生代的回收算法使用**标记清除和标记整理**进行回收。

#### 全停顿

由于垃圾回收是在JS引擎中进行的，而Mark-Compact算法在执行过程中需要移动对象，而当活动对象较多的时候，它的执行速度不可能很快，**为了避免JavaScript应用逻辑和垃圾回收器的内存资源竞争导致的不一致性问题，垃圾回收器会将JavaScript应用暂停**，这个过程，被称为`全停顿`（stop-the-world）。

#### 增量标记

增量标记思想就是将一次GC标记过程进行拆分，一次执行一小部分，执行完毕后继续执行脚本，执行一段脚本之后又继续执行刚刚拆分的GC标记任务，循环往复直至这次GC标记完成。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fc9b4c9f94f4683b1079cb56f4963f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

##### 三色标记法

- 在引入**三色标记法之前**的GC标记只是将**活动的变量标记为黑色**，**不活动的变量标记为白色**，当GC标记过程结束之后，系统会回收掉所有的白色标记变量
- **三色标记法**，**开始时所有对象都是白色的**，然后**从根对象开始进行标记**，先将这组对象**标记为灰色**然后进行记录，如果此时**进行中断**，**后续恢复时既从灰色标记时开始**即可，当回收器从标记工作表中**弹出对象并访问他们的引用对象时**，会将**灰色置为黑色**，同时**将下一个引用对象置为灰色，**继续往下进行标记工作。直至无可标记为灰色对象为止，此时表示GC标记过程结束，将所有未标记的变量进行回收工作。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41fda88ed208434d800a1f258be59f4d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

##### 写屏障

- **一旦有黑色的对象引用白色的对象**，就会**强制将被引用的白色变量标记为灰色**，保证下一次的增量GC正确运行，这个机制称为强三色不变性

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36a75580ea724bdabffce8fbcedd0c17~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

#### 惰性清理

- 增量标记只是对活动对象和非活动对象进行标记，惰性清理用来真正的清理释放内存。
- 当增量标记完成后，**假如当前的可用内存足以让我们快速的执行代码**，其实我们是**没必要立即清理内存**的，可以**将清理的过程延迟**一下，**让JavaScript逻辑代码先执行**，**也无需一次性清理完所有非活动对象内存**，**垃圾回收器会按需逐一进行清理**，直到所有的页都清理完毕。

#### 并发式GC

并发式GC允许在在垃圾回收的同时不**需要将主线程挂起**，**两者可以同时进行**，**只有在个别时候需要短暂停下来让垃圾回收器做一些特殊的操作**。但是这种方式也要面对增量回收的问题，就是在垃圾回收过程中，由于JavaScript代码在执行，堆中的对象的引用关系随时可能会变化，所以也要进行`写屏障`操作。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bc4f2f75764453a8fccf310299c064e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 并行式GC

**并行式GC允许主线程和辅助线程同时执行同样的GC工作**，这样可以让辅助线程来分担主线程的GC工作，使得垃圾回收所耗费的时间等于总时间除以参与的线程数量（加上一些同步开销）。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1196a621ab2942f6a8be2f9b940e5fad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)


## 内存泄露

### 内存

什么是内存？内存其实就是程序在运行时，系统为其分配的一块存储空间。每一块内存都有对应的生命周期：

- 内存分配：在声明变量、函数时，系统分配的内存空间
- 内存使用：对分配到的内存进行读/写操作，即访问并使用变量、函数等
- 释放内存：内存使用完毕后，释放掉不再被使用的内存

### 内存泄漏

每一个程序的运行都需要一块内存空间，如果某一块内存空间在使用后未被释放，并且持续累积，导致未释放的内存空间越积越多，直至用尽全部的内存空间。程序将无法正常运行，直观体现就是程序卡死，系统崩溃，这一现象就被称为内存泄漏。

内存泄漏主要是指的是内存持续升高，但是如果是正常的内存增长的话，不应该被当作内存泄漏来排查。

#### 可能发生内存泄漏

```js
function foo() {
    const obj = {name: '张三'}
    window.obj = obj;
    console.log(obj)
}
foo(); // foo()执行完毕，{name: '张三'}对应的内存空间本应该被释放，但是由于又被全局变量所引用，因此其对应的内存空间不会被垃圾回收
```

#### 闭包的内存占用

```js
function bar() {
    const data = {}
    return {
        get(key) {
            return data[key]
        },
        set(key, value) {
            data[key] = value
        }
    }; // 闭包对象
}
const {get, set} = bar; // 结构
set('name', '张三')
get('name'); // 张三
// 函数执行完毕，data对象并不会被垃圾回收，这是闭包的机制。如果被回收了，也就没有必要有闭包了
```

### 如何检测内存泄漏

借助`Chrome DevTools`的`Performance`和`Memory`选项

[手把手教你排查Javascript内存泄漏 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/322356761)

### 内存泄漏场景

#### console.log()

我们在开发的时候经常会使用`console`在控制台打印信息，但这也会带来一个问题：被`console`使用的对象是不能被垃圾回收的，这就可能会导致内存泄漏。因此在生产环境中不建议使用`console.log()`的理由就又可以加上一条避免内存泄漏了。

#### 全局变量

被全局变量、全局函数引用的对象，在Vue组件销毁时未清除，可能会导致内存泄漏

```vue
// Vue3
<script setup>
import {onMounted, onBeforeUnmount, reactive} from 'vue'
const arr = reactive([1,2,3]);
onMounted(() => {
    window.arr = arr; // 被全局变量引用
    window.arrFunc = () => {
        console.log(arr); // 被全局函数引用
    }
})
// 正确的方式
onBeforeUnmount(() => {
    window.arr = null;
    window.arrFunc = null;
})
</script>
```

#### 定时器

定时器未及时在Vue组件销毁时清除，可能会导致内存泄漏

```vue
// Vue3
<script setup>
import {onMounted, onBeforeUnmount, reactive} from 'vue'
const arr = reactive([1,2,3]);
const timer = reactive(null);
onMounted(() => {
    setInterval(() => {
        console.log(arr); // arr被定时器占用，无法被垃圾回收
    }, 200);
    // 正确的方式
    timer = setInterval(() => {
        console.log(arr);
    }, 200);
})
// 正确的方式
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
})
</script>
```

`setTimeout`和`setInterval`两个定时器在使用时都应该注意是否需要清理定时器，特别是`setInterval`，一定要注意清除。

#### 事件绑定

绑定的事件未及时在Vue组件销毁时清除，可能会导致内存泄漏

绑定事件在实际开发中经常遇到，我们一般使用`addEventListener`来创建。

```vue
// Vue3
<script setup>
import {onMounted, onBeforeUnmount, reactive} from 'vue'
const arr = reactive([1,2,3]);
const printArr = () => {
    console.log(arr)
}
onMounted(() => {
    // 监听事件绑定的函数为匿名函数，将无法被清除
    window.addEventListener('click', () => {
        console.log(arr); // 全局绑定的click事件，arr被引用，将无法被垃圾回收
    })
    // 正确的方式
    window.addEventListener('click', printArr);
})
// 正确的方式
onBeforeUnmount(() => {
    // 注意清除绑定事件需要前后是同一个函数，如果函数不同将不会清除
    window.removeEventListener('click', printArr);
})
</script>
```


## 深拷贝与浅拷贝

- **深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。**

### 深拷贝

**深拷贝**: 深拷贝是将一个对象从内存中完整的拷贝一份出来,从**堆内存中开辟一个新的区域存放新对象**（新旧对象**不共享同一块内存**）,且**修改新对象不会影响原对象**（深拷贝采用了在堆内存中申请新的空间来存储数据，这样每个可以避免指针悬挂）

### 浅拷贝

**浅拷贝**:

- 如果属性是基本类型，拷贝的就是基本类型的值。
- 如果属性是引用类型，拷贝的就是内存地址（新旧对象共享同一块内存），所以如果其中一个对象改变了这个地址，就会影响到另一个对象（只是拷贝了指针，使得两个指针指向同一个地址，这样在对象块结束，调用函数析构的时，会造成同一份资源析构2次，即delete同一块内存2次，造成程序崩溃）

### 赋值和浅拷贝的区别

- 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址**，**而不是堆中的数据**。也就是**两个对象指向的是同一个存储空间**，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的
- 浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。**即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)，即只复制对象空间而不复制资源**

|        | 和原数据是否指向同一对象 | 第一层数据为基本数据类型                 | 原数据包含子对象（）                 |
| ------ | ------------------------ | ---------------------------------------- | ------------------------------------ |
| 赋值   | 是                       | 赋值后的数据改变，会使原数据一同改变     | 赋值后的数据改变，会使原数据一同改变 |
| 浅拷贝 | 否                       | 浅拷贝后的数据改变，不会使原数据一同改变 | 赋值后的数据改变，会使原数据一同改变 |

### 浅拷贝的实现

**注**：当对象只有一层的时候，是深拷贝

- 展开运算符 `...obj`
- Object.assign()
    - `let obj2 = Object.assign({}, obj1);`
    - 第一个参数为附加到的对象
    - 第二个参数为被拷贝的对象
- Array.prototype.concat()
    - `arr1.concat([])`
    - 参数为附加到的数组
- Array.prototype.slice()
    - `let arr2 = arr1.slice();`

### 深拷贝实现

- JSON.parse(JSON.stringify())
    - `let arr2 = JSON.parse(JSON.stringify(arr1));`
    - **JSON.stringify()**只能解析Object，Array，解析Date与Fnction为"undefined"
    - **JSON.parse()** 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象 因此undefined不能被转换并抛出异常："undefined"不是有效的 JSON
- **手写递归方法**(递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝)

```js
// 检测数据类型的功能函数
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();
// 实现深拷贝（Object/Array）
const clone = (target) => {
    let result;
    let type = checkedType(target);
    if(type === 'object') result = {};
    else if(type === 'array') result = [];
    else return target;
    for (let key in target) {
        if(checkedType(target[key]) === 'object' || checkedType(target[key]) === 'array') {
            result[key] = clone(target[key]);
        } else {
            result[key] = target[key];
        }
    }
    return result;
}
```



### 循环引用

**什么是循环引用：** 一般指对象直接或间接地引用了自身;

- 父级引用：自身（obj）中的属性对应的值指向自己（obj）;
- 同级引用：自身（obj）中某一属性对应的值 指向（引用）自身（obj）;
- 相互引用：两个对象中的属性相互引用；

递归函数，看似已经解决了我们日常深拷贝的需要， 但是没有考虑到对象'循环引用'问题；

**因此针对深拷贝的循环引用问题，对clone函数进行优化**：

```js
// 检测数据类型的功能函数
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();
// 实现深拷贝（Object/Array）
const clone = (target, hash = new WeakMap) => {
    let result;
    let type = checkedType(target);
    if(type === 'object') result = {};
    else if(type === 'array') result = [];
    else  return target;
    
    // 判断循环引用
    if(hash.get(target)) return target;
    let copyObj = new target.constructor();
    hash.set(target, copyObj)
    
    for (let key in target) {
        if(checkedType(target[key]) === 'object' || checkedType(target[key]) === 'array') {
            result[key] = clone(target[key], hash);
        } else {
            result[key] = target[key];
        }
    }
    return result;
}
```

## 性能优化

### 性能优化指标

| 指标名称 | 全称                     | 描述                                           |
| -------- | ------------------------ | ---------------------------------------------- |
| FP       | First Paint              | 浏览器第一次绘制时间，第一个像素时间           |
| TTI      | Time To Interactive      | 页面渲染完毕，可以响应用户输入的时间           |
| FID      | First Input Delay        | 用户与页面输入框等控件第一次可交互的时间       |
| LCP      | Largest Contentful Paint | 最大内容绘制时间                               |
| FMP      | First Meaningful Paint   | 首次有意义的绘制，页面主要内容出现在屏幕的时间 |
| FCP      | First Contentful Paint   | 浏览器第一次屏幕绘制内容时间                   |
| CLS      | Cumulative Layout Shift  | 累计布局版式位移，页面抖动，屏闪               |

### 优化方式

#### 包体积压缩

**打包分析插件**：

- webpack-bundle-analyzer

##### externals 提取项目依赖

可以使用 `externals` 来提取这些依赖包，告诉 webpack 这些依赖是外部环境提供的，在打包时可以忽略它们，就不会再打到 chunk-vendors.js 中。

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts'
    }
}
```

```html
<!-- 使用CDN引入 -->
<body>
<script src="http://lib.baomitu.com/vue/2.6.14/vue.min.js"></script>
<script src="http://lib.baomitu.com/vue-router/3.5.1/vue-router.min.js"></script>
<script src="http://lib.baomitu.com/axios/1.2.1/axios.min.js"></script>
<script src="http://lib.baomitu.com/echarts/5.3.2/echarts.min.js"></script>
</body>
```

##### 组件库按需引入

**externals缺点**：直接在html内引入的，失去了按需引入的功能，只能引入组件库完整的js和css

- 所需插件：babel-plugin-component

#### 首页资源优化

##### 路由懒加载

```js
// 动态引入组件
const MetricGroup = () => import("@/views/metricGroup/index.vue");
```

**懒加载原理**

##### 组件懒加载

```js
const dialogInfo = () => import('@/components/dialogInfo/index.vue');
```

**使用场景**：

- 1）该页面的 JS 文件体积大，导致页面打开慢，可以通过组件懒加载进行资源拆分，利用浏览器并行下载资源，提升下载速度（比如首页）
- 2）该组件不是一进入页面就展示，需要一定条件下才触发（比如弹框组件）
- 3）该组件复用性高，很多页面都有引入，利用组件懒加载抽离出该组件，一方面可以很好利用缓存，同时也可以减少页面的 JS 文件大小（比如表格组件、图形组件等）

##### TreeShaking

##### 骨架屏

**骨架屏插件**：vue-skeleton-webpack-plugin

##### 虚拟列表

**虚拟滚动插件**：vue-virtual-scroller

**虚拟滚动——指的是只渲染可视区域的列表项，非可见区域的**不渲染，在滚动时动态更新可视区域，该方案在优化大量数据渲染时效果是很明显的。

![virtual.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f83db193a9541019f49b01df7451aee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

计算出 totalHeight 列表总高度，并在触发时滚动事件时根据 scrollTop 值不断更新 startIndex 以及 endIndex ，以此从列表数据 listData 中截取对应元素

##### WebWorker

由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥的关系，当页面中有很多长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况。

**通信时长**：

- 并不是执行时间超过 50ms 的任务（长任务），就可以使用 Web Worker，还要先考虑`通信时长`的问题
- 假如一个运算执行时长为 100ms，但是通信时长为 300ms， 用了 Web Worker可能会更慢

#### 图片优化

##### 图片的动态裁剪

很多云服务，比如[阿里云](https://link.juejin.cn?target=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F144582.html)或[七牛云](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.qiniu.com%2Fdora%2F3683%2Fimg-directions-for-use)，都提供了图片的动态裁剪功能，效果很棒，确实是钱没有白花

只需在图片的url地址上动态添加参数，就可以得到你所需要的尺寸大小，比如：`http://7xkv1q.com1.z0.glb.clouddn.com/grape.jpg?imageView2/1/w/200/h/200`

##### 图片懒加载



##### 使用字体图标

##### 图片转base64格式


## 模块化

### CommonJS

`Commonjs` 的提出，弥补 Javascript 对于模块化，没有统一标准的缺陷。nodejs 借鉴了 `Commonjs` 的 Module ，实现了良好的模块化管理。

#### 应用场景

- `Node` 是 CommonJS 在服务器端一个具有代表性的实现；
- `Browserify` 是 CommonJS 在浏览器中的一种实现；
- `webpack` 打包工具对 CommonJS 的支持和转换；也就是前端应用也可以在编译之前，尽情使用 CommonJS 进行开发。

#### 特点

- 在 `commonjs` 中每一个 js 文件都是一个单独的模块，我们可以称之为 module；
- 该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require；
- exports 和 module.exports 可以负责对模块中的内容进行导出；
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

#### 实现原理

- 使用包装函数

首先从上述得知**每个模块文件上存在 `module`，`exports`，`require`三个变量**，然而这三个变量是没有被定义的，但是我们可以在 Commonjs 规范下每一个 js 模块上直接使用它们。在 nodejs 中还存在 `__filename` 和 `__dirname` 变量。

- `module` 记录当前模块信息。
- `require` 引入模块的方法。
- `exports` 当前模块导出的属性

在编译的过程中，实际 Commonjs 对 js 的代码块进行了首尾包装

```js
(function(exports,require,module,__filename,__dirname){
	// 以下为js文件内容
    const sayName = require('./hello.js')
    module.exports = function say(){
        return {
            name:sayName(),
            author:'我不是外星人'
        }
    }
})
```

- 在 Commonjs 规范下模块中，会形成一个包装函数，我们写的代码将作为包装函数的执行上下文，使用的 `require` ，`exports` ，`module` 本质上是通过形参的方式传递到包装函数中的。

**包装函数**

```js
function wrapper (script) {
    return '(function (exports, require, module, __filename, __dirname) {' + 
        script +
     '\n})'
}
```

**包装函数执行**

```js
const modulefunction = wrapper(`
  const sayName = require('./hello.js')
    module.exports = function say(){
        return {
            name:sayName(),
            author:'我不是外星人'
        }
    }
`)
```

- 在模块加载的时候，会通过 runInThisContext (可以理解成 eval ) 执行 `modulefunction` ，传入`require` ，`exports` ，`module` 等参数。最终我们写的 nodejs 文件就这么执行了。

```js
 runInThisContext(modulefunction)(module.exports, require, module, __filename, __dirname)
```

#### require文件加载流程

**文件分类**

- 为 nodejs 底层的核心模块，比如`fs`。
- 为我们编写的文件模块，比如上述 `sayName`
- 为我们通过 npm 下载的第三方自定义模块，比如 `axios`。

当 require 方法执行的时候，接收的唯一参数作为一个**标识符** ，Commonjs 下对不同的标识符，处理流程不同，但是**目的相同，都是找到对应的模块**。

**加载标识符原则**

首先我们看一下 ` nodejs` 中对标识符的处理原则。

- 首先像 fs ，http ，path 等标识符，会被作为 nodejs 的**核心模块**。
- ` ./` 和 `../` 作为相对路径的**文件模块**， `/` 作为绝对路径的**文件模块**。
- 非路径形式也非核心模块的模块，将作为**自定义模块**。

**核心模块处理**

核心模块的优先级仅次于缓存加载，在 `Node` 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。

**路径形式文件模块处理**

以 `./` ，`../` 和 `/` 开始的标识符，会被当作文件模块处理。`require()` 方法会将路径转换成真实路径，并以真实路径作为索引，将编译后的结果缓存起来，第二次加载的时候会更快。

**自定义模块处理**

自定义模块，一般指的是非核心的模块，它可能是一个文件或者一个包，它的查找会遵循以下原则：

- 在当前目录下的 `node_modules` 目录查找。
- 如果没有，在父级目录的 `node_modules` 查找，如果没有在父级目录的父级目录的 `node_modules` 中查找。
- 沿着路径向上递归，直到根目录下的 `node_modules` 目录。
- 在查找过程中，会找 `package.json` 下 main 属性指向的文件，如果没有  `package.json` ，在 node 环境下会依次查找 `index.js` ，`index.json` ，`index.node`。

![4.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb7a91998774fc78a9813e3b0db8199~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### require执行流程

CommonJS 模块同步加载并执行模块文件，CommonJS 模块在执行阶段分析模块依赖，采用**深度优先遍历**（depth-first traversal），执行顺序是父 -> 子 -> 父；

**require加载原理**

**`module`** ：在 Node 中每一个 js 文件都是一个 module ，module 上保存了 exports 等信息之外，还有一个 **`loaded`** 表示该模块是否被加载。

- 为 `false` 表示还没有加载；
- 为 `true` 表示已经加载

**`Module`** ：以 nodejs 为例，整个系统运行之后，会用 `Module` 缓存每一个模块加载的信息。

```js
// 源码大致如下

 // id 为路径标识符
function require(id) {
   /* 查找  Module 上有没有已经加载的 js  对象*/
   const  cachedModule = Module._cache[id]
   
   /* 如果已经加载了那么直接取走缓存的 exports 对象  */
  if(cachedModule){
    return cachedModule.exports
  }
 
  /* 创建当前模块的 module  */
  const module = { exports: {} ,loaded: false , ...}

  /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */  
  Module._cache[id] = module
  /* 加载文件 */
  runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
  /* 加载完成 */
  module.loaded = true 
  /* 返回值 */
  return module.exports
}
```

**执行大致流程**

- require 会接收一个参数——文件标识符，然后分析定位文件，分析过程我们上述已经讲到了，加下来会从 Module 上查找有没有缓存，如果有缓存，那么直接返回缓存的内容。
- 如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true ，然后返回 module.exports 对象。借此完成模块加载流程。
- 模块导出就是 return 这个变量的其实跟 a = b 赋值一样， 基本类型导出的是值， 引用类型导出的是引用地址。
- exports 和 module.exports 持有相同引用，因为最后导出的是 module.exports， 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用。

**避免重复加载与循环引用**

- 加载前会先判断是否有`Module._cach[id]`缓存，如果有缓存直接使用即可。

#### require动态加载

```js
exports.say = function(){
    // 在函数中使用require
    const getMes = require('./b')
    const message = getMes()
    console.log(message)
}
```

#### exports和module.exports

- exports 就是传入到当前模块内的一个对象，本质上就是 `module.exports`。
- module.exports 本质上就是 exports ，两者拥有相同的引用。

**export不能直接赋值为一个对象**

```js
// 这样写会导致导出失败 只能收到空对象
exports={
    name:'《React进阶实践指南》',
    author:'我不是外星人',
    say(){
        console.log(666)
    }
}
// 需要使用如下写法
exports.name = '《Recat进阶实践指南》'
```

**module.exports可直接导出，也可作为非对象导出**

```js
module.exports = {
    name:'《React进阶实践指南》',
    author:'我不是外星人',
    say(){
        console.log(666)
    }
}

module.exports = [1,2,3] // 导出数组

module.exports = function(){} //导出方法
```

- **module.exports优先级较高，export与其同时出现会被覆盖**

### ESMoudle

`Nodejs` 借鉴了 `Commonjs` 实现了模块化 ，从 `ES6` 开始， `JavaScript` 才真正意义上有自己的模块化规范，

- 借助 `Es Module` 的静态导入导出的优势，实现了 `tree shaking`。
- `Es Module` 还可以 `import()` 懒加载方式实现代码分割。
- 在 `Es Module` 中用 `export` 用来导出模块，`import` 用来导入模块。但是 `export` 配合 `import` 会有很多种组合情况，接下来我们逐一分析一下。

#### 导出export 导入import

**正常导出**

- export { }， 与变量名绑定，命名导出。
- import { } from 'module'， 导入 `module` 的命名导出 ，module 为如上的 `./a.js`
- 这种情况下 import { } 内部的变量名称，要与 export { } 完全匹配。

**默认导出**

- `export default anything` 导入 module 的默认导出。 `anything` 可以是函数，属性方法，或者对象。
- 对于引入默认导出的模块，`import anyName from 'module'`， anyName 可以是自定义名称。

**混合导出**

```js
// a.js 导出
export const name = '《React进阶实践指南》'
export const author = '我不是外星人'

export default  function say (){
    console.log('hello , world')
}

// 导入方式1
import theSay , { name, author as  bookAuthor } from './a.js'
console.log(
    theSay,     // ƒ say() {console.log('hello , world') }
    name,       // "《React进阶实践指南》"
    bookAuthor  // "我不是外星人"
)

// 导入方式2
import theSay, * as mes from './a'
console.log(
    theSay, // ƒ say() { console.log('hello , world') }
    mes // { name:'《React进阶实践指南》' , author: "我不是外星人" ，default:  ƒ say() { console.log('hello , world') } }
)
```

- 导出的属性被合并到 `mes` 属性上， `export` 被导入到对应的属性上，`export default` 导出内容被绑定到 `default` 属性上。 `theSay` 也可以作为被 `export default` 导出属性。

**导入重命名**

- 使用`as`关键字进行冲命名

```js
import {  name as bookName , say,  author as bookAuthor  } from 'module' console.log( bookName , bookAuthor , say ) //《React进阶实践指南》 我不是外星人
```

**重定向导出**

```js
export * from 'module' // 第一种方式
export { name, author, ..., say } from 'module' // 第二种方式
export {   name as bookName ,  author as bookAuthor , ..., say } from 'module' //第三种方式
```

- 第一种方式：重定向导出 module 中的所有导出属性， 但是不包括 `module` 内的 `default` 属性。
- 第二种方式：从 module 中导入 name ，author ，say 再以相同的属性名，导出。
- 第三种方式：从 module 中导入 name ，重属名为 bookName 导出，从 module 中导入 author ，重属名为 bookAuthor 导出，正常导出 say 。

**无需导入 只需运行**

- 执行 module 不导出值 多次调用 `module` 只运行一次。

```js
import 'module' 
```

**动态导入**

- `import('module') `，动态导入返回一个 `Promise`。为了支持这种方式，需要在 webpack 中做相应的配置处理。

```js
const promise = import('module')
promise.then(res=>{
    console.log(res)
})
```

#### 特性

- ES6 module 的引入和导出是静态的，`import` 会自动提升到代码的顶层 ，`import` , `export` 不能放在块级作用域或条件语句中。
- import 的导入名不能为字符串或在判断语句，例：`import 'default' + name from 'module'`
- `CommonJS `模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件，ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。
- 使用 import 被导入的模块**运行在严格模式下**。
- 使用 import 被导入的**变量是只读**的，可以理解默认为 const 装饰，无法被赋值
- 使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 **import 导入的变量无论是否为基本类型都是引用传递**。

### 总结

**Commonjs**

- CommonJS 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。

**ESMoudle**

- ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
- ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
- ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES6 模块提前加载并执行模块文件，
- ES6 Module 导入模块在严格模式下。
- ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。

## 架构模式

### MV

- Model层用于封装和应用程序的业务。逻辑相关的数据以及对数据的处理方法。
- View作为视图层，主要负责数据的展示。

**举例**

```js
var myapp = {}; // 创建这个应用对象

// Model层
myapp.Model = function() {
    var val = 0; // 需要操作的数据

    /* 操作数据的方法 */
    this.add = function(v) {
        if (val < 100) val += v;
    };

    this.sub = function(v) {
        if (val > 0) val -= v;
    };

    this.getVal = function() {
        return val;
    };
};
// View层
myapp.View = function() {

    /* 视图元素 */
    var $num = $('#num'),
        $incBtn = $('#increase'),
        $decBtn = $('#decrease');

    /* 渲染数据 */
    this.render = function(model) {
        $num.text(model.getVal() + 'rmb');
    };
};
```



对于一个应用程序，这远远是不够的，我们还需要响应用户的操作、同步更新View和Model。

### MVC

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814137582-5a9aa62f-0045-4272-bef0-447dedb25596.png)

- View：视图端，负责视图展示，展示 Model 中的数据
- Controller：控制端，负责业务逻辑，根据用户行为对 Model 数据进行修改
- Model：负责存储数据，与后端的数据进行同步

View调用Controller中的方法，Controller检测到交互（被View调用），改变Model中的数据，并令Model通知View重新渲染数据。

当我们执行应用的时候，使用Controller做初始化

```js
(function() {
    var controller = new myapp.Controller();
    controller.init();
})();
```



### MVP

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/7e6efa438bda9cb0073d.png~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

- View：视图端，负责视图展示，展示 Model 中的数据
- Presenter：控制端，负责业务逻辑，根据用户行为对 Model 数据进行修改，调用View中方法进行渲染
- Model：负责存储数据，与后端的数据进行同步

### MVVM

- Model-View-ViewModel

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/1fba28fee8c9c5eeb021.png~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

- MVVM把View和Model的同步逻辑自动化了。
- 以前Presenter负责的View和Model同步不再手动地进行操作，而是交给框架所提供的数据绑定功能进行负责，只需要告诉它View显示的数据对应的是Model哪一部分即可。

#### 数据绑定

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/c507025c2f9a5c9e0c44.png~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

## this指向

- **this 永远指向最后调用它的那个对象**
- **箭头函数的 this 始终指向函数定义时的 this，而非执行时**

### 改变this指向

#### 箭头函数

##### 内部使用 `_this=this`

```javascript
var name = "windowsName";
var a = {
    name : "Cherry",
    func2: function () {
        var _this = this;
        // 利用函数闭包保存 this 指向 a
        // 否则 setTimeout 最后会被 window 调用
        setTimeout( function() {
            _this.func1()
        },100);
    }
};
a.func2() // Cherry
```

#### apply

`fun.apply(thisArg, [argsArray])`

- thisArg为this指向
- argsArry为参数数组
- 临时改变this指向

```js
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.apply(a),100);
    }
};
a.func2() // Cherry
```

#### call

`fun.call(thisArg, [arg1], [arg2], [...])`

- thisArg为this指向
- arg1-argn 为可变参数
- 临时改变this指向

```js
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.call(a),100);
    }
};
a.func2() // Cherry
```

#### bind

bind 是创建一个新的函数，我们必须要手动去调用

bind传参方式与call一致，返回一个永久改变this指向的函数

```js
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.bind(a)(),100);
    }
};
a.func2() // Cherry
```

### this绑定

this绑定分四种：

- new 绑定
- 显示绑定
- 隐式绑定
- 默认绑定

优先级：**new > 显式 > 隐式 > 默认**

#### 默认绑定

- 默认绑定作用于函数直接调用的情况下，此时this指向全局对象，但严格模式下this指向undefined。

```js
function foo () {
    console.log(this)
}
foo() // => window

// 严格模式
function bar () {
    'use strict'
    console.log(this)
}
bar() // => undefined
```

#### 隐式绑定

- this指向它的调用者，即谁调用函数，他就指向谁。

```js
function foo () {
    console.log(this)
}
const obj = {
    foo: foo
}

obj.foo() // => obj 调用 foo 则 this 指向 obj
foo() // => window
```

**特例**

```js
const obj = {
    a: function () {
        console.log(this) // obj（隐式）
        function b () {
            console.log(this) // window（默认）
        }
        b()
    }
}
obj.a()
```

##### 隐式绑定 this 丢失问题

```js
const obj = {
    foo: function () {
        console.log(this)
    }
}
// this丢失
setTimeout(obj.foo, 0) // => window

// 内部调用
setTimeout(function () {
    obj.foo() // => obj
}, 10)

// bind绑定
setTimeout(obj.foo.bind(obj), 0) // => obj
```

#### 显示绑定

- **call、apply、bind**

- call和apply是立即执行，bind则是返回一个绑定了this的新函数，只有你调用了这个新函数才真的调用了目标函数
- bind函数存在多次绑定的问题，如果多次绑定this，则以第一次为准。
- bind函数实际上是显示绑定（call、apply）的一个变种，称为硬绑定。由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法`Function.prototype.bind`

#### new绑定

使用new操作符时实际做了四件事：

1. 创建一个全新的对象
2. 执行原型链接
3. 这个新对象会被绑定到构造函数中的this
4. 执行构造函数，判断返回值，如果为对象，则返回这个值，否则返回默认创建的对象



## 闭包

**闭包是什么**：声明一个变量，声明一个函数，在函数内部访问外部的变量，那么**这个函数加这个变量叫做闭包**。

**闭包的用途**：

- 从外部读取内部的变量
- 将创建的变量的值始终保持在内存中

**闭包的优缺点**：

- **优点**： 闭包的优点是可以避免全局变量的污染；

- **缺点**：
    1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
    2. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（`object`）使用，把闭包当作它的公用方法（`Public Method`），把内部变量当作它的私有属性`（private value）`，这时一定要小心，不要随便改变父函数内部变量的值。

函数会先访问自身的闭包 再访问函数上下文

本质就是上级作用域内变量的生命周期，因为被下级作用域内引用，而没有被释放。就导致上级作用域内的变量，等到下级作用域执行完以后才正常得到释放。

## ==与===

- **==**： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较。
- **===**： 如果类型不同，直接就是false。同类型比较，直接进行 "值" 比较。
- **特殊**：对于 Array，Object 等高级类型，== 和 === 是没有区别的 进行 "指针地址" 比较。

## 类型转换

### 显式类型转换

常用的显式类型转换方法有 `Number`、`String`、`Boolean`、`parseInt`、`parseFloat`、`toString` 等等。

#### Number

| 原始值    | 转换结果                          |
| --------- | --------------------------------- |
| undefined | NaN                               |
| null      | 0                                 |
| true      | 1                                 |
| false     | 0                                 |
| string    | 规则                              |
| symbol    | Throw a TypeError exception       |
| Object    | 先调用toPrimitive，再调用toNumber |

#### parseInt

`parseInt`相比`Number`，就没那么严格了，`parseInt`函数逐个解析字符，遇到不能转换的字符就停下来

#### String

| 原始值    | 转换结果                          |
| --------- | --------------------------------- |
| Undefined | Undefined                         |
| Boolean   | true / false                      |
| Number    | 对应的字符串类型                  |
| String    | String                            |
| Symbol    | Throw a TypeError exception       |
| Object    | 先调用toPrimitive，再调用toNumber |

#### Boolean

| 数据类型  | 转换为true的值       | 转换为false的值 |
| --------- | -------------------- | --------------- |
| Boolean   | ture                 | false           |
| String    | 非空字符串           | ""(空字符串)    |
| Number    | 非零数值(包括无穷值) | 0 / NaN         |
| Object    | 任意对象             | null            |
| Undefined |                      | undefined       |

### 隐式类型转换

**两种情况发生隐式转换的场景**：

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）

#### 转换规则

- 如果一个操作数是数字，则将另一个操作数转换为数字。
- 如果一个操作数是字符串，则将另一个操作数转换为字符串。
- 如果一个操作数是布尔值，则将另一个操作数转换为布尔值。
- 如果一个操作数是对象，则尝试将另一个操作数转换为对象，否则将其转换为原始类型。

#### 布尔值转换

- undefined
- null
- false
- +0
- -0
- NaN
- ""

#### toPrimitive

ToPrimitive：如果值已经是原始类型，则返回它本身。否则，如果值有 valueOf() 方法，如果返回值为原始类型则返回 valueOf() 的结果。否则，如果值有 toString() 方法，如果返回值为原始类型则返回 toString() 的结果。否则，抛出 TypeError。

## 函数

### 函数声明方式

- `表达式` 和 `声明式` 两种声明方式

```js
// 声明式
// 这种写法会导致函数提升，所有通过function关键字声明的变量都会被解释器优先编译，不管声明在什么位置都可以调用它，但是它本身并不会被执行。
test(); // 测试
function test() {
  console.log("测试");
}
test(); // 测试
```

```js
// 表达式
// 这种写法不会导致函数提升，必须先声明后调用，不然就会报错。
test(); // 报错：TypeError: test is not a function
var test = function() {
  console.log("测试");
};
```

### 区别

1. 函数声明式变量会声明提前 函数表达式变量不会声明提前。
2. **函数声明**中的`函数名`是必需的，而**函数表达式**中的`函数名则是可选的`。
3. 函数表达式可以在定义的时候直接在表达式后面加()执行，而函数声明则不可以。

### 立即执行函数

**()，！，+，-，=等运算符都能起到立即执行的作用，这些运算符的作用就是将匿名函数或函数声明转换为函数表达式。**

```js
(function (test) {    //使用()运算符,输出123
    console.log(test);
})(123);

(function (test) {    //使用()运算符,输出123
    console.log(test);
}(123));

!function (test) {    //使用!运算符,输出123
    console.log(test);
}(123);
var fn = function (test) {  //使用=运算符,输出123
    console.log(test);
}(123);
```

**好处**：

- 不必为函数命名，避免了污染全局变量
- 立即执行函数内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量
- 封装变量

### 纯函数

- 概念：相同的输入，总是会的到相同的输出，并且在执行过程中没有任何副作用。

```js
let a = 1;
// a 可能会变化 不是纯函数
function xAdd(x) {
    return x + a;
};
xAdd(1); //2

// 纯函数
function sum(x, y) {
    return x + y;
};
sum(1,2); //3
```

**副作用**：（函数在执行过程中产生了**外部可观察变化**）

1. 发起HTTP请求
2. 操作DOM
3. 修改外部数据
4. console.log()打印数据
5. 调用Date.now()或者Math.random()

上面一系列操作都可以被称为是副作用。

数组的很多基本方法都是纯函数，例如`map`,`forEach`,`filter`,`reduce`等等。

## 原型链

每一个对象都有一个特殊的属性`prototype`作为该对象的原型

### 获取原型对象

```js
构造函数.prototype
对象实例.__proto__
Object.getPrototypeOf(对象实例)
```

### 原型对象属性

```js
function doSomething(){}
console.log(doSomething.prototype);
/*
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
*/
```

![img](https://static.vue-js.com/56d87250-725e-11eb-ab90-d9ae814b240d.png)

### 原型链

- 原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法
- 在对象实例和它的构造器之间建立一个链接（它是`__proto__`属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法

```js
// 实例代码
function Person(name) {
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```



![img](https://static.vue-js.com/60825aa0-725e-11eb-85f6-6fac77c0c9b3.png)

- 构造函数`Person`存在原型对象`Person.prototype`
- 构造函数生成实例对象`person`，`person`的`__proto__`指向构造函数`Person`原型对象
- `Person.prototype.__proto__` 指向内置对象，因为 `Person.prototype` 是个对象，默认是由 `Object `函数作为类创建的，而 `Object.prototype` 为内置对象
- `Person.__proto__` 指向内置匿名函数 `anonymous`，因为 Person 是个函数对象，默认由 Function 作为类创建
- `Function.prototype` 和 `Function.__proto__ `同时指向内置匿名函数 `anonymous`，这样原型链的终点就是 `null`

### 总结

每个对象的`__proto__`都是指向它的**构造函数的原型对象**`prototype`的

![img](https://static.vue-js.com/6a742160-725e-11eb-ab90-d9ae814b240d.png)

```js
// 每个对象的__proto__都是指向它的构造函数的原型对象prototype的
person1.__proto__ === Person.prototype
// 构造函数是一个函数对象，是通过 Function 构造器产生的
Person.__proto__ === Function.prototype
// 原型对象本身是一个普通对象，而普通对象的构造函数都是Object
Person.prototype.__proto__ === Object.prototype
// 刚刚上面说了，所有的构造器都是函数对象，函数对象都是 Function 构造产生的
Object.__proto__ === Function.prototype
// Object 的原型对象也有__proto__属性指向null，null是原型链的顶端
Object.prototype.__proto__ === null
```

- 一切对象都是继承自`Object`对象，`Object` 对象直接继承根源对象` null`
- 一切的函数对象（包括 `Object` 对象），都是继承自 `Function` 对象
- `Object` 对象直接继承自 `Function` 对象
- `Function`对象的`__proto__`会指向自己的原型对象，最终还是继承自`Object`对象

### 继承

|                  | ** 实现方式**                                                | **优缺点**                                                   |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **原型继承**     | 手动设置原型链实现继承： <br />🔸 `subObj.__proto__ == parentObj` <br />🔸 `Object.setPrototypeOf(obj , parentObj)` <br />🔸 `SubFunc.prototype = parentObj` <br />🔸 `Object.create(proto, propertiesObject)` | 🔴原型`__proto__`对象是共享的，大家共享原型上的属性值（特别是值为引用）<br/>🔴无法向父类传递参数 |
| **借用构造函数** | 调用构造函数，借用其`this`的属性、方法，本质是复制，没有“继承”关系。`parentFunc.call(this)` | 🟢避免了属性共享，可以传递参数<br/>🔴方法无法复用，每个实例对象都重新创建方法 |
| **组合继承**     | 上面两种的组合：<br/>🔸 借用构造函数：实现属性”继承“<br/>🔸 原型继承：实现方法继承、复用 | 🟢实现了方法的重用，解决了属性共享<br/>🔴至少调用两次父级构造函数？好像也不是什么大事 |
| **寄生组合**     | 组合继承的改进版，添加了用一个空构造函数包装父级原型         | 🟢在组合继承基础上，减少了一次父类构造函数的调用。<br/>🔴子级的原型`prototype`被覆盖了 |
| **增强寄生组合** | 寄生组合的改进版，把子类原型中的属性手动加回来               | 🟢解决了上面的问题                                            |
| **class类继承**  | extends，属性并没有在`class.prototype`里                     | 🟢属性是私有的，方法是共享的，支持传参                        |

#### 原型链继承

```js
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType(); 

SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue()); // true

```

#### 借用构造函数

```js
function Bird() {
    this.type = "sam";
    this.hi = function () { console.log("hi") };
}
function Duck() {
    Bird.call(this); // 强制修改 Bird() 的 this，借鸡下蛋
}
let duck = new Duck();
console.log(duck instanceof Bird);  //false  和 Bird 没继承关系
console.log(duck instanceof Duck);  //true
```

#### 组合继承

```js
function Bird(name) {
    this.name = name;
    this.colors = ["red"];
}
Bird.prototype.fly = function () { console.log(this.name + " fly!") };
Bird.prototype.type = "鸟类"; // 需要共享的属性

function Duck(name) {
    Bird.call(this, name);  // 借用构造函数：实现属性”继承“。调用一次Bird构造函数
    this.price = 100;
}
Duck.prototype = new Bird(); // 原型继承：实现方法继承、复用。调用一次Bird构造函数
// 修正constructor，不修正也没啥，就是别人用new duck.constructor("gaga")创建对象时不对
Duck.prototype.constructor = Duck;

let duck = new Duck("sam");
console.log(duck instanceof Bird);  // true
console.log(duck instanceof Duck);  // true
console.log(duck.fly == (new Duck()).fly);  // true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```

#### 寄生组合式继承

```js
function inherit(parentFunc, childFunc) {
    let SuperF = function () { };  //用一个空构造函数封装父级
    SuperF.prototype = parentFunc.prototype;
    childFunc.prototype = new SuperF(); //new 这个空构造函数，不用调用父级构造函数了。
    childFunc.constructor = childFunc;
}
//更粗暴的做法
function inherit2(parentFunc, childFunc) {
    childFunc.prototype = parentFunc.prototype; //修改prototype
    childFunc.constructor = childFunc;
}
//父级
function Bird(name) {
    this.name = name;
    this.colors = ["red"];
}
Bird.prototype.fly = function () { console.log(this.name + " fly!") };

//子类
function Duck(name) {
    Bird.call(this, name);
    this.price = 100;
}
Duck.prototype.cry = function () { console.log(this.name + " cry!") }; //Duck.prototype原有的属性被后面覆盖了
Duck.prototype = Bird.prototype; //修改prototype
Duck.constructor = Duck;
// inherit2(Bird, Duck);    //同上

let duck = new Duck("sam");
console.log(duck instanceof Bird);  //true
console.log(duck instanceof Duck);  //true
console.log(duck.fly == (new Duck()).fly);  //true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```

#### 增强寄生组合

```js
function inherit(parentFunc, childFunc) {
    let proto = parentFunc.prototype;
    //把子类原型的所有属性复制到一起
    Object.keys(childFunc.prototype).forEach(key =>
        Object.defineProperty(proto, key, { value: childFunc.prototype[key] }))
    childFunc.prototype = proto;
    childFunc.constructor = childFunc;
}
//父级
function Bird(name) {
    this.name = name;
    this.colors = ["red"];
}
Bird.prototype.fly = function () { console.log(this.name + " fly!") };
//子类
function Duck(name) {
    Bird.call(this, name);
    this.price = 100;
}
Duck.prototype.cry = function () { console.log(this.name + " cry!") };
inherit(Bird, Duck);

let duck = new Duck("sam");
duck.cry(); //sam cry!  //没有丢失
console.log(duck instanceof Bird);  //true
console.log(duck instanceof Duck);  //true
console.log(duck.fly == (new Duck()).fly);  //true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```


## Map&Set(Weak)

### Map

- Map对象以插入的先后顺序，存储键值对（key-value）形式的数据，任意数据类型都可以作为key或者value。
- 和Object类似，每个键都必须是唯一的，如果键的数据类型是原始数据类型则进行值比较，对象类型则进行引用比较。

```js
// Map初始化方式
// 传入二维数组
var m = new Map([[123, 'abc'], ['aaa', true]])
// 传入其他Map
// 浅拷贝，内部 value 如果是引用数据类型地址相同
var m = new Map(m)
```

### WeakMap

- WeakMap的key只能存储对象，而Map无论key还是value，都可以存储任意数据类型
- WeakMap存储的对象，如果没有其他的引用的话，这个对象将会被垃圾回收。这就是冠以 **Weak** 的原因，同时也意味着，WeakMap是不可枚举的，也就没有size。

#### 应用场景

##### 额外数据

经典的 WeakMap 应用的场景，也就是统计来访用户的数量，用户对象作为键而统计用户访问的次数

```js
let visitsCountWeakMap = WeakMap();
function countUser(user){
    let count = visitsCountWeakMap.get(user) || 0;
    visitsCountWeakMap.set(user, count + 1);
}
let tony = { name: "Tony" };
countUser(tony);
// 当 user 设置为 null 该用户访问的记录也就自动从 visitsCountWeakMap 中清除了
tony = null;
```

##### 缓存数据

第一次读取数据存入Map，之后从Map中读取缓存，如果数据消失，Map需要手动删除缓存而WeakMap不需要



### Map与Object

- Map的键可以是任何数据类型，Object的键只能是字符串或者Symbol
- Map可以通过size获取元素的个数，Object则没有
- Map本身就是一个迭代器，可以直接进行迭代；Object则需要借助Object对象的静态方法（`keys`、`values`、`entries`）去进行迭代
- Map序列化（`JSON.stringify`）后变成了普通的Object导致丢失本身的数据类型，需要自己去实现，同理，字符串解析成JSON对象也是无法支持Map

**Key顺序**：Map的key顺序是一直被维护的，按照时间顺序进行排序

Object的Key是无序的，但是在现代浏览器中可以对其进行预测：

- 如果当前的 `key` 是整数或者 `0`,就按照自然数的大小进行排序;
- 如果当前的 `key` 是字符类型的,则按照加入的时间顺序进行排序;
- 如果当前的 `key` 是 `Symbol` 类型的,则按照加入的时间顺序进行排序;
- 如果是以上类型的相互结合,结果是先按照自然数升序进行排序,然后按照非数字的 `string` 的加入时间排序,然后按照 `Symbol` 的时间顺序进行排序,也就是说他们会先按照上述的分类进行拆分,先按照自然数、非自然数、`Symbol` 的顺序进行排序,然后根据上述三种类型下内部的顺序进行排序。

**在频繁插入操作的情况，Map比Object性能表现更好，且耗时分布更加收敛。**

### Map与WeakMap

- Map：对于强类型需要长期在内存中维护 2 个用于 keys 和 values，当其他对象引用清空，因为 Map 会阻止对象被垃圾回收掉，所以Map可能会造成内存泄漏。
- WeakMap：而WeakMap只能使用对象作为Key，并且当对象没有引用的时候，该对象会被自动回收。

### Set&WeakSet

- WeakSet与WeakMap类似，他的值只能是引用数据类型

## 正则表达式

### 创建方式

- 字面量 `let reg = /\d+/`
- RegExp对象 `let reg = new RegExp('\\d+')`

#### 区别

- 使用RegExp需要转义符(在字符串中需要使用转义字符)

### 正则中的字符

- 选择符
    - 相当于或运算 `let reg = /abc|ABC/`
- 边界符
    - ^：匹配字符串的开始
    - $：匹配字符串的结束
    - `let reg = /^abc/`
- 模式修饰符
    - i: 不区分大小写 `let reg = /abc/i`
    - g: 全局搜索匹配所有内容
        - 在正则表达式中，默认是查找到了符合正则表达式的字符之后就不会继续往下查找，但是如果你想要继续查找，查找出全局符合条件的字符，那么就可以使用g这个修饰符。
    - m: 视为多行
        - 正则表达式默认解析是按照单行来进行匹配校验的，遇到换行符号`\n`会停止
    - s: 视为单行，忽略换行符 `let reg = /abc/s`
        - 默认情况下的圆点(.)是匹配除换行符\n之外的任何字符，加上s之后，.中包含换行符\n。
    - y: 从RegExp.lastIndex开始匹配
        - 使用g模式修饰符会一直匹配，但是如果加上y修饰符后如果从lastIndex开始匹配不成功就不继续匹配了。也就是说y模式在匹配不到时就会停止匹配。
    - u：u修饰符一般使用的不多，通常是作为对特定字符的匹配使用的，这里我们了解一下即可。 每个字符都有属性，比如字母的属性是L，标点符号的属性是P，这些属性必须搭配u修饰符才生效。
- 元字符

| 元字符 | 说明                                               | 示例          |
| ------ | -------------------------------------------------- | ------------- |
| \d     | 匹配任意一个数字                                   | [0-9]         |
| \D     | 匹配除了数字外的任意一个字符                       | [^0-9]        |
| \w     | 与任意一个英文字母，数字或下划线匹配               | [a-zA-Z0-9_]  |
| \W     | 与除了英文字母，数字，下划线之外的任意一个字符匹配 | [^a-zA-Z0-9_] |
| \s     | 匹配任意一个空白字符，如空格，换行符\n， 制表符\t  | [\n\t\f\v]    |
| \S     | 与除了空白字符的任一字符匹配                       | [^\n\t\f\v]   |
| .      | 匹配除换行符之外的任意字符                         | [^\n]         |
| \t     | 匹配水平制表符                                     |               |
| \n     | 匹配换行符                                         |               |
| \r     | 匹配回车符                                         |               |
| \v     | 匹配垂直制表符                                     |               |
| \f     | 匹配换页符                                         |               |

- 量词

**贪婪匹配**

| 符号     | 说明          |
|--------| ------------- |
| *      | 匹配0次或多次 |
| ?      | 匹配0次或1次  |
| +      | 匹配1次或多次 |
| `{n}`  | 匹配n次       |
| `{n,m}` | 匹配n~m次     |
| `{n,}`     | 匹配至少n次   |

**非贪婪匹配**

| 符号   | 说明                                             |
| ------ | ------------------------------------------------ |
| *?     | 匹配任意次，一旦找到就尽可能停止， 因此匹配0次   |
| +?     | 匹配1次或多次，一旦找到就尽可能停止，因此匹配1次 |
| ??     | 匹配0次或1次, 一旦找到就尽可能停止，因此匹配0次  |
| `{n,m}?` | 匹配n~m次, 一旦找到就尽可能停止，因此匹配n次     |
| `{n,}?`  | 匹配至少n次, 一旦找到就尽可能停止，因此匹配n次   |

- 组和范围
    - 字符集
    - 组

**字符集**

字符集是用[]来包裹字符，表示匹配这里面的某个元字符

- [] 只匹配其中的一个

- [^] 只匹配除了其中字符的任意一个元字符

- [0-9] 匹配0-9任何一个数字

- [a-z] 匹配小写a-z任何一个字母

- [A-Z] 匹配大写A-Z任何一个字母

**组**

组是用()来包裹字符，表示这是一个整体，如果要匹配多个元字符，可以使用组。 组是一次匹配多个元字符，而字符集是匹配任意一个元字符。

- 0: 匹配到的完整内容
- 1,2...: 匹配到的组
- index: 字符串中的位置
- input: 字符串
- groups: 字符串

**引用分组**

在使用正则的时候，有时候我们可能需要使用前面的组里面的内容，如果重复写的话很麻烦，这里我们直接引用分组，\n在匹配时引用组，$n指在替换的时候使用匹配的组的数据。其中n表示的是第几个组。

```js
let htmlStr = '<h1>我是标题1</h1><h2>我是标题2</h2><h3>我是标题3</h3>';
let reg = /<(h[1-6])>([\w\W]*)<\/\1>/g;
console.log(htmlStr.replace(reg, `<p>$2</p>`));  // <p>我是标题1</p><p>我是标题2</p><p>我是标题3</p>
```

**给组设置别名**

如果我们没有给组设置别名的话，在匹配出来的信息里面，groups的属性值是undefined。因此如果需要通过groups来判断因此需要设置别名。 设置组名使用`?<>`形式定义。

```js
let reg = /(?<tag>\w[0-9]{2,4})(?<data>\d{2,}\w)/;
console.log('sw127337w'.match(reg)); 
```

### 字符方法

#### mach

- match(): 直接使用正则表达式搜索获取内容，使用g的话就不会有详细信息了
- matchAll(): 使用正则表达式搜索, 返回迭代对象，但是要注意浏览器的兼容性

```js
let reg = /a/
'你是谁a我是a'.match(reg)
// [ 'a', index: 3, input: '你是谁a我是a', groups: undefined ]
// 如果使用 /g 模式修饰符则不会有详细信息，会返回一个匹配内容的数组
```

#### machAll

```js
let reg = /a/g
// matchAll返回一个迭代器
for (const regElement of '你是谁a我是a'.matchAll(reg)) {
    console.log(regElement)
}
[ 'a', index: 3, input: '你是谁a我是a', groups: undefined ]
[ 'a', index: 6, input: '你是谁a我是a', groups: undefined ]s
```

#### relpace

其中replace方法除了插入字符串之外，还可以插入以下变量：

- $$: 插入一个'$'
- $&: 插入匹配的子串
- $`: 插入当前匹配的子串的左边的内容
- $': 插入当前匹配的子串的右边的内容
- $n: 假如第一个参数是RegExp对象，那么插入第n个括号匹配的字符串

还可以使用回调函数处理复杂的替换逻辑。回调函数有以下几个变量：

- search: 第一个变量，表示匹配的字符串
- p1,p2,p3, ...: 假如第一个参数是RegExp对象，那么pn表示第n个括号匹配的字符串
- index: 匹配到的子字符串在原字符串中的偏移量
- string: 被匹配的原字符串
- group: 命名捕获组匹配的对象

```js
let reg = /(\w[0-9]{2,4})(\d{2,}\w)/;
'sw127337w'.replace(reg, (search, p1, p2, index, string, group) => {
  console.log('search', search);  // search w127337w
  console.log('p1', p1); // p1 w1273
  console.log('p2', p2); // p2 37w
  console.log('index', index); // index 1
  console.log('string', string); // string sw127337w
  console.log('group', group); // group undefined
}); 
```

### 正则方法

- test: 检测输入的邮箱是否合法。返回布尔值
- exec: 不使用g修饰符时与match方法使用相似，使用g修饰符后可以循环调用直到全部匹配完。 exec使用g模式修饰符时多次操作时使用同一个正则，即把正则定义为变量使用，最后匹配不到时返回null。

### 断言

- x(?=y): 先行断言：x 被 y 跟随时匹配 x。
- x(?!y): 先行否定断言：x没有被y紧随时匹配x。
- (?<=y)x: 后行断言：x跟随y的情况下匹配x。
- (?<!y)x: 后行否定断言：x不跟随y时匹配x。


## 数组

### 常用方法

- reduce

| 参数                                             | 描述                                                         |
| :----------------------------------------------- | :----------------------------------------------------------- |
| *function(total,currentValue, currentindex,arr)* | 必需。用于执行每个数组元素的函数。 函数参数:参数描述*total*必需。*初始值*, 或者计算结束后的返回值。*currentValue*必需。当前元素*currentIndex*可选。当前元素的索引*arr*可选。当前元素所属的数组对象。 |
| *initialValue*                                   | 可选。传递给函数的初始值                                     |

```
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

### 去重

- Set + Array.form：`const result = Array.form(new Set(arr))`
- 双重循环逐一比较使用`splice`删除
- 创建新数组存放，存放前判断新数组有无该元素 indexOf includes
- filter + indexOf pr Includes
- Map or 对象 去重

### 获取最值

- 遍历找寻最值即可
- reduce 方法
- sort 方法
- ES6 拓展运算符 `Math.max(...array)`

### 变量是否为数组

- `array instanceof Array`
- `Object.prototype.toString.call(array)`
- `Array.isArray`
- `arr.constructor === Array`
- `arr.__proto__ === Array.prototype`

### 同步遍历实现

- 将异步方法封装成 Promise

```js
let arr=[1,2,3,4,5];
function asyncEvent(ele){
    return new Promise(resolve=>{
    	setTimeout(e=>{
      		console.log(e);
      		resolve(e)
    },1000,ele);
  })
}
```

- 使用 async await 进行声明操作

```js
async function test(){
	for(let i=0;i<arr.length;i++){
   	     await asyncEvent(arr[i]);
        }
  	console.log("next");
}
test();
```

注意：map 与 forEach 不能实现该操作，因为两个函数内部是同步遍历，会再 Promise 返回前直接执行，每个的值都是 `Promise{<pending>}`


## 对象

### 对象方法

```js
Object.defineProperty(obj, prop, desc)
// obj 需要定义属性的当前对象
// prop 当前需要定义的属性名
// desc 属性描述符
```

```js
let temp = null
// desc 参数介绍
{
    value: '属性值', // 属性的值 (默认undefined)
    writable: true, // 是否可以改变 (默认false)
    // vue2 响应式原理
    get() {
      return temp  
    },
    set(val) {
       temp = val
    },
    // 是否可 重新使用 defineProperty 定义 删除属性
    configrable: true, // 描述属性是否配置以及可否可以通过delete删除
    // 是否可 枚举
    enumerable: true, // 描述属性是否会出现在for in 或者 Object.keys()的遍历中
    
}
```

- configrable 描述属性是否配置，以及可否可以通过delete删除(是否可配置)
    - 当我们之间在一个对象上定义某个属性时, configrable默认为true
    - 当我们通过属性描述符定义一个属性时,  configrable默认为false
- enumerable 描述属性是否会出现在for in 或者 Object.keys()的遍历中(是否枚举)
    - 当我们之间在一个对象上定义某个属性时, enumerable默认为true
    - 当我们通过属性描述符定义一个属性时,  enumerable默认为false

### 不可变对象

`const`关键字只提供了赋值的不变性。它并不提供值的不可更改性。

#### freeze

- Object.freeze() 会使属性不可更改
- `Object.isFrozen()`方法可以判断一个对象是否被冻结

`Object.freeze()`方法可以冻结一个对象。冻结一个对象后该对象的**原型也不能被修改**。`freeze()` 返回和传入的参数相同的对象。`Object.freeze()` 方法**不会影响嵌套对象**，如果需要冻结嵌套对象并使其不可变，则需要遵循递归方法逐级冻结。

#### seal

- Object.seal() 保护对象不添加和删除属性。它允许更新现有属性。
- `isSealed()` 方法来确认对象的密封状态。

#### preventExtensions

- Object.preventExtensions() 只防止向对象添加新的属性。

## Promise

### all

Promise.all()` 是一个内置的辅助函数，接受一组 `promise`（或者一个可迭代的对象），并返回一个`promise

```js
const allPromise = Promise.all([promise1, promise2, ...]);
allPromise.then((values) => {
    values; // [valueOfPromise1, valueOfPromise2, ...]
});
```

- allPromise 被成功解析，返回值为**各个 promise** 执行完成后返回的**数组值**。
- 只要有一个 promise 被 rejected，allPromise 会立即 rejected，不等待其他 promise 执行。

### race

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

## 作用域

TODO: 待学习更新,与变量声明合在一起
https://juejin.cn/post/7238762963908755493

```js
function fn(a) {
  console.log(a);
  var a = 2;
  function a() {}
  console.log(a);
}
fn(1)
```

```js
// 可以用 let 或者给 setTimeout 函数穿参
// let 是块级作用域，每次循环都会新建一个变量传递
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```
