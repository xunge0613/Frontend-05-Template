const css = require("css");

class CssParser {
  rules = [];

  // 
  clearRules() {
    this.rules = [];
  }

  addCssRules(text) {
    let ast = css.parse(text);
    this.rules.push(...ast.stylesheet.rules);
  }

  // 获取优先级数组
  specificity(selector) {
    // ['inline', 'id', 'class', 'tag'] 四种选择器的权值
    let p = Array(4).fill(0);
    let selectorParts = selector.split(' ');
    for (let selectorPart of selectorParts) {
      if (selectorPart[0] === '#') {
        p[1] += 1;
      } else if (selectorPart[0] === '.') {
        p[2] += 1;
      } else {
        p[3] += 1;
      }
    }
    return p;
  }

  // 比较两个优先级
  compare(oldArr, newArr) {
    for (let index = 0; index < 4; index++) {
      // 同位置高，则无视后续
      if(oldArr[i] !== newArr[i]) {
        return oldArr[i] - newArr[i]
      }
    }
    return 0;
  }

  // 元素是否能够匹配选择器
  match(element, selector) {
    // 异常情况 
    // 1 无选择器 div X
    // 2 元素无属性 #id/.class X
    if(!selector || !element.attribtes) {
      return false;
    }

    switch (selector[0]) {
       // ID 选择器
      case "#":
        const id = selector.replace("#", "");
        return element.attribtes.find(({name, value}) => name === "id" && value === id)
      // class 选择器
      case ".":
        const className = selector.replace(".", "");
        return element.attribtes.find((name, value) => name === "class" && value.split(" ").includes(className))
      // 标签选择器
      default:
        return element.tagName === selector;
    }
  }


  // 计算 css
  computeCss(element, stack) {
    // 获取父元素
    let elements = [...stack].reverse();
    for (const rule of this.rules) {
      // rule.selectors[0] body .class #id
      // selectorParts ["#id", ".class", "body"]
      let selectorParts = rule.selectors[0].split(" ").reverse();
      if(!this.match(element, selectorParts[0])) {
        continue;
      }
      let j = 1;
      let matched = false;

      for (let index = 0; index < elements.length; index++) {
        if(this.match(elements[i], selectorParts[j])) {
          j++;
          matched = j === selectorParts.length;
          if(matched) {
            break;
          }
        }
      }
      // 匹配上
      if(matched) {
        let sp = this.specificity(rule.selectors[0]);
        let computedStyle = element.computedStyle;
        for (const declaration of rule.declarations) {
          const {property} = declaration;
          if(!computedStyle[property]) {
            computedStyle[property] = {};
          }
        }
        /**
         * 1 属性第一次出现
         * 2 新属性比旧属性的优先级高
         */
        if(!computedStyle.specificity ||  
          this.compare(computedStyle[property].specificity, sp)  
          ) {
            computedStyle[property].specificity = sp;
            computedStyle[property].value = declaration.value;
        }
      }
    }
    console.log(JSON.stringify(element.computedStyle, null, 2));
  }
}

module.exports = new CssParser();