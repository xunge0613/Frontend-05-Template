import { List } from './List'


const pics = [
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    title: '蓝猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    titile: '橘猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    titile: '狸花猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    titile: '橘猫加白'
  },
]

let a = <List data={pics}>
    {(record) => 
        <div>
            <img src={record.img} />
            <a href={record.url}>{record.title}</a>
        </div>
    }
</List>
a.mountTo(document.body)