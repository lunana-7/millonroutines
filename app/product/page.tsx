import type { Metadata } from "next";
import ProductView from "./product-view";
export const metadata: Metadata = {
 title: "차림 · Charim — The Korean Tea Ritual | Million Routines",
 description: "Explore Charim, our first Korean tea bundle: a baekja-white and celadon cup pair, minimal flower details, black nacre-printed packaging, an embroidered handkerchief and the complete design concept.",
 alternates: { canonical: "/product" },
};
export default function ProductPage(){return <ProductView/>}
