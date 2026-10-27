import type { Metadata } from "next";
import ProductView from "./product-view";
export const metadata: Metadata = {
 title: "차림 · Charim — The Korean Tea Ritual | Million Routines",
 description: "Explore individual white and celadon cup designs, the Nacre Edition, a six-cup Korean tea ingredient guide, Charim’s Korean green tea direction, illustrated brewing guide, ceramic and embroidery design, nacre-print packaging, source-backed diary origins and maker research.",
 alternates: { canonical: "/product" },
};
export default function ProductPage(){return <ProductView/>}
