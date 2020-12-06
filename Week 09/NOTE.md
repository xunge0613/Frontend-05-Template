# 学习笔记

## 浏览器架构

- URL X HTTP 模块 ->
- HTML X parse ->
- DOM X css computing ->
- DOM with CSS X layout ->
- DOM with position X render ->
- Bitmap

## 第一小节：拆分文件和接口设计

### 拆分文件

为了方便文件管理，把 parser 单独拆到文件中

### 接口设计

parser 接受 HTML 文本作为参数，返回一棵 DOM 树

### tips

- 方法论：想实现一个功能，首先想象一下它是怎么用的，所以先在 client 里写调用的部分
- 如果是真实浏览器，数据是分段返回给 parser 的，此处为了方便理解 + 代码简洁，会把代码完全返回

## 使用 FSM 来实现 HTML 的分析

> 解析 HTML 这种文本类的操作一定会用到状态机（Finite State Machine）

### 设计状态机

参考 HTML 标准的 Tokenization 即可，http://html.spec.whatwg.org/multipage/ 12.2.5 章

> 一共 80 多个状态，toy browser 只需要其中十几个即可

## 解析标签

### 使用状态机区分三种标签

- 开始标签
- 结束标签
- 自封闭标签

> 心得：在编写标签状态机时，可以在旁边写上`当前状态示例`，以及`迁移后状态名`，有助于编码，例如

```javascript
// 标签名称 tagName <d
// 期望1 tagName <div
// 期望2 space  <div\s
function tagName(c) {
  switch (c) {
    // <div
    case /^[a-zA-Z]$/:
      currentToken.tagName += c.toLowerCase();
      // 不用回退当前字符，不带 c
      return tagName;
    // \s 空格、tab 、换页 -> <div\s 属性名
    case /^[ \t\n\f]$/:
      return beforeAttributeName;
    // / -> <img/ 自封闭标签
    case "/":
      return selfClosingStartTag;
    // > -> <div> 结束 tagOpen
    case ">":
      emit(currentToken);
      // 解析下一个标签
      return data;
    default:
      break;
  }
}
```
