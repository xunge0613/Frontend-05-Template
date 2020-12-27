# 思考题

## 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）

[MDN ::first-line (:first-line)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) 上看到这些内容，估计是为了避免产生冲突，以及避免修改盒模型后，导致第一行的元素内容不固定。

> ::first-line 伪元素只能在块容器中,所以,::first-line 伪元素只能在一个 display 值为 block, inline-block, table-cell 或者 table-caption 中有用.。在其他的类型中，::first-line 是不起作用的.
