// HR Theories — Supabase configuration
window.HRT = {
  SUPABASE_URL: "https://omnpjpbflyjwclptiwbh.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_rojbKF74gGADYZ617CB77Q_rVWjWzqR"
};

// Language switcher + Arabic feature flag (single source of truth: Supabase site_config.arabic_enabled)
(function(){
  function run(){
    var el = document.getElementById('langSwitch');
    var isAr = location.pathname === '/ar' || location.pathname.indexOf('/ar/') === 0;
    // Preserve query string (e.g. job ?id=) when switching language
    if(el && location.search && el.getAttribute('href').indexOf('/job') > -1){
      el.setAttribute('href', el.getAttribute('href').split('?')[0] + location.search);
    }
    fetch(HRT.SUPABASE_URL + '/rest/v1/site_config?key=eq.arabic_enabled&select=value', {
      headers:{ apikey:HRT.SUPABASE_ANON_KEY, Authorization:'Bearer ' + HRT.SUPABASE_ANON_KEY }
    }).then(function(r){ return r.json(); }).then(function(rows){
      var on = rows.length ? rows[0].value === true : false;
      if(isAr){
        // Arabic page: if Arabic is switched OFF, bounce to the English equivalent
        if(!on){ location.replace(el ? el.getAttribute('href') : '/'); }
      } else {
        // English page: reveal the العربية link only when Arabic is switched ON
        if(on && el){ el.style.display = ''; }
      }
    }).catch(function(){ /* stay on current language on any error */ });
  }
  if(document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
})();
