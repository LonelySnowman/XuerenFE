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

## ⭐浏览器存储

- 浏览器主流存储方案共四种：Cookie、LocalStorage、SessionStorage、IndexedDB。
- 这里的存放数据大小由浏览器规定，不同浏览器大小会略有不同。

| 特性           | Cookie                                                       | LocalStorage                                   | SessionStorage                                 | IndexedDB                                      |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                       | 仅在当前会话下有效，关闭页面或浏览器后被清除   | 除非被清除，否则永久保存                       |
| 存放数据大小   | 约 4KB                                                       | 约 5MB                                         | 约 5MB                                         | 约 5-10MB，但可以更大，受限于浏览器和硬盘空间  |
| 与服务器端通信 | 每次都会携带在HTTP头中，发送给服务端。但是使用 cookie 保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不和服务器的通信 | 仅在客户端（即浏览器）中保存，不和服务器的通信 | 仅在客户端（即浏览器）中保存，不和服务器的通信 |

### Cookie

> 面试时经常会问到 Cookie 的一些常见属性，HttpOnly、Secure、SameSite 浏览器安全相关务必熟记。

- HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。
- 简单来说，Cookie 是一种解决 HTTP 协议无状态的方案，使一批 HTTP 通信中携带状态。常用于**记录登录态**：Session、JWT 等登录方案中都有使用。

**Cookie 有以下属性**：

- Name：Cookie 的 name。

- Value：Cookie 的 value。

- Domain： Cookie 的域。如果设成 xxx.com (一级域名)，那么子域名 x.xxx.com (二级域名)，都可以使用 xxx.com 的 Cookie。

- Path：Cookie的路径。如果设为 /，则同域名全部路径均可使用该 Cookie。如果设为 /xxx/ ，则只有路径为 /xxx/ 可以使用该Cookie。

- Expires/Max-Age：Cookie的超时时间。如果值为时间，则在到达指定时间后Cookie失效。如果值为Session(会话)，Cookie会同Session一起失效，当整个浏览器关闭的时候Cookie失效。

- Size：Cookie的大小。

- HttpOnly：值为 true 时，Cookie只会在Http请求头中存在，不能通过 doucment.cookie (JavaScript) 访问 Cookie。

- Secure：值为 true 时，只能通过 https 来传输 Cookie。

- SameSite：
    - 值为Strict，完全禁止第三方Cookie，跨站时无法使用Cookie。
    - 值为Lax，允许在跨站时使用Get请求携带Cookie，下面有一个表格介绍Lax的Cookie使用情况。
    - 值为None，允许跨站跨域使用Cookie，前提是将Secure属性设置为true。
- Priority ：Cookie的优先级。值为Low/Medium/High，当Cookie数量超出时，低优先级的Cookie会被优先清除。

**Cookie 可以通过 JS/HTTP 操作**：

JavaScript 操作，仅能访问 HttpOnly 为 false 的 Cookie。

```js
```

**请求携带 Cookie**：

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

## ⭐跨域

- 跨域是浏览器由于**同源策略**的安全防护方案，用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。
- **同源策略**的三大要素：协议相同、域名相同、端口相同。在当前网站使用 `XMLHttpRequest` 或 `Fetch` 发出网络请求时，其中任意一条不同都会触发跨域。
- 解决跨域的方案主要有 JSONP，CORS，代理三种。

**同源策略**

假设当前网页 URL 为 `http://store.company.com/dir/page.html`，与其他 URL 对比是否同源如下。

| URL                                               | 结果 | 原因                                |
| :------------------------------------------------ | :--- | :---------------------------------- |
| `http://store.company.com/dir2/other.html`        | 同源 | 只有路径不同                        |
| `http://store.company.com/dir/inner/another.html` | 同源 | 只有路径不同                        |
| `https://store.company.com/secure.html`           | 失败 | 协议不同                            |
| `http://store.company.com:81/dir/etc.html`        | 失败 | 端口不同（`http://` 默认端口是 80） |
| `http://news.company.com/dir/other.html`          | 失败 | 主机不同                            |

### JSONP

- script 标签默认情况下没有跨域限制，利用这个特性可以解决跨域。
  - 优点：兼容性更好。
  - 缺点：仅支持 GET 请求、需要服务端配合。


**使用方法**

- 前端需要提前声明好一个回调函数，并使用 script 标签请求服务端下发的 js 资源，服务端调用该全局函数并将 Data 作为参数传入。

```html
<script>
    const postMessage = () => {
        // 提前编写好回调函数接收资源
        window.onMessage = (data) => {
            console.log(data);
        }
        // 利用 script 标签发送跨域请求
        const script = document.createElement("script");
        script.src = "http://lonelysnowman.com/jsonp?callback=onMessage";
        /* 服务端会下发 js 资源供浏览器执行
        onMessage(['data1', 'data2']);
        */
        body.append(script);
    }
</script>
```

### CORS

- **跨源资源共享**（CORS，或通俗地译为跨域资源共享）是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。
- 简单来说，服务端可以通过设置 `Access-Control-Allow-Origin`、`Access-Control-Allow-Methods` 等 HTTP 头限制该次请求是否允许跨域。

