# React

## Vue和 React

- 语法

1. `Vue template` 结构表现分离，`React` 用 `jsx` 结构表现融合，html/css都可以写到js里
2. `Vue API` 多，`React API` 少
3. 都可以通过 `props` 进行父子组件数据传递，只是 `Vue props` 要声明，`React` 不用声明可能直接使用
4. `Vue` 可以用插槽，`React` 是万物皆可 `props`
5. `Vue` 双向绑定，修改数据自动更新视图，而 `React` 单向数据流，需要手动 `setState`

- 技术选型

1. Vue提供了周边套件技术选型固定 Vue2 + Vuex + Vue-router，Vue3 + Pinia + Vue-router。
2. React更注重React本身的开发，周边库的开发交给了社区，状态库，你可以用 Redux、Mobx、Zustand、Recoiler、Dva 等。

- 响应式原理

1. Vue2 `Object.defineProperty` Vue3 `proxy`。
2. Vue3 基于状态，单向数据流，数据不可变，需要手动 `setState` 来更新。

- Diff算法

1. Vue2是同层比较新老 `vnode`，新的不存在老的存在就删除，新的存在老的不存在就创建，子节点采用双指针头对尾两端对比的方式，全量`diff`，然后移动节点时通过 `splice` 进行数组操作。
2. Vue3 优化在编译阶段**提前标记静态节点**，`Diff` 过程中直接跳过有静态标记的节点等等。
3. React 是递归同层比较，标识差异点保存到 `Diff` 队列保存，得到 `patch` 树，再统一操作批量更新 `DOM`。`Diff` 总共就是移动、删除、增加三个操作，如果结构发生改变就直接卸载重新创建，如果没有则将节点在新集合中的位置和老集合中的 `lastIndex` 进行比较是否需要移动，如果遍历过程中发现新集合没有，但老集合有就删除

总结：Vue 更规范，React 更灵活。

