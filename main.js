let carts = document.querySelectorAll('.add-cart');

let products = 
[
    {
        name: 'Wine',
        tag: 'wine',
        price: 125,
        inCart: 0
    },
    {
        name: 'Cider',
        tag: 'cider',
        price: 125,
        inCart: 0
    },
    {
        name: 'Gin',
        tag: 'gin',
        price: 125,
        inCart: 0
    },
    {
        name: 'Juice',
        tag: 'juice',
        price: 125,
        inCart: 0
    },
    {
        name: 'Soda',
        tag: 'soda',
        price: 125,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++)
{
    
    carts[i].addEventListener('click', () =>
    {
        cartNumbers(products[i]);
        
    })
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}


function cartNumbers(product)
{
    console.log("The product selected is ", product) 
   let productNumbers = localStorage.getItem('cartNumbers',1)
   localStorage.setItem('cartNumbers', 1);
   productNumbers = parseInt(productNumbers);

   if(productNumbers)
   {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
   }
   else
   {
       localStorage.setItem('cartNumbers', 1);
       document.querySelector('.cart span').textContent = 1;
   }
   setItems(product);
}
function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems =
            {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart = 1;

        cartItems = 
        {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItems("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }

    function displayCart()
    {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".product-container");

        console.log(cartItems);

        if(cartItems && productContainer)
        {
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item =>
            {
                productContainer.innerHTML += 
                `<div class="product">
                    <ion-icon class="decrease"name="arrow-dropleft-circle"></ion icon>
                    <img src="/images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">R${item.price}</div>
                <div class="quantity">
                    <ion icon class="increase" name="arrow-dropright-circle"></ion-icon>
                    
                </div>
                <div class="total">
                R${item.inCart * item.price},00
                </div>
                `;
            });

            productContainer.innerHTML += 
            `<div>
            `
        }
    }
}

onLoadCartNumbers();
displayCart();