**常见的相应头**(服务端设置)

- Access-Control-Allow-Origin：限制访问的域名来源，根据请求头的 Origin 进行判断。可设置值为具体的域名 `https://lonelysnowman.com` 或者允许所有源访问用 `*` 表示。
- Access-Control-Allow-Methods：对请求方式进行限制，允许的值为 `POST, GET, OPTIONS` 等请求方法。
- Access-Control-Allow-Headers: 对请求头进行限制，允许的值为 `X-PINGOTHER, Content-Type` 等请求头。

CORS 会将请求划分为 **简单请求** 和 **复杂请求**，复杂请求会在正式通信之前，增加一次 HTTP 查询请求，称为 **预检** 请求，该请求方法为 `Option`，通过该请求来知道服务端是否允许本次跨域请求。

简单请求需要满足以下条件（对前三点有印象即可，不用记的很详细）：

- 请求方式为这三种之一：GET、POST、HEAD。
- Contet-Type 为这三者之一：text/plain、multipart/form-data、application/x-www-form-urlencoded。
- 请求标头：除了被用户代理自动设置的标头字段，其余设置的标头必须在 CORS 允许的字段范围中：[对 CORS 安全的标头字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)。
  - 简单来说只能设置 CORS 允许的安全标头：`Accept`，`Accept-Language`，`Content-Language` 等。
- 如果请求是使用 `XMLHttpRequest` 对象发出的，在返回的 `XMLHttpRequest.upload` 对象属性上没有注册任何事件监听器；也就是说，给定一个 `XMLHttpRequest` 实例 `xhr`，没有调用 `xhr.upload.addEventListener()`，以监听该上传请求。
- 请求中没有使用 `ReadableStream` 对象。



#### 简单请求

- 我们看一次 CORS 经历的简单请求。

使用 GET 请求访问 `https://lonelysnowman.com/data`，HTTP 报文如下：

```http
GET /data HTTP/1.1
Host: lonelysnowman.com
Accept: text/html
Connection: keep-alive
Origin: https://snowhouse.space
```

服务端进行校验 Access-Control-Allow-Origin 为 * 允许任意 Origin 访问，则正常下发 HTTP 响应：

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: application/xml

[…XML Data…]
```

#### 复杂请求

- 复杂请求的预检机制是一层更安全的校验，会在预检请求中筛选出符合安全策略的请求。

浏览器发现该次请求为复杂请求，发起预检请求，并校验 Access-Control-Allow-Methods、Access-Control-Allow-Origin、Access-Control-Allow-Headers 是否满足要求，满足要求则发起正式请求。

```http
OPTIONS /data HTTP/1.1
Host: lonelysnowman.com
Origin: https://snowhouse.space
Accept: application/json;
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, X-MyHeader
```

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://snowhouse.space
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-MyHeader
```

预检请求校验通过，发起正式请求。

```http
POST /doc HTTP/1.1
Host: lonelysnowman.com
Origin: https://snowhouse.space
Accept: application/json;
Connection: keep-alive
X-MyHeader: my-header
```

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://snowhouse.space
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: application/json

[Some json payload]
```

>  只要服务端通过对应的库设置好 CORS 响应头，就可以很好的解决跨域问题。

### 代理

- 由于跨域是发生在浏览器中的，仅对浏览器发出的请求进行限制。我们可以在同源的路由下开启一个代理服务器进行数据的转发即可。下面是常见的两种代理方式。

**本地代理**

在本地开发过程中，我们想快速调用服务端的接口，可以直接利用 `webpack / vite` 的配置，这两个构建框架都提供了本地的 `node` 代理服务。

```js
// webpack 代理配置
module.exports = {
    port: 8080,
    devServer: {
        proxy: {
            // 将本地对 http://localhost:8080/api 的请求转发到 https://lonelysnowman.com
            '/api': 'https://lonelysnowman.com'
        }
    }
};
```

**生产环境代理**

生产环境中可以使用 nginx 进行代理，简易的配置文件如下：

```nginx
server {
    listen 80;
    server_name snowhouse.space;
    location / {
    	index index.html;
	}
    # 将 http://snowhouse.space/api 的请求转发至 http://lonelysnowman.com
    location /api {
        proxy_pass http://lonelysnowman.com;
    }
}
```



## ⭐浏览器安全

### XSS

#### 概念

- **跨站脚本攻击**（Cross-site scripting，XSS）是一种安全漏洞。攻击者可以利用这种漏洞在网站上注入恶意的客户端代码。当受害者运行这些恶意代码时，攻击者就可以突破网站的访问限制并冒充受害者。
- 简单举一个例子：

#### 分类

> 细分的分类很多，这里列举常见的三种。

- DOM 型 XSS：在客户端注入脚本并修改 DOM 的攻击。
  - 允许用户的交互框中被恶意注入 JS 脚本，被插入到 HTML 中。脚本不会经过服务端，仅在客户端产生。
  - 如果用户复制粘贴了黑客提供的信息输入，包含以下内容  `<script> // 将私密信息发送给黑客的代码 </script>`，就会有安全问题，导致用户隐私泄露。


