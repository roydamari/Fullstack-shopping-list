const express = require('express');
const app = express();
app.use(express.json());

const products = [
    {
        id: 1,
        item: 'cheese'
    },
    {
        id: 4,
        item: 'bread'
    },
    {
        id: 2,
        item: 'cookies'
    },
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    products.forEach(element => {
        if (element.id == req.params.id) {
            res.send(element);
        }
    });
    res.send('no matching item found');
});

app.listen(3000);