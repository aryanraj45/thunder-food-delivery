//const { populate } = require('../models/order');
const order = require('../models/order');

 function adminordercontroller() {
     return {
        async index(req,res) {
         const orders =  await  order.find({isDelivered: false}) 
          
            console.log(orders)
               if(req.xhr)
               {
                   return res.json(orders)
               }
               res.render('adminorders')
         
         }
     }
 }
 
 module.exports = adminordercontroller