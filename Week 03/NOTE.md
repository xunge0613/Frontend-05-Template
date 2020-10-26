# 第三周： 使用 LL 算法构建 AST

> 本周目标：学习编译原理相关知识，使用 LL 算法 构建 AST 抽象语法树

## 第一小节

### 简介

构建语法树 —— 语法分析

代码第一步：分词

把词构成层层嵌套的树形结构

#### 主要算法

- LL：从左到右扫描，从左到右规约具体扫描规约到实际代码里去看

  > 具体扫描规约到实际代码里去看

- LR

### 案例：四则运算的分析

图

![](https://api2.mubu.com/v3/document_image/c272b07f-b163-4c70-8af2-6bb83e769797-1434819.jpg)

### 知识

- 词法分析
- 正则

### 定义

#### 词法定义 （token）

有意义字符：

- number 0~9, .小数点
- operator +-\*/

#### 格式化字符

- 空格 `<SP>`
- 换行 `<LF> <CR>`
- 语法定义

图解

![](https://api2.mubu.com/v3/document_image/ce0863a5-20cc-4a47-9bb7-94104acf6dfd-1434819.jpg)

- 蓝色背景：终结符 Terminal Symbol —— 直接从词法里面扫描出来的

> EOF 标识了所有源代码的结束

- 白色背景：非终结符 —— 拿终结符的组合定义出来的

#### 特点

- 操作符有优先级
- JavaScript 部分的产生式来定义运算

#### 做成嵌套结构

- 加法：
  - 由左右两个乘法构成的（有优先级）
  - 使用递归来重复自身的序列（支持连加）
- 乘法
  - 单独的数字也认为是一个一项的乘法

### LL 语法分析思路

图

![](https://api2.mubu.com/v3/document_image/0d314bed-5508-4207-918b-53bd5b14e18e-1434819.jpg)

#### 先看第一个 Symbol 会是什么?

- 情况 1：开头是 `<MultiplicativeExporession>`
- 情况 2： `<AdditiveExporession>` 递归

#### 如果是情况 1，展开乘法表达式

图

![](https://api2.mubu.com/v3/document_image/76fd54f9-d3a5-42bd-9c8f-3d068c663f20-1434819.jpg)

##### 步骤

- 情况 a：Number
- 情况 b：`<MultiplicativeExporession>`
- 情况 c：`<AdditiveExporession>`

##### 然后再看第二个输入的元素，是 乘号/除号还是加号、减号因为原来的 `<MultiplicativeExporession>` 还是在的

> 因为原来的 `<MultiplicativeExporession>` 还是在的

## 第二小节

### 编码步骤

#### 正则表达式

##### 结构

- 或关系分开

- 每个里面都有一个圆括号

> 一旦捕获了，那么除了字符串整体会被匹配，圆括号内捕获 的内容也会被匹配

说明：整体匹配的内容每次只会匹配到一个或关系分支里面

### 给正则每个分支起名 token 名

`Number[0-9\.]+`

> [0-9\.]+

`Whitespace[ \t]+`

> [ \t]+

`LineTerminator[\n\r]+`

> [\n\r]+

`+ - * \`

> \\+ \\- \\\* \\/

#### tokenize：循环遍历字符串，使用正则匹配进行分词

### 验证

#### 问题 1：每次打印了一堆信息

图

![](https://api2.mubu.com/v3/document_image/0acc97a0-b1b6-49c7-9a83-2ca046996b93-1434819.jpg)

解决：把下面输出 result 移到 for 循环外

Done

![](https://api2.mubu.com/v3/document_image/6aa37e04-3bb1-4ce3-9a4b-c13d3147f2a1-1434819.jpg)

## 第三小节

### 目标

- 整理、美化代码
- 设计使用的方法

### 步骤

- lastIndex 来检测是否有未识别的字符
- 使用 token 对象来记录 type , value
- 使用 yield generator 遍历字符串，输出每一轮的结果

## 结果

### 第一次调试

图

![](https://api2.mubu.com/v3/document_image/483df999-3bd7-4ca6-9722-dab495f01e09-1434819.jpg)

## 第四小节：语法分析一

目标：MultiplicativeExpression

### LL 语法分析结构

每个产生式对应一个函数

### 步骤 & 思路

先从最简单的开始 —— 最接近终结符：MultiplicativeExpression

图

![](https://api2.mubu.com/v3/document_image/794d5513-b06c-4a4e-b46a-c89c2f2d7c84-1434819.jpg)

#### 分支

##### 三种 token 情况

- source[0] === Number

> 替换 source[0] 为 MultiplicativeExpression

- source[0] === MultiplicativeExpression && source[0] === [*/]

> 合并前三项为新的 MultiplicativeExpression

##### 其余情况

- 异常字符
- EOF

### 验证

图：第二轮

![](https://api2.mubu.com/v3/document_image/aaa8e63e-e86f-45ed-b52e-3b4f9ffc6ea2-1434819.jpg)

图：第三轮

![](https://api2.mubu.com/v3/document_image/4bb75ca4-6047-4003-aebd-6a0641407154-1434819.jpg)

图：最终

![](https://api2.mubu.com/v3/document_image/19bcff20-45b8-4952-a402-c327fef9ea7c-1434819.jpg)

## 第五小节：语法分析二

> 目标：AdditiveExpression、Expression

### 思路 & 步骤

图

![](https://api2.mubu.com/v3/document_image/8e2f134f-b9c0-47cd-a181-19ca66d7a54c-1434819.jpg)

![](https://api2.mubu.com/v3/document_image/fa0760aa-e717-4b69-b5cd-947c98d63c81-1434819.jpg)

#### 复制 MultiplicativeExpression 并调整

##### 调整内容

- 第一项：如果不是 AdditiveExpression，则先执行 MultiplicativeExpression 使之转换为特殊的 AdditiveExpressionMultiplicativeExpression(source)

> MultiplicativeExpression(source)

- 第三项：根据 AdditiveExpression 表达式定义第三项一定是 MultiplicativeExpression，所以也要先特殊处理 MultiplicativeExpression(source)

![](https://api2.mubu.com/v3/document_image/0df4804a-94b1-4e60-8be1-ee8a491bbf81-1434819.jpg)

> MultiplicativeExpression(source)

#### 验证

图

![](https://api2.mubu.com/v3/document_image/2a058af8-02b9-4d3c-b858-333c4ef00340-1434819.jpg)

#### 结论

得到了一个 AdditiveExpression + MultiplicativeExpression 的结构；正确，需要进行下一步操作

### 把表达式整体加上 EOF 产生一下

#### 理解

**类比 AdditiveExpression**。是把表达式整体转换为只包含以下三种的结构之一

- AdditiveExpression
- \+ \-
- MultiplicativeExpression

那么 Expression。是把整体表达式转换为只包含 AdditiveExpression 和 EOF 的步骤（也就是定义）

![](https://api2.mubu.com/v3/document_image/78fb6245-042e-44d3-9e94-af50122b0525-1434819.jpg)

### 思路 & 步骤

- 具体执行，即把所有 token 转化为 AdditiveExpression 直到 EOF

验证：正确

![](https://api2.mubu.com/v3/document_image/3105f3d9-bc01-4d67-a273-8f1667e7b23c-1434819.jpg)

## 小结

- **明确定义的重要性**。整道题的思路就是围绕着四则运算表达式定义展开的，从最底层的 MultiplicativeExpression 到 AdditiveExpression 再到 Expression，核心思想就是把遇到的 token 解析为其定义中的一项，所以在照视频完成了第一个 MultiplicativeExpression 后，后续的两个 AdditiveExpression 和 Expression 就可以照瓢画葫芦了。

- **有趣的嵌套**。

## 知识点

### 正则表达式 exec()

#### 说明

当使用 /g 时，此时 RegExp 是有状态的，可以多次执行 exec 方法来查找同一个字符串中的成功匹配会将上次成功匹配后的位置记录在 lastIndex 属性中

> 会将上次成功匹配后的位置记录在 lastIndex 属性中

#### 参考资料

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec

#### 注意事项

**不要**把正则表达式字面量（或者 RegExp 构造器）放在 while 条件表达式里。由于每次迭代时 lastIndex 的属性都被重置，如果匹配，将会造成一个死循环。并且要确保使用了'g'标记来进行全局的匹配，否则同样会造成死循环。

### yield 生成器

#### 使用方式

- 声明 generator -> function\*

- 使用
  - next
  - for of // 未知 yield 次数时很有用）

#### 参考资料

- for of , yield https://www.cnblogs.com/m2maomao/p/7743143.html
- MDN yield https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield
