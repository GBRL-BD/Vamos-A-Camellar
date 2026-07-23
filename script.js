const DEFAULT_USER_DATA={goal:null,resources:[],skills:[],objective:null,time:null,capital:null,userId:null,role:'user'};
const DEFAULT_PROGRESS={selectedOpportunity:null,currentMission:0,completedMissions:[],missionAnswers:{},recommendations:[],startedAt:null,lastActivity:null,helpReports:[]};
const DATA={resources:[['time','⏰','Tiempo'],['money','💰','Algo de dinero'],['phone','📱','Un celular'],['computer','💻','Un computador'],['vehicle','🛵','Moto o vehículo'],['space','🏠','Un espacio'],['skills','🧠','Conocimientos o habilidades'],['contacts','👥','Contactos'],['nothing','🤷','No tengo mucho todavía']],skills:[['selling','💰','Vender'],['people','🗣️','Trabajar con personas'],['cooking','🍳','Cocinar'],['repair','🔧','Reparar'],['design','🎨','Diseñar'],['technology','📱','Usar tecnología'],['content','📸','Crear contenido'],['teaching','📚','Enseñar'],['organizing','📦','Organizar'],['learning','🧠','Aprender algo nuevo'],['unknown','🤷','Todavía no lo sé']],objectives:[['quick_money','💵','Conseguir dinero lo antes posible'],['stable_income','📈','Conseguir ingresos estables'],['business','🏪','Crear un negocio'],['home','🏠','Trabajar desde casa'],['online','🌐','Trabajar por internet'],['growth','🚀','Crear algo que pueda crecer mucho']],time:[['less_2','Menos de 2 horas al día'],['2_5','Entre 2 y 5 horas'],['more_5','Más de 5 horas'],['full_time','Tiempo completo']],capital:[['zero','$0'],['100k','Hasta $100.000'],['500k','$100.000 – $500.000'],['2m','$500.000 – $2.000.000'],['more_2m','Más de $2.000.000']]};
let opportunities=[
{id:'commission_sales',name:'Ventas por comisión',icon:'💰',category:'Ventas',description:'Ayuda a vender productos o servicios de otras empresas y recibe una comisión por cada venta.',investment:'Baja',firstGoal:'Conseguir tu primera venta.',rules:{skills:{selling:5,people:4},resources:{phone:2,contacts:3},objective:{quick_money:5,stable_income:3,business:2},capital:{zero:5,'100k':4},time:{less_2:2,'2_5':3,more_5:4,full_time:5}},missions:[{id:'sales_1',title:'Encuentra una oferta real',description:'Busca un producto o servicio que ya exista y que podrías ayudar a vender.',type:'text',placeholder:'¿Qué producto o servicio encontraste?',tip:'No busques todavía ganar dinero. Primero identifica una oferta real.'},{id:'sales_2',title:'Habla con un posible cliente',description:'Pregunta a una persona qué necesita y comprueba si la oferta podría interesarle.',type:'text',placeholder:'¿Qué necesidad descubriste?',tip:'La misión es escuchar, no presionar.'},{id:'sales_3',title:'Haz tu primera propuesta',description:'Presenta la oferta a una persona que realmente podría necesitarla.',type:'text',placeholder:'¿Qué respuesta recibiste?',tip:'Una respuesta real vale más que diez suposiciones.'}]},
{id:'service_intermediation',name:'Intermediación de servicios',icon:'🤝',category:'Conexiones',description:'Encuentra personas que necesitan algo y conéctalas con quienes pueden resolverlo.',investment:'Muy baja',firstGoal:'Encontrar una necesidad real y una persona que pueda resolverla.',rules:{skills:{people:5,selling:3,organizing:3},resources:{phone:3,contacts:5,time:2},objective:{quick_money:4,stable_income:4,business:3},capital:{zero:5,'100k':5},time:{less_2:3,'2_5':4,more_5:4,full_time:5}},missions:[{id:'connect_1',title:'Detecta una necesidad',description:'Pregunta a alguien qué problema necesita resolver actualmente.',type:'text',placeholder:'¿Qué problema encontraste?',tip:'Busca problemas concretos, no ideas abstractas.'},{id:'connect_2',title:'Encuentra quién puede ayudar',description:'Identifica una persona o negocio que pueda resolver esa necesidad.',type:'text',placeholder:'¿Quién podría resolverlo?',tip:'Una conexión útil empieza con información real.'},{id:'connect_3',title:'Haz la conexión',description:'Contacta a ambas partes y pregunta si desean hablar entre ellas.',type:'text',placeholder:'¿Qué ocurrió después?',tip:'No prometas resultados que no controlas.'}]},
{id:'digital_services',name:'Servicios digitales',icon:'💻',category:'Digital',description:'Ayuda a personas o negocios con diseño, tecnología, contenido o herramientas digitales.',investment:'Baja',firstGoal:'Crear una oferta sencilla y encontrar tu primer cliente.',rules:{skills:{technology:5,design:5,content:5,learning:3},resources:{phone:2,computer:5,skills:3},objective:{quick_money:3,stable_income:4,business:4,online:5,home:5,growth:5},capital:{zero:4,'100k':4},time:{less_2:2,'2_5':4,more_5:5,full_time:5}},missions:[{id:'digital_1',title:'Encuentra un problema digital',description:'Habla con una persona o negocio y descubre algo digital que le esté costando.',type:'text',placeholder:'¿Qué problema descubriste?',tip:'No vendas todavía: primero entiende.'},{id:'digital_2',title:'Crea una mini solución',description:'Haz una pequeña muestra, ejemplo o propuesta de cómo podrías ayudar.',type:'text',placeholder:'¿Qué solución preparaste?',tip:'Una muestra concreta es más poderosa que una promesa.'},{id:'digital_3',title:'Muéstrala a alguien',description:'Presenta tu solución a una persona real y pide una opinión honesta.',type:'text',placeholder:'¿Qué opinión recibiste?',tip:'La respuesta te ayudará a mejorar.'}]},
{id:'local_services',name:'Servicios locales',icon:'🛠️',category:'Servicios',description:'Resuelve problemas concretos de personas o negocios de tu zona.',investment:'Baja',firstGoal:'Encontrar un problema local que puedas resolver.',rules:{skills:{repair:5,organizing:4,people:3,cooking:3},resources:{phone:2,vehicle:4,space:2,time:3},objective:{quick_money:5,stable_income:4,business:3},capital:{zero:4,'100k':4,'500k':3},time:{less_2:3,'2_5':4,more_5:5,full_time:5}},missions:[{id:'local_1',title:'Observa un problema cercano',description:'Identifica algo que una persona o negocio de tu zona necesite resolver.',type:'text',placeholder:'¿Qué problema observaste?',tip:'Mira tu entorno con atención.'},{id:'local_2',title:'Pregunta cuánto importa',description:'Habla con alguien que tenga ese problema y descubre qué tan importante es.',type:'text',placeholder:'¿Qué aprendiste?',tip:'La necesidad real es la mejor señal.'},{id:'local_3',title:'Prueba una solución pequeña',description:'Haz una primera prueba de tu servicio con alguien cercano.',type:'text',placeholder:'¿Qué hiciste y qué resultado tuvo?',tip:'Empieza pequeño para aprender rápido.'}]},
{id:'food_business',name:'Comida por encargo',icon:'🍳',category:'Alimentos',description:'Prepara y vende alimentos por encargo sin necesidad de comenzar con un local.',investment:'Baja - Media',firstGoal:'Validar si existe demanda por un producto específico.',rules:{skills:{cooking:6,selling:3,organizing:2},resources:{space:5,phone:2,money:2},objective:{quick_money:3,stable_income:4,business:5,growth:3},capital:{zero:1,'100k':3,'500k':5,'2m':5},time:{less_2:2,'2_5':4,more_5:5,full_time:5}},missions:[{id:'food_1',title:'Elige un producto',description:'Elige un producto de comida concreto que podrías preparar.',type:'text',placeholder:'¿Qué producto elegiste?',tip:'Empieza con una sola cosa.'},{id:'food_2',title:'Pregunta si lo comprarían',description:'Pregunta a varias personas si comprarían ese producto y a qué precio.',type:'text',placeholder:'¿Qué respuestas recibiste?',tip:'Validar antes de comprar ingredientes reduce riesgos.'},{id:'food_3',title:'Haz una prueba pequeña',description:'Prepara una cantidad pequeña y consigue una opinión real.',type:'text',placeholder:'¿Qué aprendiste de la prueba?',tip:'La primera versión no tiene que ser perfecta.'}]},
{id:'reselling',name:'Compra y reventa',icon:'📦',category:'Comercio',description:'Encuentra productos con demanda y véndelos a personas que los necesitan.',investment:'Media',firstGoal:'Validar un producto antes de comprar grandes cantidades.',rules:{skills:{selling:5,organizing:3,people:3},resources:{phone:2,contacts:3,money:4},objective:{quick_money:4,stable_income:4,business:5,growth:4},capital:{zero:0,'100k':3,'500k':5,'2m':5,more_2m:5},time:{less_2:2,'2_5':4,more_5:5,full_time:5}},missions:[{id:'resell_1',title:'Encuentra una demanda',description:'Busca un producto que varias personas estén buscando.',type:'text',placeholder:'¿Qué producto y qué demanda encontraste?',tip:'Primero busca demanda; después piensa en comprar.'},{id:'resell_2',title:'Compara proveedores',description:'Compara al menos dos formas de conseguir el producto.',type:'text',placeholder:'¿Qué opciones comparaste?',tip:'Compara precio, calidad y riesgo.'},{id:'resell_3',title:'Publica una prueba',description:'Publica una oferta o muestra el producto sin comprar grandes cantidades.',type:'text',placeholder:'¿Qué respuesta obtuviste?',tip:'Valida antes de comprometer tu capital.'}]},
{id:'skill_learning',name:'Aprender una habilidad rentable',icon:'🧠',category:'Aprendizaje',description:'Descubre una habilidad que puedas aprender y convertir en una futura oferta.',investment:'Baja',firstGoal:'Elegir una habilidad y crear tu primer pequeño proyecto.',rules:{skills:{learning:6,unknown:5},resources:{phone:2,computer:4,time:5},objective:{stable_income:5,business:4,online:5,growth:5},capital:{zero:5,'100k':5},time:{less_2:3,'2_5':5,more_5:5,full_time:5}},missions:[{id:'learn_1',title:'Elige una habilidad',description:'Elige una habilidad concreta que puedas aprender y practicar.',type:'text',placeholder:'¿Qué habilidad elegiste?',tip:'Concreta es mejor que “aprender tecnología”.'},{id:'learn_2',title:'Haz tu primera práctica',description:'Dedica una sesión real a practicar y crea algo pequeño.',type:'text',placeholder:'¿Qué practicaste o creaste?',tip:'Aprender haciendo acelera el progreso.'},{id:'learn_3',title:'Pide una opinión',description:'Muestra lo que hiciste a alguien y pide una crítica concreta.',type:'text',placeholder:'¿Qué mejorarías?',tip:'La retroalimentación convierte práctica en progreso.'}]}];
let userData={...DEFAULT_USER_DATA},userProgress={...DEFAULT_PROGRESS},currentOpportunity=null;
const saveProgress=()=>{localStorage.setItem('emprendeUserData',JSON.stringify(userData));localStorage.setItem('emprendeUserProgress',JSON.stringify(userProgress));};
function loadProgress(){try{const d=JSON.parse(localStorage.getItem('emprendeUserData')||'null'),p=JSON.parse(localStorage.getItem('emprendeUserProgress')||'null');if(d)userData={...DEFAULT_USER_DATA,...d,resources:Array.isArray(d.resources)?d.resources:[],skills:Array.isArray(d.skills)?d.skills:[]};if(p)userProgress={...DEFAULT_PROGRESS,...p,completedMissions:Array.isArray(p.completedMissions)?p.completedMissions:[],missionAnswers:p.missionAnswers||{}};currentOpportunity=opportunities.find(o=>o.id===userProgress.selectedOpportunity)||null;}catch(e){console.warn(e);}}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id)?.classList.add('active');window.scrollTo(0,0);}
function setButtonState(id,on){const b=document.getElementById(id);if(b){b.classList.toggle('disabled',!on);b.disabled=!on;}}
function startApp(){showScreen('goal-screen');}
function selectGoal(el,v){document.querySelectorAll('#goal-screen .option-card').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');userData.goal=v;setButtonState('continue-button',true);saveProgress();}
function nextFromGoal(){if(userData.goal)showScreen('resources-screen');}
function renderOptionList(id,items,cls,multi=false){const box=document.getElementById(id);box.innerHTML=items.map(x=>`<button class="option-card ${cls}" data-value="${x[0]}">${x[1]?`<span class="option-icon">${x[1]}</span>`:''}<span><strong>${x[2]||x[1]}</strong><small>${x[3]||'Puede ser útil para comenzar.'}</small></span></button>`).join('');box.querySelectorAll('.'+cls).forEach(el=>el.addEventListener('click',()=>{const v=el.dataset.value;if(multi){userData[cls==='multi-resource'?'resources':'skills']=[];} }));}
function setupMulti(sel,prop,btn){document.querySelectorAll(sel).forEach(el=>el.addEventListener('click',()=>{const v=el.dataset.value;userData[prop]=userData[prop].includes(v)?userData[prop].filter(x=>x!==v):[...userData[prop],v];el.classList.toggle('selected',userData[prop].includes(v));setButtonState(btn,userData[prop].length>0);saveProgress();}));}
function setupSingle(sel,prop,btn){document.querySelectorAll(sel).forEach(el=>el.addEventListener('click',()=>{document.querySelectorAll(sel).forEach(x=>x.classList.remove('selected'));el.classList.add('selected');userData[prop]=el.dataset.value;if(btn)setButtonState(btn,true);if(prop==='time'||prop==='capital')setButtonState('capacity-continue',!!(userData.time&&userData.capital));saveProgress();}));}
function nextFromResources(){if(userData.resources.length)showScreen('skills-screen');}
function nextFromSkills(){if(userData.skills.length)showScreen('objective-screen');}
function nextFromObjective(){if(userData.objective)showScreen('capacity-screen');}
function score(o){let n=0;for(const g of ['skills','resources','objective','capital','time']){const r=o.rules?.[g];if(!r)continue;if(Array.isArray(userData[g]))userData[g].forEach(v=>n+=Number(r[v]||0));else n+=Number(r[userData[g]]||0);}return n;}
function analyzeOpportunities(){return opportunities.map(o=>({...o,score:score(o)})).sort((a,b)=>b.score-a.score).slice(0,3);}
function profile(){if(userData.goal==='lost'||userData.skills.includes('unknown'))return{icon:'🧭',title:'Constructor desde cero',description:'Todavía estás descubriendo qué camino tomar. Lo importante es empezar con una prueba pequeña y aprender de ella.'};if(userData.objective==='quick_money')return{icon:'⚡',title:'Buscador de ingresos rápidos',description:'Tu prioridad es conseguir tu primer ingreso sin asumir grandes riesgos.'};if(['online','growth'].includes(userData.objective))return{icon:'🚀',title:'Constructor de oportunidades',description:'Buscas una oportunidad con potencial de crecimiento.'};return{icon:'🧩',title:'Explorador de oportunidades',description:'Tienes recursos e intereses que pueden convertirse en distintos caminos.'};}
function renderResults(){
  const p=document.getElementById('profile-result');
  const c=document.getElementById('opportunities-container');
  const pr=profile();
  const rs=analyzeOpportunities();
  p.innerHTML=`<div class="profile-result-icon">${pr.icon}</div><div><p class="dashboard-eyebrow">TU PERFIL ACTUAL</p><h3>${pr.title}</h3><p>${pr.description}</p></div>`;
  if(!rs.length){
    c.innerHTML=`<div class="inner-panel"><h3>Aún no hay oportunidades disponibles</h3><p>El contenido se está preparando. Intenta recargar la aplicación.</p><button class="primary-button" onclick="location.reload()">Recargar</button></div>`;
    return;
  }
  c.innerHTML=rs.map((o,i)=>`<article class="opportunity-card"><div class="opportunity-card-top"><span class="opportunity-rank">${i+1}</span><span class="opportunity-icon">${o.icon}</span><div class="opportunity-title-wrap"><span class="opportunity-category">${o.category}</span><h3>${o.name}</h3></div></div><p>${o.description}</p><div class="opportunity-meta"><span>💰 ${o.investment}</span><span>🎯 ${o.firstGoal}</span></div><button class="primary-button" onclick="continueWithOpportunity('${o.id}')">Elegir esta oportunidad →</button></article>`).join('');
}

function finishDiagnosis(){if(!userData.time||!userData.capital)return;userProgress.recommendations=analyzeOpportunities().map(o=>o.id);saveProgress();renderResults();showScreen('results-screen');}
const ROLE_DEFINITIONS={
user:{name:'Usuario',icon:'👤',permissions:['Completar misiones','Enviar reportes','Ver su progreso']},
distributor:{name:'Distribuidor',icon:'📦',permissions:['Completar misiones','Enviar reportes','Publicar oportunidades aprobadas']},
verifier:{name:'Verificador',icon:'🛡️',permissions:['Revisar evidencias','Marcar incidencias','Enviar reportes']},
moderator:{name:'Moderador',icon:'🔨',permissions:['Revisar reportes','Revisar usuarios','Marcar incidencias','Aplicar medidas dentro de su alcance']},
admin:{name:'Administrador',icon:'⚙️',permissions:['Gestionar usuarios','Gestionar roles','Revisar reportes','Gestionar oportunidades','Gestionar incidencias']}
};

function generateUserId(){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id='EMP-';
  for(let i=0;i<8;i++) id+=chars[Math.floor(Math.random()*chars.length)];
  return id;
}

let secureRoleLoaded=false;
let currentAuthUser=null;

function ensureIdentity(){
  if(!userData.userId){
    userData.userId=generateUserId();
    saveProgress();
  }
  // El navegador nunca decide el rango real.
  // Hasta que Supabase confirme el rol, el usuario se considera Usuario.
  if(!secureRoleLoaded) userData.role='user';
  if(!ROLE_DEFINITIONS[userData.role]) userData.role='user';
}

function getRoleInfo(){ensureIdentity();return ROLE_DEFINITIONS[userData.role]||ROLE_DEFINITIONS.user;}

async function syncSecureIdentity(){
  ensureIdentity();
  if(!window.emprendeSupabase){
    secureRoleLoaded=true;
    userData.role='user';
    saveProgress();
    return;
  }

  try{
    const {data:{user},error:authError}=await window.emprendeSupabase.auth.getUser();
    if(authError || !user){
      secureRoleLoaded=true;
      userData.role='user';
      saveProgress();
      return;
    }

    currentAuthUser=user;

    // Solo enviamos el ID público. Nunca enviamos role desde el cliente.
    const {error:upsertError}=await window.emprendeSupabase
      .from('profiles')
      .upsert({id:user.id,public_id:userData.userId}, {onConflict:'id'});

    if(upsertError) console.warn('No se pudo vincular el perfil:',upsertError.message);

    const {data:profile,error:profileError}=await window.emprendeSupabase
      .from('profiles')
      .select('public_id,role')
      .eq('id',user.id)
      .maybeSingle();

    if(profileError) throw profileError;

    if(profile){
      if(profile.public_id && profile.public_id!==userData.userId){
        userData.userId=profile.public_id;
      }
      userData.role=ROLE_DEFINITIONS[profile.role]?profile.role:'user';
    }else{
      userData.role='user';
    }

    secureRoleLoaded=true;
    saveProgress();
  }catch(error){
    console.warn('No se pudo verificar el rol de forma segura:',error.message||error);
    secureRoleLoaded=true;
    userData.role='user';
    saveProgress();
  }
}

function can(permission){
  return getRoleInfo().permissions.includes(permission);
}

const MISSION_EXTENSIONS={
commission_sales:[
{id:'sales_4',title:'Define a cliente ideal',description:'Escribe quién tendría más probabilidades de necesitar la oferta que encontraste.',type:'text',placeholder:'¿Quién es y qué necesita?',tip:'Una oferta funciona mejor cuando sabes exactamente a quién ayudar.'},
{id:'sales_5',title:'Prepara un mensaje',description:'Escribe un mensaje corto y honesto para presentar la oferta sin presionar.',type:'text',placeholder:'Escribe tu mensaje...',tip:'Sé claro, breve y transparente.'},
{id:'sales_6',title:'Haz un segundo intento',description:'Contacta a otra persona que realmente pueda necesitar la oferta y registra su respuesta.',type:'text',placeholder:'¿Qué respuesta recibiste?',tip:'Una respuesta negativa también enseña.'},
{id:'sales_7',title:'Evalúa tu aprendizaje',description:'Revisa todo lo que hiciste y decide qué cambiarías para tu siguiente intento.',type:'text',placeholder:'¿Qué aprendiste y qué cambiarías?',tip:'El objetivo es aprender del proceso real.'}],
service_intermediation:[
{id:'connect_4',title:'Comprueba la urgencia',description:'Pregunta si la necesidad sigue activa y qué tan urgente es resolverla.',type:'text',placeholder:'¿Qué descubriste?',tip:'La urgencia ayuda a priorizar problemas reales.'},
{id:'connect_5',title:'Define la conexión',description:'Escribe qué información necesita cada parte para poder hablar con confianza.',type:'text',placeholder:'¿Qué información hace falta?',tip:'Una buena conexión reduce malentendidos.'},
{id:'connect_6',title:'Haz seguimiento',description:'Pregunta a las partes si lograron avanzar después de la conexión.',type:'text',placeholder:'¿Qué ocurrió?',tip:'El seguimiento convierte una conexión en una relación útil.'},
{id:'connect_7',title:'Evalúa tu proceso',description:'Analiza qué funcionó y qué mejorarías para encontrar mejores conexiones.',type:'text',placeholder:'¿Qué mejorarías?',tip:'La experiencia se convierte en un sistema cuando la analizas.'}],
digital_services:[
{id:'digital_4',title:'Define tu servicio',description:'Escribe en una frase qué problema ayudas a resolver y para quién.',type:'text',placeholder:'Ayudo a ___ a resolver ___',tip:'Una oferta clara es más fácil de entender.'},
{id:'digital_5',title:'Calcula una propuesta',description:'Piensa en cuánto tiempo y recursos necesitarías para entregar tu solución.',type:'text',placeholder:'¿Qué necesitarías?',tip:'Conocer tus límites ayuda a prometer solo lo que puedes cumplir.'},
{id:'digital_6',title:'Presenta una mejora',description:'Vuelve con una versión mejorada de tu solución después de recibir comentarios.',type:'text',placeholder:'¿Qué cambiaste?',tip:'Iterar es mejorar con información real.'},
{id:'digital_7',title:'Decide tu siguiente oferta',description:'Con base en lo aprendido, define qué servicio podrías ofrecer primero.',type:'text',placeholder:'¿Qué ofrecerías y a quién?',tip:'Termina la semana con una decisión concreta.'}],
local_services:[
{id:'local_4',title:'Define tu solución',description:'Describe exactamente qué harías para resolver el problema detectado.',type:'text',placeholder:'¿Qué servicio ofrecerías?',tip:'La claridad evita ofrecer algo demasiado amplio.'},
{id:'local_5',title:'Calcula recursos y tiempo',description:'Estima qué necesitarías para realizar una primera prueba.',type:'text',placeholder:'¿Qué necesitas y cuánto tiempo tomaría?',tip:'Una prueba pequeña debe ser realista.'},
{id:'local_6',title:'Haz una segunda prueba',description:'Realiza una nueva prueba incorporando lo que aprendiste la primera vez.',type:'text',placeholder:'¿Qué cambió?',tip:'La repetición con mejoras produce aprendizaje.'},
{id:'local_7',title:'Define tu siguiente paso',description:'Decide si continuarás, cambiarás el servicio o buscarás otro problema.',type:'text',placeholder:'¿Cuál será tu siguiente paso?',tip:'No todos los caminos deben continuar; lo importante es decidir con información.'}],
food_business:[
{id:'food_4',title:'Calcula el costo real',description:'Estima cuánto te cuesta producir una unidad del producto.',type:'text',placeholder:'¿Cuánto cuesta producirlo?',tip:'Conocer costos evita vender sin saber si existe margen.'},
{id:'food_5',title:'Define un precio de prueba',description:'Establece un precio inicial y explica por qué lo elegiste.',type:'text',placeholder:'¿Qué precio elegiste y por qué?',tip:'Un precio es una hipótesis que puedes validar.'},
{id:'food_6',title:'Recoge opiniones',description:'Pide a quienes probaron el producto una opinión concreta sobre sabor, presentación y precio.',type:'text',placeholder:'¿Qué opiniones recibiste?',tip:'La crítica específica es más útil que un simple “me gustó”.'},
{id:'food_7',title:'Decide si repetir',description:'Con toda la información de la semana, decide qué mantendrías y qué cambiarías.',type:'text',placeholder:'¿Qué cambiarías para la próxima vez?',tip:'Cada prueba debe dejarte una decisión.'}],
reselling:[
{id:'resell_4',title:'Define tu comprador',description:'Describe quién tendría más probabilidades de comprar el producto.',type:'text',placeholder:'¿Quién es tu comprador?',tip:'Vender comienza por entender a quién ayudas.'},
{id:'resell_5',title:'Calcula el margen',description:'Estima la diferencia entre el costo del producto y el precio de venta.',type:'text',placeholder:'¿Qué margen esperas?',tip:'Nunca confundas ventas con ganancias.'},
{id:'resell_6',title:'Prueba una oferta',description:'Crea una publicación o mensaje de venta y observa el interés real.',type:'text',placeholder:'¿Qué respuesta recibiste?',tip:'Valida el interés antes de comprar mucho inventario.'},
{id:'resell_7',title:'Decide tu próximo lote',description:'Decide si comprarías, cambiarías el producto o abandonarías la idea.',type:'text',placeholder:'¿Qué decisión tomaste?',tip:'Una buena decisión también puede ser no invertir.'}],
skill_learning:[
{id:'learn_4',title:'Crea una rutina',description:'Define cuándo y cuánto tiempo practicarás esta habilidad durante la próxima semana.',type:'text',placeholder:'¿Cuál será tu rutina?',tip:'La constancia gana a la motivación ocasional.'},
{id:'learn_5',title:'Crea un segundo proyecto',description:'Haz otro pequeño proyecto aplicando lo que aprendiste.',type:'text',placeholder:'¿Qué creaste?',tip:'Cada proyecto te ayuda a detectar tus fortalezas.'},
{id:'learn_6',title:'Busca una necesidad',description:'Encuentra un problema real donde esa habilidad pueda ser útil.',type:'text',placeholder:'¿Qué necesidad encontraste?',tip:'Una habilidad se vuelve valiosa cuando resuelve algo.'},
{id:'learn_7',title:'Define tu primera oferta',description:'Escribe cómo podrías convertir lo aprendido en una ayuda concreta para alguien.',type:'text',placeholder:'¿Qué podrías ofrecer?',tip:'La meta es conectar aprendizaje con una oportunidad real.'}]
};

function getMissionList(){
  if(!currentOpportunity) return [];
  const base=currentOpportunity.missions||[];
  const extra=MISSION_EXTENSIONS[currentOpportunity.id]||[];
  return [...base,...extra].slice(0,7);
}
function normalize(){const ms=getMissionList(),valid=new Set(ms.map(m=>m.id));userProgress.completedMissions=(userProgress.completedMissions||[]).filter(id=>valid.has(id));const i=ms.findIndex(m=>!userProgress.completedMissions.includes(m.id));userProgress.currentMission=i<0?ms.length:i;}
function continueWithOpportunity(id){const o=opportunities.find(x=>x.id===id);if(!o)return;currentOpportunity=o;userProgress={...DEFAULT_PROGRESS,...userProgress,selectedOpportunity:id,currentMission:0,completedMissions:[],missionAnswers:{},startedAt:new Date().toISOString()};saveProgress();renderRoute();showScreen('route-screen');}
function renderRoute(){normalize();const ms=getMissionList(),m=ms[userProgress.currentMission],done=userProgress.completedMissions,pct=ms.length?Math.round(done.length/ms.length*100):0;document.getElementById('route-icon').textContent=currentOpportunity?.icon||'🧭';document.getElementById('route-title').textContent=currentOpportunity?.name||'';document.getElementById('route-description').textContent=currentOpportunity?.description||'';document.getElementById('route-goal').textContent=currentOpportunity?.firstGoal||'';document.getElementById('route-progress-text').textContent=m?`Misión ${userProgress.currentMission+1} de ${ms.length}`:'Ruta completada';document.getElementById('route-progress-percent').textContent=pct+'%';document.getElementById('route-progress-fill').style.width=pct+'%';const card=document.getElementById('mission-card'),doneCard=document.getElementById('mission-completed');if(!m){card.classList.add('hidden');doneCard.classList.remove('hidden');doneCard.querySelector('button').onclick=showDashboard;doneCard.querySelector('button').textContent='Volver al inicio';return;}card.classList.remove('hidden');doneCard.classList.add('hidden');document.getElementById('mission-day').textContent='MISIÓN '+(userProgress.currentMission+1);document.getElementById('mission-title').textContent=m.title;document.getElementById('mission-description').textContent=m.description;document.getElementById('mission-tip').innerHTML=`💡 <strong>Consejo:</strong> ${m.tip||'Avanza paso a paso.'}`;renderInteraction(m);}
function renderInteraction(m){const box=document.getElementById('mission-interaction'),saved=userProgress.missionAnswers[m.id]||'';if(m.type==='choice'){box.innerHTML=(m.options||[]).map(o=>`<button class="mission-choice ${saved===o?'selected':''}" data-choice="${o}">${o}</button>`).join('');box.querySelectorAll('.mission-choice').forEach(b=>b.onclick=()=>{box.querySelectorAll('.mission-choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');userProgress.missionAnswers[m.id]=b.dataset.choice;saveProgress();});}else{box.innerHTML=m.type==='number'?`<input id="mission-answer" type="number" value="${saved}" placeholder="${m.placeholder||''}">`:`<textarea id="mission-answer" rows="4" placeholder="${m.placeholder||''}">${saved}</textarea>`;document.getElementById('mission-answer').oninput=e=>{userProgress.missionAnswers[m.id]=e.target.value;saveProgress();};}}
async function completeMission(){
  normalize();
  const m=getMissionList()[userProgress.currentMission];
  const a=userProgress.missionAnswers[m?.id];
  if(!m||a==null||String(a).trim()===''){
    alert('Completa la interacción de la misión antes de continuar.');
    return;
  }

  if(!userProgress.completedMissions.includes(m.id))
    userProgress.completedMissions.push(m.id);

  userProgress.lastActivity=new Date().toISOString();
  saveProgress();

  if(window.emprendeSupabase){
    try{
      const {data:{user}}=await window.emprendeSupabase.auth.getUser();
      if(user){
        // Tabla compatible con el esquema original de Emprende.
        const submission={
          user_id:user.id,
          opportunity_id:String(currentOpportunity?.id||''),
          mission_id:String(m.id),
          answer:{value:a,type:m.type||'answer'},
          evidence:{text:String(a)},
          status:'pending'
        };
        const r=await window.emprendeSupabase
          .from('mission_submissions')
          .upsert(submission,{onConflict:'user_id,mission_id'});
        if(r.error){
          console.warn('No se pudo guardar en mission_submissions:',r.error.message);
          // Compatibilidad con instalaciones que sí tengan mission_evidence.
          const alt=await window.emprendeSupabase.from('mission_evidence').insert({
            user_id:user.id,
            mission_id:String(m.id),
            evidence_type:m.type||'answer',
            evidence_text:String(a),
            verification_status:'pending'
          });
          if(alt.error) console.warn('No se pudo guardar evidencia:',alt.error.message);
        }
      }
    }catch(e){
      console.warn('Sincronización Supabase no disponible',e);
    }
  }

  document.getElementById('mission-card').classList.add('hidden');
  document.getElementById('mission-completed').classList.remove('hidden');
}

function nextMission(){renderRoute();}
function getDashboardProgress(){const ms=getMissionList();return ms.length?Math.round(userProgress.completedMissions.length/ms.length*100):0;}
function updateDashboard(){const m=getMissionList().find(x=>!userProgress.completedMissions.includes(x.id));document.getElementById('dashboard-opportunity-name').textContent=currentOpportunity?.name||'Elige tu primera oportunidad';document.getElementById('dashboard-opportunity-description').textContent=currentOpportunity?.description||'Completa tu diagnóstico para descubrir caminos que podrían encajar contigo.';document.getElementById('dashboard-progress-number').textContent=getDashboardProgress()+'%';document.getElementById('dashboard-mission-title').textContent=m?.title||'Todavía no tienes una misión';document.getElementById('dashboard-mission-description').textContent=m?.description||'Elige una oportunidad para comenzar.';}
function showDashboard(){currentOpportunity=opportunities.find(o=>o.id===userProgress.selectedOpportunity)||null;showScreen('dashboard-screen');updateDashboard();openDashboardSection('home');ensureAdminEntry();}
function openDashboardSection(s){document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.section===s));const c=document.getElementById('dashboard-content-area');if(s==='home'){c.innerHTML='';return;}if(s==='route')renderRouteSection(c);if(s==='opportunities')renderOpportunitiesSection(c);if(s==='explore')renderExploreSection(c);c.scrollIntoView({behavior:'smooth',block:'start'});}
function renderRouteSection(c){const ms=getMissionList(),done=userProgress.completedMissions||[];c.innerHTML=currentOpportunity?`<div class="inner-panel"><div class="section-heading"><div><p class="dashboard-eyebrow">TU CAMINO</p><h2>${currentOpportunity.name}</h2></div><strong>${getDashboardProgress()}%</strong></div><div class="route-timeline">${ms.map((m,i)=>{const complete=done.includes(m.id),current=!complete&&ms.slice(0,i).every(x=>done.includes(x.id));return`<div class="route-step ${complete?'completed':''} ${current?'current':''}"><div class="route-step-number">${complete?'✓':i+1}</div><div class="route-step-content"><span>MISIÓN ${i+1}</span><h3>${m.title}</h3><p>${m.description}</p></div><div class="route-step-status">${complete?'Completada':current?'Actual':'Bloqueada'}</div></div>`;}).join('')}</div><button class="primary-button" onclick="openMissionFromDashboard()">Continuar misión →</button></div>`:`<div class="inner-panel"><h2>Primero elige una oportunidad</h2><button class="primary-button" onclick="openDashboardSection('opportunities')">Explorar oportunidades →</button></div>`;}
function openMissionFromDashboard(){if(!currentOpportunity)return openDashboardSection('opportunities');renderRoute();showScreen('route-screen');}
function renderOpportunitiesSection(c){c.innerHTML=`<div class="inner-panel"><p class="dashboard-eyebrow">DESCUBRE</p><h2>Oportunidades para ti</h2><div class="opportunity-list">${analyzeOpportunities().map(o=>`<button class="opportunity-list-card" onclick="continueWithOpportunity('${o.id}')"><span class="opportunity-list-icon">${o.icon}</span><span><strong>${o.name}</strong><small>${o.description}</small></span><span>→</span></button>`).join('')}</div></div>`;}
function renderExploreSection(c){c.innerHTML='<div class="inner-panel"><span class="dashboard-card-icon">📍</span><p class="dashboard-eyebrow">EXPLORA</p><h2>Oportunidades de tu entorno</h2><p>Esta sección queda preparada para conectar oportunidades, necesidades y negocios de tu zona.</p></div>';}
function openHelpScreen(){
  const c=document.getElementById('help-content');
  if(!c)return;
  c.innerHTML=`<div class="help-card"><p class="dashboard-eyebrow">CENTRO DE AYUDA</p><h2>¿Qué necesitas reportar?</h2><p>Tu reporte ayuda a mejorar Emprende y mantener una comunidad confiable.</p><div class="help-options"><button class="help-option" onclick="setHelpType('bug')">🐛<span><strong>Error o fallo</strong><small>Algo no funciona como debería.</small></span></button><button class="help-option" onclick="setHelpType('improvement')">💡<span><strong>Sugerencia de mejora</strong><small>Una idea para mejorar la aplicación.</small></span></button><button class="help-option" onclick="setHelpType('user_report')">⚠️<span><strong>Reportar a un usuario</strong><small>Una persona no está cumpliendo las reglas.</small></span></button></div><form id="help-form" class="help-form" onsubmit="submitHelpReport(event)"><input type="hidden" id="help-type" value="bug"><label>Tipo de reporte</label><select id="help-type-select" onchange="document.getElementById('help-type').value=this.value"><option value="bug">Error o fallo</option><option value="improvement">Sugerencia de mejora</option><option value="user_report">Reportar a un usuario</option></select><label id="reported-user-label" class="hidden">ID del usuario reportado</label><input id="reported-user-id" class="hidden" placeholder="Ej: EMP-AB12CD34"><label>Describe lo ocurrido</label><textarea id="help-message" required rows="5" placeholder="Escribe todos los detalles posibles..."></textarea><button class="primary-button" type="submit">Enviar reporte</button></form><div id="help-status"></div></div>`;
  showScreen('help-screen');
}
function setHelpType(type){
  const select=document.getElementById('help-type-select');
  if(select)select.value=type;
  const hidden=document.getElementById('help-type');
  if(hidden)hidden.value=type;
  const show=type==='user_report';
  document.getElementById('reported-user-label')?.classList.toggle('hidden',!show);
  document.getElementById('reported-user-id')?.classList.toggle('hidden',!show);
}
async function submitHelpReport(e){
  e.preventDefault();
  ensureIdentity();
  const type=document.getElementById('help-type').value;
  const message=document.getElementById('help-message').value.trim();
  const reportedUserId=document.getElementById('reported-user-id')?.value.trim()||null;
  if(!message)return;
  const report={id:'REP-'+Date.now().toString(36).toUpperCase(),type,message,reportedUserId,reporterId:userData.userId,status:'pending',createdAt:new Date().toISOString()};
  userProgress.helpReports=[...(userProgress.helpReports||[]),report];
  saveProgress();
  if(window.emprendeSupabase){
    try{
      const {data:{user}}=await window.emprendeSupabase.auth.getUser();
      if(user) await window.emprendeSupabase.from('help_reports').insert({user_id:user.id,report_type:type,message,reported_user_id:reportedUserId,status:'pending'});
    }catch(err){console.warn('No se pudo sincronizar el reporte',err);}
  }
  const status=document.getElementById('help-status');
  status.innerHTML='<div class="success-message">✓ Reporte enviado. Gracias por ayudar a mejorar Emprende.</div>';
  document.getElementById('help-form').reset();
}
function renderFullProfile(){const identity=window.emprendeProfile;
const identityHtml=identity?`<div class="profile-identity-card"><strong>ID: <span data-profile-id>${identity.public_id||identity.id||'—'}</span></strong><span data-profile-role>${identity.role||'user'}</span></div>`:'';
const c=document.getElementById('full-profile-content'),role=getRoleInfo();c.innerHTML=`<div class="profile-info-card identity-card"><div class="profile-avatar large">👤</div><div><p class="dashboard-eyebrow">IDENTIDAD DE USUARIO</p><h3>${userData.userId}</h3><p>${role.icon} ${role.name}</p></div></div><div class="profile-info-card"><div class="profile-info-row"><span>🎯 Objetivo</span><strong>${label(userData.objective,labels.objective)}</strong></div><div class="profile-info-row"><span>⏰ Tiempo</span><strong>${label(userData.time,labels.time)}</strong></div><div class="profile-info-row"><span>💰 Capital</span><strong>${label(userData.capital,labels.capital)}</strong></div></div><div class="profile-info-card"><h3>🧰 Recursos</h3><div class="tag-list">${userData.resources.map(x=>`<span>${x}</span>`).join('')||'<span>No definidos</span>'}</div><h3>🧠 Habilidades</h3><div class="tag-list">${userData.skills.map(x=>`<span>${x}</span>`).join('')||'<span>No definidas</span>'}</div></div><div class="profile-info-card"><h3>🛡️ Permisos de tu rango</h3><div class="tag-list">${role.permissions.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="profile-info-card"><div class="profile-info-row"><span>📈 Progreso</span><strong>${getDashboardProgress()}%</strong></div><div class="profile-progress-bar"><div style="width:${getDashboardProgress()}%"></div></div></div>`;document.getElementById('security-status').textContent='✓ ID único asignado: '+userData.userId+'. Tu rango actual es '+role.name+'.';}

