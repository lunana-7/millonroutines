"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createWatercolorScene } from "./watercolor-scene.js";
type Painting={play:()=>void;reset:()=>void;finish:()=>void;destroy:()=>void};
export default function NacrePour(){
 const [phase,setPhase]=useState<"ready"|"pouring"|"pearl">("ready");
 const [loaded,setLoaded]=useState(false);const [failed,setFailed]=useState(false);
 const canvas=useRef<HTMLCanvasElement>(null);const painting=useRef<Painting|null>(null);
 const id=useId().replace(/:/g,"");
 useEffect(()=>{let active=true;
  try{if(canvas.current){painting.current=createWatercolorScene(canvas.current,()=>{if(active)setPhase("pearl")});setLoaded(true)}}catch{setFailed(true)}
  return()=>{active=false;painting.current?.destroy();painting.current=null};
 },[]);
 function pour(){if(!painting.current)return;setPhase("pouring");painting.current.play()}
 function reset(){painting.current?.reset();setPhase("ready")}
 return <section id="nacre-pour" className={`nacre-pour nacre-watercolor section-wrap nacre-${phase}`} aria-labelledby={`${id}-title`}>
  <div className="nacre-intro"><div><p className="eyebrow">A LIVING INK PAINTING · 물이 그림이 되는 순간</p><h2 id={`${id}-title`}>Water finds its way.<br/><em>A painting begins to bloom.</em></h2></div><div><p>Pour the tea. Watch water carry color across the cup, like pigment spreading through wet hanji.</p><span className="nacre-poem" lang="ko">흐르는 물결, 번지는 빛.</span></div></div>
  <div className="nacre-stage watercolor-stage">
   <canvas ref={canvas} width={1200} height={700} role="img" aria-label={phase==="ready"?"A watercolor porcelain teapot and celadon cup on hanji, before pale ink-wash mountains.":phase==="pouring"?"The teapot tilts and pours moving water. Pigment swirls, diffuses and bleeds across the cup and paper.":"The completed watercolor holds drifting green washes, an ink landscape and delicate mother-of-pearl flower lines."}>An animated Korean watercolor tea scene. Use Pour the tea to watch water and pigment flow.</canvas>
   <div className="nacre-stage-label"><span>WATER / PIGMENT / LIGHT</span><span lang="ko">수묵담채 · 물과 빛</span></div>
  </div>
  <div className="nacre-controls"><div aria-live="polite"><span className="nacre-state-dot"/><p>{failed?"The painting could not load. Please refresh to try again.":!loaded?"Preparing the watercolor…":phase==="ready"?"A little water. Let the color find its way.":phase==="pouring"?"Water flows. Pigment drifts. The paper holds the light.":"An ink landscape, a little pearl light. Pour again whenever you like."}</p></div><div>{phase==="pearl"?<button className="button ink-button" onClick={reset}>Begin again <span aria-hidden="true">↺</span></button>:<button className="button ink-button" onClick={pour} disabled={!loaded||phase==="pouring"}>{phase==="pouring"?"Painting in water…":"Pour the tea"}<span aria-hidden="true">↘</span></button>}<a className="text-link" href="/korean-roots">The art behind the light ↗</a></div></div>
  <p className="nacre-art-note">An original moving watercolor inspired by Korean ink painting and hanji. Water, pigment, ripples and pearl-like lines are animated in the scene; the transformation is an artistic interpretation.</p>
 </section>
}
