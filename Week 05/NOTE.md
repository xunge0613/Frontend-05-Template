# 学习笔记

## 第一~第六

一步步从 proxy 最基本的 get set 到后面的 reactive 和 effect 实现调色盘案例，其核心就是利用了 proxy 强大而危险的监听和处理。

## 第七小节

### 步骤

- 骨架代码
  - 绑定在 document 上，避免移开元素后事件无法处理
- 动起来：改变 transform
  - 识别鼠标起始点：在 mousedown 里存 x y 每次变化时的初始位置
  - 记录每次变化结束后的结束位置： baseX, baseY ，作为下一次变化的初始值

## 第八小节

方法：找最近的 range
