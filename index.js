import{a as m,i as n,S}from"./assets/vendor-Bi0bPHun.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(e){if(e.ep)return;e.ep=!0;const l=o(e);fetch(e.href,l)}})();const P="48010442-005cbb84b5a65166ca3b031bb",q="https://pixabay.com/api/";m.defaults.baseURL=q;const f=(r,t,o)=>{const a=new URLSearchParams({key:P,q:r.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o});return m.get(`https://pixabay.com/api/?${a}`).then(e=>{if(e.status!=200)throw console.log(e),n.error({message:"Something went wrong. Please try again later",position:"topRight"}),new Error(e.status);return console.log(typeof e),console.log(e),e.data}).then(e=>e.total?{images:e.hits,total:e.totalHits}:(n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[])).catch(e=>(n.error({message:"Something went wrong. Please try again later",position:"topRight"}),console.log(e),[]))},h=r=>r.reduce((t,{webformatURL:o,largeImageURL:a,tags:e,likes:l,views:i,comments:L,downloads:w})=>t+`<li class="gallery-card">
              <a class="gallery-link" href="${a}">
                <img class="gallery-image" src="${o}" alt="${e}" loading="lazy" />
                <ul class="gallery-card-info">
                  <li>
                    <p>Likes</p>
                    <p>${l}</p>
                  </li>
                  <li>
                    <p>Views</p>
                    <p>${i}</p>
                  </li>
                  <li>
                    <p>Comments</p>
                    <p>${L}</p>
                  </li>
                  <li>
                    <p>Downloads</p>
                    <p>${w}</p>
                  </li>
                </ul>
              </a>
            </li>`,"");let s=1,p="";const c=15,v=44,d=document.querySelector(".js-form"),u=document.querySelector(".js-loader"),y=document.querySelector(".load-more"),g=document.querySelector(".js-gallery"),b=new S(".js-gallery a.gallery-link",{captionDelay:250,overlayOpacity:.8}),E=r=>{if(r.preventDefault(),!(p===t&&s==1)){u.style.display="flex";var t=r.target.elements["user-query"].value;p=t,s=1,f(t,s,c).then(o=>{if(o.length==0){g.innerHTML="",y.style.display="none";return}let a=o.images;g.innerHTML=h(a),b.refresh(),y.style.display=o.total>c?"block":"none"}).finally(()=>{d.reset(),u.style.display="none"})}},M=async()=>{s+=1,u.style.display="flex",f(p,s,c).then(r=>{let t=r.images;g.insertAdjacentHTML("beforeend",h(t)),b.refresh(),s*c>=r.total&&(y.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}).finally(()=>{d.reset(),setTimeout(()=>{const r=document.querySelectorAll(".gallery-card"),o=r[r.length-1].offsetHeight;u.style.display="none",window.scrollBy({top:o*2-v,behavior:"smooth"})},500)})};d.addEventListener("submit",E);y.addEventListener("click",M);
//# sourceMappingURL=index.js.map
