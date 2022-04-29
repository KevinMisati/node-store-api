require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const connectDb = require("./db/connect")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")
const productRouter = require("./routes/products")



app.use(express.json())

app.get("/",(req,res) => {
    res.send("<h1>Store Api</h1><a href='/api/v1/products'>products</a>")
})

app.use("/api/v1/products",productRouter)

app.use(notFoundMiddleware)
app.use(errorHandler)


const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()



