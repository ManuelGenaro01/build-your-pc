const palabras=["marca de procesador","procesador","motherboard","memoria RAM", "placa de video"];
const brand=["AMD","Intel"]

const procesadores=[
    {nombre: "AMD Ryzen™ 9 5950X", precio: 800}, 
    {nombre: "AMD Ryzen™ 7 5800X", precio: 449}, 
    {nombre: "AMD Ryzen™ 5 5600X", precio: 310}, 
    {nombre: "AMD Ryzen™ 7 5700X", precio: 300}, 
    {nombre: "AMD Ryzen™ 5 5600", precio: 199}, 
    {nombre: "AMD Ryzen™ 5 5500", precio: 159},
    {nombre: "AMD Ryzen™ 5 5600G", precio: 259},
    {nombre: "Intel® Core™ i9-12900KF", precio: 680}, 
    {nombre: "Intel® Core™ i7-12700KF", precio: 465},
    {nombre: "Intel® Core™ i7-11700KF", precio: 317}, 
    {nombre: "Intel® Core™ i5-12400", precio: 238}, 
    {nombre: "Intel® Core™ i5-12600K", precio: 343}, 
    {nombre: "Intel® Core™ i5-12500", precio: 248}, 
    {nombre: "Intel® Core™ i5-10400", precio: 182}
];
const AMD=procesadores.filter((p)=>p.nombre.includes("AMD"))
const Intel=procesadores.filter((p)=>p.nombre.includes("Intel"))

const placasMadres=[
    {socket:"AMD", nombre:"GIGABYTE X570 AORUS XTREME", precio:740},
    {socket:"AMD", nombre:"MSI B550-A PRO", precio:140}, 
    {socket:"AMD",nombre: "ASUS PRIME B450M-A II", precio:80},
    {socket:"AMD", nombre:"MSI A320M PRO-VH", precio:50},
    {socket:"Intel", nombre:"MSI PROZ690-A", precio:220},
    {socket:"Intel", nombre:"GIGABYTE H610M", precio:100},
    {socket:"Intel", nombre: "MSI PRO H610M-G", precio:90},
    {socket:"Intel", nombre:"GIGABYTE B660M", precio:120}
];
const motherAMD=placasMadres.filter((m)=>m.socket.includes("AMD"))
const motherIntel=placasMadres.filter((m)=>m.socket.includes("Intel"))
const motherPrices=[motherAMD.map((price)=>price.precio),motherIntel.map((price)=>price.precio)];

const proc=[AMD.map((el)=>el.nombre),Intel.map((el)=>el.nombre)]
const cpuPrices=[AMD.map((el)=>el.precio),Intel.map((el)=>el.precio)];
const motherAI=[motherAMD.map((name)=>name.nombre),motherIntel.map((name)=>name.nombre)]

const ramTypes=[
    {ram:"8GB DDR4", precio:40},
    {ram:"16GB(8x2) DDR4", precio:68},
    {ram:"32GB(8x4) DDR4",precio:110}
];
const graphCard=[
    {name:"ASUS ROG NVIDIA RTX 3090", precio:1800},
    {name:"ASUS TUF Gaming RX6900 XT", precio:1200},
    {name:"ASUS TUF NVIDIA RTX 3060 Ti", precio:540},
    {name:"MSI AMD RADEON RX6600", precio:400}
]

var valorFinal;
var pcBrand;
var partPick=0;

var pc=[];
var prices=[];
var cart=JSON.parse(localStorage.getItem("carrito"))||[];
let text;

var cpuType;
var mother;
var ramFin;
var graphFin;
var precioFinal;
var precioCarro=[];
var precioFinC=0;
const pr=[cpuType,mother,ramFin,precioFinal];

let titulo=document.getElementById("titulo");
let lista=document.getElementById("lista");
let cargarPart;
let carritoFin=document.getElementById("carrito");
let pCart=document.getElementById("nada")
let borrarCarro=document.getElementById("borrarCarro")

if(JSON.parse(localStorage.getItem("carrito"))){
    let carroI=document.getElementsByClassName("carro")
    carroI[0].innerText=`Carrito (${(parseInt(cart.length))})`
}

let but=[];

if(partPick==0){
    titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>"
    for(var i=0;i<2;++i){
        but=document.createElement("button");
        let li=document.createElement("li");
        but.innerText="Elegir";
        but.className="remover boton";
        but.value=i;
        li.className="remover";
        li.innerHTML=`<img src="img/${brand[i]}.png" class="img"><p>${i+1}- ${brand[i]}`;
        li.appendChild(but);
        lista.appendChild(li);
    }
}
let elegirB
function elegirButton(event) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }
elegirB=event.target.value;
elegirBrand();
}
document.querySelector(".partes").addEventListener("click",elegirButton)