function isStaff(){return userData.role==='admin'||userData.role==='moderator';}
function canManageRoles(){return userData.role==='admin';}
function ensureAdminEntry(){
  const header=document.querySelector('.dashboard-header-actions');
  if(!header||!isStaff()||document.getElementById('admin-panel-button'))return;
  const b=document.createElement('button');b.id='admin-panel-button';b.className='admin-button';b.title=userData.role==='admin'?'Panel de administración':'Panel de moderación';b.textContent=userData.role==='admin'?'⚙️':'🛡️';b.onclick=openAdminPanel;header.insertBefore(b,header.firstChild);
}
function openAdminPanel(){
  if(!isStaff()){alert('No tienes permisos para acceder a este panel.');return;}
  showScreen('admin-screen');
  renderAdminPanel();
}
async function renderAdminPanel(){
  const root=document.getElementById('admin-content');if(!root)return;
  root.innerHTML='<div class="admin-loading">Cargando información segura…</div>';
  if(!window.emprendeSupabase||!currentAuthUser){root.innerHTML='<div class="admin-empty">No hay una sesión autenticada disponible.</div>';return;}
  try{
    const profilesQuery=window.emprendeSupabase.from('profiles').select('id,public_id,role,created_at').order('created_at',{ascending:false});
    const reportsQuery=window.emprendeSupabase.from('help_reports').select('id,user_id,report_type,message,reported_user_id,status,admin_notes,created_at,updated_at').order('created_at',{ascending:false});
    const [{data:profiles,error:profilesError},{data:reports,error:reportsError}]=await Promise.all([profilesQuery,reportsQuery]);
    if(profilesError)throw profilesError;
    if(reportsError)throw reportsError;
    root.innerHTML=`<div class="admin-header-card"><div><p class="dashboard-eyebrow">${userData.role==='admin'?'PANEL DE ADMINISTRACIÓN':'PANEL DE MODERACIÓN'}</p><h2>Control de la comunidad</h2><p>Gestiona usuarios y revisa los reportes desde un único lugar.</p></div><div class="admin-stats"><div><strong>${profiles?.length||0}</strong><small>Usuarios</small></div><div><strong>${(reports||[]).filter(r=>r.status==='pending').length}</strong><small>Pendientes</small></div></div></div><div class="admin-tabs"><button class="admin-tab active" onclick="showAdminTab('users',this)">👥 Usuarios</button><button class="admin-tab" onclick="showAdminTab('reports',this)">🚩 Reportes</button></div><div id="admin-users-tab">${renderAdminUsers(profiles||[])}</div><div id="admin-reports-tab" class="hidden">${renderAdminReports(reports||[])}</div>`;
  }catch(e){console.error(e);root.innerHTML=`<div class="admin-error"><strong>No se pudo cargar el panel.</strong><p>${escapeHtml(e.message||'Error desconocido')}</p><button class="secondary-button" onclick="renderAdminPanel()">Reintentar</button></div>`;}
}
function showAdminTab(tab,btn){document.querySelectorAll('.admin-tab').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.getElementById('admin-users-tab')?.classList.toggle('hidden',tab!=='users');document.getElementById('admin-reports-tab')?.classList.toggle('hidden',tab!=='reports');}
function renderAdminUsers(profiles){if(!profiles.length)return '<div class="admin-empty">Todavía no hay usuarios registrados.</div>';return `<div class="admin-list">${profiles.map(p=>{const role=ROLE_DEFINITIONS[p.role]||ROLE_DEFINITIONS.user;return `<article class="admin-user-row"><div class="admin-user-main"><div class="admin-user-avatar">${role.icon}</div><div><strong>${escapeHtml(p.public_id||'Sin ID')}</strong><small>${role.name}<br>${p.created_at?new Date(p.created_at).toLocaleDateString('es-CO'):''}</small></div></div><div class="admin-user-actions">${canManageRoles()?`<select onchange="changeUserRole('${p.id}',this.value)">${Object.entries(ROLE_DEFINITIONS).map(([key,val])=>`<option value="${key}" ${p.role===key?'selected':''}>${val.name}</option>`).join('')}</select>`:`<span class="role-badge">${role.name}</span>`}</div></article>`}).join('')}</div>`;}
function renderAdminReports(reports){if(!reports.length)return '<div class="admin-empty">No hay reportes todavía.</div>';return `<div class="admin-list">${reports.map(r=>`<article class="admin-report-row"><div class="report-top"><span class="report-type">${r.report_type==='bug'?'🐛 Error':r.report_type==='improvement'?'💡 Mejora':'⚠️ Usuario'}</span><span class="report-status status-${r.status}">${r.status}</span></div><p>${escapeHtml(r.message)}</p><small>Reportado: ${r.created_at?new Date(r.created_at).toLocaleString('es-CO'):''}${r.reported_user_id?` · Usuario señalado: ${escapeHtml(r.reported_user_id)}`:''}</small><div class="report-actions"><select onchange="updateReportStatus('${r.id}',this.value)"><option value="pending" ${r.status==='pending'?'selected':''}>Pendiente</option><option value="reviewing" ${r.status==='reviewing'?'selected':''}>En revisión</option><option value="resolved" ${r.status==='resolved'?'selected':''}>Resuelto</option><option value="dismissed" ${r.status==='dismissed'?'selected':''}>Descartado</option></select></div></article>`).join('')}</div>`;}
async function changeUserRole(userId,newRole){if(!canManageRoles())return;try{const {error}=await window.emprendeSupabase.rpc('admin_set_user_role',{target_user_id:userId,new_role:newRole});if(error)throw error;alert('Rol actualizado correctamente.');await renderAdminPanel();}catch(e){alert('No se pudo cambiar el rol: '+(e.message||'Error desconocido'));}}
async function updateReportStatus(reportId,status){if(!isStaff())return;try{const {error}=await window.emprendeSupabase.from('help_reports').update({status,updated_at:new Date().toISOString()}).eq('id',reportId);if(error)throw error;await renderAdminPanel();}catch(e){alert('No se pudo actualizar el reporte: '+(e.message||'Error desconocido'));}}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
const labels={objective:{quick_money:'Conseguir dinero lo antes posible',stable_income:'Construir ingresos estables',business:'Crear un negocio',online:'Trabajar en línea',home:'Trabajar desde casa',growth:'Crecer a largo plazo'},time:{less_2:'Menos de 2 horas al día','2_5':'Entre 2 y 5 horas al día',more_5:'Más de 5 horas al día',full_time:'Tiempo completo'},capital:{zero:'$0','100k':'Hasta $100.000','500k':'$100.000 – $500.000','2m':'$500.000 – $2.000.000',more_2m:'Más de $2.000.000'}};
function label(v,m){return m[v]||v||'No definido';}
function renderFullProfile(){const c=document.getElementById('full-profile-content');c.innerHTML=`<div class="profile-info-card"><div class="profile-info-row"><span>🎯 Objetivo</span><strong>${label(userData.objective,labels.objective)}</strong></div><div class="profile-info-row"><span>⏰ Tiempo</span><strong>${label(userData.time,labels.time)}</strong></div><div class="profile-info-row"><span>💰 Capital</span><strong>${label(userData.capital,labels.capital)}</strong></div></div><div class="profile-info-card"><h3>🧰 Recursos</h3><div class="tag-list">${userData.resources.map(x=>`<span>${x}</span>`).join('')||'<span>No definidos</span>'}</div><h3>🧠 Habilidades</h3><div class="tag-list">${userData.skills.map(x=>`<span>${x}</span>`).join('')||'<span>No definidas</span>'}</div></div><div class="profile-info-card"><div class="profile-info-row"><span>📈 Progreso</span><strong>${getDashboardProgress()}%</strong></div><div class="profile-progress-bar"><div style="width:${getDashboardProgress()}%"></div></div></div>`;document.getElementById('security-status').textContent='✓ Datos guardados localmente. La sincronización con Supabase está preparada.';}
function openProfileScreen(){showScreen('profile-screen');renderFullProfile();}
function restartDiagnosis(){const oldId=userData.userId,oldRole=userData.role;localStorage.removeItem('emprendeUserData');localStorage.removeItem('emprendeUserProgress');userData={...DEFAULT_USER_DATA,resources:[],skills:[],userId:oldId,role:oldRole};userProgress={...DEFAULT_PROGRESS,completedMissions:[],missionAnswers:[],recommendations:[]};currentOpportunity=null;document.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));['continue-button','resources-continue','skills-continue','objective-continue','capacity-continue'].forEach(id=>setButtonState(id,false));showScreen('welcome-screen');}
function hydrateForm(){const maps=[['resources','resources'],['skills','skills']];maps.forEach(([prop,id])=>{document.querySelectorAll(`#${id}-options .multi-option`).forEach(el=>{if(userData[prop].includes(el.dataset.value))el.classList.add('selected');});setButtonState(`${id}-continue`,userData[prop].length>0);});['objective','time','capital'].forEach(prop=>{document.querySelectorAll(`.${prop==='objective'?'objective-option':prop+'-option'}`).forEach(el=>{if(userData[prop]===el.dataset.value)el.classList.add('selected');});});setButtonState('continue-button',!!userData.goal);setButtonState('objective-continue',!!userData.objective);setButtonState('capacity-continue',!!(userData.time&&userData.capital));}

