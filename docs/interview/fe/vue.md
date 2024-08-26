# Vue

## Vue2与Vue3的区别

### 生命周期

| vue2         | vue3           |
| ------------ | -------------- |
| beforCreated |                |
| created      |                |
| beforMount   | onBeforMount   |
| mounted      | onMounted      |
| beforUpdate  | onBeforUpdate  |
| beforDestory | onBeforUnmount |
| destoryed    | onUnmounted    |

### 多根节点

- `<template>` 标签中支持多根节点

### CompositionAPI

- **OptionsAPI => CompositonAPI**
- OptionsAPI同类型管理的方法数据分布在 data props computed methods 生命周期中，难以管理。
- CompositonAPI可将同逻辑内容写在一起便于管理。

### 异步组件

Vue3 提供 Suspense 组件，允许程序在等待异步组件加载完成前渲染兜底的内容，如 loading ，使用户的体验更平滑。使用它，需在模板中声明，并包括两个命名插槽：default 和 fallback。Suspense 确保加载完异步内容时显示默认插槽，并将 fallback 插槽用作加载状态。

```html
<tempalte>
    <suspense>
        <!--异步组件在加载完成前展示 #fallback中的内容-->
        <template #default>
            <List />
        </template>
        <template #fallback>
            <div>
            Loading...
            </div>
        </template>
    </suspense>
</template>
```

### Teleport

Vue3 提供 Teleport 组件可将部分 DOM 移动到 Vue app 之外的位置。

- **案例**：Message组件，Dialog组件

```html
<button @click="dialogVisible = true">显示弹窗</button>
 <!--将div移动到body中附加在末尾-->
<teleport to="body">
    <div class="dialog" v-if="dialogVisible">
    我是弹窗，我直接移动到了body标签下
    </div>
</teleport>
```

### 响应式原理

#### vue2

- Object.defineProerty 基本用法： 直接在一个对象上定义新的属性或修改现有的属性，并返回对象

```js
let obj = {};
let name = 'leo';
Object.defineProperty(obj, 'name', {
  enumerable: true,   // 可枚举（是否可通过 for...in 或 Object.keys() 进行访问）
  configurable: true,   // 可配置（是否可使用 delete 删除，是否可再次设置属性）
  value: '',   // 任意类型的值，默认undefined
  writable: true,   // 可重写
  // 获取该参数时调用的回调函数
  get() {
    return name;
  },
  // 删除|修改该参数时调用的回调函数
  set(value) {
    name = value;
  }
});
```

#### vue3

- Proxy Proxy 是 ES6 新特性，通过第2个参数 handler 拦截目标对象的行为。相较于 Object.defineProperty 提供语言全范围的响应能力，消除了局限性。

```js
new Proxy(target, handler)

var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

(1)、对象/数组的新增、删除

#### (2)、监测 .length 修改

(3)、Map、Set、WeakMap、WeakSet 的支持

### TS支持

Vue3 由 TypeScript 重写，相对于 Vue2 有更好的 TypeScript 支持。

## 路由History和Hash的区别

### Hash

- 监听事件`hashchange`进行回调函数的使用

hash 模式是一种把前端路由的路径用井号 `#` 拼接在真实 URL 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `hashchange` 事件。

- **优点**：浏览器兼容性较好，连 IE8 都支持
- **缺点**：路径在井号 `#` 的后面，比较丑

### History

- 调用HistoryAPI直接操作浏览器路由

- history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。
- 浏览器在刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前端通过 history API 设置的 URL，那么在服务端往往不存在这个资源，于是就返回 404 了。

- **优点**：路径比较正规，没有井号 `#`
- **缺点**：兼容性不如 hash，且需要服务端支持，否则一刷新页面就404了

## key的作用

diff 算法需要比对虚拟 dom 的修改，然后异步的渲染到页面中，当出现大量相同的标签时，vnode 会首先判断 key 和标签名是否一致，如果一致再去判断子节点一致，使用 key 可以帮助 diff 算法提升判断的速度，在页面重新渲染时更快消耗更少。

### 为什么key不能使用index

## watch和computed区别

