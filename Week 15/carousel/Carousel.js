import { Component } from "./framework";

export default class Carousel extends Component {
  constructor() {
    super(); 
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (const record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }
    /*
     ** 手动拖拽
     */
    let position = 0;
    this.root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      let children = this.root.children;

      let move = (event) => {
        let x = startX - event.clientX;
        for (const offset of [-1, 0, 1]) {
          let pos = (position + offset + children.length) % children.length;
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${
            -pos * 500 - x + offset * 500
          }px)`;
        }
      };

      let up = (event) => {
        let x = startX - event.clientX;
        position = Math.round(x / 500) + position;
        for (const offset of [0, -Math.sign(x - (500 / 2) * Math.sign(x))]) {
          let pos = (position + offset + children.length) % children.length;
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500
          }px)`;
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

