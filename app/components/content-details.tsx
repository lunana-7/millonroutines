import type { ReactNode } from "react";

export default function ContentDetails({title,children}:{title:string;children:ReactNode}){
 return <details className="content-details"><summary>{title}<span aria-hidden="true">＋</span></summary><div className="content-details-body">{children}</div></details>;
}
