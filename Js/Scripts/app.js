import {Plato} from '../Class/Plato.js'

window.onload = start();

function start(){

let carrito = []; //Productos se agregan aqui
let subTotal = 0; //Subtotal calculado en base a productos del carrito

//inputSubtotal mostrar precio
const inputSubT = document.getElementById('subtotal');

//Boton para ordenar al costado del inputSubTotal
const orderBtn = document.getElementById('order')

//Container donde se presentan los platos agregados al carrito
const divCarrito = document.getElementById("shoppingCart");

//Obtiene el plato, lo agrega al carrito, calcula el subtotal y modifica el HTML
const agregarCarrito = (plato) =>{
    carrito.push(plato);
    subTotal += plato.precio;
    inputSubT.setAttribute('placeholder',`$${subTotal}`);
    swal(`${plato.nombre} anadido al carrito`,'','success');
    renderCarrito(carrito);
}

const renderCarrito = (carritoPlatos) =>{
    divCarrito.innerHTML = '';
    carrito.forEach((plato)=>{
        if(plato != undefined){
        let dish = document.createElement('div');
        let nombreDish = document.createElement('h4');
        nombreDish.textContent = plato.nombre + ' $' + plato.precio;
        let buttonRemove = document.createElement('button');
        buttonRemove.innerHTML = 'Remover';
        buttonRemove.onclick = () =>{
            removeFromCart(plato);
        }
        dish.appendChild(nombreDish);
        dish.appendChild(buttonRemove);
        divCarrito.appendChild(dish);
    }
    })
}

const removeFromCart = (comida) =>{
    
    let index = carrito.indexOf(comida); //Obtiene indice del elemento a borrar
    console.log(index);
    carrito.splice(index,1); //Elimina desde el indice obtenido un solo elemento, es decir el plato elegido para borrar
    subTotal -= comida.precio;
    inputSubT.setAttribute('placeholder',`$${subTotal}`);
    if(carrito.length == 0) (divCarrito.classList.contains('inactive') ? '' : divCarrito.classList.add('inactive'));
    renderCarrito();  
}

//Al realizar la orden, si es que el carrito no esta vacio, el subtotal vuelve a 0
orderBtn.onclick = ()=>{
    if(carrito.length > 0){
        inputSubT.setAttribute('placeholder',`$0`);
        carrito = [];
        subTotal = 0;
        swal('Gracias por su compra','carrito vaciado','success');
        divCarrito.innerHTML = ""; //Div shoppingCart limpiado
        (divCarrito.classList.contains('inactive') ? '' : divCarrito.classList.add('inactive'))
    }else{
        swal('Your shopping cart is empty','Add one or more dishes to the shoppingCart first','error');
    }
}

//Al cliquear el subtotal, se muestran los productos del carrito, al volver a cliquear se ocultan
inputSubT.onmouseup = () =>{
    if(carrito.length>0){
        divCarrito.classList.toggle('inactive');
    }
}

//Lee el archivo food.json y carga las listas en la pagina
const cargarPlatosCreate = async() => {
    let respuesta = await fetch('./Data/food.json');
    let platos = await respuesta.json();

    //Mapeo los platos y obtengo solamente las categorias de cada uno para su posterior filtrado
    let categorias = platos.map((plato) => plato.nombreCat)

    //Retorna las categorias donde su primer indice concuerda con el del elemento actual, evitando asi elementos repetidos, si Pescados con indice 14 se encuentra su primer valor al indice 3 no lo pasa
    categorias = categorias.filter((valor,indice) => {
        return categorias.indexOf(valor) === indice
    })  

    //Por cada categoria listada obtengo su div en el html y creo una lista ul
    categorias.forEach((cat) => {
        let divCat = document.getElementById(cat.toLowerCase());
        if(divCat != null){
            let listaCat = document.createElement('ul')

            //Por cada plato, comparo su categoria con la actual y si coincide le creo un item li en la lista ul
            platos.forEach((plato) =>{
                if(plato.nombreCat === cat){
                    let platoItem = document.createElement('li');           
                    let h4 = document.createElement('h4');
                    h4.textContent = plato.nombre;          
                    let button = document.createElement('button');
                    button.textContent = `$${plato.precio}`;
                    button.setAttribute('value',plato.idPlato); 
                    button.classList.add('buyBtn');
                    button.addEventListener('click',()=>{agregarCarrito (plato)})       
                    let shoppingCartImg = document.createElement('img');
                    shoppingCartImg.setAttribute('src',"./Iconos/shoppingCart/apple-touch-icon.png")
                    button.appendChild(shoppingCartImg);            
                    platoItem.appendChild(h4);
                    platoItem.appendChild(button);

                    listaCat.appendChild(platoItem);
                } 
            })
        divCat.appendChild(listaCat)
        }
    });

}

    cargarPlatosCreate(); //Ejecuto el metodo para poblar las listas

}
