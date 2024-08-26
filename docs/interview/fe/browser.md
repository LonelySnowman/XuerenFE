# 浏览器

## 浏览器渲染机制

![img](https://pic4.zhimg.com/80/v2-1d78cd3caa2ec9c1d1ccf72187280897_720w.webp)

1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，计算每个节点的位置。
5. 调用 GPU 绘制，合成图层，显示在屏幕上。

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
- CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element（也就是每个Frame
- 然后，计算每个Frame 的位置，这又叫layout和reflow过程。

### 调用Native GUI 绘制

## 浏览器存储

| 特性           | Cookie                                                       | localStorage                                   | sessionStorage                               |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------- |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                       | 仅在当前会话下有效，关闭页面或浏览器后被清除 |
| 存放数据大小   | 4KB左右                                                      | 一般为5MB                                      | 同localstroage                               |
| 与服务器端通信 | 每次都会携带在HTTP头中，发送给服务端。但是使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不和服务器的通信 | 同localstroage                               |

### cookie

由于 HTTP 是无状态的协议，不能保存每一次请求的状态，所以需要给客户端增加 Cookie 来保存客 户端的状态。 Cookie 的作用主要用于 `用户识别` 和` 状态管理 。`（比如网页常见的记住密码）

- **Secure** ：仅在 HTTPS 安全通信时才会发送 Cookie 。
- **HttpOnly** ：使用 Cookie 不能被 Javascript 脚本访问（`防止跨站脚本攻击 XSS 对 Cookie 信 息的窃取`）。
- **SameSite** ：`防止跨站伪造 CORF 的攻击 `
    - Strict ：浏览器完全禁止第三方请求携带 Cookie。
    - Lax ：只能在 get 方法提交表单 情况或者 a 标签发送 get 请求 的情况下可以携带 Cookie。
    - None ：默认，请求会自动携带上 Cookie，需要Secure为True。

#### 作用

身份验证和会话管理：Cookie常用于在用户进行身份验证后，在网站或应用程序中维护会话状态。它可以存储用户的认证凭据，使用户在访问不同页面时保持登录状态，并允许用户跨页面或浏览器再次访问时恢复其会话。

### 属性

Cookie属性

- Name：Cookie的name。

- Value：Cookie的value。

- Domain： Cookie的域。如果设成xxx.com(一级域名)，那么子域名x.xxx.com(二级域名)，都可以使用xxx.com的Cookie。

- Path：Cookie的路径。如果设为/，则同域名全部路径均可使用该Cookie。如果设为/xxx/，则只有路径为/xxx/可以使用该Cookie。

- Expires / Max-Age：Cookie的超时时间。如果值为时间，则在到达指定时间后Cookie失效。如果值为Session(会话)，Cookie会同Session一起失效，当整个浏览器关闭的时候Cookie失效。

- Size：Cookie的大小。

- HttpOnly：值为true时，Cookie只会在Http请求头中存在，不能通过doucment.cookie(JavaScript)访问Cookie。

- Secure：值为true时，只能通过https来传输Cookie。

- SameSite：
    - 值为Strict，完全禁止第三方Cookie，跨站时无法使用Cookie。
    - 值为Lax，允许在跨站时使用Get请求携带Cookie，下面有一个表格介绍Lax的Cookie使用情况。
    - 值为None，允许跨站跨域使用Cookie，前提是将Secure属性设置为true。
- Priority ：Cookie的优先级。值为Low/Medium/High，当Cookie数量超出时，低优先级的Cookie会被优先清除。

### localStorage

- 同源状态下，不同标签页之间均可读写，相互影响

生命周期是永久性的。localStorage存储的数据，即使关闭浏览器，也不会让数据消失，除非主动的去删除数据。如果 想设置失效时间，需自行封装。

### SessionStorage

- 同源状态下，经由跳转打开的 Session 会共享，相互影响。
- 新打开的 Session 不会共享。

生命周期是在浏览器相关

- 关闭浏览器或者页面，sessionStorage 就会失效
- 页面刷新不会消除数据
- 只有在当前页面打开的链接，才可以访sessionStorage的数据，使用window.open打开页面和改变localtion.href方式都可以获 取到sessionStorage内部的数据

## 跨域

### 同源策略

同源策略的三大要素：协议相同、域名相同、端口相同。

### JSONP

**原理**

- script 标签没有跨域限制

**使用方法**

- 声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)
- 服务器返回调用这个函数，并将参数传入此函数

**缺陷**

- 仅支持GET请求

### CORS

服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

#### 简单请求

**需满足下列条件**

使用下列方法之一：

- GET
- HEAD
- POST

Content-Type 的值仅限于下列三者之一：

- text/plain
- multipart/form-data
- application/x-www-form-urlencoded

#### 复杂请求

复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求，该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

预检请求后返回的验证

- Access-Control-Allow-Origin
- Access-Contol-Allow-Methods
- Access-Control-Allow-Headers

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66ee7e47326e4ecb876634672fa425db~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### Node代理

### Nginx代理

## 浏览器安全

### XSS

https://juejin.cn/post/7378750771414548534

- 跨站脚本 （XSS） 是一种攻击，攻击者将恶意脚本注入其他用户查看的网页中。这些脚本可以绕过同源策略，允许攻击者窃取敏感数据、劫持用户会话、破坏网站或传播恶意软件。

#### 分类

- DOM 型 XSS
- 反射型 XSS
- 存储型 XSS

#### 预防

- React与Vue默认将内容转为字符串解析，不会作为DOM解析。

### CSRF

- 用户包含`Cookie`在被攻击网站
- 诱导用户访问伪造网站

```html
<html>
    <body>
        <form action="https://vulnerable-website.com/email/change" method="POST">
            <input type="hidden" name="email" value="pwned@evil-user.net" />
        </form>
        <script>
            // 该网站跨可以向被攻击网站发送请求
            // 且使用用户的信息
            document.forms[0].submit();
        </script>
    </body>
</html>
```

#### 预防

- CSRF Token验证，存放在Session/浏览器存储中。
- Samesit Cookie属性（同站使用 Strict Lax None）。
- 检查 referer 字段，校验请求来源(一般跨域就可以拦截)。

### Sql注入


## CSP(待学习)

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

CSP 可以根据配置好的规则拦截不允许加载的网络资源。
可以通过 `HTTP` 响应头和 `<meta />` 标签设置。

default-src：如果未指定其他指令，则设置内容类型的默认源。
script-src：控制哪些脚本可以在页面上执行。
style-src：确定哪些样式表和 CSS 文件可以应用于页面。
img-src：指定允许加载图像的来源。
font-src：控制可以加载字体的源。
connect-src：定义允许发出网络请求的来源。
frame-src：指定页面可以嵌入框架或 iframe 的来源。
media-src：确定加载音频和视频文件的允许来源。
form-action：控制可以发送表单提交的目的地。
base-uri：指定用于解析文档内相对 URL 的基本 URL。

-  `<meta />` 标签使用
- script-src 'self' https://snowhouse.space 表示内联 script 及 snowhouse.space 域名可访问
```html
<head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://snowhouse.space; style-src 'self';">
</head>

```

- 响应头使用

```http request
Content-Security-Policy: <policy-directive>; <policy-directive>
```

nonce 属性可用于允许对特定资源的获取，如内联脚本或样式元素。它可以帮助你避免使用 CSP unsafe-inline 指令，该指令会允许你获取所有的内联脚本或样式资源。
```html
<head>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-随机ID';">
</head>
<body>
    <script nonce="随机ID">
      // 此处 script 可加载
    </script>
</body>
```
