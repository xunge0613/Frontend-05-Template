> ps：这周的信息量也太大了……

第六周：重学 JavaScript （一）
｜ 目标：帮助构建知识体系，
｜ 以 JS 语法为线索，从细到粗梳理知识
｜ 先编程基础知识
本周目标
JS 语言通识
泛用语言分类方法
什么是产生式
深入理解产生式
形式文法：https://zh.wikipedia.org/wiki/%E5%BD%A2%E5%BC%8F%E6%96%87%E6%B3%95
现代语言的分类
编程语言的性质
一般命令式编程语言的设计方式
JS 类型
Number
String
其他类型
JS 对象
对象的基础知识
JS 中的对象
第一小节：泛用语言分类方法
非形式化语言
中文、英文
eg：口语 —— 语法没有严格定义，语法不对老外也能听懂，long time no see
形式语言（乔姆斯基体系）
｜
感性认知
0 无限制语法
1 上下文相关。同样的词句组合，和上下文相关。
2 上下文无关。同样的表达不管在哪都一样
3 正则文法。能够被正则表达式描述。
关系：上包含下关系
第二小节：产生式 1
说明：强有力工具，会贯穿整个课程
图
BNF 产生式
语法结构名：<> 主谓宾，
终结符：基础结构，一般用引号表示，类似字符串
非终结符：复合结构（需要其他语法结构定义）
() 括号 为了产生不同的语法结构 ，形成分组
_ 星号表示可以重复多次
| 表示或的关系 + 表示至少出现一次
eg：
字母 a 的列表 a+
字母 a 和 b 的列表 (a | b)+
案例：四则运算
图
+-_/
终结符
number
运算符
非终结符
乘法表达式 1 _ 2 ， 2 / 2
加法表达式 1 + 2 ， 2 - 2
<MultiplicativeExpression> = <Number> | <MultiplicativeExpression> "\" <Number> | <MultiplicativeExpression> "_" <Number>
Number = [0-9]+
<AddictiveExpression> = <MultiplicativeExpression> | <AddictiveExpression> "+" <MultiplicativeExpression> | <AddictiveExpression> "-" <MultiplicativeExpression>
练习：写带括号的四则运算产生式
思考：优先级越低，则越外层
KExpression = ( AddictiveExpression )
Expression = (AddictiveExpression | KExpression )+
1 + 2 / ( 3 - 4 ) _ 5
改：
<MultiplicativeExpression> ::= <BracketExpression> | <MultiplicativeExpression> "\" <BracketExpression> | <MultiplicativeExpression> "_" <BracketExpression>
<BracketExpression> ::= <Number> | "(" <AddictiveExpression> ")"
参考资料：
http://www.docin.com/p-925106573.html
第三小节：产生式 2
左边只有一个非终结符
图
深入理解产生式
0
1 型 上下文相关文法：根据前后来判断每一个符号
结构：?<A>?::=?<B>?
特点：
虽然左边、右边可以写多个非终结符，但左边变化的只能是一个
变化的部分一定是有一个前面和后面的这样的关系：
一定有一个固定不变的部分：蓝色的问号开头的部分（上文），和橙色的问号结束的部分（下文）
2 型 上下文无关文法：
结构：<A>::= ?
特点：
左边：一定是一个符号，且是非终结符
右边：随便写。可以是终结符和非终结符的混合
3 型 正则文法
结构：<A>::= <A>?
特点：所有的正则文法都可以用正则表达式来描述
案例：
问题：
JS 是否是正则文法？
JS 是上下文相关文法 or 上下文无关文法？
解答：
虽然 JS 表达式部分总体上属于正则文法，但存在特例
特例：2 ** 1 ** 2 ， \*\* 是右结合的，从右边开始计算的
不是严格意义上的上下文无关文法，存在一些特例。
特例：
｜ {
｜ get a {return 1}, // 此处 get 表示关键字
｜ get: 1 // 此处是属性名
｜ ​}
结论：在 JS 引擎实现上，总体的编程结构是一个针对上下文无关文法的分析，一旦遇到像 get 这样的特例，会单独写一些代码处理。
其他产生式
EBNF 等等
小结：虽然产生式五花八门，但只要了解了产生式背后的思路和原理，可以忽略表达形式上的区别
第四小节：现代语言的分类
现代语言的特例
图
小结：为了让使用者方便，大部分主流语言里都有一些边边角角的地方，导致编程的时候更加困难
语言分类
形式语言 —— 用途
数据描述语言
｜ HTML、JSON、XML、SQL、CSS
编程语言
｜ C、C++、Java
｜ Lisp
形式语言 —— 表达方式
声明式语言：只告诉你结果是怎样的
数据描述语言：JSON、HTML、CSS、
以函数式语言为主的编程语言：Lisp、Closure、Haskell  
 命令式语言：告诉你达成这个结果，每个步骤是怎样的
