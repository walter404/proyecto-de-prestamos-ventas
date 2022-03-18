 // modoOscuroConLocalStorage
 const btnSwitch = document.querySelector('#switch');

 btnSwitch.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     btnSwitch.classList.toggle('active');

     // Guardamos el modo en localstorage.
     if (document.body.classList.contains('dark')) {
         localStorage.setItem('dark-mode', 'true');
     } else {
         localStorage.setItem('dark-mode', 'false');
     }
 });

 // Obtenemos el modo actual.
 if (localStorage.getItem('dark-mode') === 'true') {
     document.body.classList.add('dark');
     btnSwitch.classList.add('active');
 } else {
     document.body.classList.remove('dark');
     btnSwitch.classList.remove('active');
 }

 //  carrito
 let allContainerCart = document.querySelector('.products');
 let containerBuyCart = document.querySelector('.card-items');
 let priceTotal = document.querySelector('.price-total')
 let amountProduct = document.querySelector('.count-product');


 let productosAgregado = [];
 let totalCard = 0;
 let countProduct = 0;

 //funciones
 loadEventListenrs();

 function loadEventListenrs() {
     allContainerCart.addEventListener('click', addProduct);

     containerBuyCart.addEventListener('click', deleteProduct);
 }

 function addProduct(e) {
     e.preventDefault();
     if (e.target.classList.contains('btn-add-cart')) {
         const selectProduct = e.target.parentElement;
         readTheContent(selectProduct);
     }
 }

 function deleteProduct(e) {
     if (e.target.classList.contains('delete-product')) {
         const deleteId = e.target.getAttribute('data-id');
         productosAgregado.forEach(value => {
             if (value.id == deleteId) {
                 let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                 totalCard = totalCard - priceReduce;
                 totalCard = totalCard.toFixed(2);
             }
         });
         productosAgregado = productosAgregado.filter(product => product.id !== deleteId);

         countProduct--;
     }
     loadHtml();
 }
 // buyThings
 function readTheContent(product) {
     const infoProduct = {
         image: product.querySelector('div img').src,
         title: product.querySelector('.title').textContent,
         price: product.querySelector('div p span').textContent,
         id: product.querySelector('a').getAttribute('data-id'),
         amount: 1
     }

     totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
     totalCard = totalCard.toFixed(2);

     const exist = productosAgregado.some(product => product.id === infoProduct.id);
     if (exist) {
         const pro = productosAgregado.map(product => {
             if (product.id === infoProduct.id) {
                 product.amount++;
                 return product;
             } else {
                 return product
             }
         });
         productosAgregado = [...pro];
     } else {
         productosAgregado = [...productosAgregado, infoProduct]
         countProduct++;
     }
     loadHtml();
     //console.log(infoProduct);
 }

 function loadHtml() {
     clearHtml();
     productosAgregado.forEach(product => {
         const {
             image,
             title,
             price,
             amount,
             id
         } = product;
         const row = document.createElement('div');
         row.classList.add('item');
         row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

         containerBuyCart.appendChild(row);

         priceTotal.innerHTML = totalCard;

         amountProduct.innerHTML = countProduct;
     });
 }

 function clearHtml() {
     containerBuyCart.innerHTML = '';
 }


 function showCart(X) {
     document.getElementById("products-id").style.display = "block";
 }

 function closeBtn() {
     document.getElementById("products-id").style.display = "none";
 }