const express = require("express")
const routerProducts = require("./router/products.router")
const multer = require("multer")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static("uploads"))

const PORT = process.env.PORT || 8080

//Multer//
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, file.originalname + "-" + Date.now())
})
const upload = multer({storage})

//REST API Productos
app.use("/api/productos", routerProducts)

// Formulario Productos HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/formulario.html")
})

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error("Please uploadd a file")
        error.httpStatusCode = 400
        return next(error)
    }

    res.send(file)

})




//
const server = app.listen(PORT, () => {
    console.log(`Server listening [${PORT}]...`);
})

server.on("error", e => console.log("Error on server"));