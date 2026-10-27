import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/site-chrome";
import { steps } from "../content/tea";
import NacrePour from "../components/nacre-pour";

export const metadata: Metadata = {
 title: "The Ritual — A Little Time for Tea | Million Routines",
 description: "Make room, warm and brew, pour with care, and stay for a cup. Explore Charim’s modern everyday tea routine inspired by Korean darye.",
 alternates: { canonical: "/ritual" },
};

export default function RitualPage(){return <>
 <a className="skip" href="#main">Skip to content</a>
 <SiteHeader ritual/>
 <main id="main" className="editorial-page">
 <section className="editorial-hero section-wrap">
  <div><a className="editorial-back" href="/">Home / The ritual</a><p className="eyebrow">THE PRACTICE · 차림</p><h1>A thoughtful pour.<br/>An unhurried pause.</h1><p className="editorial-lead">A little time for tea.<br/>A little room for yourself.</p><p>Unfold the cloth. Warm a cup. Let the day settle around a simple, thoughtful pour. Charim brings the spirit of Korean tea culture to the table you already have.</p><a className="button ink-button" href="#four-steps">Begin the four steps <span aria-hidden="true">↓</span></a><div className="editorial-facts"><span>ABOUT TEN MINUTES</span><span>FOR ONE OR TWO</span><span>YOUR EVERYDAY TEAWARE</span></div></div>
  <figure><img src="/images/korean-tea-hero-v2-1122.webp" srcSet="/images/korean-tea-hero-v2-560.webp 560w, /images/korean-tea-hero-v2-900.webp 900w, /images/korean-tea-hero-v2-1122.webp 1122w" sizes="(max-width:760px) 100vw, 48vw" width={1122} height={1402} fetchPriority="high" alt="White porcelain tea vessels and a celadon cloth arranged beside a Korean lattice window"/><figcaption>Charim bundle concept · a setting for the everyday</figcaption></figure>
 </section>
 <NacrePour/>
 <section id="four-steps" className="editorial-practice section-wrap"><div className="section-heading"><div><p className="eyebrow">FOUR SMALL GESTURES</p><h2>Let the kettle<br/>set the pace.</h2></div><p>You can begin with a cup and tea you already enjoy.<br/>The ten-minute format is a suggestion, with room to linger.</p></div><ol className="editorial-step-list">{steps.map((step,i)=><li key={step.name}><span className="editorial-step-number">0{i+1}</span><div><span lang="ko" className="editorial-step-ko">{step.ko}</span><h3>{step.name}</h3><p>{step.text}</p></div><span className="editorial-step-detail">{["A place to begin","Follow your tea’s brewing directions","For yourself, or someone beside you","Nothing more to do"][i]}</span></li>)}</ol><a className="text-link" href="/product-designs/charim-ritual-guide-v1.svg" target="_blank" rel="noopener noreferrer">Open the illustrated ritual guide ↗</a></section>
 <section className="editorial-note section-wrap"><p className="eyebrow">THE SPIRIT BEHIND THE SEQUENCE</p><h2>The care is part of the cup.</h2><p>This is our modern home adaptation, inspired by darye: the Korean etiquette of preparing and sharing tea. The four steps are an invitation to pay attention to the water, the leaves and the person at the table.</p><p>They are not a formal ceremony or a royal court ritual. There is room here for your own table, your own pace and the teaware you already use.</p><a className="text-link" href="/korean-roots">Explore its Korean roots ↗</a></section>
 <section className="editorial-companion section-wrap"><figure><img src="/images/tea-diary-open-v2-1536.webp" srcSet="/images/tea-diary-open-v2-768.webp 768w, /images/tea-diary-open-v2-1536.webp 1536w" sizes="(max-width:760px) 100vw, 50vw" width={1536} height={1024} loading="lazy" alt="The Charim Tea Diary open to a quiet writing spread"/><figcaption>Tea Diary concept · a separate companion</figcaption></figure><div><p className="eyebrow">IF YOU FEEL LIKE STAYING A LITTLE LONGER</p><h2>A cup to enjoy.<br/>A moment to keep.</h2><p>What did you notice? A scent, a conversation, the light across the table. Leave a few words in Charim — A Tea Diary, or simply enjoy your tea. Writing is optional.</p><a className="text-link" href="/product/tea-diary">Discover the Tea Diary ↗</a></div></section>
 <section className="editorial-closing section-wrap"><p className="eyebrow">MAKE A PLACE FOR THE FIRST POUR</p><h2>The objects behind the ritual.</h2><p>Meet our first tea bundle, in porcelain white and celadon.</p><a className="button ink-button" href="/product">Explore Charim <span aria-hidden="true">↗</span></a></section>
 </main><SiteFooter/>
 </>}