- 反射型 XSS：
  - 在搜索场景中，大部分的网站都会在 URL 中拼接 query 作为搜索 key，并且会将 key 插入在界面中，如果用户访问了黑客提供的 URL：`https://lonelysnowman.com?key=<script> // 将私密信息发送给黑客的代码 </script>`，就会导致用户隐私泄露，用户输入的信息会经过服务端处理，但不会在服务端存储。

- 存储型 XSS
  - 在评论场景下，用户发送的评论会存储在服务端并展示给其他用户，如果黑客在评论中添加脚本会导致看到该评论的用户执行恶意脚本。

**最基础的 XSS 攻击代码**：

```html
<script>
window.onload = function() {
    const DIV = document.getElementById("div")
    const TEXT = document.getElementById("text")
    const BTN = document.getElementById("button")
    BTN.onclick = function() {
        // 直接将输入框的内容作为 HTML 插入
        DIV.innerHTML = TEXT.value
    };
    const params = new URLSearchParams(window.location.search)
    const query = params.get('key')
    // 直接将 URL query 的内容作为 HTML 插入
    DIV.innerHTML = query
}
</script>
<div id="div"></div>
<input id="input" type="text" />
<input id="button" type="button" />
```

#### 预防

- 对用户可能输入的地方，`input` 标签 `url` 等添加一些业务层面的校验，检查有无注入脚本等不安全行为并进行过滤。
- 使用 `innerHtml`，Vue 中的 `v-html`，React 中的 `dangerouslySetInnerHTML` 时需要注意对插入内容的校验，过滤不安全的插入。
- 设置 CSP `script-src` 校验，杜绝未知来源的资源加载。
- 核心 Cookie 添加 HttpOnly 与 Secure 属性，可以禁止 JS 脚本访问 Cookie，仅能通过 HTTPS 链接修改。

### CSRF

#### 概念

- **跨站请求伪造**（CSRF）是一种冒充受信任用户，向服务器发送非预期请求的攻击方式。

假设你被诱导访问 `https://fish.com` 网站，该网站中含有一些恶意攻击脚，可以向被攻击网站发送请求，且使用用户的登录信息。

```html
<html>
    <body>
        <!-- 利用 img 标签向被攻击网站发送 GET 请求 -->
        <img src="https://user.com?action=get&param=password" />
        <form action="https://user.com/password/change" method="POST">
            <input type="hidden" value="123456" />
        </form>
        <script>
            // 利用 Form 标签与 script 脚本模拟用户发送 POST 请求
            document.forms[0].submit();
        </script>
    </body>
</html>
```

#### 预防

- CSRF Token 验证，服务端动态生成一个校验 Token 下发给客户端，客户端在 HTTP Header 或者请求参数中携带 Token，服务端对 Token 进行过滤与校验。
- 设置 Cookie `SameSite ` 属性为 Strict，设置后仅同源 URL 可获取/携带 Cookie 信息。
- 服务端通过请求头 `Referer` 对请求的来源进行过滤与校验。

### CSP

#### 概念

- **内容安全策略**（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等。无论是数据盗取、网站内容污染还是恶意软件分发，这些攻击都是主要的手段。
- 简单来说 CSP 可以根据配置好的规则拦截不允许加载的网络资源，通过 `HTTP` 响应头或 `<meta/>` 标签设置。常用于防止 XSS 攻击。

#### 基本使用

**CSP 可以限制以下内容**

- default-src：如果未指定其他指令，则设置内容类型的默认源。
- script-src：控制哪些脚本可以在页面上执行。
- style-src：确定哪些样式表和 CSS 文件可以应用于页面。
- img-src：指定允许加载图像的来源。
- font-src：控制可以加载字体的源。
- connect-src：定义允许发出网络请求的来源。
- frame-src：指定页面可以嵌入框架或 iframe 的来源。
- media-src：确定加载音频和视频文件的允许来源。
- form-action：控制可以发送表单提交的目的地。
- base-uri：指定用于解析文档内相对 URL 的基本 URL。

**通过 `<meta />` 标签设置**

需要用 meta 标签，设置 http-equiv 与 content 属性即可，下面这段代码 `script-src 'self' https://snowhouse.space` 表示内联 script 及 snowhouse.space 域名脚本资源可加载：

```html
<head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://snowhouse.space; style-src 'self';">
    <!-- src 有以下可用值 'self' *.test.com test2.com * -->
</head>
```

**搭配 nonce 防止内联脚本注入**

nonce 属性可用于允许对特定资源的获取，如内联脚本或样式元素。它可以帮助你避免使用 CSP unsafe-inline 指令，该指令会允许你获取所有的内联脚本或样式资源。

```html
<head>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-随机ID';">
</head>
<body>
    <script nonce="随机ID"> // 此处 script 可加载 </script>
    <script> // 此处 script 不可加载 </script>
</body>
```

**通过 HTTP 响应头设置**

使用响应头 `Content-Security-Policy` 可进行 CSP 设置，key 与 value 同 meta 标签的用法。

```http request
Content-Security-Policy: default-src 'self'
```
