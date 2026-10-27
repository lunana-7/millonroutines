import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/site-chrome";
import HistoricalRecords, {RecordImage} from "./historical-records";
import {MakingTheLeaves,PreparingTheCup,TeaAndWriting,RitualSourceNotes} from "./history-sections";
import TeaInPractice from "./tea-in-practice";
import { steps } from "../content/tea";

export const metadata: Metadata = {
 title: "The Ritual — Korean Tea, Historical Records & Everyday Practice | Million Routines",
 description: "Explore authentic images of Dasinjeon and Dongdasong, Korean tea-making traditions, tea poems and fellowship records, alongside Charim’s contemporary four-step home ritual.",
 alternates: { canonical: "/ritual" },
};

export default function RitualPage(){return <>
 <a className="skip" href="#main">Skip to content</a>
 <SiteHeader ritual/>
 <main id="main" className="editorial-page">
 <section className="editorial-hero section-wrap">
  <div><a className="editorial-back" href="/">Home / The ritual</a><p className="eyebrow">THE PRACTICE · 차림</p><h1>A living practice.<br/>A written history.</h1><p className="editorial-lead">The leaves, the water,<br/>and the words left behind.</p><p>See tea in real hands, follow dated archive records, and explore the manuscripts and methods behind Korean tea life. Then make a little room for your own cup.</p><a className="button ink-button" href="#historical-records">Explore the historical records <span aria-hidden="true">↓</span></a><div className="editorial-facts"><span>HISTORICAL DOCUMENTS</span><span>TEA MAKING</span><span>A MODERN HOME RITUAL</span></div></div>
  <figure className="ritual-hero-document"><RecordImage id="dasinjeon-pages" alt="Actual photographed pages of the historical tea text Dasinjeon, from the Academy of Korean Studies"/><figcaption>다신전 · Dasinjeon / historical text, fair copy prepared in 1830.<br/>[다신전] 한국민족문화대백과사전 · © Academy of Korean Studies · KOGL Type 1. Date of photographed copy unspecified.</figcaption></figure>
 </section>
 <nav className="ritual-page-nav section-wrap" aria-label="Explore the tea ritual"><a href="#tea-in-practice">Tea in real life</a><a href="#historical-records">Historical documents</a><a href="#making-the-leaves">Making the leaves</a><a href="#preparing-the-cup">Preparing a cup</a><a href="#tea-and-writing">Tea & writing</a><a href="#four-steps">Our everyday ritual</a><a href="#source-notes">Sources & credits</a></nav>
 <TeaInPractice/><HistoricalRecords/><MakingTheLeaves/><PreparingTheCup/><TeaAndWriting/>
 <section id="four-steps" className="editorial-practice section-wrap"><div className="section-heading"><div><p className="eyebrow">OUR MODERN ADAPTATION · FOUR SMALL GESTURES</p><h2>Let the kettle<br/>set the pace.</h2></div><p>You can begin with a cup and tea you already enjoy.<br/>The ten-minute format is a suggestion, with room to linger.</p></div><ol className="editorial-step-list">{steps.map((step,i)=><li key={step.name}><span className="editorial-step-number">0{i+1}</span><div><span lang="ko" className="editorial-step-ko">{step.ko}</span><h3>{step.name}</h3><p>{step.text}</p></div><span className="editorial-step-detail">{["A place to begin","Follow your tea’s brewing directions","For yourself, or someone beside you","Nothing more to do"][i]}</span></li>)}</ol><a className="text-link" href="/product-designs/charim-ritual-guide-v1.svg" target="_blank" rel="noopener noreferrer">Open the illustrated ritual guide ↗</a></section>
 <section className="editorial-note section-wrap"><p className="eyebrow">THE SPIRIT BEHIND THE SEQUENCE</p><h2>The care is part of the cup.</h2><p>This is our modern home adaptation, inspired by darye: the Korean etiquette of preparing and sharing tea. The four steps are an invitation to pay attention to the water, the leaves and the person at the table.</p><p>They are not a formal ceremony or a royal court ritual. There is room here for your own table, your own pace and the teaware you already use.</p><a className="text-link" href="/korean-roots">Explore its Korean roots ↗</a></section>
 <section className="editorial-companion section-wrap"><figure><img src="/images/tea-diary-open-v2-1536.webp" srcSet="/images/tea-diary-open-v2-768.webp 768w, /images/tea-diary-open-v2-1536.webp 1536w" sizes="(max-width:760px) 100vw, 50vw" width={1536} height={1024} loading="lazy" alt="The Charim Tea Diary open to a quiet writing spread"/><figcaption>Tea Diary concept · a separate companion</figcaption></figure><div><p className="eyebrow">IF YOU FEEL LIKE STAYING A LITTLE LONGER</p><h2>A cup to enjoy.<br/>A moment to keep.</h2><p>What did you notice? A scent, a conversation, the light across the table. Leave a few words in Charim — A Tea Diary, or simply enjoy your tea. Writing is optional.</p><a className="text-link" href="/product/tea-diary">Discover the Tea Diary ↗</a></div></section>
 <RitualSourceNotes/>
 <section className="editorial-closing section-wrap"><p className="eyebrow">MAKE A PLACE FOR THE FIRST POUR</p><h2>The objects behind the ritual.</h2><p>Meet our first tea bundle, in porcelain white and celadon.</p><a className="button ink-button" href="/product">Explore Charim <span aria-hidden="true">↗</span></a></section>
 </main><SiteFooter/>
 </>}
