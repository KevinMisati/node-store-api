require("dotenv").config()


const express = require("express")
const app = express()

const notFoundMiddleware = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")



app.use(express.json())

app.get("/",(req,res) => {
    res.send("<h1>Store Api</h1><a href='/api/v1/products'>products</a>")
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        app.listen(port,console.log(`Server is listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()



