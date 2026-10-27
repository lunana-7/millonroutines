import type {Metadata} from "next";
import ArchiveView from "./archive-view";
export const metadata:Metadata={title:"Design Archive — The Making of Charim | Million Routines",description:"Explore every chapter of Charim’s design development, from its first identity and tea sets to black nacre packaging, an embroidered handkerchief and a hardcover Tea Diary.",alternates:{canonical:"/archive"}};
export default function ArchivePage(){return <ArchiveView/>}
