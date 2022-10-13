const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch((e) => {
        console.log('OH NO MONGO CONNECTION ERROR');
        console.log(e);
    })






const seedProducts = [

    {
        name: 'gape fruit',
        price: 1.5,
        category: 'fruit'
    },
    {
        name: 'ninja fruit',
        price: 1.12,
        category: 'fruit'
    },
    {
        name: 'dragon fruit',
        price: 1.78,
        category: 'fruit'
    },
    {
        name: 'house of dragon vegetable',
        price: 1.02,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then(d => console.log(d))
    .catch(e => console.log(e))