(function(){
'use strict';
const client=window.emprendeSupabase;
const authBox=document.getElementById('admin-auth');
const content=document.getElementById('admin-content');
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

let currentUser=null;
let opportunitiesCache=[];
let missionsCache=[];

async function init(){
 if(!client){authBox.innerHTML='<h2>Supabase no está disponible</h2>';return;}
 const {data:{user}}=await client.auth.getUser();
 if(!user){authBox.innerHTML='<h2>Debes iniciar sesión</h2><p>Vuelve a la aplicación e inicia sesión.</p>';return;}
 currentUser=user;
 const {data:profile,error}=await client.from('profiles').select('role,public_id,full_name').eq('id',user.id).maybeSingle();
 if(error||!profile){authBox.innerHTML='<h2>No se pudo cargar tu perfil</h2>';return;}
 if(!['admin','moderator'].includes(profile.role)){
  authBox.innerHTML='<h2>Acceso denegado</h2><p>Tu cuenta no tiene permisos de administración.</p>';return;
 }
 authBox.innerHTML='<h2>Acceso autorizado</h2><p>ID: '+esc(profile.public_id||user.id)+' · Rol: '+esc(profile.role)+'</p>';
 content.hidden=false;
 await refreshAll();
}

async function refreshAll(){
 await Promise.all([loadStats(),loadOpportunities(),loadMissions(),loadUsers(),loadEvidence(),loadReports(),loadActions()]);
}

async function loadStats(){
 const tables=['profiles','opportunities','missions','mission_submissions'];
 const values=[];
 for(const table of tables){
  const r=await client.from(table).select('*',{count:'exact',head:true});
  values.push(r.count||0);
 }
 document.getElementById('stats').innerHTML=values.map((n,i)=>`<div class="stat"><span>${['Usuarios','Oportunidades','Misiones','Evidencias'][i]}</span><strong>${n}</strong></div>`).join('');
}

async function loadOpportunities(){
 const {data}=await client.from('opportunities').select('*').order('created_at',{ascending:false});
 opportunitiesCache=data||[];
 document.getElementById('opportunities-list').innerHTML=(data||[]).map(x=>`
 <div class="admin-item"><div><b>${esc(x.title||x.name||'Sin título')}</b><div class="muted">${esc(x.description||'')}</div><small>ID: ${esc(x.id)}</small></div>
 <div class="admin-actions"><span class="status">${x.is_active===false?'Inactiva':'Activa'}</span><button data-edit-opp="${esc(x.id)}">Editar</button><button data-toggle-opp="${esc(x.id)}">${x.is_active===false?'Activar':'Desactivar'}</button></div></div>`).join('')||'<p class="muted">No hay oportunidades.</p>';
 document.querySelectorAll('[data-edit-opp]').forEach(b=>b.onclick=()=>editOpportunity(b.dataset.editOpp,data));
 document.querySelectorAll('[data-toggle-opp]').forEach(b=>b.onclick=()=>toggleOpportunity(b.dataset.toggleOpp,data));
}

async function loadMissions(){
 const {data}=await client.from('missions').select('*').order('day_number',{ascending:true});
 missionsCache=data||[];
 renderMissionAssignmentControls();
 document.getElementById('missions-list').innerHTML=(data||[]).map(x=>`
 <div class="admin-item"><div><b>Día ${esc(x.day_number||x.day||'?')} · ${esc(x.title||x.name||'Sin título')}</b><div class="muted">${esc(x.description||'')}</div><small>ID: ${esc(x.id)}</small></div>
 <div class="admin-actions"><span class="status">${x.is_active===false?'Inactiva':'Activa'}</span><button data-edit-mission="${esc(x.id)}">Editar</button><button data-toggle-mission="${esc(x.id)}">${x.is_active===false?'Activar':'Desactivar'}</button></div></div>`).join('')||'<p class="muted">No hay misiones.</p>';
 document.querySelectorAll('[data-edit-mission]').forEach(b=>b.onclick=()=>editMission(b.dataset.editMission,data));
 document.querySelectorAll('[data-toggle-mission]').forEach(b=>b.onclick=()=>toggleMission(b.dataset.toggleMission,data));
}

async function loadUsers(){
 const {data}=await client.from('profiles').select('id,public_id,full_name,role,status').order('created_at',{ascending:false}).limit(200);
 document.getElementById('users-list').innerHTML=(data||[]).map(x=>`
 <div class="admin-item"><div><b>${esc(x.full_name||'Sin nombre')}</b><div class="muted">${esc(x.public_id||x.id)}</div></div>
 <div class="admin-actions"><select data-role-user="${esc(x.id)}"><option value="user" ${x.role==='user'?'selected':''}>Usuario</option><option value="distributor" ${x.role==='distributor'?'selected':''}>Distribuidor</option><option value="verifier" ${x.role==='verifier'?'selected':''}>Verificador</option><option value="moderator" ${x.role==='moderator'?'selected':''}>Moderador</option><option value="admin" ${x.role==='admin'?'selected':''}>Administrador</option></select><span class="status">${esc(x.status||'active')}</span></div></div>`).join('')||'<p class="muted">No hay usuarios.</p>';
 document.querySelectorAll('[data-role-user]').forEach(s=>s.onchange=()=>changeRole(s.dataset.roleUser,s.value));
}

async function loadEvidence(){
 let {data}=await client.from('mission_evidence').select('*').order('created_at',{ascending:false}).limit(100); if(data===null){ const r=await client.from('mission_submissions').select('*').order('created_at',{ascending:false}).limit(100); data=(r.data||[]).map(x=>({id:x.id,evidence_type:'Respuesta',content:x.evidence?.text||x.answer?.value||'',verification_status:x.status})); }
 document.getElementById('evidence-list').innerHTML=(data||[]).map(x=>`
 <div class="admin-item"><div><b>${esc(x.evidence_type||'Evidencia')}</b><div class="muted">${esc(x.content||x.evidence_text||'')}</div><small>Estado: ${esc(x.verification_status||'pending')}</small></div>
 <div class="admin-actions"><button data-evidence="${esc(x.id)}" data-status="approved">Aprobar</button><button data-evidence="${esc(x.id)}" data-status="rejected">Rechazar</button></div></div>`).join('')||'<p class="muted">No hay evidencias.</p>';
 document.querySelectorAll('[data-evidence]').forEach(b=>b.onclick=()=>reviewEvidence(b.dataset.evidence,b.dataset.status));
}

async function loadReports(){
 const {data}=await client.from('help_reports').select('*').order('created_at',{ascending:false}).limit(100);
 document.getElementById('reports-list').innerHTML=(data||[]).map(x=>`
 <div class="admin-item"><div><b>${esc(x.report_type||'Reporte')}</b><div class="muted">${esc(x.description||x.message||'')}</div><small>Estado: ${esc(x.status||'pending')}</small></div>
 <div class="admin-actions"><button data-report="${esc(x.id)}" data-status="resolved">Resolver</button><button data-report="${esc(x.id)}" data-status="rejected">Cerrar</button></div></div>`).join('')||'<p class="muted">No hay reportes.</p>';
 document.querySelectorAll('[data-report]').forEach(b=>b.onclick=()=>reviewReport(b.dataset.report,b.dataset.status));
}

async function loadActions(){
 const {data}=await client.from('moderation_actions').select('*').order('created_at',{ascending:false}).limit(100);
 document.getElementById('actions-list').innerHTML=(data||[]).map(x=>`<div class="admin-item"><div><b>${esc(x.action_type||'Acción')}</b><div class="muted">${esc(x.reason||'')}</div></div><span class="status">${esc(x.created_at||'')}</span></div>`).join('')||'<p class="muted">No hay acciones.</p>';
}


function renderMissionAssignmentControls(){
 const oppSelect=document.getElementById('assign-opportunity');
 const grid=document.getElementById('mission-assignment-grid');
 if(!oppSelect||!grid)return;
 const current=oppSelect.value;
 oppSelect.innerHTML='<option value="">Selecciona una oportunidad</option>'+opportunitiesCache.map(o=>`<option value="${esc(o.id)}">${esc(o.icon||'🧭')} ${esc(o.title||o.name||'Sin título')}</option>`).join('');
 if(current && opportunitiesCache.some(o=>String(o.id)===String(current))) oppSelect.value=current;
 const oppId=oppSelect.value;
 if(!oppId){grid.innerHTML='<p class="muted">Selecciona una oportunidad para ver sus 7 días.</p>';return;}
 const assigned=missionsCache.filter(m=>String(m.opportunity_id)===String(oppId));
 grid.innerHTML='<div class="assignment-grid">'+Array.from({length:7},(_,i)=>{
   const found=assigned.find(m=>Number(m.day_number||m.day)===i+1);
   return `<div class="assignment-row"><label>Día ${i+1}</label><select data-assignment-day="${i+1}"><option value="">— Sin misión —</option>${missionsCache.map(m=>`<option value="${esc(m.id)}" ${found&&String(found.id)===String(m.id)?'selected':''}>${esc(m.title||m.name||'Sin título')}</option>`).join('')}</select></div>`;
 }).join('')+'</div>';
}
async function saveMissionAssignment(){
 const oppId=document.getElementById('assign-opportunity')?.value;
 if(!oppId){alert('Selecciona una oportunidad.');return;}
 const selects=[...document.querySelectorAll('[data-assignment-day]')];
 const chosen=selects.map(s=>({day:Number(s.dataset.assignmentDay),id:s.value})).filter(x=>x.id);
 const chosenIds=new Set(chosen.map(x=>x.id));
 const old=missionsCache.filter(m=>String(m.opportunity_id)===String(oppId));
 for(const m of old){
   if(!chosenIds.has(String(m.id))){
     const r=await client.from('missions').update({opportunity_id:null}).eq('id',m.id);
     if(r.error){alert(r.error.message);return;}
   }
 }
 for(const item of chosen){
   const r=await client.from('missions').update({opportunity_id:oppId,day_number:item.day}).eq('id',item.id);
   if(r.error){alert(r.error.message);return;}
 }
 alert('Ruta de 7 días guardada correctamente.');
 await loadMissions();
 renderMissionAssignmentControls();
}
function editOpportunity(id,data){
 const x=data.find(a=>String(a.id)===String(id)); if(!x)return;
 document.getElementById('opp-id').value=x.id;
 document.getElementById('opp-title').value=x.title||x.name||'';
 document.getElementById('opp-description').value=x.description||'';
 document.getElementById('opp-category').value=x.category||'';
 document.getElementById('opp-icon').value=x.icon||'';
 document.getElementById('opp-cancel').hidden=false;
 window.scrollTo({top:0,behavior:'smooth'});
}
function editMission(id,data){
 const x=data.find(a=>String(a.id)===String(id)); if(!x)return;
 document.getElementById('mission-id').value=x.id;
 document.getElementById('mission-title').value=x.title||x.name||'';
 document.getElementById('mission-description').value=x.description||'';
 document.getElementById('mission-day').value=x.day_number||x.day||1;
 document.getElementById('mission-type').value=x.type||'';
 document.getElementById('mission-opportunity').value=x.opportunity_id||'';
 document.getElementById('mission-cancel').hidden=false;
 window.scrollTo({top:0,behavior:'smooth'});
}
async function toggleOpportunity(id,data){
 const x=data.find(a=>String(a.id)===String(id)); if(!x)return;
 await client.from('opportunities').update({is_active:x.is_active===false}).eq('id',id); loadOpportunities();
}
async function toggleMission(id,data){
 const x=data.find(a=>String(a.id)===String(id)); if(!x)return;
 await client.from('missions').update({is_active:x.is_active===false}).eq('id',id); loadMissions();
}
async function changeRole(id,role){
 const rpc=await client.rpc('admin_set_user_role',{target_user_id:id,new_role:role});
 if(!rpc.error){ await loadUsers(); return; }
 // Compatibilidad con instalaciones antiguas que todavía no tienen la función RPC.
 const direct=await client.from('profiles').update({role}).eq('id',id);
 if(direct.error) alert(rpc.error.message||direct.error.message); else loadUsers();
}
async function reviewEvidence(id,status){
 let {error}=await client.from('mission_evidence').update({verification_status:status}).eq('id',id); if(error){ const r=await client.from('mission_submissions').update({status}).eq('id',id); error=r.error; }
 if(error)alert(error.message); else {loadEvidence();loadStats();}
}
async function reviewReport(id,status){
 const {error}=await client.from('help_reports').update({status}).eq('id',id);
 if(error)alert(error.message); else loadReports();
}

document.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));
 btn.classList.add('active');
 document.querySelectorAll('.admin-tab').forEach(x=>x.hidden=true);
 document.getElementById('tab-'+btn.dataset.tab).hidden=false;
}));

