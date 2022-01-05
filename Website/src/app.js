const path = require('path')
const express = require ("express")
const app = express()

app.set('port', 3000)
const publicPath = path.resolve(__dirname, "../public")
app.use(express.static(publicPath))

app.listen(app.get('port'),() => console.log('running on port http://localhost:' + app.get('port')))

app.use(require('./routes/main'))

app.use('/users', require('./routes/users'))

app.use('/products',require('./routes/products'))

app.get("/", (req,res)=> res.sendFile(path.resolve(__dirname,"views","index.html")))
app.get("/users", (req,res)=> res.sendFile(path.resolve(__dirname,"views","login.html")))
app.get("/product", (req,res)=> res.sendFile(path.resolve(__dirname,"views","productDetail.html")))
