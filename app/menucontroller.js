const Menu = require('../models/menu')
function menucontroller(){
   
    return {
      async  index(req,res){
        const dishes = await Menu.find()

           return res.render('menu', {dishes: dishes})
        },
    }
}
    
module.exports= menucontroller ; 