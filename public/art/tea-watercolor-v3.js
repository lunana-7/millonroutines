// Original procedural watercolor animation. No video, image crossfade or reveal mask.
// The liquid uses a persistent pigment field with advection and diffusion.
const W=1200,H=700,DURATION=11200;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{v=clamp((v-a)/(b-a));return v*v*(3-2*v)};
const hash=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const ink='#3e6255';
export function createWatercolorScene(canvas,onComplete=()=>{}){
 const ctx=canvas.getContext('2d',{alpha:false});
 if(!ctx)return {play(){},reset(){},destroy(){},finish(){}};
 let raf=0,start=0,last=0,time=0,dead=false,playing=false,reduced=false;
 const NX=168,NY=62,N=NX*NY;
 let dye=new Float32Array(N),next=new Float32Array(N),wet=new Float32Array(N);
 const fluid=document.createElement('canvas');fluid.width=NX;fluid.height=NY;
 const fc=fluid.getContext('2d');const pixels=fc.createImageData(NX,NY);
 const paper=document.createElement('canvas');paper.width=W;paper.height=H;
 const pc=paper.getContext('2d');pc.fillStyle='#f5f1e6';pc.fillRect(0,0,W,H);
 for(let i=0;i<27000;i++){const x=hash(i*3)*W,y=hash(i*3+1)*H;pc.fillStyle=`rgba(105,100,75,${.012+hash(i+8)*.03})`;pc.fillRect(x,y,hash(i+13)*1.8+.3,.5)}
 for(let i=0;i<500;i++){const x=hash(i+7000)*W,y=hash(i+8000)*H;pc.strokeStyle='rgba(150,143,112,.035)';pc.lineWidth=.4;pc.beginPath();pc.moveTo(x,y);pc.lineTo(x+hash(i+400)*13,y-4);pc.stroke()}
 function path(d,fill,stroke,width=1){const p=new Path2D(d);if(fill){ctx.fillStyle=fill;ctx.fill(p)}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke(p)}}
 function wash(cx,cy,rx,ry,color,seed,alpha=1){
  ctx.save();ctx.globalAlpha=alpha;
  for(let j=0;j<5;j++){ctx.beginPath();for(let k=0;k<=60;k++){const a=k/60*Math.PI*2;const r=1+(hash(k+seed+j*3)-.5)*.09;const x=cx+Math.cos(a)*rx*r,y=cy+Math.sin(a)*ry*r;k?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fillStyle=color;ctx.globalAlpha=alpha*(.13-j*.012);ctx.fill()}ctx.restore();
 }
 function line(points,progress,color,width){
  const n=Math.min(points.length-1,Math.floor(clamp(progress)*(points.length-1)));if(n<1)return;
  ctx.beginPath();ctx.moveTo(...points[0]);for(let j=1;j<=n;j++)ctx.lineTo(...points[j]);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
 }
 function flower(x,y,r,progress,color){
  const pts=[];for(let j=0;j<=120;j++){const a=j/120*Math.PI*2;const radius=r*(.73+.25*Math.cos(5*a));pts.push([x+Math.cos(a)*radius,y+Math.sin(a)*radius*.55])}line(pts,progress,color,1.4);
  if(progress>.85){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,1.6,1,0,0,7);ctx.fill()}
 }
 function emblem(x,y,r){const pts=[];for(let j=0;j<=100;j++){const a=j/100*Math.PI*2;const radius=r*(.8+.2*Math.cos(5*a));pts.push([x+Math.cos(a)*radius,y+Math.sin(a)*radius])}line(pts,1,'#688778',1.1);ctx.fillStyle='#688778';ctx.beginPath();ctx.arc(x,y,1.3,0,7);ctx.fill()}
 function landscape(t){
  ctx.save();
  for(let layer=0;layer<3;layer++){
   const y=240+layer*50;ctx.beginPath();ctx.moveTo(40,400);
   for(let x=40;x<=1190;x+=10){const h=Math.sin(x*.009+layer)*34+Math.sin(x*.024+layer*3)*12+hash(Math.floor(x/10)+layer*100)*8;ctx.lineTo(x,y+h)}ctx.lineTo(1190,420);ctx.closePath();ctx.fillStyle=['#a2b4a3','#8da794','#b6c1ad'][layer];ctx.globalAlpha=.065+layer*.018;ctx.fill();
  }
  ctx.globalAlpha=.22;wash(1005,133,39,39,'#c3c5a7',4,.7);ctx.restore();
  // A willow/plum branch, painted with broken ink rather than a geometric outline.
  const branch=[];for(let i=0;i<65;i++)branch.push([40+i*2.5,70+i*.55+Math.sin(i*.06)*7]);line(branch,1,'#79907a55',1.4);
  [[92,84],[137,97],[175,111]].forEach(([x,y],i)=>{line([[x,y],[x+3,y-19],[x+13,y-29]],1,'#79907a55',.8);wash(x+12,y-28,5,4,'#b5bfa5',i,1)})
 }
 const potBody='M222 286C198 322 205 405 246 426Q318 461 390 424C428 400 447 330 413 286Z';
 function teapot(t){
  const tilt=smooth(.25,1.4,t)*(1-smooth(5.4,6.8,t))*.19;
  ctx.save();ctx.translate(330,335);ctx.rotate(tilt);ctx.translate(-330,-335);
  const g=ctx.createLinearGradient(220,260,415,425);g.addColorStop(0,'#f7f5e9');g.addColorStop(.55,'#dfe7d9');g.addColorStop(1,'#aec3b3');
  path('M230 288C139 213 135 342 210 368L223 349C177 326 171 266 219 309Z','#d9e3d4','#8aa18b99',1.2);
  path('M408 314Q468 315 538 266L554 282Q510 372 420 378Z',g,'#7b978488',1.2);
  path(potBody,g,'#718f7caa',1.3);
  ctx.save();ctx.clip(new Path2D(potBody));wash(401,381,70,72,'#709a7b',15,.3);wash(243,323,35,50,'#ffffff',18,.6);
  for(let i=0;i<110;i++){const x=213+hash(i)*230,y=280+hash(i+2)*165;ctx.fillStyle=`rgba(110,145,115,${hash(i+5)*.045})`;ctx.fillRect(x,y,1.5,.7)}ctx.restore();
  path('M225 285Q247 245 321 248Q389 248 411 285Q320 312 225 285Z',g,'#718f7c99',1.2);
  wash(321,248,13,8,'#adc4b0',29,1);path('M311 244Q320 234 332 244Q338 257 319 258Q306 256 311 244Z','#c8d9c5','#7d9a8488',.8);
  emblem(326,365,14);
  ctx.strokeStyle='#74917eaa';ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(546,275,10,4,.65,0,7);ctx.stroke();
  ctx.restore();
  return {x:330+216*Math.cos(tilt)+60*Math.sin(tilt),y:335+216*Math.sin(tilt)-60*Math.cos(tilt)};
 }
 function cupBack(){
  const g=ctx.createLinearGradient(650,440,985,605);g.addColorStop(0,'#a9c4b0');g.addColorStop(.4,'#dce8d6');g.addColorStop(1,'#82a58c');
  path('M648 454Q665 572 741 601Q822 630 904 599Q967 573 992 454Z',g,'#76968199',1.4);
  path('M770 605L770 615Q824 631 879 614L879 606','#b2ccb5','#7c9b8680',1);
  ctx.save();ctx.clip(new Path2D('M648 454Q665 572 741 601Q822 630 904 599Q967 573 992 454Z'));
  wash(961,551,71,70,'#729d7d',55,.27);wash(703,497,34,61,'#fff9e5',59,.45);ctx.restore();
  ctx.fillStyle='#f3f0dc';ctx.beginPath();ctx.ellipse(820,453,172,52,0,0,7);ctx.fill();
  const tea=ctx.createRadialGradient(795,440,5,820,451,173);tea.addColorStop(0,'#e6dfb9');tea.addColorStop(1,'#bac79e');
  ctx.fillStyle=tea;ctx.beginPath();ctx.ellipse(820,453,159,42,0,0,7);ctx.fill();
 }
 function sample(a,x,y){x=clamp(x,0,NX-1.01);y=clamp(y,0,NY-1.01);const ix=x|0,iy=y|0,fx=x-ix,fy=y-iy;return a[iy*NX+ix]*(1-fx)*(1-fy)+a[iy*NX+ix+1]*fx*(1-fy)+a[(iy+1)*NX+ix]*(1-fx)*fy+a[(iy+1)*NX+ix+1]*fx*fy}
 function simulate(t,dt){
  const pouring=smooth(1,1.4,t)*(1-smooth(5.3,6,t));
  // A slowly varying radial current plus vortices transports existing pigment.
  for(let y=1;y<NY-1;y++)for(let x=1;x<NX-1;x++){
   const i=y*NX+x,dx=(x-NX*.42)/NX,dy=(y-NY*.38)/NY;
   const vx=dx*43+Math.sin(y*.14+t*.9)*2.6-Math.sin(t*.6+dx*9)*dy*8;
   const vy=dy*15+Math.cos(x*.07-t*.8)*1.4+Math.sin(t+dy*7)*dx*5;
   const transported=sample(dye,x-vx*dt,y-vy*dt);
   const avg=(dye[i-1]+dye[i+1]+dye[i-NX]+dye[i+NX])*.25;
   const r=dx*dx+dy*dy;
   wet[i]=Math.min(1,wet[i]+dt*(Math.exp(-r/(.008+t*.012))*.55+pouring*Math.exp(-r/.013)*3));
   next[i]=Math.max(0,transported+(avg-transported)*Math.min(.45,dt*8)*(wet[i]+.1));
   if(pouring>.01){const source=Math.exp(-r/.002)*pouring*dt*2.8;next[i]=Math.min(1.5,next[i]+source)}
   // Capillary fronts: wet paper carries a little stain through irregular fibers.
   if(t>2)next[i]+=Math.max(0,avg-next[i])*wet[i]*dt*.9;
  }
  [dye,next]=[next,dye];
 }
 function pigment(t){
  const p=pixels.data;const dark=smooth(4.5,8.5,t);
  for(let y=0;y<NY;y++)for(let x=0;x<NX;x++){
   const i=y*NX+x,j=i*4;const d=clamp(dye[i]*1.7),n=(hash(i)-.5)*7;
   p[j]=Math.round(119-dark*81+n);p[j+1]=Math.round(147-dark*83+n);p[j+2]=Math.round(107-dark*55+n);
   p[j+3]=Math.round(clamp(d*.88)*255);
  }
  fc.putImageData(pixels,0,0);
  ctx.save();ctx.beginPath();ctx.ellipse(820,453,158,41,0,0,7);ctx.clip();ctx.imageSmoothingEnabled=true;ctx.filter='blur(1.3px)';ctx.drawImage(fluid,660,410,320,86);ctx.filter='none';
  // Translucent watercolor blooms gather at the wet edge and keep drifting.
  for(let i=0;i<15;i++){
   const age=clamp((t-1.5-i*.12)/5),a=hash(i+15)*Math.PI*2;const cx=792+Math.cos(a)*age*140,cy=447+Math.sin(a)*age*36;
   wash(cx,cy,8+age*(14+hash(i)*15),3+age*6,i%3?'#6e997c':'#9fae8b',i+300,smooth(1.5,3,t)*.19);
  }
  if(t>1.2)for(let i=0;i<4;i++){
   const age=(t-1.2-i*.4)%1.8;if(age<0)continue;ctx.strokeStyle=`rgba(248,244,217,${(1-age/1.8)*.55*(1-smooth(6,9,t))})`;ctx.lineWidth=.9;ctx.beginPath();ctx.ellipse(795,448,7+age*82,2+age*20,0,0,7);ctx.stroke();
  }
  const bloom=smooth(5.7,10.6,t);const pearl=ctx.createLinearGradient(680,410,960,485);pearl.addColorStop(0,'#f5ecd7');pearl.addColorStop(.25,'#b5d7cf');pearl.addColorStop(.5,'#ddc7dc');pearl.addColorStop(.75,'#e9e3b9');pearl.addColorStop(1,'#bad8d6');
  ctx.globalAlpha=bloom;
  const branch=[];for(let i=0;i<150;i++){const x=681+i*1.85;branch.push([x,470-Math.sin(i*.017)*30-Math.sin(i*.05)*4])}line(branch,bloom,pearl,1.8);
  [[737,450,14],[793,439,17],[855,440,12],[903,449,15]].forEach(([x,y,r],i)=>{line([[x-9,y+13],[x,y]],smooth(.15+i*.12,.5+i*.12,bloom),pearl,1);flower(x,y,r,smooth(.1+i*.14,.5+i*.14,bloom),pearl)});
  const ridge=[];for(let i=0;i<120;i++)ridge.push([698+i*2,471-Math.sin(i*.08)*3-Math.max(0,Math.sin(i*.036))*10]);line(ridge,bloom,pearl,.8);
  ctx.restore();
 }
 function spilledWash(t){
  if(t<3)return;const progress=smooth(3,10,t);
  // Tea washes flow out into a second, freely painted landscape on the paper.
  for(let i=0;i<24;i++){const a=hash(i+881)*2.1-.1,travel=progress*(45+hash(i+66)*135);const x=988+Math.cos(a)*travel,y=542+Math.sin(a)*travel*.45;
   wash(x,y,(12+progress*28)*(1-hash(i)*.35),5+progress*12,i%3?'#9eb29a':'#b4b59a',i+500,progress*.17)}
  const p=[];for(let i=0;i<150;i++)p.push([967+i*1.3,590-Math.sin(i*.026)*18-Math.sin(i*.09)*6]);ctx.save();ctx.globalAlpha=progress*.22;line(p,progress,'#79937c',1);ctx.restore();
 }
 function render(t){
  ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.globalAlpha=1;ctx.filter='none';ctx.drawImage(paper,0,0);landscape(t);
  wash(324,455,144,14,'#7a8b70',120,.18);wash(823,633,182,13,'#7a8b70',130,.16);
  spilledWash(t);const spout=teapot(t);cupBack();pigment(t);
  // A moving, wavy water column with translucent wet edges and falling droplets.
  const flow=smooth(1,1.35,t)*(1-smooth(5.4,6,t));
  if(flow>.001){ctx.save();ctx.globalAlpha=flow;const pts=[];for(let i=0;i<=70;i++){const q=i/70;pts.push([spout.x+(795-spout.x)*q+Math.sin(q*15-t*10)*1.8,spout.y+(448-spout.y)*q*q])}
   line(pts,1,'#9ba87528',10);line(pts,1,'#c8c79799',4.8);line(pts,1,'#fbf7df99',1.3);
   for(let i=0;i<7;i++){const q=(t*1.8+i*.143)%1;const x=spout.x+(795-spout.x)*q,y=spout.y+(448-spout.y)*q*q;ctx.fillStyle='#e5e2bfaa';ctx.beginPath();ctx.ellipse(x+Math.sin(t*9+i)*3,y,1.8,3.8,-.5,0,7);ctx.fill()}
   for(let i=0;i<9;i++){const q=(t*.9+i*.111)%1,a=hash(i)*6.28;ctx.fillStyle=`rgba(180,197,158,${(1-q)*.35})`;ctx.beginPath();ctx.arc(795+Math.cos(a)*q*25,448+Math.sin(a)*q*8-Math.sin(q*Math.PI)*15,1.5*(1-q),0,7);ctx.fill()}ctx.restore();
  }
  ctx.strokeStyle='#eef0dd';ctx.lineWidth=2.8;ctx.beginPath();ctx.ellipse(820,453,169,50,0,0,7);ctx.stroke();ctx.strokeStyle='#78917b88';ctx.lineWidth=.9;ctx.beginPath();ctx.ellipse(820,453,172,52,0,0,7);ctx.stroke();
  emblem(822,555,15);
  // Small irregular pale marks suggest paper catching water beneath the ink.
  ctx.save();ctx.globalAlpha=.22;ctx.strokeStyle='#5e7f68';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(124,508);ctx.bezierCurveTo(240,485,420,487,543,500);ctx.stroke();ctx.restore();
 }
 function tick(now){if(dead||!playing)return;time=Math.min((now-start)/1000,DURATION/1000);const dt=Math.min(.045,(now-last)/1000||.016);last=now;simulate(time,dt);render(time);if(time<DURATION/1000)raf=requestAnimationFrame(tick);else{playing=false;onComplete()}}
 function reset(){cancelAnimationFrame(raf);playing=false;time=0;dye.fill(0);next.fill(0);wet.fill(0);render(0)}
 function finish(){reset();for(let i=0;i<360;i++)simulate(i/30,1/30);time=DURATION/1000;render(time);onComplete()}
 function play(){if(dead)return;reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced){finish();return}reset();playing=true;start=last=performance.now();raf=requestAnimationFrame(tick)}
 function resize(){const box=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);const width=Math.max(320,Math.round(box.width*dpr));canvas.width=width;canvas.height=Math.round(width*H/W);render(time)}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);resize();
 function visibility(){if(document.hidden&&playing){cancelAnimationFrame(raf);playing=false;finish()}}
 document.addEventListener('visibilitychange',visibility);
 return {play,reset,finish,destroy(){dead=true;cancelAnimationFrame(raf);resizeObserver.disconnect();document.removeEventListener('visibilitychange',visibility)}};
}
