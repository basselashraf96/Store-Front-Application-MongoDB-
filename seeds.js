const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const Product = require('./models/product')

mongoose.connect(process.env.DB_URL)
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