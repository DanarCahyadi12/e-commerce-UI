class Products{
    constructor(name,quantity,price,image){
        this.name = name
        this.quantity = quantity
        this.price = price
        this.image = image
    }

    SetQuantity(val){
        this.quantity = val
    }
    SetPrice(val){
        this.price = val
    }
}
class Orders extends Products{
    constructor(name,image,quantity,price,calcPrice,sumQuantity) {
        super(name,image,quantity,price)
        this.calcPrice = calcPrice
        this.sumQuantity = sumQuantity
    }
    SetCalcPrice(vals){
        this.calcPrice = vals
    }
    SetSumQuantity(vals){
        this.sumQuantity = vals
    }
}
const okBtn = document.querySelector('.ok-btn')
const Cabai = new Products('Cabai',[1,2,3,4,5],[3000,6000,8000,10000,13000],'../assets/images/cabai.jpg')
const  Brokoli = new Products('Brokoli',[1,2],[8000,10000],'../assets/images/brokolijpg.jpg')
const  Sawi = new Products('Sawi',[1],[4000],'../assets/images/sawi.jpg')
const  Wortel = new Products('Wortel',[1],[5000],'../assets/images/wortel.jpg')
const  Timun = new Products('Timun',[1,2],[2500,5000],'../assets/images/timun.jpg')
const  Terong = new Products('Terong',[1,2,3],[3500,6000,8000],'../assets/images/terong.jpg')
const  Paprika = new Products('Paprika',[1],[3500],'../assets/images/paprika.jpg')
const ListProducts = [Cabai,Brokoli,Sawi,Wortel,Timun,Terong,Paprika]
const ListOrders = []
/*Getting elment html*/
const CartBtn = document.querySelector('.cart-button')
const cartBadge = document.querySelector('.badge')
const viewCart = document.querySelector('.view-cart')
const SortBtn = document.querySelector('.sort-dropdown')
const cheapSortBtn = SortBtn.children[1].children[0]
const expSortBtn = SortBtn.children[1].children[1]
const productContainer = document.querySelector('.container-products')
const priceTitle = document.querySelector('.price')
const quantityTitle = document.querySelector('.quantity')
const contPriceQuantity = document.querySelector('.price-by-quantity-cont')
const PriceByQuantity = contPriceQuantity.children[1]
const QuantityProducts = contPriceQuantity.children[2]
const QuantityProductsButtonCont = document.querySelector('.group-quantity')
const quantityInput = document.querySelector('.quantity-input')
const buyBtn = document.querySelector('.buy-btn')
const titleProducts = document.querySelector('.title-products')
const cancelBtn = document.querySelector('.cancel-btn')
/*Mapping*/
let indexProducts = 0
let cardProducts = ``
let indexQuantity = 0
let ReturnedListProduct
const MapProducts = () => {
ReturnedListProduct = ListProducts.map((val) => {
        return val
    })
}
MapProducts()
/*Displaying card*/
for(let i in ReturnedListProduct){
    cardProducts += `<div class="card w-60 bg-base-200 shadow-xl mt-3/5 card-products">
    <figure class="px-10 pt-10">
      <img src="${ListProducts[i].image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center">
      <h2 class="card-title text-2xl self-center mt-3 mb-10">${ListProducts[i].name}</h2>
      <div class="card-actions">
        <label for="detail-card" class="btn modal-button modal-detail p-2 w-18 self-center">detail</label>
      </div>
    </div>
  </div> `
}
productContainer.innerHTML = cardProducts
/* End Displaying card*/
let priceSum  = ReturnedListProduct[indexProducts].price[indexQuantity]
/*Display data product*/
const modalBtn = document.querySelectorAll('.modal-detail')
const imageProducts = document.querySelector('.image-products')
let quantityBtn  =``
modalBtn.forEach((val, i) => {
    val.addEventListener('click',() =>{
        indexProducts = i
        titleProducts.innerHTML = ReturnedListProduct[i].name
        imageProducts.setAttribute('src',ReturnedListProduct[i].image)
        let priceFormat= ''
        let quantityFormat = ''
        if(ReturnedListProduct[i].quantity.length === 1 && ReturnedListProduct[i].price.length === 1){
            quantityFormat += `${ReturnedListProduct[i].quantity[0]}kg `    
            priceFormat += `Rp${ReturnedListProduct[i].price[0]} `    
        }else{
            quantityFormat += `${ReturnedListProduct[i].quantity[0]}kg - ${ReturnedListProduct[i].quantity[ReturnedListProduct[i].quantity.length -1]}kg `
            priceFormat += `Rp${ReturnedListProduct[i].price[0]} - Rp${ReturnedListProduct[i].price[ReturnedListProduct[i].price.length -1]} `
        }
        priceTitle.innerHTML = priceFormat
        quantityTitle.innerHTML = quantityFormat
        for(let n = 0; n <= ReturnedListProduct[i].quantity.length - 1;n++){
            quantityBtn += `<button class="btn btn-xs quantity-button">${ReturnedListProduct[i].quantity[n]}kg</button>`
            QuantityProductsButtonCont.innerHTML = quantityBtn
        }
        priceSum  = ReturnedListProduct[indexProducts].price[indexQuantity]
    })
})
cancelBtn.addEventListener('click',() => {
    quantityBtn = ``
    quantityInput.value = 1
})

/*end of display products*/

const QuantityProductsButton = QuantityProductsButtonCont.children
/*default choose quantity*/
const DefaultBuy = n => {
    QuantityProductsButton[0].classList.add('btn-active')
    PriceByQuantity.innerHTML = `Rp${ReturnedListProduct[n].price[0]}`
    }
modalBtn.forEach((val,i) => {
    val.addEventListener('click',e => {
        indexProducts = i
        DefaultBuy(indexProducts)
        QuantityProductsClicked()
    })
})
/*End default choose quantity*/
const InputQuantityProducts = () => {
    quantityInput.addEventListener('input', e => {
        let quantityInputs = e.target.value
        priceSum = quantityInputs * ReturnedListProduct[indexProducts].price[indexQuantity] 
        PriceByQuantity.innerHTML = `Rp${priceSum}`
    })
}
InputQuantityProducts()
/*Function quantity product clicked*/
const QuantityProductsClicked = () => {
    let prevBtn = 0
    for(let i = 0; i < QuantityProductsButton.length; i++){
        QuantityProductsButton[i].addEventListener('click',() => {
            QuantityProductsButton[prevBtn].classList.remove('btn-active')
                QuantityProductsButton[i].classList.add('btn-active')
                prevBtn = i
                indexQuantity = i
                choosedQuantity = ReturnedListProduct[indexProducts].price[i]
                PriceByQuantity.innerHTML = `Rp${ReturnedListProduct[indexProducts].price[i]}`
                if(ReturnedListProduct[indexProducts].price.length === 1 && ReturnedListProduct[indexProducts].quantity.length === 1){
                    priceSum = parseInt(quantityInput.value) * ReturnedListProduct[indexProducts].price[0]
                }else{
                    priceSum = parseInt(quantityInput.value) * ReturnedListProduct[indexProducts].price[indexQuantity]
                }
                PriceByQuantity.innerHTML = `Rp${priceSum}`
        })
    }
}



/*Function quantity product clicked end*/
/*end mapping*/


