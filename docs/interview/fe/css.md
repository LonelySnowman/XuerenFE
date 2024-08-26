# CSS

## link和@import的区别

- **从属关系**：link是html的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等；而@import是css的语法，只有导入样式表的作用。
- **加载顺序**：页面被加载时，link会和html同时被加载而；@import引入的 CSS 将在页面加载完毕后被加载。
- **兼容性**：@import是 CSS2.1 才有的语法，所以只能在 IE5以上 才能识别；而link是 HTML 标签，所以不存在兼容性问题。
- **DOM**：javascript只能控制dom去改变link标签引入的样式，而@import的样式不是dom可以控制的。
- link方式的样式**权重**高于@import的**权重**。

#### @import最优写法

```css
@import("style.css");
@import(style.css);
```

#### 适用方式

**@import适用于引入公共基础样式或第三方样式，link适用于自己写的且需要动态修改的样式**。

## 单位

### 绝对长度

| 单位 | 描述                       |
| :--- | :------------------------- |
| cm   | 厘米                       |
| mm   | 毫米                       |
| in   | 英寸 (1in = 96px = 2.54cm) |
| px * | 像素 (1px = 1/96th of 1in) |
| pt   | 点 (1pt = 1/72 of 1in)     |
| pc   | 派卡 (1pc = 12 pt)         |

### 相对长度

| 单位 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| em   | 相对于元素的字体大小（font-size）（2em 表示当前字体大小的 2 倍） |
| ex   | 相对于当前字体的 x-height(极少使用)                          |
| ch   | 相对于 "0"（零）的宽度                                       |
| rem  | 相对于根元素的字体大小（font-size）                          |
| vw   | 相对于视口*宽度的 1%                                         |
| vh   | 相对于视口*高度的 1%                                         |
| vmin | 相对于视口*较小尺寸的 1％                                    |
| vmax | 相对于视口*较大尺寸的 1％                                    |
| %    | 相对于父元素                                                 |



## 权重

- 通配符选择器 0
- 标签选择器 1
- 类选择器 10
- id选择器 100
- 行内样式 1000
- !important ∞（正无穷）

## 选择器

### 基础选择器

- ID选择器

```css
#id {}
```

- 类选择器

```css
.class {}
```

- 通配符选择器

```css
* {}
```

- 标签选择器

```css
div {}
```

- 属性选择器

```css
div[src] {}
div[src=className] {}
```

- [attr] 用来选择带有attr属性的元素
- [attr=xxx] 用来选择attr属性等于xxx的元素，如选择文本输入框，必须全等才可生效 `input[class="input text"]`
- [attr~=xxx] 这个选择器中间用了~=，选择属性值包含xx
- [attr|=xxx] 这个选择器是用来选择为xxx或者xxx- 开头的元素`attr="article_footer"`不会生效
- [attr^=xxx]，这个选择器会匹配xxx开头，实际就是用正则去匹配属性值，只要是xxx开头就行
- [attr$=xxx] 这个选择器用正则匹配属性以XXX结尾的元素
- [attr*=xxx] 这个选择器用正则匹配的方法来选择属性值中包含XXX字符的所有元素

### 组合选择器

- 后代选择器

```css
div p {}
```

- 子元素选择器

```css
div >p {}
```

- 相邻兄弟选择器

```css
// 匹配 A 后面第一个符合的元素
h1 +p {}
```

- 通用兄弟选择器

```css
// 匹配 A 后面符合的元素
h1 ~p {}
```

- 交集选择器

```css
// 均满足方可生效
.list-item.active {}
```

- 并集选择器

```css
h1,h2,p {}
```

### 伪类和为元素选择器

### 伪类

#### 标记状态

- :link 选取未访问过的超链接
- :visited 选取访问过的连接
- :hover 选取鼠标悬浮的元素
- :active 选取点中的元素
- :focus 选取获取焦点的元素

#### 筛选功能

- :empty 选取没有子元素的元素
- :checked 选取勾选状态下的input 元素  只对 radio 和checkbox 有效
- :disabled 选取禁用的表单元素
- :first-child 选取当前选择器下的第一个元素
- :last-child 选取当前选择器下的最后一个元素
- :nth-child(an+b) 选取指定位置的元素,参数支持an+b的形势.比如 li:nth(2n+1),就可以选取li元素序号是2的整数倍+1的所有元素,也就是1,3,5,7,9序号的li元素
- :nth-last-child(an+b) 和上面类似,不过从后面选取.
- :only-child 选取元素唯一的子元素,如果元素的父元素只有它一个子元素就会生效,如果还有其他的兄弟元素,则不生效
- :only-of-type 选取唯一的某个元素类型。如果元素的父元素只有它一个当前类型的子元素就会生效。

### 伪元素选择器

- ::first-line 为元素的第一行使用样式
- ::first-letter 为某个元素的首字母或第一个文字使用样式
- ::before 在某个元素之前插入内容
- ::after 在某个元素之后插入内容
- ::selection 对光标选中的元素添加样式

**注意**：

1. 伪元素构造的元素是虚拟的,所以不能使用js去操作
2. first-line和first-letter不使用于内联样式,在内联样式中都会失效
3. 如果同时使用了 befor 和first-letter. 第一个内容要从before中算起,如果before 中第一个为非文本内容,那first-letter也会作用到这个非文本内容上,但不会生效。
4. 在CSS3 中规定, 伪类用一个冒号 (:) 表示, 伪元素用两个冒号 (::)来表示

## flex

