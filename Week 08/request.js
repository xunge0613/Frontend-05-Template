 let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8888",
    path: "/",
    headers: {
      "X-Foo2": "customed",
    },
    body: {
      name: "winter",
    },
  });
  let response = await request.send();
  console.log(response);