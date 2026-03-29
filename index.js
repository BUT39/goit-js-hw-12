import{a as h,S,i as n}from"./assets/vendor-DQvd0HNi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const v="55152376-abc1c78727543314a3e05fe22";h.defaults.baseURL="https://pixabay.com/";async function p(r,e=1,o=15){try{return(await h.get("/api/",{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:o}})).data}catch(i){throw console.error("Pixabay API Error:",i),i}}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".btn-load-more"),x=new S(".gallery .gallery-link",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function L(r){const e=r.map(o=>`<li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img
            class="gallery-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
            width="360"
            height="200"
          />
        </a>
        <ul class="info-list">
          <li class="info-item"><h3 class="info-title">Likes</h3><p class="info-text">${o.likes}</p></li>
          <li class="info-item"><h3 class="info-title">Views</h3><p class="info-text">${o.views}</p></li>
          <li class="info-item"><h3 class="info-title">Comments</h3><p class="info-text">${o.comments}</p></li>
          <li class="info-item"><h3 class="info-title">Downloads</h3><p class="info-text">${o.downloads}</p></li>
        </ul>
      </li>`).join("");m.insertAdjacentHTML("beforeend",e),x.refresh()}function q(){m.innerHTML=""}function b(){y.style.display="block"}function w(){y.style.display="none"}function R(){g.style.display="block"}function c(){g.style.display="none"}const P=document.querySelector(".form"),$=document.querySelector(".btn-load-more");let l="",a=1;const f=15;let d=!1;P.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.target.elements["search-text"].value.trim(),l.length<2){n.error({message:"Enter at least 2 characters",position:"topRight"});return}a=1,q(),c(),b();try{const e=await p(l,a,f);if(e.hits.length===0){n.error({message:"No images found. Try another search.",position:"topRight"});return}L(e.hits),a*f>=e.totalHits?(c(),n.info({message:"You've reached the end of search results.",position:"topRight"})):R()}catch(e){console.error(e),n.error({message:"Something went wrong",position:"topRight"})}finally{w()}});$.addEventListener("click",async()=>{if(!d){d=!0,a+=1,c(),b();try{const r=await p(l,a,f);L(r.hits);const e=document.querySelector(".gallery-item");if(e){const{height:o}=e.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}a*f>=r.totalHits?(c(),n.info({message:"You've reached the end of search results.",position:"topRight"})):R()}catch(r){console.error(r),n.error({message:"Something went wrong",position:"topRight"})}finally{w(),d=!1}}});
//# sourceMappingURL=index.js.map
