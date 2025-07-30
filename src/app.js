const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Обработка ?hello=<name> — только если один параметр: hello
  if ("hello" in query && Object.keys(query).length === 1) {
    res.setHeader("Content-Type", "text/plain");

    if (query.hello) {
      res.statusCode = 200;
      res.end(`Hello, ${query.hello}.`);
    } else {
      res.statusCode = 400;
      res.end("Enter a name");
    }
    return;
  }

  // Обработка ?users — только если один параметр: users
  if ("users" in query && Object.keys(query).length === 1) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(getUsers());
    return;
  }

  // Без параметров
  if (Object.keys(query).length === 0) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!");
    return;
  }

  // Всё остальное — ошибка
  res.statusCode = 500;
  res.setHeader("Content-Type", "text/plain");
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
