# TypeScript

## interface 和 type

### interface

interface（接口） 是 TS 设计出来用于定义对象类型的，可以对对象的形状进行描述。

```ts
interface Person {
    name: string
    age: number
}

const person: Person = {
    name: 'lin',
    age: 18
}
```

### type

type (类型别名)，顾名思义，类型别名只是给类型起一个新名字。**它并不是一个类型，只是一个别名而已**

```ts
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver          // 联合类型
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n
    }
    else {
        return n()
    }
}
```

### 相同点

- 都允许继承

```ts
// type 与 interface 可以相互交叉继承
interface Person { 
  name: string 
}
interface Student extends Person { 
  grade: number 
}
type Person = { 
  name: string 
}
interface Student extends Person { 
  grade: number 
}
```

### 不同点

- type 可以声明基本类型、联合类型、交叉类型、元组，但是 interface 不可以
- interface 可以重复声明并且会合并，但是 type 不可以

## 内置类

### Record

以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填。

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
// keyof any = string | number | symbol
```



```ts
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
	x: number;
	y: number;
}
```

### Partial

将类型定义的所有属性都修改为可选。

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```



```ts
type Coord = Partial<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
	x?: number;
	y?: number;
}
```

### Required

跟Partial的作用是相反的，是让传入类型中的所有属性变成都是必填的。

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

```



### Readonly

不管是从字面意思，还是定义上都很好理解：将所有属性定义为自读。

```ts
type Readonly<T> = {
    readonly [K in T]: T[P]
}
```



```ts
type Coord = Readonly<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
    readonly x: number;
    readonly y: number;
}

// 如果进行了修改，则会报错：
const c: Coord = { x: 1, y: 1 };
c.x = 2;
```

### Pick

从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```



```ts
type Coord = Record<'x' | 'y', number>;
type CoordX = Pick<Coord, 'x'>;

// 等同于
type CoordX = {
	x: number;
}
```