/* =========================
   FASE 1 — AUTENTICACIÓN
========================= */
let authInitialized=false;

function authMessage(id,message,type=''){
  const el=document.getElementById(id);
  if(!el)return;
  el.textContent=message||'';
  el.className='auth-message '+type;
}

function switchAuthView(view){
  document.getElementById('auth-login-view')?.classList.toggle('hidden',view!=='login');
  document.getElementById('auth-register-view')?.classList.toggle('hidden',view!=='register');
  authMessage('login-message','');
  authMessage('register-message','');
}

async function handleLogin(event){
  event.preventDefault();
  if(!window.emprendeSupabase){
    authMessage('login-message','No se pudo conectar con Supabase.','error'); return;
  }
  const email=document.getElementById('login-email').value.trim();
  const password=document.getElementById('login-password').value;
  authMessage('login-message','Iniciando sesión…');
  try{
    const {error}=await window.emprendeSupabase.auth.signInWithPassword({email,password});
    if(error){authMessage('login-message',friendlyAuthError(error),'error');return;}
    await enterAuthenticatedApp();
  }catch(error){
    console.error('Supabase signIn error:',error);
    authMessage('login-message',friendlyAuthError(error),'error');
  }
}

async function handleRegister(event){
  event.preventDefault();
  if(!window.emprendeSupabase){
    authMessage('register-message','No se pudo conectar con Supabase.','error'); return;
  }
  const email=document.getElementById('register-email').value.trim();
  const password=document.getElementById('register-password').value;
  const confirm=document.getElementById('register-confirm-password').value;
  if(password!==confirm){authMessage('register-message','Las contraseñas no coinciden.','error');return;}
  authMessage('register-message','Creando tu cuenta…');
  try{
    const result=await window.emprendeSupabase.auth.signUp({email,password});
    const data=result?.data||{};
    const error=result?.error||null;
    if(error){
      console.error('Supabase signUp error:',error);
      authMessage('register-message',friendlyAuthError(error),'error');
      return;
    }
    if(data.session){
      await enterAuthenticatedApp();
    }else{
      authMessage('register-message','Cuenta creada. Revisa tu correo para confirmar la cuenta antes de iniciar sesión.','success');
    }
  }catch(error){
    console.error('Unexpected registration error:',error);
    authMessage('register-message',friendlyAuthError(error),'error');
  }
}