- 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
- 是否调用缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
- 是否调用return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。
- computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true（immediate:true）
- 使用场景：computed----当一个属性受多个属性影响的时候，使用computed-----购物车商品结算。watch–当一条数据影响多条数据的时候，使用watch-----搜索框

### Computed

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/461b29f3e68a47d8ada6d8e14e95c3a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### Watch

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc40339bd89840f18b7a1b3abde014f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 总结

- computed支持缓存，相依赖的数据发生改变才会重新计算；watch不支持缓存，只要监听的数据变化就会触发相应操作
- computed不支持异步，当computed内有异步操作时是无法监听数据变化的；watch支持异步操作
- computed属性的属性值是一函数，函数返回值为属性的属性值，computed中每个属性都可以设置set与get方法。watch监听的数据必须是data中声明过或父组件传递过来的props中的数据，当数据变化时，触发监听器

## nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

`Vue` 在更新 `DOM` 时是异步执行的。当数据发生变化，`Vue`将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。

```js
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
this.$nextTick(function () {
    console.log(this.$el.textContent) // => '修改后的值'
})
```

### 为什么要有nexttick

```js
{{num}}
for(let i=0; i<100000; i++){
    num = i
}
```

如果没有 `nextTick` 更新机制，那么 `num` 每次更新值都会触发视图更新(上面这段代码也就是会更新10万次视图)，有了`nextTick`机制，只需要更新一次，所以`nextTick`本质是一种优化策略。

### 实现原理

1. 把回调函数放入callbacks等待执行
2. 将执行函数放到微任务或者宏任务中
3. 事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

## 组件传参

### 父子

**props 与 inject `default` 均可配置工厂函数注入**

- 父->子：props传参，数组 or 对象，vue2 props，vue3 defineProps，对象参数`required type default validator(自定义函数，接收value参数，返回boolean值)`
- 子->父：自定义事件 父定义事件@xxx="xxx"，子调用事件 vue2 用 `this.$emit('事件名', 参数)`，Vue3 用 `const emit = defineEmits([需要接收的事件名称字符串数组])` 返回一个函数便于调用，`emit('事件名'，参数)`。
- ref
    - 在父组件通过$refs可以拿到子组件的实例，从而调用实例里的方法来实现父子组件通信。
- 依赖注入
    - provide和inject，组件如果为多层嵌套，prors不会传递给孙组件


```js
// 普通配置
provide: {
    message: 'hello!',
}

// 使用函数的形式，可以访问到 `this`
provide() {
    return {
      message: this.message,
      message1: computed(() => this.message)
    }
}

// 常规注入，传入数组
inject: ['message']
// 传入对象
inject: {
    // 别名
    localMessage: {
      // 源属性名
      from: 'message',
      // 注入默认值
      default: 'default value'
    }
}
```



### 兄弟

- 全局事件总线
    - EventBus又称为事件总线，可以使用它来进行组件之间通信。其实和vuex还是有些类似的，相当于所有组件共用一个事件中心，这个事件中心用来管理事件，当我们需要用到的时候就向事件中心发送或者接受事件。通过共享一个vue实例，使用该实例的$on以及$emit实现数据传递。

```js
// Vue3 已经移除了 $on $off $once 方法，不支持eventBus
// eventBus.js
const eventBus = new Vue()
export default eventBus

// A 组件
import eventBus from './eventBus'
// 通过emit发送消息
eventBus.$emit('message')

// B组件
import eventBus from './eventBus'
// 通过$on接收消息
eventBus.$on('message', () => {
    console.log('收到消息!')
})
// 组件销毁时需要解绑监听
beforeDestroy () {
	eventBus.$off('message')
}
```

- Vuex

    - Vuex包含以下几个部分：全局唯一的状态管理仓库（state），同步操作（mutations）、异步操作（actions）、缓存依赖（getters），模块（modules）。

    - actions主要用于响应组件中的动作，通过 commit()来触发 mutation 中函数的调用, 间接更新 state，不是必须存在的；

      mutations主要用于操作修改数据，使用dispatch() 触发，是必须存在的；

    - actions可以进行**异步操作**，可用于向后台提交数据或者接受后台的数据；

      mutations中是**同步操作**，**不能写异步代码**、只能单纯的操作 state ，用于将数据信息写在全局数据状态中缓存，不能异步操作；

