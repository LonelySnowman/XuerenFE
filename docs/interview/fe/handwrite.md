# 手写题

## 防抖

```js
let debounce = (fn, delay) => {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        let that = this
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}
```

## 节流

```js
let throttle = () => {
    let timer = null
    return function(...args) {
        if(!timer) {
            let that = this
            timer = setTimeout(() => {
                timer = null;
                fn.apply(that, args);
            }, delay);
        }
    }
}
```

## 懒加载

### 监听scrolls事件

- 刚开始将图片地址放置在 data-src 属性上，在图片进入可视区域后将 data-src 的值赋值在 src 上进行加载。

```js
function lazyload() {
  //获取可视区高度，兼容不同浏览器
  let viewHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight 
  let imgs = document.querySelectorAll('img[data-src]')
  imgs.forEach((item, index) => {
    if (item.dataset.src === '') return
    // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    let rect = item.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      item.src = item.dataset.src
      item.removeAttribute('data-src')
    }
  })
}
```

### IntersectionObserver

- `IntersectionObserver` 是一个比较新的 API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。
- `new IntersectionObserver(callback[, option])`：`callback`是可见性变化时的回调函数，`option`是配置对象（该参数可选）。

**实例对象包含三个方法**

```js
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();
```

**回调函数传入的第一个参数**

- `entries`：是一个数组，每个成员都是一个`IntersectionObserverEntry`对象。举例来说，如果同时有两个被观察的对象的**可见性发生变化**，`entries`数组就会有两个成员。

```js
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```

- `IntersectionObserverEntry`对象提供目标元素的信息，一共有六个属性。

```javascript
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```

- `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- `target`：被观察的目标元素，是一个 DOM 节点对象
- `rootBounds`：根元素的矩形区域的信息，`getBoundingClientRect()`方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回`null`
- `boundingClientRect`：目标元素的矩形区域的信息
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
- `intersectionRatio`：目标元素的可见比例，即`intersectionRect`占`boundingClientRect`的比例，完全可见时为`1`，完全不可见时小于等于`0`
- `isIntersecting`：返回一个布尔值，如果目标元素与交叉区域观察者对象 (intersection observer) 的根相交，则返回 `true` .如果返回 `true`, 则 `IntersectionObserverEntry` 描述了变换到交叉时的状态; 如果返回 `false`, 那么可以由此判断，变换是从交叉状态到非交叉状态。

#### 懒加载实现

```js
// 获取全部需要懒加载的 img
const imgs = document.querySelectorAll('img[data-src]')
const config = {
  rootMargin: '0px',
  threshold: 0,
}
let observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    // 是否在交叉区域内
    if (entry.isIntersecting) {
      let img = entry.target
      let src = img.dataset.src
      if (src) {
        img.src = src
        img.removeAttribute('data-src')
      }
      // 解除观察
      self.unobserve(entry.target)
    }
  })
}, config)

// 监视所有 img
imgs.forEach((image) => {
  observer.observe(image)
})
```

## 深拷贝

```js
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap()

    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target ) || typeof target === 'function'
    }

    function clone(data) {

        // 基础类型直接返回值 number string boolean symbol null undefined bigint
        if (!isObject(data)) {
            return data
        }

        // 考虑循环引用问题
        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }

        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }

        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }

        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }

        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 说明是 Object

        // 获取全部的键名数组(包含字符串与Symbol)
        const keys = Reflect.ownKeys(data)

        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = {}

        // 新对象加入到map中 便于之后进行循环引用
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}
```

## bind

```js

