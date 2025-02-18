

//const axios = require('./axios');

var cart = document.querySelectorAll('.sareen') ;


function update(dish){
     axios.post('/updatecart' , dish).then(res=> {
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err=>{
        console.log(err) ;
    })
}
cart.forEach((button) => {
    button.addEventListener('click' , (e) => {
     //console.log(e) ;
     let dish = JSON.parse(button.dataset.dish) ;
     update(dish)
    }) 
})


//admin


// var adminorder = document.querySelector('.adminorderbody') 

// console.log(adminorder) ;
let orders=[] ;
    let markup ;
    axios.get('/adminorders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"                                  
        }
        }).then(res => {
            orders = res.data
            var adminorder = document.querySelector('.adminorderbody') 
            markup = generatemarkup(orders) 
            //console.log(markup);
            adminorder.innerHTML = markup ;
        }).catch(err => {
            console.log(err)
        })
        function renderItems(items) {
            let parsedItems = Object.values(items)
            return parsedItems.map((menuItem) => {
                return `
                    <p>${ menuItem.item.dish_name } - ${ menuItem.qty } pcs </p>
                `
            }).join('')
          }
        function generatemarkup(orders) 
        {
            return orders.map(order => {
                return `
                    <tr>
                    <td class="border px-4 py-2 text-green-900">
                        <p>${ order._id }</p>
                        <div>${ renderItems(order.items) }</div>
                    </td>
                    <td class="border px-4 py-2">${ order.customerid }</td>
                     <td class="border px-4 py-2">${ order.address }</td>
                     <td class="border px-4 py-2">${ order.phone }</td>
                    <td class="border px-4 py-2"> ${ order.createdAt}</td>
                   
                </tr>
            `
            }).join('')
        }
    