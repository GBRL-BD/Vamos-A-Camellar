/* EMPRENDE — Perfil, roles y moderación */
(function(){
'use strict';
const roleNames={
 user:'Usuario',
 distributor:'Distribuidor',
 verifier:'Verificador',
 moderator:'Moderador',
 admin:'Administrador'
};
const staffRoles=['moderator','admin','verifier','distributor'];

function getRole(){return window.emprendeProfile?.role||window.EmprendeCurrentProfile?.role||'user';}
function isStaff(){return ['moderator','admin'].includes(getRole());}

function ensureModerationEntry(){
 const nav=document.querySelector('.bottom-nav,.bottom-navigation,.nav-bar');
 const existing=document.getElementById('moderation-nav-btn');
 if(!isStaff()){ if(existing) existing.remove(); return; }
 if(existing)return;
 const btn=document.createElement('button');
 btn.id='moderation-nav-btn';
 btn.className='nav-item moderation-nav-item';
 btn.type='button';
 btn.innerHTML='<span class="nav-icon">🛡️</span><span>Moderación</span>';
 btn.addEventListener('click',()=>showModerationPanel());
 if(nav) nav.appendChild(btn);
}

function ensureProfileIdentity(){
 const profile=window.emprendeProfile;
 if(!profile)return;
 const id=profile.public_id||profile.id||'—';
 const role=roleNames[profile.role]||profile.role||'Usuario';
 document.querySelectorAll('[data-profile-id]').forEach(e=>e.textContent=id);
 document.querySelectorAll('[data-profile-role]').forEach(e=>e.textContent=role);
}

function showModerationPanel(){
 let panel=document.getElementById('moderation-panel-overlay');
 if(!panel){
  panel=document.createElement('div');
  panel.id='moderation-panel-overlay';
  panel.className='modal-overlay';
  panel.innerHTML=`<div class="modal-card moderation-card">
   <button class="modal-close" type="button">×</button>
   <div class="section-eyebrow">PANEL DE CONTROL</div>
   <h2>Moderación</h2>
   <p class="muted">Gestiona reportes, usuarios y acciones según tus permisos.</p>
   <div class="moderation-grid">
    <button data-mod-action="reports">📋 Reportes</button>
    <button data-mod-action="users">👥 Usuarios</button>
    <button data-mod-action="actions">⚖️ Acciones</button>
    <button data-mod-action="permissions">🔐 Permisos</button>
   </div>
   <div id="moderation-content" class="moderation-content"></div>
  </div>`;
  document.body.appendChild(panel);
  panel.querySelector('.modal-close').onclick=()=>panel.remove();
  panel.addEventListener('click',e=>{
   const b=e.target.closest('[data-mod-action]');
   if(b) loadModerationSection(b.dataset.modAction);
  });
 }
 panel.style.display='flex';
 loadModerationSection('reports');
}

async function loadModerationSection(section){
 const box=document.getElementById('moderation-content');
 if(!box)return;
 if(!window.EmprendeBackend?.enabled){box.innerHTML='<p>Supabase no está disponible.</p>';return;}
 const c=window.EmprendeBackend.client;
 if(section==='reports'){
  const r=await c.from('help_reports').select('*').order('created_at',{ascending:false}).limit(50);
  box.innerHTML='<h3>Reportes</h3>'+((r.data||[]).map(x=>`<div class="moderation-row"><b>${x.report_type||'Reporte'}</b><span>${x.status||'pending'}</span><p>${x.description||''}</p></div>`).join('')||'<p>No hay reportes.</p>');
 }else if(section==='users'){
  const r=await c.from('profiles').select('id,public_id,full_name,role,status,created_at').order('created_at',{ascending:false}).limit(100);
  box.innerHTML='<h3>Usuarios</h3>'+((r.data||[]).map(x=>`<div class="moderation-row"><b>${x.public_id||x.id}</b><span>${roleNames[x.role]||x.role||'Usuario'}</span><p>${x.full_name||'Sin nombre'} · ${x.status||'active'}</p></div>`).join('')||'<p>No hay usuarios.</p>');
 }else if(section==='actions'){
  const r=await c.from('moderation_actions').select('*').order('created_at',{ascending:false}).limit(50);
  box.innerHTML='<h3>Acciones recientes</h3>'+((r.data||[]).map(x=>`<div class="moderation-row"><b>${x.action_type||'Acción'}</b><p>${x.reason||''}</p></div>`).join('')||'<p>No hay acciones.</p>');
 }else{
  const r=await c.from('role_permissions').select('*').order('role');
  box.innerHTML='<h3>Permisos</h3>'+((r.data||[]).map(x=>`<div class="moderation-row"><b>${roleNames[x.role]||x.role}</b><span>${x.permission}</span></div>`).join('')||'<p>No hay permisos.</p>');
 }
}

window.showModerationPanel=showModerationPanel;
window.EmprendeRoles={roleNames,isStaff,getRole};
window.addEventListener('emprende-auth-ready',e=>{
 window.emprendeProfile=e.detail.profile||null;
 ensureProfileIdentity();
 ensureModerationEntry();
});
window.addEventListener('load',()=>setTimeout(()=>{ensureProfileIdentity();ensureModerationEntry();},800));
})();