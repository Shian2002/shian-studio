(function(){
  function hasVisibleLabel(el){
    if(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||el.getAttribute('title'))return true;
    if(el.id&&document.querySelector('label[for="'+CSS.escape(el.id)+'"]'))return true;
    return false;
  }

  function clean(value){
    return String(value||'').replace(/\s+/g,' ').trim();
  }

  function labelFrom(el,index,type){
    return clean(el.getAttribute('placeholder'))||
      clean(el.getAttribute('name'))||
      clean(el.id)||
      clean(el.getAttribute('data-action'))||
      clean(el.className).split(' ')[0]||
      type+' '+(index+1);
  }

  function applyA11yLabels(root){
    var scope=root&&root.querySelectorAll?root:document;
    Array.prototype.forEach.call(scope.querySelectorAll('button'),function(btn,index){
      if(hasVisibleLabel(btn))return;
      var text=clean(btn.textContent);
      btn.setAttribute('aria-label',text||labelFrom(btn,index,'Action'));
    });
    Array.prototype.forEach.call(scope.querySelectorAll('input,textarea,select'),function(field,index){
      if(hasVisibleLabel(field))return;
      field.setAttribute('aria-label',labelFrom(field,index,'Field'));
    });
  }

  function start(){
    applyA11yLabels(document);
    if('MutationObserver' in window){
      new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          Array.prototype.forEach.call(m.addedNodes,function(node){
            if(node.nodeType===1)applyA11yLabels(node);
          });
        });
      }).observe(document.body,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
  else start();
})();
