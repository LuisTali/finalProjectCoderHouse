import {Plato} from '../Class/Plato.js'

window.onload = start();

function start(){

//Carrito
let carrito = [];
let subTotal = 0;

//inputSubtotal mostrar precio
const inputSubT = document.getElementById('subtotal');

//Boton para ordenar al costado del inputSubTotal
const orderBtn = document.getElementById('order')

const divCarrito = document.getElementById("shoppingCart");

const agregarCarrito = (plato) =>{
    carrito.push(plato);
    subTotal += plato.precio;
    inputSubT.setAttribute('placeholder',`$${subTotal}`);
    swal('Dish added to the Shopping Cart','','success');
    let dish = document.createElement('h4');
    dish.textContent = plato.nombre + ' $' + plato.precio;
    divCarrito.appendChild(dish);
    
}

//Al realizar la orden el subtotal vuelve a 0
orderBtn.onclick = ()=>{
    if(carrito.length > 0){
        console.log('Carrito Vaciado, Orden pedida, Subtotal restaurado a 0');
        inputSubT.setAttribute('placeholder',`$0`);
        carrito = [];
        subTotal = 0;
        swal('Thanks for you buy','Shopping cart cleared','success');
        divCarrito.innerHTML = ""; //Div shoppingCart limpiado
        (divCarrito.classList.contains('inactive') ? '' : divCarrito.classList.add('inactive'))
    }else{
        swal('Your shopping cart is empty','Add one or more dishes to the shoppingCart first','error');
    }
}


inputSubT.onmouseup = () =>{
    if(carrito.length>0){
        divCarrito.classList.toggle('inactive');
    }
}


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
                    button.addEventListener('click',()=>{console.log(`boton cliqueado ${button.value}`);agregarCarrito (plato)})       
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
    cargarPlatosCreate()
    obtenerFoodFile()
}
