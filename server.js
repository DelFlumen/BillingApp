const express = require("express"); //from node modules
const shortId = require("shortid");
const { read, write } = require("./fileUpdating.js");

const server = express();

server.use(express.json());

const catalog = read("catalog");

server.get("/catalog", (req, res) => {
  res.json(catalog);
});

server.get("/catalog/:id", (req, res) => {
  const id = req.params.id;
  const product = catalog.find((obj) => obj.id === id);
  res.json(product);
});

server.post("/catalog/add", (req, res) => {
  const newProduct = { ...req.body, id: shortId.generate() };
  const newCatalog = [...catalog, newProduct];
  console.log(newCatalog);
  write("catalog", newCatalog);
  res.send({ status: "item added successfully" });
});

server.delete("/catalog/:id", (req, res) => {
  const id = req.params.id;
  const newCatalog = catalog.filter((obj) => obj.id != id);
  write("catalog", newCatalog);
  res.send({ status: "item deleted successfully" });
});

server.delete("/catalog", (req, res) => {
  write("catalog", []);
  res.send({ status: "item deleted successfully" });
});

server.listen(8000, () => {
  console.log("Server is started");
});
