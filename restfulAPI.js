const express = require("express");
const app = express();
app.use(express.json());

const products = [
  {
    id: 1,
    item: "cheese",
    price: 3
  },
  {
    id: 2,
    item: "bread",
    price: 1
  },
  {
    id: 3,
    item: "cookies",
    price: 2
  },
];

app.get("/products", (req, res) => {
  res.send(products);
});

app.get(`/products/:id`, (req, res) => {
  let foundProduct = false  
  for (let product of products) {
      if (product.id === Number(req.params.id)) {
        foundProduct = true;
        res.send(product);
      } 
    } 
    if (!foundProduct) {
      res.status(404).send('no matching item found')
      throw new Error("no matching item found");
    }
});

app.post("/products", (req, res) => {
  if (req.body.id) {
    products.forEach((element) => {
      if (element.id == req.body.id) {
        res.status(404).send("id is already used, please use a different unique id");
        throw new Error("id is already used, please use a different unique id");
      } 
      });
      products.push(req.body);
      res.send("successfully added to the list");
  } else {
    res.status(404).send(`please enter a valid item with a valid id`);
    throw new Error(`please enter a valid item with a valid id`);
  }
});

app.put("/products/:id", (req, res) => {
  let foundProduct = false;
  console.log(req.params.id);
  products.forEach((element) => {
    if (element.id == req.params.id) {
      Object.assign(element, req.body);
      foundProduct = true
      res.send("item successfully updated");
    }
  });
  if(!foundProduct) {
    res.status(404).send("no matching item found");
    throw new Error("no matching item found");
  }
});

app.delete("/products/:id", (req, res) => {
  let foundProduct = false  
  products.forEach((element) => {
    if (element.id == req.params.id) {
      products.splice(products.indexOf(element), 1);
      foundProduct = true;
      res.send("item successfully deleted");
    }
  });
  if (!foundProduct) {
    res.status(404).send('no matching item found')
    throw new Error("no matching item found");
  }});

app.listen(3000);
