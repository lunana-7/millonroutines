export type CupColor="white"|"celadon";
export type CupFinish="original"|"nacre";
export const cupColors={white:{name:"White cup",ko:"백자빛",description:"A soft white surface. A rounded form, framed by a small foot."},celadon:{name:"Celadon cup",ko:"청자빛",description:"A pale celadon surface. The same gentle curve, with a little more color."}};
export const cupFinishes={original:{name:"Original Edition",description:"The black flower mark, with a fine pearl-like line at the foot."},nacre:{name:"Nacre Edition",description:"A pearl-like flower mark and a fine exterior accent, catching a little celadon, silver and pink."}};
export function cupImage(color:CupColor,finish:CupFinish,width=1254){return `/images/cup-${color}-${finish}-v1-${width}.webp`}
export function cupImageAlt(color:CupColor,finish:CupFinish){return `Individual ${color==="white"?"soft white":"pale celadon"} Charim tea cup concept, rounded and handleless, with ${finish==="nacre"?"a mother-of-pearl-inspired flower logo":"a black flower logo"} low on the exterior and a fine pearl-like line above the foot`}
