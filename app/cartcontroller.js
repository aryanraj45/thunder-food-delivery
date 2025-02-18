function cartcontroller(){
   
    return {
        index(req,res){
           res.render('cart')
        },
        update(req,res) {
            if(!req.session.cart) 
            {
              req.session.cart ={ 
                  items: {},
                  totalqty: 0,
                  totalprice: 0
              }
            }
            
            let cart = req.session.cart;

            if(!cart.items[req.body._id])
              {
                  cart.items[req.body._id] = 
                  { 
                      item: req.body,
                      qty: 1
                  }
                  cart.totalqty = cart.totalqty + 1 
                  let a = req.body.dish_price ;
                 // console.log(typeof(cart.totalprice));
                  let b = parseInt(a) ;
                  //console.log(typeof(b))
                  cart.totalprice = cart.totalprice + b ;
                 // console.log(cart.totalprice);
              }
              else
              {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalqty = cart.totalqty + 1 ;
                let c = req.body.dish_price ;
                // console.log(typeof(cart.totalprice));
                 let d = parseInt(c) ;
                cart.totalprice = cart.totalprice + d ;
              //  console.log(cart.totalprice);
                
              } 

           //   console.log("body" , req.body)

              return res.json({totalqauntity: req.session.cart.totalqty})

        }
    }
}
    
module.exports= cartcontroller ; 