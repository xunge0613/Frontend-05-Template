import { Component, createElement } from "./framework";

class Carousel extends Component {
  constructor() {
    super(); 
    this.attributes = Object.create(null);
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  mountTo(parent) {
    // 保证 render 的时机是在取得 src 之后
    parent.appendChild(this.render());
  }

  render() {
    const { src } = this.attributes;
    this.root = document.createElement("div");
     this.root.classList.add('carousel');
    (src || []).forEach(item => {
      const child = document.createElement("img");
      child.src = item;
      this.root.appendChild(child)
    });
    return this.root;
  }
}

const pics = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

const a = <Carousel src={pics} />
a.mountTo(document.body);
console.log(1)