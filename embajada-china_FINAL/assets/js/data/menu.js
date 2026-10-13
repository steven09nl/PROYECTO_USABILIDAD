/* Datos del menú: categorías y productos.
   - categoria: debe coincidir con el id de una categoría.
   - precio: en pesos colombianos (COP). Son valores de referencia; ajústalos a los reales del restaurante.
   - disponible: false muestra el aviso "El producto no se encuentra disponible".
   - existencias: unidades que se pueden vender por día; al agotarse se pide modificar la cantidad.
   - Imágenes: assets/img/productos/<id>-1.svg, -2 y -3 (ilustraciones; se pueden reemplazar por fotos y ajustar EC.imagen en core/util.js). */
EC.categorias = [
  {"id": "entrada", "nombre": "Entrada", "titulo": "Entradas"},
  {"id": "arroz-chino", "nombre": "Arroz chino", "titulo": "Arroz chino"},
  {"id": "chop-suey", "nombre": "Chop suey", "titulo": "Chop suey"},
  {"id": "chau-mien", "nombre": "Chau Mien", "titulo": "Chau Mien"},
  {"id": "lomin", "nombre": "Lomin", "titulo": "Lomin"},
  {"id": "espaguetis", "nombre": "Espaguetis", "titulo": "Espaguetis"},
  {"id": "agridulce", "nombre": "Agridulce", "titulo": "Agridulce"},
  {"id": "curry", "nombre": "Curry", "titulo": "Curry"},
  {"id": "mariscos", "nombre": "Mariscos", "titulo": "Mariscos"}
];

