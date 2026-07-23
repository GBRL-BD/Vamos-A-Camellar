window.EMPRENDE_SUPABASE_URL='https://cbiapndsjlbgouuqvlbz.supabase.co';
window.EMPRENDE_SUPABASE_KEY='sb_publishable_xg-pRfq7xGyPLuOFlNU-PQ_ZBlVfH9V';
window.EMPRENDE_SUPABASE_CONFIG={url:window.EMPRENDE_SUPABASE_URL,anonKey:window.EMPRENDE_SUPABASE_KEY};
window.emprendeSupabase=null;
try{
  if(window.supabase && typeof window.supabase.createClient==='function'){
    window.emprendeSupabase=window.supabase.createClient(
      window.EMPRENDE_SUPABASE_URL,
      window.EMPRENDE_SUPABASE_KEY
    );
  }
}catch(error){
  console.error('Error inicializando Supabase:',error);
}