C、C++、Java、Python、Perl、JavaScript...
练习：尽可能寻找你知道的计算机语言，尝试将它们分类。
第五小节：编程语言的性质
图灵完备性：所有的可计算的问题都可用来描述。
命令式 —— 图灵机
说明：所有的命令式语言基本都是从图灵机理论来的图灵完备性
实现方式：
goto
if 和 while
声明式 —— lambda 演算
｜
说明：一种替换的关系，类似现在的函数
实现方式：递归
动态与静态
动态
特点：一定是在用户的设备 or 在线服务器上运行的
实际运行时机：产品实际的应用运行时
对应概念：Runtime 运行时
静态
特点：在程序员的设备上运行的
实际运行时机：在产品开发时发生
eg：静态类型检查
对应概念：Compiletime 编译时
说明：JS 这种解释说明的语言实际上是没有真正的 Compiletime （Webpack build 的不属于真的 Compiletime，但仍会借用这个概念）
类型系统
｜
前言：非常复杂，甚至可以专门开一门课
动态类型系统和静态类型系统：
概念：和刚才的动态与静态是一致的。
动态：在用户的内存里能找到的类型
eg：JavaScript
静态：只在程序员编码的时候能够保留的类型信息
eg: C++，最终编译到目标代码的时候类型信息已经丢掉了
半动半静：可以通过某种机制在运行时获取到编译时的类型信息
eg：Java 反射机制
区分方式：区分它在谁的电脑上能被保留下来
强类型与弱类型：
概念：在编程语言里类型转换发生的形式
强类型：类型转换不会默认发生
弱类型：
eg: JS 的 1 + "" 会被 JS 引擎把 Number 转换成 String 最后结果得到一个 String "1"
eg: 双等号 == 会在判断之前先进行自动类型转换， 1 == true
复合类型：
｜ ps：感觉像是 TS
结构体
{a: T1, b: T2}
函数签名：包含参数类型和返回值类型
(T1, T2) => T3
子类型
典型语言：C++
注意：所有的基于类的面向对象语言，都会把类的结构关系变成类型的关系
泛类型
概念：可以把类型当成像参数一样的东西去传递给我们的一段代码结构
eg：
协变：凡是能用 Array(Parent) 的地方，都能用 Array(Child)
eg：Array(Animal) 可以存 Array(dog, cat, ...)，child 肯定继承了 Parent 的所有功能
逆变：凡是能用 Function(Child) 的地方，都能用 Function(Parent)
eg:
参考资料：https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E4%B8%80%E4%B8%AA%E6%9C%89%E8%B6%A3%E7%9A%84%E9%97%AE%E9%A2%98
总结：这些知识在学习 TypeScript 的时候会有一些用处。
第六小节：一般命令式编程语言
第十小节：对象的基础知识
案例：三个小鱼
感性认知：三个小鱼，其中一个没有尾巴
计算机描述：把 3 个数据存 3 个地方
形式化总结：
任何一个对象都是唯一的，与本身状态无关
即使状态完全一致的两个对象，也并不相等 // 两滴水
用状态描述对象
状态的改变即是行为
三个核心要素：
图
identifier 唯一性标识
state 状态
behavior 行为
归类、分类
原型
图
练习：狗 咬 人
咬 这个行为如何用对象抽象
错误：
写在 Dog 上
写在人身上，biteBy 被咬
说明，对象的行为：改变对象状态的行为
设计原则：
遵循“行为改变状态”的原则 —— 内聚性
不应该受到语言描述的干扰
分析：
对人来说，只需要关心受到怎样的伤害，不需要关心是狗咬的还是人咬的
设计 class 时，只设计改变 class 内部状态的方法