![img](https://pic4.zhimg.com/80/v2-54a0fc96ef4f455aefb8ee4bc133291b_720w.jpg)

```css
/* 如果你使用块元素如 div，你就可以使用 flex，而如果你使用行内元素，你可以使用 inline-flex */
display: flex | inline-flex;
```

### 容器属性

**flex-direction**

```css
/* 决定主轴排列的方向 */
flex-direction: row | row-reverse | column | column-reverse;
```

**flex-wrap**

```css
/* 决定主容器内项目是否可以换行 */
flex-wrap: nowrap | wrap | wrap-reverse;
```

- nowrap：不换行，调整容器内项目大小。
- wrap：换行，自上而下。
- wrap-reverse：换行，第一行在最下面，自下而上。

**flex-flow**

```css
/* lex-direction 和 flex-wrap 的简写形式 */
flex-flow: <flex-direction> || <flex-wrap>;
```

**justify-content**

```css
/* 定义了项目在主轴的对齐方式 */
justify-content: flex-start | flex-end | center | space-between | space-around;
```

- flex-start：左对齐。
- flex-end：右对其。
- center：居中。
- space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。（内容贴边）
- pace-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。

**align-items**

```css
/* 定义了项目在交叉轴上的对齐方式 */
align-items: stretch | flex-end | flex-start | baseline | center;
```

- stretch：默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。
- baseline：项目的第一行文字的基线对齐。

**align-content**

- 如果换行是行与行之间的关系

```css
/* 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用 */
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

### 元素属性

**order**

```css
/* 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0 */
order: <integer>;
```

**flex-basis**

```css
/* 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间 */
flex-basis: <length> | auto;
```

- **auto**：默认值，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。

**flex-grow**

```css
/* 定义项目的放大比例 */
flex-grow: <number>;
```

**要看该元素同其他元素相比的倍数**

- 默认值为 0，即如果存在剩余空间，也不放大。
- 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)
- 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

**flex-shrink**

```css
/* 定义了项目的缩小比例 */
flex-shrink: <number>;
```

- 默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。
- 这里可以看出，虽然每个项目都设置了宽度为 50px，但是由于自身容器宽度只有 200px，这时候每个项目会被同比例进行缩小，因为默认值为 1。
- 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。
- 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

**flex**

```css
/* flex-grow, flex-shrink 和 flex-basis的简写 */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

// 等价关系
.item {flex: auto;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}

.item {flex: none;}
.item {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
}

.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

**align-self**

```css
/* 允许单个项目有与其他项目不一样的对齐方式 */
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

## 常见布局

CSS 布局是指在网页上排版并定位元素的方式，常见的 CSS 布局包括：

1. **传统布局方案**：
    1. **盒模型布局**：盒模型布局是指通过设置元素的 margin、padding、border 等属性，控制元素在页面中的位置和大小。
    2. **浮动布局**：浮动布局是通过设置元素的 float 属性，使元素脱离文档流并向左或向右浮动，从而实现对页面布局的控制。
    3. **定位布局**：定位布局是指通过设置元素的 position 属性为 relative、absolute 或 fixed，控制元素在页面上的位置。
2. **弹性布局**：弹性布局是通过设置元素的 display 属性为 flex 或 inline-flex，控制元素在页面中的位置和大小，从而实现响应式布局。
3. **网格布局**：网格布局是通过设置元素的 display 属性为 grid，使用网格线将页面分为若干行和列，控制元素在页面中的位置和大小。

以上是常见的 CSS 布局，开发者可以根据具体的需求和情况选择合适的布局方式，从而实现对页面布局和样式的控制。

## transition

transition 是四个过渡属性的简写属性：

- transition-property：规定设置过渡效果的 CSS 属性的名称
- transition-duration：规定完成过渡效果需要多少秒或毫秒
- transiton-timing-function：规定速度效果的速度曲线
- transition-delay：定义过渡效果何时开始

默认值：`all 0 ease 0`

## float

### 清除浮动

- 父元素内部子元素全部浮动时，父元素的高度原先由子元素撑起，因为子元素浮动，导致**父元素高度坍塌**。

**简易解决方案**：

- 父元素**加高度**
- 父元素**浮动**
- 父元素**绝对定位**
- 父元素 `overflow:hidden`

#### clear:both

```html
<div class="father">
    <div class="son left"></div>
    <div class="son right"></div>
    <div class="clear"></div>
</div>
```

```css
.clear {
    /* 该属性的值指出了不允许有浮动对象的边情况，对象左边不允许有浮动、右边不允许有浮动、不允许有浮动对象 */
    /* clear : none|left|right|both */
    clear: both;
}
```

- 直接定义一个多余的元素语义化教差，可以使用伪元素

```html
<div class="father clear-float">
    <div class="son left"></div>
    <div class="son right"></div>
    <div class="clear"></div>
</div>
```

```css
.clear-float::after {
    content: '';
    display: block;
    clear: both;
}
```

## BFC

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context

`BFC` 全称：`Block Formatting Context`， 名为 "块级格式化上下文"。

**官方**：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

**理解**：`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用`BFC`呢，`BFC`可以看做是一个`CSS`元素属性

**这里简单列举几个触发`BFC`使用的`CSS`属性**：

- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

### 规则

- `BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列
- `BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由margin决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠
- 计算`BFC`的高度时，浮动元素也参与计算

### 解决问题

- float 父元素塌陷
- margin 重叠

## BEM规范

- Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

```css
.block {}

.block__element {}

.block--modifier {}
```

```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

```html
<!-- 对应的HTML结构如下 -->
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```

