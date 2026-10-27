export interface WatercolorPainting {
 play():void;
 reset():void;
 finish():void;
 destroy():void;
}
export function createWatercolorScene(canvas:HTMLCanvasElement,onComplete?:()=>void):WatercolorPainting;
