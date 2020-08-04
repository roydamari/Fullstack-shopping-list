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

app.listen(3000);