async function handleGoogleLogin(){
  if(!window.emprendeSupabase){
    authMessage('login-message','No se pudo conectar con Supabase.','error'); return;
  }
  const {error}=await window.emprendeSupabase.auth.signInWithOAuth({
    provider:'google',
    options:{redirectTo:'https://gbrl-bd.github.io/Vamos-A-Camellar/'}
  });
  if(error)authMessage('login-message',friendlyAuthError(error),'error');
}

async function handleFacebookLogin(){
  if(!window.emprendeSupabase){
    authMessage('login-message','No se pudo conectar con Supabase.','error'); return;
  }
  const {error}=await window.emprendeSupabase.auth.signInWithOAuth({
    provider:'facebook',
    options:{redirectTo:'https://gbrl-bd.github.io/Vamos-A-Camellar/'}
  });
  if(error)authMessage('login-message',friendlyAuthError(error),'error');
}

function friendlyAuthError(error){
  const raw=typeof error==='string'?error:(error?.message||error?.error_description||error?.error||'');
  const msg=String(raw).trim();
  const lower=msg.toLowerCase();
  if(!msg)return 'Supabase no devolvió un mensaje de error. Revisa la configuración de autenticación e inténtalo de nuevo.';
  if(lower.includes('invalid login credentials'))return 'El correo o la contraseña no son correctos.';
  if(lower.includes('email not confirmed'))return 'Primero confirma tu correo electrónico.';
  if(lower.includes('user already registered')||lower.includes('already registered'))return 'Ya existe una cuenta con este correo.';
  if(lower.includes('password should be at least'))return 'La contraseña debe tener al menos 6 caracteres.';
  if(lower.includes('signup is disabled')||lower.includes('email signups are disabled'))return 'El registro por correo está desactivado en Supabase.';
  if(lower.includes('rate limit'))return 'Se alcanzó el límite temporal de registros. Espera unos minutos e inténtalo de nuevo.';
  if(lower.includes('failed to fetch')||lower.includes('networkerror'))return 'No se pudo conectar con Supabase. Revisa tu conexión a internet.';
  return msg;
}

