(function(){
  try {
    var host = location.hostname;
    var isDraft = /--centromedicouniversal\.netlify\.app$/.test(host);
    var isProd  = /(^(www\.)?centromedicouniversal\.com$)/.test(host);
    if (!(isDraft || isProd)) return;

    var NAMESPACE = 'centromedicouniversal';
    var hostKey = location.hostname.split('.').join('_');
    var pathKey = (location.pathname || '/').toLowerCase()
      .replace(/[^a-z0-9]+/g,'_')
      .replace(/^_|_$/g,'');
    if (!pathKey) pathKey = 'home';
    var envPrefix = isProd ? 'prod_' : 'draft_';
    var KEY = envPrefix + hostKey + '_' + pathKey;

    fetch('https://api.countapi.xyz/hit/' + NAMESPACE + '/' + KEY)
      .then(function(r){ return r.json(); })
      .then(function(data){
        var value = (data && typeof data.value === 'number') ? data.value : 0;
        if (!isFinite(value)) value = 0;
        createBadge(value);
      })
      .catch(function(){ createBadge(0); });

    function createBadge(value){
      var badge = document.createElement('div');
      badge.textContent = String(value);
      badge.setAttribute('aria-live','polite');
      badge.style.cssText = [
        'position:fixed',
        'top:8px',
        'left:8px',
        'z-index:2147483646',
        'background:rgba(0,0,0,0.7)',
        'color:#fff',
        'padding:4px 8px',
        'border-radius:6px',
        'font:700 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial',
        'pointer-events:none',
        'letter-spacing:.2px',
        'box-shadow:0 2px 6px rgba(0,0,0,0.25)'
      ].join(';');

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        document.body.appendChild(badge);
      } else {
        document.addEventListener('DOMContentLoaded', function(){
          document.body.appendChild(badge);
        });
      }
    }
  } catch(e) { /* no-op */ }
})();
