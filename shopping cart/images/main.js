let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function generateShop()
{
    return (shop.innerHTML = shopItemsData
        .map((x) => {
        let {id,name,price,desc,img}=x;
        let search = basket.find((x)=>x.id===id) || [];
        return  `
        <div id=product-id-${id} class="item">
                <img width="219" height="220" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>₹ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i> <!icon of minus took from getbootstrap icons>
                            <div id=${id} class="quantity">
                            ${search.item===undefined?0:search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i> <!icon of plus took from getbootstrap icons>
                            
                        </div>
                    </div>
                </div>
            </div>
        
        
        `
    }).join(""));  //map fuction will target all the data one by one
};

generateShop();

function increment(id){
    let selecteditem=id;
    let search= basket.find((x)=> x.id === selecteditem.id);

    if(search === undefined)
    {
        basket.push({
            id:selecteditem.id,
            item:1,
        });
    }

    else
    {
        search.item += 1;
    }
    update(selecteditem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};

function decrement(id){
    let selecteditem=id;
    let search= basket.find((x)=> x.id === selecteditem.id);
    if(search===undefined) return;
    else if(search.item === 0) return;
    else
    {
        search.item -= 1;
    }
    update(selecteditem.id);
    basket= basket.filter((x)=>x.item !==0);
    localStorage.setItem("data",JSON.stringify(basket));
};

function update(id){
    let search= basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

function calculation(id){
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
};

calculation();