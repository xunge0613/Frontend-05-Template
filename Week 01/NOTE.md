# 学习笔记

## 直播课

今年已经在一家公司工作了 7 年，听了 winter 老师的分享，开阔了不少视野、受益匪浅。起初入行半年后，只有我一个前端，之后也一直堆砌业务搬砖，技术栈从 jq 变了很多技术栈到现在 react + ts，现在的事业部前端团队 3 人，发现自己代码还没有新招的 2 年的 6，而且写了近 2 年 antd，发现以前 H5 to C 的项目不太会了。

听了 winter 的直播课后，捋清了接下来的目标：补基础、多做工程型成就、想办法完成业务型成就（但感觉很难，日常都是做 antd 项目）

以及很重要的一点，坚持~

附：[winter 训练营开学直播课笔记](https://mubu.com/doc/68tbWgxAGeP)

## Tic Tac Toe

报这门课就是从手写 ToyReact 过来的，而当初自学 React 时也是写这个 Demo 也是挺有缘；另外也很久没有手写纯 JS 代码了，日常都是写的 React 在写 DOM 相关操作时还有些不习惯。

这个教程比较有趣的是后面的 AI 部分，通过递归来寻找最优解，像极了 LeetCode 的题目，自己手写实现后神清气爽。

### 知识点

`Object.create()` 是浅拷贝，会继承原数组的原型。性能**疑似**优于 JSON.parse(JSON.stringify())。拷贝一维数组后，修改拷贝后的 tmp 的值不会影响到原数组。

## 前端小书

一开始整理这个的过程时，有一种感觉想要加的东西太多了，也不知道该怎么分类比较好。

所以开挂选择参考了一下我 3 年前整理的前端开发知识点，[前端开发知识点整理](https://mp.weixin.qq.com/s/zgIC0y0-PXhoTisLDdzVHw)

修改了一番，感叹时间过得真快……

## 异步编程

### callback：利用函数回调的能力

- 特点：JS 在很多版本前唯一的方案，存在层级嵌套问题，回调地狱
- 缺点：
  - 运行效率
  - 阅读成本

### Promise： Promise / A+ 跨语言设计，从 V5 引入

- 特点：
  - 使用链式调用代替回调方式
  - then 可以 return 另一个函数
- 优点：
  - 没有嵌套，相对友好
- 编程思想：
  - Promise.all 同时等待多个 promise 执行
  - Race 进行竞争关系

### async / await：基于 Promise 实现异步，在语法上支持和封装

- 特点：
  - 本质上纯粹是语法上的改进
  - 可以像同步代码一样去写异步代码
  - 逐级调用到最后，一定是 return Promise 的结构
- 优点：
  - 方便替换异步逻辑

> eg：交警说不要自动控制，改为手动配置，即可以替换 sleep 为点击事件触发 resolve

### generator 早期人民的智慧，现在已经不推荐使用

- 特点：早年没有 async 时，会用 yield 去模拟 async / await
- 逻辑：generator 函数会返回 iterator 迭代器，每次取出 iterator,
  - 如果 done 说明结束了
  - 如果返回 promise 再次进行 then run iterator
  - 通过 CO 出来的逻辑，自动当做 await 去执行
- tips：while true 没有 Break 在同步代码很少见；但是异步中很常见 —— 业务（表盘）、操作系统事件循环、表示无限进行下去的业务

> eg： for await of + async generator， demo counter 函数
