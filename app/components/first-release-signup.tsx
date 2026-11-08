"use client";
import { useEffect, useId, useRef, useState } from "react";

export default function FirstReleaseSignup(){
 const [open,setOpen]=useState(false),[status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle"),[message,setMessage]=useState("");
 const dialog=useRef<HTMLDialogElement>(null),emailInput=useRef<HTMLInputElement>(null),id=useId();
 useEffect(()=>{if(open){if(!dialog.current?.open)dialog.current?.showModal();emailInput.current?.focus();}else dialog.current?.close();},[open]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(status==="sending")return;
  const form=new FormData(event.currentTarget);setStatus("sending");setMessage("");
  try{
   const response=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:form.get("email"),preference:"korean-tea",website:form.get("website"),consent:form.get("consent")==="on"})});
   const result=await response.json().catch(()=>({})) as {error?:string};
   if(!response.ok)throw new Error(result.error||"We couldn’t save your email. Please try again.");
   setStatus("success");
  }catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"We couldn’t save your email. Please try again.");}
 }
 return <>
  <button type="button" className="button ink-button first-release-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}>Join the first release <span aria-hidden="true">↗</span></button>
  <dialog ref={dialog} className="first-release-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onCancel={()=>setOpen(false)} onClose={()=>setOpen(false)} onClick={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
   <button type="button" className="first-release-close" aria-label="Close email signup" onClick={()=>setOpen(false)}>×</button>
   <p className="eyebrow">MILLION ROUTINES · 차림</p><h2 id={`${id}-title`}>{status==="success"?"You’re on the list.":"Your first pour starts here."}</h2>
   <p id={`${id}-description`}>{status==="success"?"We’ve saved your email for Charim development and first-release updates.":"Leave your email for collection updates and first access when the release is ready."}</p>
   {status==="success"?<div className="first-release-success" role="status"><p>A place at the tea table.</p><button type="button" className="button ink-button" onClick={()=>setOpen(false)}>Done <span aria-hidden="true">✓</span></button></div>:<form onSubmit={submit}>
    <label htmlFor={`${id}-email`}>Your email address</label><input ref={emailInput} id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required/>
    <div className="honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this empty</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="first-release-consent"><input name="consent" type="checkbox" required/><span>I’d like email updates from Million Routines about the Charim collection and its launch.</span></label>
    <button type="submit" className="button ink-button" disabled={status==="sending"}>{status==="sending"?"Saving your place…":"Keep me in the loop"}<span aria-hidden="true">↗</span></button>
    {status==="error"&&<p className="first-release-error" role="alert">{message}</p>}
    <details className="first-release-privacy"><summary>How we use your email</summary><p>We store your email and consent for product and launch updates. We don’t sell your information. You can withdraw consent by replying to a future update.</p></details>
   </form>}
  </dialog>
 </>;
}