async function enterAuthenticatedApp(){
  showScreen('welcome-screen');
  await syncSecureIdentity();
  ensureAdminEntry();
}

async function initAuthentication(){
  if(authInitialized)return;
  authInitialized=true;

  // La pantalla de autenticación debe estar disponible aunque una llamada
  // de Supabase falle. Antes, un error de getSession() podía detener toda
  // la inicialización de la aplicación y dejar los botones sin funcionar.
  showScreen('auth-screen');

  document.getElementById('login-form')?.addEventListener('submit',handleLogin);
  document.getElementById('register-form')?.addEventListener('submit',handleRegister);
  document.getElementById('show-register-button')?.addEventListener('click',()=>switchAuthView('register'));
  document.getElementById('show-login-button')?.addEventListener('click',()=>switchAuthView('login'));
  document.getElementById('google-login-button')?.addEventListener('click',handleGoogleLogin);
  document.getElementById('google-register-button')?.addEventListener('click',handleGoogleLogin);
  document.getElementById('facebook-login-button')?.addEventListener('click',handleFacebookLogin);
  document.getElementById('facebook-register-button')?.addEventListener('click',handleFacebookLogin);

  if(!window.emprendeSupabase){
    authMessage('login-message','No se pudo cargar la conexión con Supabase. Recarga la página e inténtalo de nuevo.','error');
    authMessage('register-message','No se pudo cargar la conexión con Supabase. Recarga la página e inténtalo de nuevo.','error');
    return;
  }

  try{
    const sessionResult=await window.emprendeSupabase.auth.getSession();
    const session=sessionResult?.data?.session||null;
    if(session){
      await enterAuthenticatedApp();
    }else{
      showScreen('auth-screen');
    }
  }catch(error){
    console.error('Supabase getSession error:',error);
    showScreen('auth-screen');
    authMessage('login-message',friendlyAuthError(error),'error');
  }

  try{
    window.emprendeSupabase.auth.onAuthStateChange((event,session)=>{
      if(session && event==='SIGNED_IN'){
        // No ejecutar llamadas async de Supabase directamente dentro del callback.
        // Supabase puede bloquear el callback si se llama getUser/getSession aquí.
        setTimeout(()=>{ enterAuthenticatedApp().catch(error=>{
          console.error('Error al abrir la aplicación tras iniciar sesión:',error);
        }); },0);
      }
    });
  }catch(error){
    console.error('Supabase auth listener error:',error);
  }
}


