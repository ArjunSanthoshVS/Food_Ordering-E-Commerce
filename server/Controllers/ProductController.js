const productController = require('express').Router()
const { verifyToken, adminVerifyToken } = require('../Middlewares/verifyToken')
const { Product } = require('../Models/ProductsSchema')

//all
productController.get('/', verifyToken, async(req, res) => {
    try {
        const products = await Product.find(req.query)
        return res.status(200).json(products)
    } catch (error) {
        console.error(error)
    }
})

//get one
productController.get('/find/:id', verifyToken, async (req, res) => {
    try {
        const prodId = req.params.id
        const product = await Product.findById(prodId)
        if (!product) {
            return res.status(500).json({msg:"No Such items...!!"})
        }
        return res.status(200).json(product)
    } catch (error) {
        console.error(error)
    }
})

//create product
productController.post('/', verifyToken, async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body })
        return res.status(201).json(newProduct)
    } catch (error) {
        console.error(error)
    }
})

module.exports=productController