## 状态管理

### Pinia和vuex的区别

- `Vuex`的核心概念有`state`,`getters`,`mutations`（同步）,`actions`（异步）,`moudles`五个部分

  `Pinia`的核心概念有`state`,`getter`,`action`（异步同步）三个部分

- pinia他默认也是存入内存中，如果需要使用本地存储，在配置上比vuex麻烦一点

- pinia语法上比vuex更容易理解和使用，灵活。

- pinia没有modules配置，没一个独立的仓库都是definStore生成出来的

- pinia state是一个对象返回一个对象和组件的data是一样的语法

## 虚拟DOM

### 概述

```js
// 虚拟DOM
{
  tag:'div',
  props:{ id:'app', class:'container' },
  children: [
    { tag: 'h1', children:'沐华' }
  ]
}
```

它的表达方式就是把每一个标签都转为一个对象，这个对象可以有三个属性：`tag`、`props`、`children`

- **tag**：必选。就是标签。也可以是组件，或者函数
- **props**：非必选。就是这个标签上的属性和方法
- **children**：非必选。就是这个标签的内容或者子节点，如果是文本节点就是字符串，如果有子节点就是数组。换句话说 如果判断 children 是字符串的话，就表示一定是文本节点，这个节点肯定没有子元素

## 模板编译

```js
new Vue({
  render: h => h(App)
})
/*
render 函数是怎么来的有两种方式
第一种就是经过模板编译生成 render 函数
第二种是我们自己在组件里定义了 render 函数，这种会跳过模板编译的过程
*/
```

**模板编译流程**

- 提取出模板中的原生 HTML 和非原生 HTML，比如绑定的属性、事件、指令等等
- 经过一些处理生成 render 函数
- render 函数再将模板内容生成对应的 vnode
- 再经过 patch 过程( Diff )得到要渲染到视图中的 vnode
- 最后根据 vnode 创建真实的 DOM 节点，也就是原生 HTML 插入到视图中，完成渲染

### 详解

### baseCompile()

这就是模板编译的入口函数，它接收两个参数

- `template`：就是要转换的模板字符串
- `options`：就是转换时需要的参数

编译的流程，主要有三步：

1. 模板解析：通过正则等方式提取出 `<template></template>` 模板里的标签元素、属性、变量等信息，并解析成抽象语法树 `AST`
2. 优化：遍历 `AST` 找出其中的静态节点和静态根节点，并添加标记
3. 代码生成：根据 `AST` 生成渲染函数 `render`

**源码**

```tsx
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string, // 就是要转换的模板字符串
  options: CompilerOptions //就是转换时需要的参数
): CompiledResult {
  // 1. 进行模板解析，并将结果保存为 AST
  const ast = parse(template.trim(), options)
  
  // 没有禁用静态优化的话
  if (options.optimize !== false) {
    // 2. 就遍历 AST，并找出静态节点并标记
    optimize(ast, options)
  }
  // 3. 生成渲染函数
  const code = generate(ast, options)
  return {
    ast,
    render: code.render, // 返回渲染函数 render
    staticRenderFns: code.staticRenderFns
  }
})
```

**编译结果**

```html
<template>
    <div id="app">{{name}}</div>
</template>
```

```js
{
  ast: {
    type: 1,
    tag: 'div',
    attrsList: [ { name: 'id', value: 'app' } ],
    attrsMap: { id: 'app' },
    rawAttrsMap: {},
    parent: undefined,
    children: [
      {
        type: 2,
        expression: '_s(name)',
        tokens: [ { '@binding': 'name' } ],
        text: '{{name}}',
        static: false
      }
    ],
    plain: false,
    attrs: [ { name: 'id', value: '"app"', dynamic: undefined } ],
    static: false,
    staticRoot: false
  },
  render: `with(this){return _c('div',{attrs:{"id":"app"}},[_v(_s(name))])}`,
  staticRenderFns: [],
  errors: [],
  tips: []
}
```

### parse()