async function loadRemoteOpportunities(){
  if(!window.emprendeSupabase) return;
  try{
    const oppRes=await window.emprendeSupabase
      .from('opportunities')
      .select('*')
      .eq('is_active',true)
      .order('created_at',{ascending:true});

    if(oppRes.error){
      console.warn('No se pudieron cargar oportunidades:',oppRes.error.message);
      return;
    }
    if(!oppRes.data?.length) return;

    const ids=oppRes.data.map(o=>o.id);
    const misRes=await window.emprendeSupabase
      .from('missions')
      .select('*')
      .eq('is_active',true)
      .in('opportunity_id',ids)
      .order('day_number',{ascending:true});

    const byOpp={};
    if(!misRes.error){
      (misRes.data||[]).forEach(m=>{
        (byOpp[m.opportunity_id] ||= []).push({
          id:String(m.id),
          title:m.title||m.name||'Misión',
          description:m.description||'',
          tip:m.tip||'Avanza paso a paso.',
          type:m.type||'text',
          placeholder:m.placeholder||'Escribe tu respuesta...',
          options:Array.isArray(m.options)?m.options:[]
        });
      });
    }

    // Los datos creados desde el CMS son la fuente principal.
    // Si una oportunidad todavía no tiene misiones personalizadas,
    // se le asigna una ruta local de respaldo para que nunca desaparezca.
    const localById={};
    opportunities.forEach(o=>localById[o.id]=o);

    const remote=oppRes.data.map(o=>{
      const remoteMissions=(byOpp[o.id]||[]).slice(0,7);
      const fallback=localById[o.id]?.missions || [];
      const missions=remoteMissions.length ? remoteMissions : fallback.slice(0,7);
      return {
        id:String(o.id),
        name:o.title||o.name||'Oportunidad',
        icon:o.icon||localById[o.id]?.icon||'🧭',
        category:o.category||localById[o.id]?.category||'General',
        description:o.description||'',
        investment:o.investment||localById[o.id]?.investment||'',
        firstGoal:o.first_goal||o.firstGoal||localById[o.id]?.firstGoal||'Avanza paso a paso.',
        rules:o.rules||localById[o.id]?.rules||{},
        missions
      };
    });

    if(remote.length){
      const selected=userProgress.selectedOpportunity;
      opportunities=remote;
      currentOpportunity=opportunities.find(o=>o.id===selected)||null;
      if(currentOpportunity){normalize();saveProgress();}
      if(typeof updateDashboard==='function' && document.getElementById('dashboard-screen')?.classList.contains('active')) updateDashboard();
    }
  }catch(e){
    console.warn('No se pudieron cargar las oportunidades desde Supabase',e);
  }
}