function elegirParte(){
    if(partPick>0&&partPick<3){
        for(var i=0;i<pc[partPick-1].length;++i){
         let li=document.createElement("li");
         but=document.createElement("button");
         but.innerText="Elegir";
         but.className="remover boton";
         but.value=i;
         li.className="remover";
         li.innerHTML=`<img src="img/${palabras[partPick]}/${brand[pcBrand]}/${i}.png" class="img"><p>${(i+1)}- ${(pc[partPick-1])[i]}</p><p>${(prices[partPick-1])[i]} USD$</p> <p>`;
         li.appendChild(but);
         lista.appendChild(li);
        }
    }
    else if(partPick>2&&partPick<5){
        for(var i=0;i<pc[partPick-1].length;++i){
            let li=document.createElement("li");
            but=document.createElement("button");
            but.innerText="Elegir";
            but.className="remover boton";
            but.value=i;
            li.className="remover";
            li.innerHTML=`<img src="img/${palabras[partPick]}/${i}.png" class="img"><p>${(i+1)}- ${(pc[partPick-1])[i]}</p><p>${(prices[partPick-1])[i]} USD$</p> <p>`;
            li.appendChild(but);
            lista.appendChild(li);
           }
    }
}
function elegirBrand(){
    if(partPick<5){
        const parte=document.querySelectorAll(".remover");
        parte.forEach(parte=>{parte.remove()})
    }
    switch(partPick){
        case 0:
            pcBrand=elegirB;
            pc=[proc[pcBrand],motherAI[pcBrand],ramTypes.map((rams)=>rams.ram),graphCard.map((names)=>names.name)];
            prices=[cpuPrices[pcBrand],motherPrices[pcBrand],ramTypes.map((prices)=>prices.precio),graphCard.map((prices)=>prices.precio)];
            console.log(pc)
            ++partPick;
            titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>";
            elegirParte();
        break;
        case 1:
            cpuType=elegirB;
            cart.push({price: (cpuPrices[pcBrand])[cpuType], nombre: (proc[pcBrand])[cpuType]})
            ++partPick;
            titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>";
            elegirParte();
            break;
        case 2:
            mother=elegirB;
            cart.push({price: (motherPrices[pcBrand])[mother], nombre: (motherAI[pcBrand])[mother]})
            ++partPick;
            titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>";
            elegirParte();
            break;
        case 3:
            ramFin=elegirB;
            cart.push({price: (ramTypes.map((prices)=>prices.precio))[ramFin], nombre:(ramTypes.map((names)=>names.ram))[ramFin]})
            ++partPick;
            titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>";
            elegirParte();
            break;
        case 4:
            graphFin=elegirB;
            cart.push({price: (graphCard.map((prices)=>prices.precio))[graphFin], nombre:(graphCard.map((names)=>names.name))[graphFin]})
            ++partPick;
            titulo.innerHTML="<p>Elige tu "+palabras[partPick]+"</p>"
            precioFinAMD();
            break;
    }
}
function reload(){
        let recargar=document.createElement("input");
        let p=document.createElement("p");
        p.innerHTML=`El precio final es de ${precioFinal}USD$, ${Math.round(precioFinal*EUR)}EUR$ O ${Math.round(precioFinal*convert*1.65)}ARS$`
        recargar.type="button";
        recargar.value="Armar otra PC!"
        recargar.className="remover"
        document.body.appendChild(p);
        document.body.appendChild(recargar)
        recargar.onclick=()=>{
            console.log("puto")
            document.location.reload()
        }
}
var convert;
fetch("https://free.currconv.com/api/v7/convert?q=USD_ARS&compact=ultra&apiKey=735388df6a747f58c892")
.then((resp)=>resp.json())
.then((data)=>{convert=data.USD_ARS})
var EUR;
fetch("https://free.currconv.com/api/v7/convert?q=USD_EUR&compact=ultra&apiKey=735388df6a747f58c892")
.then((resp)=>resp.json())
.then((data)=>{EUR=data.USD_EUR})


function precioFinAMD(){
    precioFinal=(cpuPrices[pcBrand])[cpuType]+(motherPrices[pcBrand])[mother]+(ramTypes.map((prices)=>prices.precio))[ramFin]+(graphCard.map((prices)=>prices.precio)[graphFin]);
    titulo.remove();
    Swal.fire({
        icon:"success",
        title:"Precio Final",
        text:"El precio final es de "+precioFinal+"USD$, "+Math.round(precioFinal*EUR)+"EUR$ O "+Math.round(precioFinal*convert*1.65)+"ARS$"
    })
    const cartJSON=JSON.stringify(cart);
    localStorage.setItem("carrito",cartJSON);
    let carroI=document.getElementsByClassName("carro")
    carroI[0].innerText=`Carrito (${(parseInt(cart.length))})`
    reload();
}