document.getElementById('back-app').onclick=()=>location.href='index.html';

document.getElementById('opp-cancel').onclick=()=>{
 document.getElementById('opportunity-form').reset();
 document.getElementById('opp-id').value='';
 document.getElementById('opp-cancel').hidden=true;
};
document.getElementById('mission-cancel').onclick=()=>{
 document.getElementById('mission-form').reset();
 document.getElementById('mission-id').value='';
 document.getElementById('mission-cancel').hidden=true;
};

document.getElementById('opportunity-form').addEventListener('submit',async e=>{
 e.preventDefault();
 const id=document.getElementById('opp-id').value;
 const payload={title:document.getElementById('opp-title').value,description:document.getElementById('opp-description').value,category:document.getElementById('opp-category').value,icon:document.getElementById('opp-icon').value,is_active:true};
 const r=id?await client.from('opportunities').update(payload).eq('id',id):await client.from('opportunities').insert(payload);
 if(r.error)alert(r.error.message);else{e.target.reset();document.getElementById('opp-id').value='';document.getElementById('opp-cancel').hidden=true;loadOpportunities();}
});

document.getElementById('mission-form').addEventListener('submit',async e=>{
 e.preventDefault();
 const id=document.getElementById('mission-id').value;
 const payload={title:document.getElementById('mission-title').value,description:document.getElementById('mission-description').value,day_number:Number(document.getElementById('mission-day').value),type:document.getElementById('mission-type').value||null,opportunity_id:document.getElementById('mission-opportunity').value||null,is_active:true};
 const r=id?await client.from('missions').update(payload).eq('id',id):await client.from('missions').insert(payload);
 if(r.error)alert(r.error.message);else{e.target.reset();document.getElementById('mission-id').value='';document.getElementById('mission-cancel').hidden=true;loadMissions();}
});

document.getElementById('assign-opportunity')?.addEventListener('change',renderMissionAssignmentControls);
document.getElementById('save-mission-assignment')?.addEventListener('click',saveMissionAssignment);
init();
})();