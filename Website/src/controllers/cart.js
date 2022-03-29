const controller = {
    cart: (req,res) => res.render('cart/productCart',
     {styles:['carrito'],
      title: "Mi carrito"})
}

module.exports = controller