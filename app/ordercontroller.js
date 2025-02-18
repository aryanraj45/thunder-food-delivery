const Order=require('../models/order');
function ordercontroller(){
       return {
           index(req,res) {{
            // var order = {
            //     payment_id: req.body.razorpay_payment_id,
            //     order_id: req.body.razorpay_order_id,
            //     razorpay_signature: req.body.razorpay_signature,
            //     items: req.session.cart.items ,
            //     userid: req.session.userId 
            // }
            // console.log(req.session["userId"]);
            // //console.log(phone)
         //  console.log(req.body);
            Order.create({
                customerid: req.session["userId"] ,
                items: req.session.cart.items,
                orderid: req.body.razorpay_order_id,
                paymentid: req.body.razorpay_payment_id,
                phone: req.body.phone,
                address: req.body.address,
                isDelivered: false
            })
            
            delete req.session.cart ;
            res.redirect('/payment/success');
           }}

       }
}

module.exports = ordercontroller