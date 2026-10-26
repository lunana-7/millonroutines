import type { Metadata } from "next";
import ProductView from "./product-view";
export const metadata: Metadata = {
 title: "찻자리 — The Korean Tea Ritual | Million Routines",
 description: "Explore our first Korean tea bundle: a baekja-white and celadon cup pair, minimal flower details, mother-of-pearl-inspired packaging and the complete design concept.",
 alternates: { canonical: "/product" },
};
export default function ProductPage(){return <ProductView/>}
