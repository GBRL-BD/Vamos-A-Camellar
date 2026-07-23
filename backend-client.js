(function(){
'use strict';
const client=window.emprendeSupabase;
window.EmprendeBackend={
  enabled:!!client,
  client,
  async getUser(){
    if(!client)return null;
    const r=await client.auth.getUser();
    return r.data?.user||null;
  },
  async getProfile(){
    const user=await this.getUser();
    if(!user)return null;
    const r=await client.from('profiles').select('*').eq('id',user.id).maybeSingle();
    if(r.error){console.warn('Perfil Supabase:',r.error.message);return null;}
    return r.data||null;
  },
  async getRole(){
    const p=await this.getProfile();
    return p?.role||'user';
  },
  async saveOpportunity(opportunityId,score=0){
    const user=await this.getUser();
    if(!user||!opportunityId)return false;
    const r=await client.from('user_opportunities').upsert({
      user_id:user.id, opportunity_id:opportunityId, score,
      selected:true, started_at:new Date().toISOString()
    },{onConflict:'user_id,opportunity_id'});
    if(r.error) console.warn('Oportunidad:',r.error.message);
    return !r.error;
  },
  async saveMission(missionId,status='in_progress'){
    const user=await this.getUser();
    if(!user||!missionId)return null;
    const r=await client.from('user_missions').upsert({
      user_id:user.id, mission_id:missionId, status,
      started_at:new Date().toISOString()
    },{onConflict:'user_id,mission_id'}).select('id').maybeSingle();
    if(r.error) console.warn('Misión:',r.error.message);
    return r.data||null;
  },
  async submitEvidence(missionId,missionType,content){
    const user=await this.getUser();
    if(!user)return false;
    const um=await client.from('user_missions').upsert({
      user_id:user.id,mission_id:missionId,status:'submitted',
      submitted_at:new Date().toISOString()
    },{onConflict:'user_id,mission_id'}).select('id').single();
    if(um.error){console.warn('Progreso:',um.error.message);return false;}
    const ev=await client.from('mission_evidence').insert({
      user_mission_id:um.data.id,user_id:user.id,
      evidence_type:missionType||'text',content:String(content??''),
      verification_status:'pending'
    });
    if(ev.error){console.warn('Evidencia:',ev.error.message);return false;}
    return true;
  },
  async signOut(){
    if(!client)return;
    await client.auth.signOut();
    location.reload();
  }
};
})();