就是这个方法就是解析器的主函数，通过正则等方法提取出 `<template></template>` 模板字符串里所有的 `tag`、`props`、`children` 信息，生成一个对应结构的 ast 对象

`parse` 接收两个参数

- `template` ：就是要转换的模板字符串
- `options`：就是转换时需要的参数。它包含有四个钩子函数，就是用来把 `parseHTML` 解析出来的字符串提取出来，并生成对应的 `AST`

**核心步骤**

调用 `parseHTML` 函数对模板字符串进行解析

- 解析到开始标签、结束标签、文本、注释分别进行不同的处理
- 解析过程中遇到文本信息就调用文本解析器 `parseText` 函数进行文本解析
- 解析过程中遇到包含过滤器，就调用过滤器解析器 `parseFilters` 函数进行解析

**源码**

```js
export function parse (
  template: string, // 要转换的模板字符串
  options: CompilerOptions // 转换时需要的参数
): ASTElement | void {
  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    // 解析到开始标签时调用，如 <div>
    start (tag, attrs, unary, start, end) {
        // unary 是否是自闭合标签，如 <img />
        ...
    },
    // 解析到结束标签时调用，如 </div>
    end (tag, start, end) {
        ...
    },
    // 解析到文本时调用
    chars (text: string, start: number, end: number) {
      // 这里会判断判断很多东西，来看它是不是带变量的动态文本
      // 然后创建动态文本或静态文本对应的 AST 节点
      ...
    },
    // 解析到注释时调用
    comment (text: string, start, end) {
      // 注释是这么找的
      const comment = /^<!\--/
      if (comment.test(html)) {
      // 如果是注释，就继续找 '-->'
      const commentEnd = html.indexOf('-->')
      ...
    }
  })
  // 返回的这个就是 AST
  return root
}
```

上面解析文本时调用的 `chars()` 会根据不同类型节点加上不同 `type`，来标记 `AST` 节点类型，这个属性在下一步标记的时候会用到

| type | AST 节点类型           |
| ---- | ---------------------- |
| 1    | 元素节点               |
| 2    | 包含变量的动态文本节点 |
| 3    | 没有变量的纯文本节点   |

### optimize()

这个函数就是在 `AST` 里找出静态节点和静态根节点，并添加标记，为了后面 `patch` 过程中就会跳过静态节点的对比，直接克隆一份过去，从而优化了 `patch` 的性能

**过程**

**标记静态节点(markStatic)**。就是判断 type，上面介绍了值为 1、2、3的三种类型

- type 值为1：就是包含子元素的节点，设置 static 为 false 并递归标记子节点，直到标记完所有子节点
- type 值为 2：设置 static 为 false
- type 值为 3：就是不包含子节点和动态属性的纯文本节点，把它的 static = true，patch 的时候就会跳过这个，直接克隆一份去

**标记静态根节点(markStaticRoots)**，这里的原理和标记静态节点基本相同，只是需要满足下面条件的节点才能算作是静态根节点

- 节点本身必须是静态节点
- 必须有子节点
- 子节点不能只有一个文本节点

**源码**

```js
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // 标记静态节点
  markStatic(root)
  // 标记静态根节点
  markStaticRoots(root, false)
}
```

### generate()

```js
// 比如有这么个模板
<template>
    <div id="app">{{name}}</div>
</template>

// 上面模板编译后返回的 render 字段 就是这样的
render: `with(this){return _c('div',{attrs:{"id":"app"}},[_v(_s(name))])}`

// 把内容格式化一下，容易理解一点
with(this){
  return _c(
    'div',
    { attrs:{"id":"app"} },
    [  _v(_s(name))  ]
  )
}
```

#### render

这个 `with` 在 《**你不知道的JavaScript**》上卷里介绍的是，用来欺骗词法作用域的关键字，它可以让我们更快的引用一个对象上的多个属性

```js
const name = '掘金'
const obj = { name:'沐华', age: 18 }
// with 改变了词法作用域中属性的指向
with(obj){
    console.log(name) // 沐华  不需要写 obj.name 了
    console.log(age) // 18   不需要写 obj.age 了
}
```

**`_c`、 `_v` 和 `_s` 是什么**

`_c`(缩写) = `createElement`(函数名)

