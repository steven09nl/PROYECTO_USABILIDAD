(function(){
const seed=[
{id:"C01",name:"Camiseta Oversize Essential",category:"Camisetas",price:59900,color:"Negro",sizes:["S","M","L","XL"],description:"Camiseta oversize de estilo urbano, cómoda y versátil para el uso diario.",stock:20,art:"shirt",image:"camiseta-negra.jpg"},
{id:"C02",name:"Camiseta Basic Logo",category:"Camisetas",price:49900,color:"Blanco",sizes:["S","M","L","XL"],description:"Camiseta básica blanca de corte relajado para combinar con tu vestuario.",stock:16,art:"shirt",image:"camiseta-blanca.jpg"},
{id:"P01",name:"Pantalón Cargo",category:"Pantalones",price:109900,color:"Beige",sizes:["S","M","L","XL"],description:"Pantalón cargo de estilo casual con bolsillos laterales y ajuste cómodo.",stock:15,art:"pants",image:"pantalon-cargo.jpg"},
{id:"P02",name:"Pantalón recto",category:"Pantalones",price:95000,color:"Negro",sizes:["S","M","L","XL"],description:"Pantalón de corte recto clásico, cómodo y versátil para combinar con diferentes prendas.",stock:14,art:"pants",image:"pantalon-recto.jpg"},
{id:"CH01",name:"Hoodie Minimal",category:"Chaquetas",price:89900,color:"Negro",sizes:["S","M","L","XL"],description:"Buzo tipo hoodie de diseño minimalista, ideal para un look casual.",stock:12,art:"jacket",image:"hoodie-negro.jpg"},
{id:"B01",name:"Bermuda Denim",category:"Bermudas",price:69900,color:"Azul denim",sizes:["S","M","L","XL"],description:"Bermuda denim de estilo relajado para días cálidos.",stock:18,art:"shorts",image:"bermuda-denim.jpg"},
{id:"CH02",name:"Chaqueta Bomber",category:"Chaquetas",price:129900,color:"Beige",sizes:["S","M","L","XL"],description:"Chaqueta bomber de acabado sobrio para completar un atuendo urbano.",stock:8,art:"jacket",image:"chaqueta-beige.jpg"},
{id:"C03",name:"Camiseta Oversize Arena",category:"Camisetas",price:59900,color:"Arena",sizes:["S","M","L","XL"],description:"Camiseta oversize en tono arena, de corte amplio y cómodo para el uso diario.",stock:14,art:"shirt",image:"camiseta-arena.jpg",isNew:true},
{id:"C04",name:"Camiseta Oversize Oliva",category:"Camisetas",price:59900,color:"Verde oliva",sizes:["S","M","L","XL"],description:"Camiseta oversize en verde oliva, un tono tierra fácil de combinar.",stock:12,art:"shirt",image:"camiseta-oliva.jpg",isNew:true},
{id:"C05",name:"Camiseta Oversize Azul",category:"Camisetas",price:59900,color:"Azul marino",sizes:["S","M","L","XL"],description:"Camiseta oversize en azul marino, sobria y versátil para cualquier ocasión.",stock:15,art:"shirt",image:"camiseta-azul.jpg",isNew:true},
{id:"P03",name:"Pantalón Cargo Oliva",category:"Pantalones",price:109900,color:"Verde oliva",sizes:["S","M","L","XL"],description:"Pantalón cargo en verde oliva con bolsillos laterales y ajuste cómodo.",stock:12,art:"pants",image:"pantalon-cargo-oliva.jpg",isNew:true},
{id:"P04",name:"Pantalón recto Azul marino",category:"Pantalones",price:95000,color:"Azul marino",sizes:["S","M","L","XL"],description:"Pantalón de corte recto en azul marino, elegante y cómodo para combinar.",stock:11,art:"pants",image:"pantalon-recto-azul.jpg",isNew:true},
{id:"CH03",name:"Hoodie Minimal Gris",category:"Chaquetas",price:89900,color:"Gris",sizes:["S","M","L","XL"],description:"Buzo tipo hoodie gris de diseño minimalista, ideal para un look casual.",stock:13,art:"jacket",image:"hoodie-gris.jpg",isNew:true},
{id:"CH04",name:"Chaqueta Bomber Negra",category:"Chaquetas",price:129900,color:"Negro",sizes:["S","M","L","XL"],description:"Chaqueta bomber negra de acabado sobrio para completar un atuendo urbano.",stock:12,art:"jacket",image:"chaqueta-bomber-negra.jpg",isNew:true},
{id:"B02",name:"Bermuda Denim Negra",category:"Bermudas",price:69900,color:"Negro",sizes:["S","M","L","XL"],description:"Bermuda denim negra de estilo relajado para días cálidos.",stock:14,art:"shorts",image:"bermuda-denim-negra.jpg",isNew:true},
{id:"B03",name:"Bermuda Denim Clara",category:"Bermudas",price:69900,color:"Azul claro",sizes:["S","M","L","XL"],description:"Bermuda denim de lavado claro y estilo relajado para días cálidos.",stock:16,art:"shorts",image:"bermuda-denim-clara.jpg",isNew:true}
];
try{
 let saved=JSON.parse(localStorage.getItem("ecom_products")||"null");
 if(!Array.isArray(saved)||!saved.length){saved=seed.slice()}
 else {saved=saved.map(p=>({...p,...(seed.find(s=>s.id===p.id)||{}),...p,image:(seed.find(s=>s.id===p.id)||p).image||p.image}));for(const s of seed)if(!saved.some(p=>p.id===s.id))saved.push(s)}
 localStorage.setItem("ecom_products",JSON.stringify(saved));
 if(!localStorage.getItem("ecom_cart"))localStorage.setItem("ecom_cart","[]");
 if(!localStorage.getItem("ecom_users"))localStorage.setItem("ecom_users","[]");
 if(!localStorage.getItem("ecom_orders"))localStorage.setItem("ecom_orders","[]");
}catch(e){}
window.EcomSeed=seed;
})();