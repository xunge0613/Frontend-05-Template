const EOF = Symbol("EOF"); // end of file
const cssParser = require('./css-parser.js');

const TAG_NAME_REG = /^[a-zA-Z]$/;
const BLANK_REG = /^[ \t\n\f]$/;

let currentToken = null; // 当前 token
let currentAttribute = null;
let currentTextNode = null;

// 栈顶是文档根元素 
let stack = [{
  type: 'document',
  children: []
}]

// 构造 token 内容
function emit(token) {
  let top = stack[stack.length - 1];
  switch (token.type) {
    // <div> 插入开标签
    case 'startTag':
      // dom
      const element = {
        type: 'element',
        children: [],
        attributes: [],
        computedStyle: {}
      }
      // 标签名
      element.tagName = token.tagName;

      // 属性 k-v
      for (const [name, value] of Object.entries(token.props)) {
        element.attributes.push({
          name,
          value
        })
      }
      
      // 计算样式
      cssParser.computeCss(element, stack);
      // 安排 dom
      top.children.push(element);
      element.parent = top;

      // 非自封闭元素入栈，允许嵌套子节点
      if(!token.isSelfClosing) {
        stack.push(element);
      }
      // 清空文本节点
      currentTextNode = null;
      break;
    // 普通 </div> 闭标签，直接出栈；
    // 如果是 </style> 则追加样式后出栈
    case 'endTag':
      // 先校验与开标签是否匹配
      if(top.tagName !== token.tagName) {
        throw new Error("Tag start doen't match tag end!");
      }
      if(top.tagName === "style") {
        // 追加样式
        cssParser.addCssRules(top.children[0].content);
      }
      stack.pop();
      // 清空文本节点
      currentTextNode = null; 
      break;
    // text 文本节点
    // 1 当前是 null，则先新建节点
    // 2 当前已存在，则继续拼接
    case 'text':
      if(currentTextNode === null) {
        currentTextNode = {
          type: 'text',
          content: ""
        }
        top.children.push(currentTextNode);
      }
      currentTextNode.content += token.content;
      break;
    // 
    default:
      break;
  }
   
}

// 初始状态
function data(c) {
  switch (c) {
    case "<":
      return tagOpen; // 开始标签
    case EOF:
      emit({
        type: "EOF"
      })
      return; // end
    default:
      // 文本节点
      emit({
        type: "text",
        content: c
      })
      return data;
  }
}

// < 开始标签
// 期望 1 endTagOpen
// 期望 2 tagName
function tagOpen(c) {
  switch (c) {
    // 结束标签 </ 
    case "/":
      return endTagOpen;
    case (c.match(TAG_NAME_REG) || {}).input:
      currentToken = {
        type: "startTag",
        tagName: "",
        props: {}
      }
       // 返还 reconsume 当前字符，带 c
      return tagName(c);
    default:
      return;
  }
}

// </ 结束标签，期望 tagName 
function endTagOpen(c) {
  switch (c) {
    // <div
    case (c.match(TAG_NAME_REG) || {}).input:
      currentToken = {
        type: "endTag",
        tagName: "",
        props: {}
      }
      return tagName(c);
    case ">":
      // error
      return;
    case EOF:
      return; // end
    default:
      return;
  }
}

// 标签名称 tagName <d
// 期望1 tagName <div
// 期望2 space  <div\s  
function tagName(c) {
  switch (c) {
    // <div
    case (c.match(TAG_NAME_REG) || {}).input:
      currentToken.tagName += c.toLowerCase();
      // 不用回退当前字符，不带 c
      return tagName;
    // <div\s 空格、tab 、换页 -> 属性名
    case (c.match(BLANK_REG) || {}).input:
      return beforeAttributeName;
    // <img/ 自封闭标签
    case "/":
      return selfClosingStartTag;
    // <div> 结束 tagOpen
    case ">":
      emit(currentToken);
      // 解析下一个标签
      return data;
    default:
      break;
  }
}

// 自封闭标签
// <img/
function selfClosingStartTag(c) {
  switch (c) {
    // <img/> 结束自封闭标签
    case ">":
      currentToken.isSelfClosing = true;
      emit(currentToken);
      // 解析下一个标签
      return data;
    case EOF:
      return;
    default:
      // error
      return;  
  }
}


// 属性名
function beforeAttributeName(c) {
  if (c.match(BLANK_REG)) {
    return beforeAttributeName;
  }
  if (['/', '>', EOF].includes(c)) {
    return afterAttributeName(c);
  }
  if (c === '=') {
    return;
  }
  currentAttribute = {
    name: '',
    value: '',
  };
  return attributeName(c);
}

function afterAttributeName(c) {
  if (c.match(BLANK_REG)) {
    return afterAttributeName;
  }
  if (c === '/') {
    return selfClosingStartTag;
  }
  if (c === '=') {
    return beforeAttributeValue;
  }
  if (c === '>') {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === EOF) {
    return;
  }
  currentToken.props[currentAttribute.name] = currentAttribute.value;
  currentAttribute = {
    name: '',
    value: '',
  };
  return attributeName(c);
}

function attributeName(c) {
  if (c.match(BLANK_REG)) {
    return afterAttributeName;
  }
  if (c === '=') {
    return beforeAttributeValue;
  }
  if (c === '\u0000') {
    return;
  }
  if (['"', "'", '<'].includes(c)) {
    return;
  }
  currentAttribute.name += c;
  return attributeName;
}

function beforeAttributeValue(c) {
  if (c.match(BLANK_REG) || ['/', '>', EOF].includes(c)) {
    return beforeAttributeValue(c);
  }
  if (c === '"') {
    return doubleQuotedAttributeValue;
  }
  if (c == "'") {
    return singleQuotedAttributeValue;
  }
  if (c === '>') {
    return;
  }
  return unquotedAttributeValue(c);
}

function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }
  if (c === '\u0000') {
    return;
  }
  if (c === EOF) {
    return;
  }
  currentAttribute.value += c;
  return doubleQuotedAttributeValue;
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
  }
  if (c === '\u0000') {
    return;
  }
  if (c === EOF) {
    return;
  }
  currentAttribute.value += c;
  return singleQuotedAttributeValue;
}

function afterQuotedAttributeValue(c) {
  if (c.match(BLANK_REG)) {
    return beforeAttributeName;
  }
  if (c === '/') {
    return selfClosingStartTag;
  }
  if (c === '>') {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === EOF) {
    return;
  }
  currentAttribute.value += c;
  return doubleQuotedAttributeValue;
}

function unquotedAttributeValue(c) {
  if (c.match(BLANK_REG)) {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  }
  if (c === '/') {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  }
  if (c === '>') {
    currentToken.props[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === '\u0000') {
    return;
  }
  if (['"', "'", '<', '=', '`'].includes(c)) {
    return;
  }
  if (c === EOF) {
    return;
  }
  currentAttribute.value += c;
  return unquotedAttributeValue;
}


function parseHTML(html) {
  // 初始状态
  let state = data;

  for (const c of html) {
    // 每个字符循环，去调用 state
    state = state(c);
  }

  // 使用 symbol end of file，作为状态机最后一位输入
  state = state(EOF)

  console.log(html)
}

module.exports = {
  parseHTML
}