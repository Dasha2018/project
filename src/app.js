const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const loggerOne = require("./middlewares/loggerOne");
const loggerTwo = require("./middlewares/loggerTwo");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();

const {
  PORT = 3005,
  API_URL = "127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/backend",
} = process.env;

mongoose
  .connect(`${MONGO_URL}`)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => console.error("Ошибка подключения MongoDB:", err));

app.use(cors());
app.use(loggerOne);
app.use(errorHandler);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.post("/", (req, res) => {
  res.status(200).send("Hello from POST!");
});

app.use("/", userRouter);
app.use("/", bookRouter);

app.listen(PORT, API_URL, () => {
  console.log(`Сервер запущен по адресу http://${API_URL}:${PORT}`);
});
/* const http = require("http");
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
 */
