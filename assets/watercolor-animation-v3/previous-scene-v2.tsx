"use client";

import { useEffect, useId, useState } from "react";

export default function NacrePour(){
 const [phase,setPhase]=useState<"ready"|"pouring"|"pearl">("ready");
 const id=useId().replace(/:/g,"");
 const ref=(name:string)=>`url(#${id}-${name})`;
 useEffect(()=>{if(phase!=="pouring")return;const timer=setTimeout(()=>setPhase("pearl"),4600);return()=>clearTimeout(timer)},[phase]);
 function pour(){setPhase(window.matchMedia("(prefers-reduced-motion: reduce)").matches?"pearl":"pouring")}
 return <section id="nacre-pour" className={`nacre-pour nacre-v2 section-wrap nacre-${phase}`} aria-labelledby={`${id}-title`}>
  <div className="nacre-intro"><div><p className="eyebrow">AN INTERLUDE · 차가 빛이 되는 순간</p><h2 id={`${id}-title`}>A little tea.<br/><em>A quiet transformation.</em></h2></div><div><p>Pour slowly. Watch the tea become a small landscape of mother-of-pearl.</p><span className="nacre-poem" lang="ko">한 잔에, 빛을 담다.</span></div></div>
  <div className="nacre-stage">
   <svg viewBox="0 0 1672 941" role="img" aria-labelledby={`${id}-art-title ${id}-art-desc`}>
    <title id={`${id}-art-title`}>Tea into light — porcelain, celadon and an ink-wash landscape</title>
    <desc id={`${id}-art-desc`}>{phase==="ready"?"A dimensional white porcelain teapot and a pale celadon cup of green tea rest before misty mountains and a flowering plum branch. Press Pour the tea to begin.":phase==="pouring"?"A fine stream reaches the cup as ripples reveal a mother-of-pearl plum blossom landscape on the tea surface.":"The tea surface has become a dark, luminous pool of mother-of-pearl plum blossoms and flowing mountain lines."}</desc>
    <defs>
     <linearGradient id={`${id}-stream`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f5edb9" stopOpacity=".3"/><stop offset=".5" stopColor="#d1c480" stopOpacity=".9"/><stop offset="1" stopColor="#fff6ca" stopOpacity=".7"/></linearGradient>
     <clipPath id={`${id}-pool`}><ellipse cx="1170" cy="607" rx="158" ry="42"/></clipPath>
     <clipPath id={`${id}-reveal`}><circle className="nacre-bloom-mask" cx="1170" cy="607" r="240"/></clipPath>
    </defs>
    <image href="/images/tea-into-light-ready-v2-1672.webp" width="1672" height="941"/>
    <g clipPath={ref("pool")}>
     <g className="nacre-shell" clipPath={ref("reveal")}><image href="/images/tea-into-light-pearl-v2-1672.webp" width="1672" height="941"/></g>
     <ellipse className="nacre-ripple" cx="1170" cy="607" rx="35" ry="9" fill="none" stroke="#fff8db" strokeWidth="2"/>
    </g>
    <path className="nacre-stream" d="M910 459C1000 487 1098 529 1170 605" pathLength="270" fill="none" stroke={ref("stream")} strokeWidth="5" strokeLinecap="round"/>
   </svg>
   <div className="nacre-stage-label"><span>01 / TEA INTO LIGHT</span><span lang="ko">차 · 빛 · 여백</span></div>
  </div>
  <div className="nacre-controls"><div aria-live="polite"><span className="nacre-state-dot"/><p>{phase==="ready"?"A small gesture. A change of light.":phase==="pouring"?"The pour becomes a ripple. The ripple becomes light.":"A little landscape, held in your cup."}</p></div><div>{phase==="pearl"?<button className="button ink-button" onClick={()=>setPhase("ready")}>Begin again <span aria-hidden="true">↺</span></button>:<button className="button ink-button" onClick={pour} disabled={phase==="pouring"}>{phase==="pouring"?"Pouring…":"Pour the tea"}<span aria-hidden="true">↘</span></button>}<a className="text-link" href="/korean-roots">The art behind the light ↗</a></div></div>
  <p className="nacre-art-note">Original digital artwork blending sculptural ceramics and Korean ink-wash scenery. The tea-to-nacre transformation is an imagined visual effect.</p>
 </section>
}
