import type {Metadata} from "next";
import ComicView from "./comic-view";
export const metadata:Metadata={title:"One More Cup — Charim Stories | Million Routines",description:"An original six-panel Korean romance: a gift, a thoughtful pour and a reason to stay. Read One More Cup in English, with an optional Korean version, featuring the Charim collection.",alternates:{canonical:"/stories/one-more-cup"}};
export default function ComicPage(){return <ComicView/>}
