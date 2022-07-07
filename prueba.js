const express = require("express")

const app = express()

const productos =  [
    {id: 1, producto: "Vino tinto", precio: 302.30},
    {id: 2, producto: "Vino rosado", precio: 269.50},
    {id: 3, producto: "Vino blanco", precio: 189.00}
]

app.get("/api/productos", (req, res) => {
    res.json(productos)
})

app.get("/api/productos/:id", (req, res) => {
    
    if(Object.entries(req.params).length > 0) {
        console.log(req.params.producto);
        const product = productos.find(p => p.id == req.params.id)
        res.json(product)
    } else {
        res.json(productos)
    }
   
})








app.listen(8080)