document.addEventListener('DOMContentLoaded',async()=>{loadProgress();ensureIdentity();await initAuthentication();await loadRemoteOpportunities();document.getElementById('resources-options').innerHTML=DATA.resources.map(x=>`<button class="option-card multi-option" data-value="${x[0]}"><span class="option-icon">${x[1]}</span><span><strong>${x[2]}</strong><small>Puede ser útil para comenzar.</small></span></button>`).join('');document.getElementById('skills-options').innerHTML=DATA.skills.map(x=>`<button class="option-card multi-option" data-value="${x[0]}"><span class="option-icon">${x[1]}</span><span><strong>${x[2]}</strong><small>Puede convertirse en una habilidad útil.</small></span></button>`).join('');document.getElementById('objective-options').innerHTML=DATA.objectives.map(x=>`<button class="option-card objective-option" data-value="${x[0]}"><span class="option-icon">${x[1]}</span><span><strong>${x[2]}</strong><small>Tu prioridad actual.</small></span></button>`).join('');document.getElementById('time-options').innerHTML=DATA.time.map(x=>`<button class="option-card time-option" data-value="${x[0]}">${x[1]}</button>`).join('');document.getElementById('capital-options').innerHTML=DATA.capital.map(x=>`<button class="option-card capital-option" data-value="${x[0]}">${x[1]}</button>`).join('');document.getElementById('start-button').addEventListener('click',startApp);setupMulti('#resources-screen .multi-option','resources','resources-continue');setupMulti('#skills-screen .multi-option','skills','skills-continue');setupSingle('.objective-option','objective','objective-continue');setupSingle('.time-option','time');setupSingle('.capital-option','capital');hydrateForm();await syncSecureIdentity();ensureAdminEntry();});
