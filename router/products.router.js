const { application } = require("express")
const express = require("express")
const { Router } = express

const routerProducts = Router()

const productos =  [
    {id: 1, item: "Vino tinto", precio: 302.30},
    {id: 2, item: "Vino rosado", precio: 269.50},
    {id: 3, item: "Vino blanco", precio: 189.00}
]

routerProducts.get("/", (req, res) => {
   res.send(productos)

})

routerProducts.get("/:id", (req, res) => {
    if(Object.entries(req.params).length > 0) {
        console.log(req.params.id);
        const product = productos.find(p => p.id == req.params.id)
        res.json(product)
    } else {
        res.json(productos)
    }
})

routerProducts.post("/", (req, res) => {
    const producto = {
        id: productos.length + 1,
        item: req.body.item,
        precio: req.body.precio
    }
    productos.push(producto)
    res.send(producto)
})

routerProducts.put("/:id", (req, res) => {
    if(Object.entries(req.params).length > 0) {
        console.log(req.params.id);
        const product = productos.find(p => p.id == req.params.id)
        product.item = req.body.item
        product.precio = req.body.precio
        res.json(product)
    } else {
        res.json(productos)
    }
})

routerProducts.delete("/:id", (req, res) => {
    try {
        if(Object.entries(req.params).length > 0) {
            console.log(req.params.id);
            const product = productos.find(p => p.id == req.params.id)
            
            const index = productos.indexOf(product)
            productos.splice(index, 1)

            res.json(product)
        }

    } catch (error) {
        return res.status(500).json({error: "Ocurrio un error al eliminar el item"})
    }
})


module.exports = routerProducts