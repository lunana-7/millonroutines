"use client";

import { useEffect, useId, useState } from "react";

export default function NacrePour(){
 const [phase,setPhase]=useState<"ready"|"pouring"|"pearl">("ready");
 const id=useId().replace(/:/g,"");
 const ref=(name:string)=>`url(#${id}-${name})`;
 useEffect(()=>{if(phase!=="pouring")return;const timer=setTimeout(()=>setPhase("pearl"),4600);return()=>clearTimeout(timer)},[phase]);
 function pour(){setPhase(window.matchMedia("(prefers-reduced-motion: reduce)").matches?"pearl":"pouring")}
 return <section id="nacre-pour" className={`nacre-pour section-wrap nacre-${phase}`} aria-labelledby={`${id}-title`}>
  <div className="nacre-intro"><div><p className="eyebrow">AN INTERLUDE · 차가 빛이 되는 순간</p><h2 id={`${id}-title`}>A little tea.<br/><em>A quiet transformation.</em></h2></div><div><p>Pour slowly. Watch the tea become a small landscape of mother-of-pearl.</p><span className="nacre-poem" lang="ko">한 잔에, 빛을 담다.</span></div></div>
  <div className="nacre-stage">
   <span className="nacre-vertical" lang="ko" aria-hidden="true">차 한 잔의 풍경</span>
   <svg viewBox="70 110 860 500" role="img" aria-labelledby={`${id}-art-title ${id}-art-desc`}>
    <title id={`${id}-art-title`}>Tea becoming mother-of-pearl</title><desc id={`${id}-art-desc`}>A sculptural porcelain teapot pours into a celadon cup against ink-wash mountains. The tea surface blossoms into luminous shell inlay when you press Pour the tea.</desc>
    <defs>
     <linearGradient id={`${id}-porcelain`} x1="0" y1="0" x2=".9" y2=".8"><stop stopColor="#fffefa"/><stop offset=".4" stopColor="#f0f1e9"/><stop offset=".72" stopColor="#cedbd1"/><stop offset="1" stopColor="#8fa89b"/></linearGradient>
     <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2=".1"><stop stopColor="#7d9f8d"/><stop offset=".28" stopColor="#cbded0"/><stop offset=".5" stopColor="#e2eadd"/><stop offset=".8" stopColor="#aec8b7"/><stop offset="1" stopColor="#638675"/></linearGradient>
     <radialGradient id={`${id}-inside`}><stop stopColor="#f5f1df"/><stop offset=".75" stopColor="#d4decc"/><stop offset="1" stopColor="#819b88"/></radialGradient>
     <linearGradient id={`${id}-pearl`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f6f2e2"/><stop offset=".2" stopColor="#aad9cb"/><stop offset=".43" stopColor="#e9d3e8"/><stop offset=".65" stopColor="#f7f2cc"/><stop offset=".82" stopColor="#b3d4e7"/><stop offset="1" stopColor="#c3dfc4"/></linearGradient>
     <linearGradient id={`${id}-stream`}><stop stopColor="#d7d5a0" stopOpacity=".25"/><stop offset=".5" stopColor="#c3c28a"/><stop offset="1" stopColor="#e7ead5" stopOpacity=".7"/></linearGradient>
     <filter id={`${id}-wash`} x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
     <filter id={`${id}-shadow`} x="-40%" y="-100%" width="180%" height="300%"><feGaussianBlur stdDeviation="13"/></filter>
     <clipPath id={`${id}-pool`}><ellipse cx="664" cy="430" rx="155" ry="39"/></clipPath>
     <clipPath id={`${id}-reveal`}><circle className="nacre-bloom-mask" cx="641" cy="425" r="220"/></clipPath>
     <g id={`${id}-flower`} fill={ref("pearl")} stroke="#eef4e6" strokeWidth=".5"><path d="M0-3C-17-28-31-10-14 0C-36 10-17 29-4 13C0 37 22 25 13 8C38 11 32-13 12-10C17-34-7-33 0-3Z"/><circle r="3" fill="#526f65"/></g>
    </defs>
    <g className="nacre-landscape" fill="#8da99a" opacity=".17" filter={ref("wash")}><path d="M-30 350 90 219 158 277 271 140 394 301 482 208 630 365Z"/><path d="M440 350 577 221 638 261 740 144 829 247 931 194 1040 343Z" opacity=".65"/></g>
    <g fill="none" stroke="#718f7e" strokeWidth="1" opacity=".18"><path d="M10 370Q210 346 422 375T990 366"/><path d="M80 390Q380 363 910 391"/></g>
    <circle cx="826" cy="150" r="39" fill="#cdd5bd" opacity=".33"/>
    <ellipse cx="646" cy="572" rx="205" ry="24" fill="#52715d" opacity=".18" filter={ref("shadow")}/>
    <ellipse cx="288" cy="427" rx="160" ry="20" fill="#52715d" opacity=".13" filter={ref("shadow")}/>
    <g className="nacre-teapot" stroke="#7c9586" strokeWidth="1.3" strokeLinejoin="round">
     <path d="M211 223C127 152 110 265 166 301L190 282C153 250 157 208 205 250Z" fill={ref("porcelain")}/>
     <path d="M349 267Q419 275 480 230L508 248Q454 341 367 346Z" fill={ref("porcelain")}/>
     <ellipse cx="494" cy="238" rx="17" ry="7" transform="rotate(32 494 238)" fill="#617f6a"/>
     <path d="M191 237C154 277 162 356 200 386Q277 426 351 385C388 353 407 279 366 237Z" fill={ref("porcelain")}/>
     <ellipse cx="279" cy="238" rx="88" ry="21" fill="#d7e2d6"/>
     <path d="M195 235Q215 202 278 204Q339 203 364 235Q279 260 195 235Z" fill={ref("porcelain")}/>
     <ellipse cx="279" cy="203" rx="14" ry="9" fill={ref("porcelain")}/>
     <path d="M204 277Q185 331 217 359" fill="none" stroke="#fffef6" strokeWidth="8" opacity=".45"/>
     <path d="M281 310c-10-16-22-3-13 5-17 6-4 21 5 11 0 18 18 13 14 1 17 6 22-12 8-15 7-15-9-21-14-2Z" fill="none" stroke="#7b9788" strokeWidth="1.4"/>
    </g>
    <path className="nacre-stream" d="M500 247C545 265 607 321 641 425" fill="none" stroke={ref("stream")} strokeWidth="8" strokeLinecap="round"/>
    <g stroke="#789382" strokeWidth="1.2">
     <path d="M490 431Q506 544 585 565Q666 589 744 562Q815 537 836 431Z" fill={ref("cup")}/>
     <path d="M603 564v12q62 19 121-2v-13" fill={ref("cup")}/>
     <ellipse cx="663" cy="430" rx="174" ry="53" fill={ref("inside")}/>
     <ellipse cx="663" cy="429" rx="171" ry="50" fill="none" stroke="#f5f6e9" strokeWidth="4"/>
    </g>
    <g clipPath={ref("pool")}>
     <ellipse className="nacre-tea" cx="664" cy="430" rx="155" ry="39" fill="#a4a675"/>
     <g className="nacre-shell" clipPath={ref("reveal")}>
      <ellipse cx="664" cy="430" rx="155" ry="39" fill="#192c26"/>
      <image href="/images/najeon-art-v1-960.webp" x="503" y="350" width="325" height="163" preserveAspectRatio="xMidYMid slice" opacity=".85"/>
      <g fill="none" stroke={ref("pearl")} strokeWidth="1.7"><path d="M528 455Q586 407 690 444T819 406"/><path d="M582 433 591 404M677 440 708 410M736 443 760 419"/></g>
      <use href={`#${id}-flower`} transform="translate(592 414) scale(.55 .33)"/><use href={`#${id}-flower`} transform="translate(708 417) scale(.65 .39)"/><use href={`#${id}-flower`} transform="translate(757 425) scale(.4 .3)"/>
      <ellipse className="nacre-pool-glint" cx="664" cy="430" rx="144" ry="33" fill="none" stroke={ref("pearl")} strokeWidth="1.2" opacity=".6"/>
     </g>
     <ellipse className="nacre-ripple" cx="641" cy="425" rx="40" ry="10" fill="none" stroke="#f6f2db" strokeWidth="2"/>
    </g>
    <path d="M521 465Q530 516 568 535" fill="none" stroke="#f3f8e7" strokeWidth="9" opacity=".35" strokeLinecap="round"/>
    <path d="M665 513c-9-15-21-3-13 5-16 6-4 20 5 11 0 16 17 12 13 1 16 5 20-11 7-14 6-14-8-20-12-3Z" fill="none" stroke="#668d79" strokeWidth="1.5"/>
    <g className="nacre-steam" fill="none" stroke="#789382" strokeWidth="2" opacity=".25"><path d="M636 358q-17-25 0-48t-2-43"/><path d="M682 355q-17-28 0-49t0-38"/></g>
    <g fill="none" stroke="#829384" opacity=".42" strokeWidth="1.4"><path d="M45 95Q91 114 127 107M81 107 73 82M96 109 109 88"/><path d="M855 587q46-19 95-8m-50-1 12-22"/></g>
   </svg>
   <div className="nacre-stage-label"><span>01 / TEA INTO LIGHT</span><span lang="ko">차 · 빛 · 여백</span></div>
  </div>
  <div className="nacre-controls"><div aria-live="polite"><span className="nacre-state-dot"/><p>{phase==="ready"?"A small gesture. A change of light.":phase==="pouring"?"The pour becomes a ripple. The ripple becomes light.":"A little landscape, held in your cup."}</p></div><div>{phase==="pearl"?<button className="button ink-button" onClick={()=>setPhase("ready")}>Begin again <span aria-hidden="true">↺</span></button>:<button className="button ink-button" onClick={pour} disabled={phase==="pouring"}>{phase==="pouring"?"Pouring…":"Pour the tea"}<span aria-hidden="true">↘</span></button>}<a className="text-link" href="/korean-roots">The art behind the light ↗</a></div></div>
  <p className="nacre-art-note">An interactive artwork inspired by ink painting, porcelain and najeon. An imagined transformation.</p>
 </section>
}
