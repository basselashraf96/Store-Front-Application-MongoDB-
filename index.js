const mongoose = require('mongoose');
const cors = require('cors')
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

const methodOverride = require('method-override')
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const categories = ['fruit', 'vegetable', 'diary']

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async(req, res) => {

    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect('/products')

})

app.get('/products/:id/edit', async(req, res) => {
    const { id } = req.params
    const products = await Product.findById(id)
    res.render('products/edit', { products, categories })
})
app.put('/products/:id', async(req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect('/products')

})

app.get('/products', async(req, res) => {
    const products = await Product.find({}) //it takes time 
    res.render('products/index', { products })
})

app.get('/products/:id', async(req, res) => {
    const { id } = req.params
    const products = await Product.findById(id) //it takes time 
    res.render('products/show', { products })

})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})
app.use('/', (req, res) => {
    res.send('Hello got to endpoint /products to start')
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})