```

## canvas压缩图片

File --> base64 data URI --> canvas draw image --> base64 data URI --> Blob

经过多组测试发现，使用canvas压缩体积的时候，**文件体积过小反而会出现越压缩体积越大**的情况

```js
input.onchange = function (e) {
  const file = e.target.files[0]
  // console.log(file)
  compressPic(file).then(resultFile => {
    formData.append('file', resultFile)
  })
}
function compressPic(file, encoderOtp = 0.2) {
  return new Promise(resolve => {
    // 1. 通过FileReader读取文件
    const reader = new FileReader()
    let res = reader.readAsDataURL(file)
    reader.onload = (event) => {
      // 2. 读取完毕之后获取图片的base64(上文伏笔),并创建新图片
      const { result: src } = event.target
      const image = new Image()
      image.src = src
      image.onload = () => {
        // 3.图片加载完之后通过canvas压缩图片
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        // 3.1 绘制canvas
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        // 3.2 返回图片url地址,并且进行压缩
        const canvasURL = canvas.toDataURL(file.type, encoderOtp)
        const buffer = atob(canvasURL.split(',')[1])
        // 3.3 bufferArray 无符号位字节数组 相当于在内存中开辟length长度的字节空间
        let length = buffer.length
        const bufferArray = new Uint8Array(length)
        // 3.4 给新开辟的bufferArray赋值
        while (length--) {
          bufferArray[length] = buffer.charCodeAt(length)
        }
        // 3.5将压缩后的文件通过resolve返回出去
        const resultFile = new File([bufferArray], file.name, { type: file.type })
        console.log(resultFile)
        resolve(resultFile)
      }
    }
  })
}
```

首先监听input的change事件获取到`event.target.files[0]` File 文件对象，通过 FileReader `reader.readAsDataURL(file)` 将其转化为 Base64 `reader.onload` 当Base64转化完毕时进行压缩，将Base64转化为Image对象，`canvas.getContext('2d')` 获取 ctx 对象，`ctx.drawImage(image, 0, 0, image.width, image.height)` `image.src = src`

使用 canvas 压缩 image `canvas.toDataURL(file.type, encoderOtp)`得到一个新的压缩后的Base64

## 数组扁平化

```js
function flat(arr){
	if(Object.prototype.toString.call(arr) != "[object Array]"){return false};
	let res = [];
	for(var i=0;i<arr.length;i++){
		if(arr[i] instanceof Array){
			res = res.concat(flat(arr[i]))
		}else{
			res.push(arr[i])
		}
	}
	return res;
};
```

## 垂直水平居中

### flex

```css
.app{
    display: flex;
    align-items: center;
    justify-content: center;
}
.app>div{
    background: blueviolet;				
}
```

### grid

```css
.app {
    display: grid;
    width: 500px;
    height: 500px;
    background: greenyellow;
}
.app>div {
    width: 100px;
    height: 100px;
    align-self: center;
    justify-self: center;
    background-color: aliceblue;
}
```

### absolute + margin

```css
.app{
    width: 500px;
    height: 500px;
    background: greenyellow;
    position: relative;
}
/*  
因为默认垂直方向上没有剩余空间 如果子元素设置了绝对定位且四边都设为0，子元素会填充整个父元素的所有剩余空间，auto就能平均分配水平和垂直方向的剩余空间了。
*/
.app>div{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    margin: auto;
} 
```

### absolute + translate

```css
.app{
    width: 500px;
    height: 500px;
    background: greenyellow;
    position: relative;
}
.app>div{
    width: 100px;
    height: 100px;
    font-size: 20px;
    background: blueviolet;	
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
```

### absolute + calc

```css
.app {
    width: 500px;
    height: 500px;
    background: greenyellow;
    position: relative;
}
.app>div{
    position: absolute;
    width: 100px;
    height: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    background-color: aliceblue;
}
```

**混合使用，margin + translate 一个水平一个垂直**

## 固定宽高比

如果元素的尺寸已知的话，没什么好说的，计算好宽高写上去就行了。

如果元素尺寸未知，最简单的方法是用 JavaScript 实现，如果用 CSS 的话可以分为以下几种：

- 如果是可替换元素`<img>`或`<video>`，该怎么实现?
- 如果是普通的元素，又应该怎么实现？

### Video 和 img

```css
img, video {
    /* 固定一个 height or width 另一个 auto */
    height: 100%;
    width: auto;
}
```

### 普通元素

```js
.intrinsic-aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding: 0;
  padding-bottom: 75%;
  margin: 50px;
  background-color: lightsalmon;
}
.content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

## Promise

### all

```js
Promise.prototype.myAll = (arr) => {
    if (!Array.isArray(arr)) return new Error('Param is not Array!')
    const counter = arr.length
    let counts = 0
    let ans = []
    return new Promise((resolve, reject) => {
        for (const item of arr) {
            Promise.resolve(item).then(res=>{
                counts++
                ans[i] = res
                if (counts == counter) resolve(ans)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}
```

### race

```js
Promise.prototype.myRace = (arr) => {
    if (!Array.isArray(arr)) return new Error('Param is not Array!')
    return new Promise((resolve, reject) => {
        for (const item of arr) {
            Promise.resolve(item).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}
```

### 请求并发

https://juejin.cn/post/7203648441720225852

### 手写 Promise