```js
// 其实不止这几个，由于本文例子中没有用到就没都复制过来占位了
export function installRenderHelpers (target: any) {
  target._s = toString // 转字符串函数
  target._l = renderList // 生成列表函数
  target._v = createTextVNode // 创建文本节点函数
  target._e = createEmptyVNode // 创建空节点函数
}
// 补充
_c = createElement // 创建虚拟节点函数
```



```js
with(this){ // 欺骗词法作用域，将该作用域里所有属姓和方法都指向当前组件
  return _c( // 创建一个虚拟节点
    'div', // 标签为 div
    { attrs:{"id":"app"} }, // 有一个属性 id 为 'app'
    [  _v(_s(name))  ] // 是一个文本节点，所以把获取到的动态属性 name 转成字符串
  )
}
```

#### generate

这个流程很简单，只有几行代码，就是先判断 `AST` 是不是为空，不为空就根据 AST 创建 vnode，否则就创建一个空 div 的 vnode。

- 先判断 `AST` 是不是为空，不为空就根据 AST 创建 vnode，否则就创建一个空div 的 vnode

```js
export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  // 就是先判断 AST 是不是为空，不为空就根据 AST 创建 vnode，否则就创建一个空div的 vnode
  const code = ast ? (ast.tag === 'script' ? 'null' : genElement(ast, state)) : '_c("div")'
  
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}
```

#### genElement()

> 这里还可以发现另一个知识点 v-for 的优先级要高于 v-if，因为先判断 for 的

```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) { // v-once
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) { // v-for
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) { // v-if
    return genIf(el, state)
     
    // template 节点 && 没有插槽 && 没有 pre 标签
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') { // v-slot
    return genSlot(el, state)
  } else {
    // component or element
    let code
    // 如果有子组件
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      // 获取元素属性 props
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }
      // 获取元素子节点
      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    // 返回上面作为 with 作用域执行的内容
    return code
  }
}
```

### 自定义Render

#### 渲染优先级

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdc3075e22f14a17a567ff3a9a09766b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**优先级 Render函数 > Template > El**

#### 更灵活的写法

```vue
<template>
    <h1 v-if="level === 1">
      <a href="xxx">
        <slot></slot>
      </a>
    </h1>
    <h2 v-else-if="level === 2">
      <a href="xxx">
        <slot></slot>
      </a>
    </h2>
    <h3 v-else-if="level === 3">
      <a href="xxx">
        <slot></slot>
      </a>
    </h3>
</template>
<script>
  export default {
    props:['level']
  }
</script>
```

```vue
<script>
  export default {
    props:['level'],
    render(h){
      return h('h' + this.level, this.$slots.default())
    }
  }
</script>

<script>
  export default {
    props:['level'],
    render(h){
      const tag = 'h' + this.level
      return (<tag>{this.$slots.default()}</tag>)
    }
  }
</script>
```

## 虚拟DOM Diff算法

   ```vue
   <template>
       <div id="app" class="container">
           <h1>沐华</h1>
       </div>
   </template>
   ```

```js
{
  type:'div',
  props:{ id:'app', class:'container' },
  children: [
    { tag: 'h1', children:'沐华' }
  ]
}
```

这样的 DOM 结构就称之为 **虚拟 DOM** (`Virtual Node`)，简称 `vnode`。

它的表达方式就是把每一个标签都转为一个对象，这个对象可以有三个属性：`type`、`props`、`children`

- **type**：必选。就是标签。也可以是组件，或者函数
- **props**：非必选。就是这个标签上的属性和方法
- **children**：非必选。就是这个标签的内容或者子节点，如果是文本节点就是字符串，如果有子节点就是数组。换句话说 如果判断 children 是字符串的话，就表示一定是文本节点，这个节点肯定没有子元素

### Diff算法

diff 算法在 vue 中被称作 patch

**执行时间**

- 首次渲染
- 组件中数据发生变化时

**计算**

