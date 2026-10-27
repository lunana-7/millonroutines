import type { Metadata } from "next";
import DiaryView from "./diary-view";
export const metadata: Metadata={title:"Charim — A Tea Diary | Million Routines",description:"Keep a little of each cup. An A6 black cloth hardcover with a nacre-printed flower, personal stationery details an illustrated tea atlas, preparation drawings and 30 undated entries, inspired by Korean tea writings. Available separately or with Charim when launched.",alternates:{canonical:"/product/tea-diary"}};
export default function TeaDiaryPage(){return <DiaryView/>}
