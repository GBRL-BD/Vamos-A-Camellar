const opportunities = [
{
id:"commission_sales", name:"Ventas por comisión", icon:"💰", category:"Ventas",
description:"Ayuda a vender productos o servicios de otras empresas y recibe una comisión por cada venta.",
investment:"Baja", firstGoal:"Conseguir tu primera venta.",
rules:{skills:{selling:5,people:4},resources:{phone:2,contacts:3},objective:{quick_money:5,stable_income:3,business:2},capital:{zero:5,"100k":4},time:{less_2:2,"2_5":3,more_5:4,full_time:5}},
missions:[
{title:"Encuentra algo que ya se venda",description:"Elige 3 productos o servicios que conozcas y descubre quién los compra.",tip:"No intentes inventar algo todavía. Observa lo que ya tiene demanda.",type:"list",placeholder:"Escribe 3 productos o servicios separados por comas..."},
{title:"Habla con un posible comprador",description:"Pregunta a una persona qué compra, qué necesita y qué le gustaría encontrar más fácilmente.",tip:"Una conversación real vale más que imaginar lo que la gente quiere.",type:"text",placeholder:"¿Qué descubriste?"},
{title:"Elige una oferta",description:"Compara tus opciones y selecciona una que puedas intentar vender.",tip:"Empieza con algo sencillo y fácil de explicar.",type:"choice",options:["Producto físico","Servicio","Producto digital"]},
{title:"Crea tu primer mensaje",description:"Escribe un mensaje corto para ofrecer la solución a una persona real.",tip:"No necesitas sonar como una gran empresa. Sé claro.",type:"text",placeholder:"Escribe tu mensaje de oferta..."},
{title:"Haz tu primera prueba",description:"Envía tu oferta a 3 personas que realmente puedan estar interesadas.",tip:"El objetivo no es vender a la fuerza, sino aprender.",type:"number",placeholder:"¿A cuántas personas contactaste?"},
{title:"Analiza las respuestas",description:"Registra qué te respondieron y qué objeciones aparecieron.",tip:"Cada respuesta te ayuda a mejorar.",type:"text",placeholder:"¿Qué te dijeron?"},
{title:"Decide tu siguiente movimiento",description:"Con lo aprendido, decide si continuar, cambiar tu oferta o probar otra oportunidad.",tip:"Emprender es probar, aprender y ajustar.",type:"choice",options:["Continuar","Cambiar la oferta","Probar otra oportunidad"]}
]},
{
id:"service_intermediation", name:"Intermediación de servicios", icon:"🤝", category:"Conexiones",
description:"Encuentra personas que necesitan algo y conéctalas con quienes pueden resolverlo.",
investment:"Muy baja", firstGoal:"Encontrar una necesidad real y una persona que pueda resolverla.",
rules:{skills:{people:5,selling:3,organizing:3},resources:{phone:3,contacts:5,time:2},objective:{quick_money:4,stable_income:4,business:3},capital:{zero:5,"100k":5},time:{less_2:3,"2_5":4,more_5:4,full_time:5}},
missions:[
{title:"Detecta 3 problemas",description:"Piensa en 3 problemas que las personas o negocios de tu entorno tienen con frecuencia.",tip:"Busca problemas repetidos. Ahí puede existir una oportunidad.",type:"list",placeholder:"Escribe los 3 problemas..."},
{title:"Encuentra quién puede resolver uno",description:"Busca una persona o negocio que ya pueda solucionar uno de esos problemas.",tip:"No necesitas saber hacerlo todo tú.",type:"text",placeholder:"¿Quién podría resolverlo?"},
{title:"Conecta las dos partes",description:"Elige el problema y la solución que mejor encajan.",tip:"Tu valor puede estar en crear la conexión.",type:"choice",options:["Persona ↔ Servicio","Negocio ↔ Proveedor","Cliente ↔ Profesional"]},
{title:"Diseña tu forma de ayudar",description:"Escribe cómo facilitarías esa conexión.",tip:"Puede ser conseguir clientes, encontrar proveedores o coordinar.",type:"text",placeholder:"¿Cómo ayudarías?"},
{title:"Haz una conexión real",description:"Intenta conectar a una persona con una solución real.",tip:"La primera conexión te dará información valiosa.",type:"number",placeholder:"¿Cuántas conexiones intentaste?"},
{title:"Registra el resultado",description:"¿La conexión funcionó? ¿Qué faltó?",tip:"El aprendizaje también es progreso.",type:"text",placeholder:"Describe el resultado..."},
{title:"Elige tu siguiente paso",description:"Decide si quieres repetir el proceso, mejorar la conexión o cambiar de problema.",tip:"Una oportunidad se construye con pruebas.",type:"choice",options:["Repetir","Mejorar","Cambiar de problema"]}
]},
{
id:"digital_services", name:"Servicios digitales", icon:"💻", category:"Digital",
description:"Ayuda a personas o negocios con diseño, tecnología, contenido o herramientas digitales.",
investment:"Baja", firstGoal:"Crear una oferta sencilla y encontrar tu primer cliente.",
rules:{skills:{technology:5,design:5,content:5,writing:4},resources:{phone:2,computer:5,skills:3},objective:{quick_money:3,stable_income:4,business:4,online:5,home:5,growth:5},capital:{zero:4,"100k":4},time:{less_2:2,"2_5":4,more_5:5,full_time:5}},
missions:[
{title:"Descubre problemas digitales",description:"Encuentra 3 personas o negocios que tengan un problema digital.",tip:"Observa redes sociales, páginas, publicaciones o procesos manuales.",type:"list",placeholder:"Escribe 3 problemas..."},
{title:"Elige un problema",description:"Selecciona el problema que parece más frecuente o urgente.",tip:"Un problema claro es mejor que una idea complicada.",type:"choice",options:["Diseño","Redes sociales","Tecnología","Contenido","Organización digital"]},
{title:"Diseña una solución sencilla",description:"Explica en una frase cómo podrías ayudar.",tip:"Si no puedes explicarlo fácil, todavía hay que simplificarlo.",type:"text",placeholder:"Yo ayudo a..."},
{title:"Crea una muestra",description:"Haz una pequeña demostración de lo que podrías entregar.",tip:"Una muestra puede ser un diseño, ejemplo, plantilla o mini solución.",type:"text",placeholder:"¿Qué muestra creaste?"},
{title:"Muéstrala a 3 personas",description:"Comparte tu muestra y pregunta si les sería útil.",tip:"Busca opiniones, no solo elogios.",type:"number",placeholder:"¿A cuántas personas se la mostraste?"},
{title:"Ajusta tu oferta",description:"Usa los comentarios recibidos para mejorar tu propuesta.",tip:"La primera versión no tiene que ser perfecta.",type:"text",placeholder:"¿Qué cambiarías?"},
{title:"Publica tu primera oferta",description:"Decide dónde y cómo ofrecerás tu servicio.",tip:"El objetivo es dar el siguiente paso real.",type:"choice",options:["Redes sociales","Contactos directos","Negocios locales","Plataforma digital"]}
]},
{
id:"local_services", name:"Servicios locales", icon:"🛠️", category:"Servicios",
description:"Resuelve problemas concretos de personas o negocios de tu zona.",
investment:"Baja", firstGoal:"Encontrar un problema local que puedas resolver.",
rules:{skills:{repair:5,organizing:4,people:3,cooking:3},resources:{phone:2,vehicle:4,space:2,time:3},objective:{quick_money:5,stable_income:4,business:3},capital:{zero:4,"100k":4,"500k":3},time:{less_2:3,"2_5":4,more_5:5,full_time:5}},
missions:[
{title:"Observa tu zona",description:"Recorre mentalmente tu barrio y anota 3 problemas o necesidades que se repitan.",tip:"Las mejores oportunidades muchas veces están cerca.",type:"list",placeholder:"Escribe 3 necesidades..."},
{title:"Elige una necesidad",description:"Selecciona la que parezca más frecuente y que puedas intentar resolver.",tip:"Empieza pequeño.",type:"choice",options:["Hogares","Negocios","Personas mayores","Estudiantes","Trabajadores"]},
{title:"Diseña tu solución",description:"Describe qué harías exactamente para ayudar.",tip:"Sé específico: quién, qué problema y cómo lo resuelves.",type:"text",placeholder:"Yo ayudaría a..."},
{title:"Calcula una primera prueba",description:"Piensa qué necesitas para probar el servicio una sola vez.",tip:"No compres mucho antes de validar.",type:"text",placeholder:"¿Qué necesitas para probarlo?"},
{title:"Encuentra un primer interesado",description:"Habla con una persona que podría necesitar tu solución.",tip:"Una conversación real es el primer test.",type:"number",placeholder:"¿Con cuántas personas hablaste?"},
{title:"Realiza una prueba",description:"Intenta resolver el problema para una persona real.",tip:"Aprende qué funciona y qué debes mejorar.",type:"text",placeholder:"¿Qué ocurrió?"},
{title:"Decide cómo continuar",description:"Elige si vas a repetir, mejorar o cambiar el servicio.",tip:"El camino se construye con evidencia.",type:"choice",options:["Repetir","Mejorar","Cambiar"]}
]},
{
id:"food_business", name:"Comida por encargo", icon:"🍳", category:"Alimentos",
description:"Prepara y vende alimentos por encargo sin necesidad de comenzar con un local.",
investment:"Baja - Media", firstGoal:"Validar si existe demanda por un producto específico.",
rules:{skills:{cooking:6,selling:3,organizing:2},resources:{space:5,phone:2,money:2},objective:{quick_money:3,stable_income:4,business:5,growth:3},capital:{zero:1,"100k":3,"500k":5,"2m":5},time:{less_2:2,"2_5":4,more_5:5,full_time:5}},
missions:[
{title:"Observa qué comen",description:"Pregunta a 3 personas qué suelen desayunar, almorzar o comprar cuando tienen poco tiempo.",tip:"No adivines la demanda: pregunta.",type:"list",placeholder:"Escribe lo que descubriste..."},
{title:"Encuentra una oportunidad",description:"Elige un producto o comida que parezca tener una necesidad real.",tip:"Busca una necesidad concreta.",type:"choice",options:["Desayunos","Almuerzos","Snacks","Postres","Comida especial"]},
{title:"Diseña una primera versión",description:"Describe qué venderías y para quién.",tip:"Un producto claro es más fácil de probar.",type:"text",placeholder:"Vendería..."},
{title:"Calcula una prueba pequeña",description:"Define qué necesitarías para preparar una cantidad pequeña.",tip:"Valida antes de invertir demasiado.",type:"text",placeholder:"¿Qué necesitarías?"},
{title:"Pregunta quién compraría",description:"Busca 3 personas que realmente podrían comprarlo.",tip:"Una intención real vale más que un 'qué rico'.",type:"number",placeholder:"¿A cuántas personas preguntaste?"},
{title:"Haz una prueba",description:"Prepara o presenta una primera versión y recoge opiniones.",tip:"Aprende antes de crecer.",type:"text",placeholder:"¿Qué opinión recibiste?"},
{title:"Decide el siguiente paso",description:"Elige si vas a mejorar el producto, repetirlo o cambiarlo.",tip:"El objetivo es encontrar algo que la gente quiera.",type:"choice",options:["Mejorar","Repetir","Cambiar producto"]}
]},
{
id:"reselling", name:"Compra y reventa", icon:"📦", category:"Comercio",
description:"Encuentra productos con demanda y véndelos a personas que los necesitan.",
investment:"Media", firstGoal:"Validar un producto antes de comprar grandes cantidades.",
rules:{skills:{selling:5,organizing:3,people:3},resources:{phone:2,contacts:3,money:4},objective:{quick_money:4,stable_income:4,business:5,growth:4},capital:{zero:0,"100k":3,"500k":5,"2m":5,more_2m:5},time:{less_2:2,"2_5":4,more_5:5,full_time:5}},
missions:[
{title:"Busca necesidades",description:"Anota 3 productos que las personas de tu entorno compran con frecuencia.",tip:"La demanda existente reduce la incertidumbre.",type:"list",placeholder:"Escribe 3 productos..."},
{title:"Compara opciones",description:"Elige uno y compara precios, calidad y disponibilidad.",tip:"No busques solo el precio más bajo.",type:"choice",options:["Precio","Calidad","Rapidez","Diferenciación"]},
{title:"Encuentra un proveedor",description:"Investiga dónde podrías conseguir el producto sin comprar grandes cantidades.",tip:"Primero valida; después compras más.",type:"text",placeholder:"¿Dónde lo conseguirías?"},
{title:"Calcula tu margen",description:"Escribe cuánto costaría comprarlo y cuánto podrías venderlo.",tip:"Un negocio necesita margen después de gastos.",type:"text",placeholder:"Costo / precio de venta..."},
{title:"Pregunta antes de comprar",description:"Encuentra personas que realmente estarían dispuestas a comprar.",tip:"No acumules inventario sin validar.",type:"number",placeholder:"¿Cuántos posibles compradores encontraste?"},
{title:"Haz una primera venta o prueba",description:"Intenta conseguir una venta o una reserva.",tip:"La primera validación es más importante que tener mucho inventario.",type:"text",placeholder:"¿Qué ocurrió?"},
{title:"Decide si continuar",description:"Con la información obtenida, decide qué mejorar.",tip:"Los datos te ayudan a tomar mejores decisiones.",type:"choice",options:["Continuar","Cambiar producto","Cambiar proveedor"]}
]},
{
id:"skill_learning", name:"Aprender una habilidad rentable", icon:"🧠", category:"Aprendizaje",
description:"Descubre una habilidad que puedas aprender y convertir en una futura oferta.",
investment:"Baja", firstGoal:"Elegir una habilidad y crear tu primer pequeño proyecto.",
rules:{skills:{learning:6,unknown:5},resources:{phone:2,computer:4,time:5},objective:{stable_income:5,business:4,online:5,growth:5},capital:{zero:5,"100k":5},time:{less_2:3,"2_5":5,more_5:5,full_time:5}},
missions:[
{title:"Elige 3 habilidades",description:"Selecciona 3 habilidades que te gustaría aprender y que podrían tener valor.",tip:"No necesitas elegir para siempre.",type:"list",placeholder:"Escribe 3 habilidades..."},
{title:"Elige una para probar",description:"Selecciona la habilidad que más te interesa explorar esta semana.",tip:"La mejor habilidad para empezar es la que realmente practicarás.",type:"choice",options:["Diseño","Programación","Ventas","Edición de video","Marketing","Otra"]},
{title:"Encuentra un problema",description:"Busca un problema que alguien tenga y que esa habilidad pueda ayudar a resolver.",tip:"Aprende con un objetivo real.",type:"text",placeholder:"¿Qué problema resolverías?"},
{title:"Crea un pequeño proyecto",description:"Haz una primera muestra de lo que puedes hacer.",tip:"Aprender haciendo es más poderoso que solo consumir cursos.",type:"text",placeholder:"¿Qué proyecto creaste?"},
{title:"Muéstralo a 3 personas",description:"Pide opiniones sinceras sobre tu proyecto.",tip:"El feedback te muestra qué mejorar.",type:"number",placeholder:"¿A cuántas personas se lo mostraste?"},
{title:"Mejora tu proyecto",description:"Haz un cambio concreto usando lo que aprendiste.",tip:"Cada versión debe ser un poco mejor.",type:"text",placeholder:"¿Qué mejoraste?"},
{title:"Decide tu siguiente habilidad",description:"Elige si continuarás profundizando o probarás otra habilidad.",tip:"La constancia convierte una habilidad en una oportunidad.",type:"choice",options:["Seguir aprendiendo","Crear otra muestra","Probar otra habilidad"]}
]}
];