![diff.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df749067cf03454ca8cb4c78067a3407~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**优化**

**只比较同一层级，不跨级比较**

![diff1.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca7547df4fb24a12ae9c87d1733b78b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**比较标签名**

如果同一层级的比较标签名不同，就直接移除老的虚拟 DOM 对应的节点，不继续按这个树状结构做深度比较，这是简化比较次数的第二个方面

![diff2.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fc6b71c2f9f4e069f878e816ac66f97~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**比较 key**

如果标签名相同，key 也相同，就会认为是相同节点，也不继续按这个树状结构做深度比较，比如我们写 v-for 的时候会比较 key，不写 key 就会报错，这也就是因为 Diff 算法需要比较 key

### 源码

#### patch

patch就是一个函数，主要可以接收四个参数：

- **oldVnode**：老的虚拟 DOM 节点
- **vnode**：新的虚拟 DOM 节点
- **hydrating**：是不是要和真实 DOM 混合，服务端渲染的话会用到，这里不过多说明
- **removeOnly**：transition-group 会用到，这里不过多说明

**主要流程**

- vnode 不存在，oldVnode 存在，就删掉 oldVnode
- vnode 存在，oldVnode 不存在，就创建 vnode
- 两个都存在的话，通过 sameVnode 函数(后面有详解)对比是不是同一节点
    - 如果是同一节点的话，通过 patchVnode 进行后续对比节点文本变化或子节点变化
    - 如果不是同一节点，就把 vnode 挂载到 oldVnode 的父元素下
        - 如果组件的根节点被替换，就遍历更新父节点，然后删掉旧的节点
        - 如果是服务端渲染就用 hydrating 把 oldVnode 和真实 DOM 混合

```js
// 两个判断函数
function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}
function isDef (v: any): boolean %checks {
  return v !== undefined && v !== null
}
return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 如果新的 vnode 不存在，但是 oldVnode 存在
    if (isUndef(vnode)) {
      // 如果 oldVnode 存在，调用 oldVnode 的组件卸载钩子 destroy
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }
    let isInitialPatch = false
    const insertedVnodeQueue = []
    
    // 如果 oldVnode 不存在的话，新的 vnode 是肯定存在的，比如首次渲染的时候
    if (isUndef(oldVnode)) {
      isInitialPatch = true
      // 就创建新的 vnode
      createElm(vnode, insertedVnodeQueue)
    } else {
      // 剩下的都是新的 vnode 和 oldVnode 都存在的话
      
      // 是不是元素节点
      const isRealElement = isDef(oldVnode.nodeType)
      // 是元素节点 && 通过 sameVnode 对比是不是同一个节点 (函数后面有详解)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 如果是 就用 patchVnode 进行后续对比 (函数后面有详解)
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        // 如果不是同一元素节点的话
        if (isRealElement) {
          // const SSR_ATTR = 'data-server-rendered'
          // 如果是元素节点 并且有 'data-server-rendered' 这个属性
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            // 就是服务端渲染的，删掉这个属性
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          // 这个判断里是服务端渲染的处理逻辑，就是混合
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn('这是一段很长的警告信息')
            }
          }
          // function emptyNodeAt (elm) {
          //    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
          //  }
          // 如果不是服务端渲染的，或者混合失败，就创建一个空的注释节点替换 oldVnode
          oldVnode = emptyNodeAt(oldVnode)
        }
        
        // 拿到 oldVnode 的父节点
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        
        // 根据新的 vnode 创建一个 DOM 节点，挂载到父节点上
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
        
        // 如果新的 vnode 的根节点存在，就是说根节点被修改了，就需要遍历更新父节点
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          // 递归更新父节点下的元素
          while (ancestor) {
            // 卸载老根节点下的全部组件
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            // 替换现有元素
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            // 更新父节点
            ancestor = ancestor.parent
          }
        }
        // 如果旧节点还存在，就删掉旧节点
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          // 否则直接卸载 oldVnode
          invokeDestroyHook(oldVnode)
        }
      }
    }
    // 返回更新后的节点
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
```

#### sameVnode

**这个是用来判断是不是同一节点的函数**

```js
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key 是不是一样
    a.asyncFactory === b.asyncFactory && ( // 是不是异步组件
      (
        a.tag === b.tag && // 标签是不是一样
        a.isComment === b.isComment && // 是不是注释节点
        isDef(a.data) === isDef(b.data) && // 内容数据是不是一样
        sameInputType(a, b) // 判断 input 的 type 是不是一样
      ) || (
        isTrue(a.isAsyncPlaceholder) && // 判断区分异步组件的占位符否存在
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

#### patchVnode

- 如果 oldVnode 和 vnode 的引用地址是一样的，就表示节点没有变化，直接返回
- 如果 oldVnode 的 isAsyncPlaceholder 存在，就跳过异步组件的检查，直接返回
- 如果 oldVnode 和 vnode 都是静态节点，并且有一样的 key，并且 vnode 是克隆节点或者 v-once 指令控制的节点时，把 oldVnode.elm 和 oldVnode.child 都复制到 vnode 上，然后返回
- 如果 vnode 不是文本节点也不是注释的情况下
    - 如果 vnode 和 oldVnode 都有子节点，而且子节点不一样的话，就调用 updateChildren 更新子节点
    - 如果只有 vnode 有子节点，就调用 addVnodes 创建子节点
    - 如果只有 oldVnode 有子节点，就调用 removeVnodes 删除该子节点
    - 如果 vnode 文本为 undefined，就删掉 vnode.elm 文本
- 如果 vnode 是文本节点但是和 oldVnode 文本内容不一样，就更新文本

#### updateChildren

**这个是新的 vnode 和 oldVnode 都有子节点，且子节点不一样的时候进行对比子节点的函数**

- 新的头和老的头对比
- 新的尾和老的尾对比
- 新的头和老的尾对比
- 新的尾和老的头对比。

![diff2.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b89cbc2280940038f5550bf9b7370aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

以上四种只要有一种判断相等，就调用 patchVnode 对比节点文本变化或子节点变化，然后移动对比的下标，继续下一轮循环对比。

如果以上四种情况都没有命中，就不断拿新的开始节点的 key 去老的 children 里找

- 如果没找到，就创建一个新的节点
- 如果找到了，再对比标签是不是同一个节点
    - 如果是同一个节点，就调用 patchVnode 进行后续对比，然后把这个节点插入到老的开始前面，并且移动新的开始下标，继续下一轮循环对比
    - 如果不是相同节点，就创建一个新的节点
- 如果老的 vnode 先遍历完，就添加新的 vnode 没有遍历的节点
- 如果新的 vnode 先遍历完，就删除老的 vnode 没有遍历的节点

## computed和watch

- 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
- 缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
- return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。
- 监听时间：computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true（immediate:true）
- 使用场景：
    - computed：一个属性受多个属性影响
    - watch：一个属性影响多个属性

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/461b29f3e68a47d8ada6d8e14e95c3a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc40339bd89840f18b7a1b3abde014f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## data为什么必须是函数

官方解释：当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

- 防止引用类型数据污染，一个组件可能有多个实例，使用函数返回每次的data都是新的地址。

## vue常见指令

### text html

- v-text主要用来更新textContent，可以等同于JS的text属性。
- v-text主要用来更新textContent，可以等同于JS的text属性。

### show if else-if else

- 表示隐藏与渲染，show `display:none`，if 直接渲染阶段pass

### for

### bind on model

- 数据绑定 `bind` 简写 `:`，`on` 简写 `@`，`v-model`

### pre once cloak

- pre，直接跳过该元素和子元素的编译过程 `v-pre` 会显示 {{data}}。
- once，该元素只在第一次渲染，之后均会被是为静态结点。
- cloak 在vue加载时会显示 {{ clock }} 原本的内容，解决屏幕闪烁问题，在 webpack vite 脚手架项目中不存在

```css
[v-cloak]{
    display: none;
}
```

## 生命周期

![生命周期.webp](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ccd16fe2d1942e699bde7a7971c26a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### beforeCreated

在组件实例初始化完成后立即被调用

- Vue实例刚在内存中创建，data和methods均没有被初始化。

### created

> 此处调用异步操作最佳

在组件实例处理完所有与状态相关的选项后调用

- 在Vue实例创建完毕状态，我们可以去访问data、computed、watch、methods上的方法和数据。
- 现在还没有将虚拟Dom挂载到真实Dom上，所以我们在此时访问不到我们的Dom元素（el 属性，ref 属性此时都为空）。

### beforeMount

在组件被挂载之前调用

- 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。

### mounted

> 此处操作 DOM 最佳

在组件被挂载之后调用

组件在以下情况下被视为已挂载：

- 所有同步子组件都已经被挂载。(不包含异步组件或 `<Suspense>` 树内的组件)
- 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

### beforeUpdate

在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用

- 这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。

### updated

在组件因为一个响应式状态变更而更新其 DOM 树之后调用。

- 这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 作为替代。

### beforeUnmount

在一个组件实例被卸载之前调用。

- 当这个钩子被调用时，组件实例依然还保有全部的功能。

### unmounted

在一个组件实例被卸载之后调用。

一个组件在以下情况下被视为已卸载：

- 其所有子组件都已经被卸载。
- 所有相关的响应式作用 (渲染作用以及 `setup()` 时创建的计算属性和侦听器) 都已经停止。

可以在这个钩子中手动清理一些**副作用**，例如**计时器**、**DOM 事件监听器或**者与服务器的连接。

## keepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

```html
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

### 包含/排除

KeepAlive 默认缓存所有组件实例，我们可以通过 `include` 和 `exclude` 指定需要被缓存的组件和不需要被缓存的组件。

```html
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

### 最大缓存数

使用 `max` 指定最大可以缓存的数量，类似 LRU 缓存，超过最大数量后，最久没有被访问的实例将会被清除。

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

### 生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

```js
export default {
  activated() {
    // 在首次挂载
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}
```

- `activated` 在组件挂载时也会调用，并且 `deactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。

## 插槽

### 默认插槽

```html
<!-- 子组件 -->
<template>
	<div>
        <!-- 默认插槽插入位置 -->
        <slot></slot>
    </div>
</template>
```

```html
<!-- 父组件 -->
<template>
	<div>
        <Child>
        	<h1>插入子组件</h1>
        </Child>
    </div>
</template>
```

> **注意**：插槽默认值直接传入在 `<slot>` 内部，`<slot> 默认值  </slot>`

### 具名插槽

- 可以给插槽标注具体的名称

```html
<!-- 子组件 -->
<template>
	<div>
        <!-- 插槽名称 head -->
        <slot name="head"></slot>
        <!-- 插槽名称 foot -->
        <slot name="foot"></slot>
    </div>
</template>
```

- 给`插槽`起了名称以后，我们在`父组件`中就可以使用`v-slot:name`或者`#name`往指定的`插槽`填充内容。

```html
<!-- 父组件 -->
<template>
	<div>
        <Child>
            <h1 #name>插入子组件 head</h1>
            <h2 #foot>插入子组件 foot</h2>
        </Child>
    </div>
</template>
```

> **注意**：默认插槽也具有默认 name，`name = default`

### 使用 template

- `v-slot`是写在`<template>`元素上，是比较推荐的写法，因为`<template>`在处理的过程中不会渲染成真实的`DOM`节点。

```html
<!-- 处理前 -->
<template v-slot="default">
  <h1>欢迎关注小土豆</h1>
</template>
<!-- 处理后 -->
<h1 data-v-2dcc19c8="">欢迎关注小土豆</h1>

<!-- 处理前 -->
<div class="text" v-slot="default">
  <h1>欢迎关注小土豆</h1>
</div>
<!-- 处理后 -->
<div data-v-2dcc19c8="" class="text">
  <h1 data-v-2dcc19c8="">欢迎关注小土豆</h1>
</div>
```

### 作用域插槽

- 可以使父组件获取到子组件的数据

```vue
<!-- 子组件 -->
<template>
	<div>
        <slot :value="value">
           	{{ value }}
        </slot>
    </div>
</template>
<script>
export default {
  name: 'Child',
  data() {
    return {
       value: '子组件的 value 值'
    }
  }
}
</script>
```

```html
<!-- 父组件 -->
<template>
	<div>
        <Child>
            <!-- 父组件使用相同的变量名称获取 value 值 -->
            <h1 :value="value">
            	{{ value }}
            </h1>
        </Child>
    </div>
</template>
```

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aceb582988664281ad14ff201a5de331~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
