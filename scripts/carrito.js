var cart=JSON.parse(localStorage.getItem("carrito"))||[];
var precioCarro=[];
let carritoFin=document.getElementById("carrito");
let pCart=document.getElementById("nada")
let borrarCarro=document.getElementById("borrarCarro")
var precioFinC=0;
if(JSON.parse(localStorage.getItem("carrito"))){
    checkCarro();
    let carroI=document.getElementsByClassName("carro")
    carroI[0].innerText=`Carrito (${(parseInt(cart.length))})`
}
else{
    pCart.innerHTML="Todavía no has seleccionado nada";
}

function checkCarro(){
    carritoFin.innerHTML="";
    let thead=document.createElement("thead");
    let trh=document.createElement("tr")
    trh.innerHTML=`<th class="producto">Productos</th><th class="precioC">Precio</th>`
    thead.appendChild(trh);
    carritoFin.appendChild(thead);
    for(var i=0;i<cart.length;++i){
        let tbody=document.createElement("tbody");
        let tr=document.createElement("tr");
        tr.className="carrito";
        tr.innerHTML=`<td class="producto">${cart.map((nombre)=>nombre.nombre)[i]}</td><td class="precioC">${cart.map((precio)=>precio.price)[i]} USD$</td>`
        tbody.appendChild(tr);
        carritoFin.appendChild(tbody);
        precioCarro.push(parseInt(cart.map((precio)=>precio.price)[i]))
    }
    for(let i of precioCarro){
        precioFinC+=i;
    }
    let tfPrecio=document.createElement("tfoot");
    let trp=document.createElement("tr");
    trp.innerHTML=`<th class="producto">Precio</th><th class="precioC">${precioFinC} USD$ </th>`
    tfPrecio.appendChild(trp);
    carritoFin.appendChild(tfPrecio);
    pCart.innerHTML=""
}

borrarCarro.onclick=()=>{
    borrarCart()
}
function borrarCart(){
    localStorage.removeItem("carrito");
    cart=[];
    carritoFin.innerHTML="";
    pCart.innerHTML="Todavía no has seleccionado nada";
    Toastify({
        text: "Carrito Eliminado!",
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "black"
        }
    }).showToast();
    let carroI=document.getElementsByClassName("carro")
    carroI[0].innerText=`Carrito (${(parseInt(cart.length))})`
}