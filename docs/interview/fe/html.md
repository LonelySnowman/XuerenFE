# HTML

## HTML渲染机制

![img](https://pic4.zhimg.com/80/v2-1d78cd3caa2ec9c1d1ccf72187280897_720w.webp)

### 解析三大件

- HTML/SVG/XHTML
- CSS
- JavaScript

一是HTML/SVG/XHTML，HTML字符串描述了一个页面的结构，浏览器会把HTML结构字符串解析转换DOM树形结构。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/31/169d470437a6c15a~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

二是CSS，解析CSS会产生CSS规则树，它和DOM结构比较像。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/31/169d478a0f4bd16c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

三是Javascript脚本，等到Javascript 脚本文件加载后， 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/31/169d4780e0a3fa44~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 构建DOM

![构建DOM的具体步骤](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/28/167f5262f5d0aadd~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

1. 浏览器从磁盘或网络读取**HTML**原始字节，并根据文件编码（例如UTF-8）将他们转化为**字符串**。在网络中传输的内容其实都是 0 和 1 这些字节数据。当浏览器接收到这些字节数据以后，它会将这些字节数据转换为字符串，也就是我们写s的代码。

2. 将字符串转换成**Token**，例如：`<html>`、`<body>`等。Token中会标识出当前Token是“开始标签”或是“结束标签”亦或是“文本”等信息。

   ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/28/167f54a4ce149a05~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

3. 生成节点对象并构建DOM

**注意：带有结束标签标识的Token不会创建节点对象。**

#### 构建CSSOM

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/28/167f55aabacd4bac~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

1. 浏览器接收到一段CSS
2. 识别出Token
3. 构建节点并生成CSSOM

**注意：CSS匹配HTML元素是一个相当复杂和有性能问题的事情。所以，DOM树要小，CSS尽量用id和class，千万不要过渡层叠下去**。



### 构造 Rendering Tree

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/28/167f5652521fea2f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



解析完成后，浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。

- Rendering Tree 渲染树并不等同于DOM树，渲染树只会包括需要显示的节点和这些节点的样式信息。
- CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element（也就是每个Frame）。
- 然后，计算每个Frame 的位置，这又叫layout和reflow过程。

### 调用Native GUI 绘制

## HTML分类

- 块级元素：div，p，h1，ol，ul，li
    - 独占一行
    - 可以设置宽高
    - margin和padding有效
- 行内块元素：img，input，button
    - 不独占一行
    - 可以设置宽高
    - margin和padding有效
- 行内元素：a，span，i，em，strong
    - 不独占一行
    - 不可设置宽高
    - margin和padding只有水平方向有效

### 类型转换

```css
div {
    display:inline;
    display:inline-block;
    display:block;
}
```

## attribute与property

- 属性（Attribute）通常以 HTML 标签的形式出现，作为标签的一部分，用于指定元素的初始状态。它们可以通过 HTML 属性和标签的属性值来定义，并且可以在 HTML 文档中进行静态解析和修改。
- 属性（Property）是指通过 JavaScript 对象来表示 HTML 元素的特性。在 HTML DOM（文档对象模型）中，每个 HTML 元素都对应一个 JavaScript 对象，这个对象具有与元素相关的属性。这些属性提供了对元素的动态访问和修改能力。
- 属性（Attribute）和属性（Property）之间通常存在关联，但并不总是一致的。在某些情况下，它们的名称和值是相同的，但在其他情况下，它们可能会有所不同。例如，HTML 的 `class` 属性对应 JavaScript 的 `className` 属性。

## DOM

### 创建结点

```js
// 创建文本结点
var text = document.createTextNode('文本结点');
// 创建标签
var tag = document.createElement('tagName');
// 克隆结点
var newNode = node.cloneNode();
```

### 添加结点

```js
// 给父节点添加子结点
node.appendChild(child)
// 将一个节点添加到父节点的指定子节点前面
node.insertBefore(child,指定元素)
```

### 删除结点

```js
node.removeChild(child);
```