EC.productos = [
  {"id": "6-gozas", "categoria": "entrada", "nombre": "6 gozas", "precio": 17000, "disponible": true, "existencias": 40, "descripcion": "Seis empanadillas al vapor rellenas de cerdo, cebollín y jengibre, servidas con salsa de soya."},
  {"id": "lumpia", "categoria": "entrada", "nombre": "Lumpia", "precio": 6000, "disponible": true, "existencias": 40, "descripcion": "Rollito frito y crocante relleno de repollo, zanahoria y carne de cerdo, con salsa agridulce."},
  {"id": "papas-a-la-francesa", "categoria": "entrada", "nombre": "Papas a la francesa", "precio": 14000, "disponible": true, "existencias": 40, "descripcion": "Papas fritas en bastón, doradas y crocantes, con sal y salsa de la casa."},
  {"id": "sopa-wanton", "categoria": "entrada", "nombre": "Sopa wantán", "precio": 16000, "disponible": true, "existencias": 40, "descripcion": "Caldo de pollo con wantanes de cerdo, pak choi y cebollín."},
  {"id": "wanton-frito", "categoria": "entrada", "nombre": "Wantán frito", "precio": 15000, "disponible": true, "existencias": 40, "descripcion": "Ocho wantanes fritos rellenos de cerdo y camarón, con salsa agridulce."},
  {"id": "arroz-chino-especial", "categoria": "arroz-chino", "nombre": "Arroz chino especial", "precio": 28000, "disponible": true, "existencias": 40, "descripcion": "Arroz salteado al wok con pollo, cerdo, camarón, huevo, cebollín y zanahoria."},
  {"id": "arroz-chino-pollo", "categoria": "arroz-chino", "nombre": "Arroz chino de pollo", "precio": 22000, "disponible": true, "existencias": 40, "descripcion": "Arroz salteado con pollo en trozos, huevo, arveja y zanahoria."},
  {"id": "arroz-chino-cerdo", "categoria": "arroz-chino", "nombre": "Arroz chino de cerdo", "precio": 22000, "disponible": true, "existencias": 40, "descripcion": "Arroz salteado con cerdo asado, huevo, cebollín y salsa de soya."},
  {"id": "arroz-chino-camaron", "categoria": "arroz-chino", "nombre": "Arroz chino con camarones", "precio": 26000, "disponible": true, "existencias": 40, "descripcion": "Arroz salteado con camarones, huevo, arveja y cebollín."},
  {"id": "arroz-chino-vegetariano", "categoria": "arroz-chino", "nombre": "Arroz chino vegetariano", "precio": 18000, "disponible": true, "existencias": 40, "descripcion": "Arroz salteado con huevo, zanahoria, arveja, maíz y champiñones."},
  {"id": "chop-suey-pollo", "categoria": "chop-suey", "nombre": "Chop suey de pollo", "precio": 25000, "disponible": true, "existencias": 40, "descripcion": "Pollo salteado con brócoli, zanahoria, apio, champiñones y brotes de soya en salsa de ostras."},
  {"id": "chop-suey-res", "categoria": "chop-suey", "nombre": "Chop suey de res", "precio": 28000, "disponible": true, "existencias": 40, "descripcion": "Tiras de res tierna salteadas con brócoli, zanahoria, apio y champiñones en salsa de ostras."},
  {"id": "chop-suey-cerdo", "categoria": "chop-suey", "nombre": "Chop suey de cerdo", "precio": 25000, "disponible": true, "existencias": 40, "descripcion": "Cerdo salteado con vegetales frescos y brotes de soya en salsa de ostras."},
  {"id": "chop-suey-camaron", "categoria": "chop-suey", "nombre": "Chop suey de camarones", "precio": 30000, "disponible": true, "existencias": 40, "descripcion": "Camarones salteados con brócoli, zanahoria, apio y champiñones en salsa suave de ajo."},
  {"id": "chop-suey-mixto", "categoria": "chop-suey", "nombre": "Chop suey mixto", "precio": 32000, "disponible": true, "existencias": 40, "descripcion": "Pollo, res, cerdo y camarón salteados con vegetales frescos en salsa de ostras."},
  {"id": "chau-mien-pollo", "categoria": "chau-mien", "nombre": "Chau Mien de pollo", "precio": 24000, "disponible": true, "existencias": 40, "descripcion": "Fideos de huevo salteados con pollo, repollo, zanahoria y cebollín, de textura ligeramente crocante."},
  {"id": "chau-mien-res", "categoria": "chau-mien", "nombre": "Chau Mien de res", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Fideos de huevo salteados con res, pimentón, cebolla y brotes de soya."},
  {"id": "chau-mien-cerdo", "categoria": "chau-mien", "nombre": "Chau Mien de cerdo", "precio": 24000, "disponible": true, "existencias": 40, "descripcion": "Fideos de huevo salteados con cerdo asado, repollo y zanahoria."},
  {"id": "chau-mien-camaron", "categoria": "chau-mien", "nombre": "Chau Mien de camarones", "precio": 29000, "disponible": true, "existencias": 40, "descripcion": "Fideos de huevo salteados con camarones, cebollín y vegetales al wok."},
  {"id": "chau-mien-especial", "categoria": "chau-mien", "nombre": "Chau Mien especial", "precio": 31000, "disponible": true, "existencias": 40, "descripcion": "Fideos salteados con pollo, res, cerdo y camarón, vegetales y salsa de soya."},
  {"id": "lomin-pollo", "categoria": "lomin", "nombre": "Lomin de pollo", "precio": 24000, "disponible": true, "existencias": 40, "descripcion": "Fideos de huevo suaves mezclados con pollo, repollo y zanahoria en salsa de soya oscura."},
  {"id": "lomin-res", "categoria": "lomin", "nombre": "Lomin de res", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Fideos suaves con tiras de res, cebolla y pimentón en salsa de soya oscura."},
  {"id": "lomin-cerdo", "categoria": "lomin", "nombre": "Lomin de cerdo", "precio": 24000, "disponible": true, "existencias": 40, "descripcion": "Fideos suaves con cerdo asado, cebollín y brotes de soya."},
  {"id": "lomin-camaron", "categoria": "lomin", "nombre": "Lomin de camarones", "precio": 29000, "disponible": true, "existencias": 40, "descripcion": "Fideos suaves con camarones, zanahoria y cebollín en salsa de ostras."},
  {"id": "lomin-especial", "categoria": "lomin", "nombre": "Lomin especial", "precio": 31000, "disponible": true, "existencias": 40, "descripcion": "Fideos suaves con pollo, res, cerdo y camarón, vegetales y salsa de soya oscura."},
  {"id": "espagueti-pollo", "categoria": "espaguetis", "nombre": "Espagueti chino de pollo", "precio": 23000, "disponible": true, "existencias": 40, "descripcion": "Espaguetis salteados al wok con pollo, pimentón, cebolla y salsa de soya."},
  {"id": "espagueti-res", "categoria": "espaguetis", "nombre": "Espagueti chino de res", "precio": 26000, "disponible": true, "existencias": 40, "descripcion": "Espaguetis salteados con res, tomate, pimentón y cebolla."},
  {"id": "espagueti-cerdo", "categoria": "espaguetis", "nombre": "Espagueti chino de cerdo", "precio": 23000, "disponible": true, "existencias": 40, "descripcion": "Espaguetis salteados con cerdo, tomate y cebollín."},
  {"id": "espagueti-camaron", "categoria": "espaguetis", "nombre": "Espagueti chino de camarones", "precio": 28000, "disponible": true, "existencias": 40, "descripcion": "Espaguetis salteados con camarones, ajo, tomate y cebollín."},
  {"id": "espagueti-especial", "categoria": "espaguetis", "nombre": "Espagueti chino especial", "precio": 30000, "disponible": true, "existencias": 40, "descripcion": "Espaguetis con pollo, cerdo y camarón, vegetales y salsa de la casa."},
  {"id": "pollo-agridulce", "categoria": "agridulce", "nombre": "Pollo agridulce", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Trozos de pollo apanados y fritos, bañados en salsa agridulce de piña y pimentón."},
  {"id": "cerdo-agridulce", "categoria": "agridulce", "nombre": "Cerdo agridulce", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Cerdo apanado y frito con salsa agridulce, piña y pimentón."},
  {"id": "res-agridulce", "categoria": "agridulce", "nombre": "Res agridulce", "precio": 30000, "disponible": true, "existencias": 40, "descripcion": "Tiras de res crocantes con salsa agridulce, cebolla y pimentón."},
  {"id": "camarones-agridulces", "categoria": "agridulce", "nombre": "Camarones agridulces", "precio": 32000, "disponible": true, "existencias": 40, "descripcion": "Camarones apanados y fritos, con salsa agridulce y piña."},
  {"id": "pescado-agridulce", "categoria": "agridulce", "nombre": "Pescado agridulce", "precio": 33000, "disponible": true, "existencias": 40, "descripcion": "Filete de pescado frito y crocante con salsa agridulce y vegetales."},
  {"id": "curry-pollo", "categoria": "curry", "nombre": "Curry de pollo", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Pollo con papa y cebolla en salsa de curry amarillo con leche de coco, acompañado de arroz blanco."},
  {"id": "curry-res", "categoria": "curry", "nombre": "Curry de res", "precio": 30000, "disponible": true, "existencias": 40, "descripcion": "Res tierna con papa y cebolla en salsa de curry amarillo, con arroz blanco."},
  {"id": "curry-cerdo", "categoria": "curry", "nombre": "Curry de cerdo", "precio": 27000, "disponible": true, "existencias": 40, "descripcion": "Cerdo con papa y zanahoria en salsa de curry amarillo, con arroz blanco."},
  {"id": "curry-camaron", "categoria": "curry", "nombre": "Curry de camarones", "precio": 33000, "disponible": true, "existencias": 40, "descripcion": "Camarones en salsa cremosa de curry y coco, con arroz blanco."},
  {"id": "curry-vegetariano", "categoria": "curry", "nombre": "Curry vegetariano", "precio": 22000, "disponible": true, "existencias": 40, "descripcion": "Papa, zanahoria, brócoli y garbanzos en salsa de curry con coco, con arroz blanco."},
  {"id": "camarones-al-ajillo", "categoria": "mariscos", "nombre": "Camarones al ajillo", "precio": 36000, "disponible": true, "existencias": 40, "descripcion": "Camarones salteados con ajo, jengibre y cebollín."},
  {"id": "camarones-con-vegetales", "categoria": "mariscos", "nombre": "Camarones con vegetales", "precio": 35000, "disponible": true, "existencias": 40, "descripcion": "Camarones salteados con brócoli, zanahoria y pimentón en salsa de ostras."},
  {"id": "calamares-fritos", "categoria": "mariscos", "nombre": "Calamares fritos", "precio": 32000, "disponible": true, "existencias": 40, "descripcion": "Anillos de calamar apanados y fritos, con limón y salsa agridulce."},
  {"id": "pescado-frito", "categoria": "mariscos", "nombre": "Pescado frito en salsa de soya", "precio": 38000, "disponible": true, "existencias": 40, "descripcion": "Pescado entero frito, bañado en salsa de soya, jengibre y cebollín."},
  {"id": "mariscos-mixtos", "categoria": "mariscos", "nombre": "Mariscos mixtos al wok", "precio": 42000, "disponible": true, "existencias": 40, "descripcion": "Camarones, calamar y pescado salteados con vegetales en salsa de ajo."}
];
