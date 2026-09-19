/**
 * Inline runtime for relocatable previews (NEXT_PUBLIC_RELATIVE_PREVIEW=true): lets the static export run from
 * any base path without server routing. Page links load their .html file, and root-relative image URLs that the
 * client renders later are made relative. Never part of a production build.
 */
export const PREVIEW_RUNTIME = `(function(){
var toRel=function(u){if(!u||u.charAt(0)!=='/'||u.charAt(1)==='/')return u;u=u.slice(1);var q=u.search(/[?#]/);var p=q>=0?u.slice(0,q):u,rest=q>=0?u.slice(q):'';if(p==='')return 'index.html'+rest;if(/^(_next|assets)\\//.test(p)||/\\.[a-z0-9]+$/i.test(p))return p+rest;return p.replace(/\\/$/,'')+'.html'+rest;};
document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;var h=a.getAttribute('href');if(!h||h.charAt(0)!=='/'||h.charAt(1)==='/'||a.target==='_blank')return;e.preventDefault();e.stopImmediatePropagation();location.href=toRel(h);},true);
var fix=function(el){if(!(el instanceof Element))return;var list=[el].concat(Array.prototype.slice.call(el.querySelectorAll('img,source,link,script')));list.forEach(function(n){var v=n.getAttribute('srcset');if(v){var nv=v.replace(/(^|,\\s*)\\/(assets|_next)\\//g,'$1$2/');if(nv!==v)n.setAttribute('srcset',nv);}var s=n.getAttribute('src');if(s&&s.charAt(0)==='/'&&s.charAt(1)!=='/')n.setAttribute('src',toRel(s));});};
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='attributes')fix(m.target);m.addedNodes&&m.addedNodes.forEach(fix);});}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcset']});
})();`;

export const RELATIVE_PREVIEW = process.env.NEXT_PUBLIC_RELATIVE_PREVIEW === 'true';
