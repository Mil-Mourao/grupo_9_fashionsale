const path = require('path')
const express = require ("express")
const app = express()
const method = require('method-override')
const cookie = require('cookie-parser');
const session = require('express-session');

app.set('port', process.env.PORT || 3000)
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, "../public")
app.use(express.static(publicPath))
app.use(express.urlencoded({extended: true}));
app.use(method('m')); // ?m=PUT || ?m=DELETE

app.listen(app.get('port'),() => console.log('running on port http://localhost:' + app.get('port')))

app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
  session({
    secret: "winning",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(require('./routes/main'))
app.use('/users', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/cart',require('./routes/cart'))