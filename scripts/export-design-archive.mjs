import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.ARCHIVE_SHARP_PATH||'sharp');
const entries=[];
const groups={packaging:['Packaging','01 · Early tea ritual'], 'korean-tea':['Illustration','02 · Korean tea world'], 'brand-v2':['Identity','03 · Flower, white & celadon'], product:['Packaging','04 · The cup pair'], charim:['Packaging','05 · Named Charim'], diary:['Tea Diary','06 · The first tea diary'], 'collection-v3':['Latest direction','08 · Black, nacre & embroidery']};
const titles={'diary-hardcover-v2':'Tea Diary · black hardcover v2','diary-open-v2':'Tea Diary · hardcover interior v2','black-nacre-packaging-v3':'Black box & nacre tea pouch v3','black-bundle-v3':'Complete black bundle v3','embroidered-cloth-v1':'Flower embroidery · handkerchief v1','tea-story-master-v3':'Modern hanbok illustration v3','tea-story-master-v2':'Celadon tea illustration v2','story-master':'Original plum tea illustration v1','tea-hero-master-v2':'White & celadon tea setting v2','hero-master':'Original plum tea setting v1','flower-logo-v2':'Minimal flower logo v2','flower-logo-pearl-v2':'Flower · pearl-on-black study','packaging-concept-v2':'Black, white & celadon packaging v2','cover-mockup-v1':'Tea Diary · celadon cover v1','open-mockup-v1':'Tea Diary · first interior mockup','exterior-concept-v1':'First gift box · plum & ivory','interior-contents-concept-v1':'First complete bundle · plum & ivory','million-routines-original':'Original botanical logo'};
for(const [folder,[category,stage]] of Object.entries(groups)){
 const dir=`assets/${folder}`;
 for(const file of (await fs.readdir(dir)).sort()){
  if(!/\.(png|svg)$/i.test(file))continue;
  if(file.endsWith('.png')&&(await fs.readdir(dir)).includes(file.replace('.png','.svg')))continue;
  const stem=path.parse(file).name,source=`${dir}/${file}`;
  const outdir=`public/archive/${folder}`;await fs.mkdir(outdir,{recursive:true});
  let src;
  if(file.endsWith('.svg')){await fs.copyFile(source,`${outdir}/${file}`);src=`/archive/${folder}/${file}`;}
  else{await sharp(source).resize({width:1122,withoutEnlargement:true}).webp({quality:87,effort:6}).toFile(`${outdir}/${stem}.webp`);src=`/archive/${folder}/${stem}.webp`;}
  entries.push({id:`${folder}-${stem}`,title:titles[stem]||stem.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),category:folder==='collection-v3'?(stem.includes('diary')?'Tea Diary':'Packaging'):stem.includes('story')||stem.includes('hero')?'Illustration':category,stage:stem==='tea-story-master-v3'?'07 · Modern hanbok & ink':stage,src,dark:/white-v2|pearl-v2/.test(stem),current:folder==='collection-v3',note:folder==='packaging'?'Early concept. Includes the former product name and earlier palette.':folder==='collection-v3'?'Current concept direction. Final materials and specifications are in development.':'Earlier design study, preserved as part of the collection’s development.'});
 }
}
entries.push({id:'original-logo',title:'Original botanical logo',category:'Identity',stage:'00 · The beginning',src:'/brand/million-routines-original.png',dark:false,current:false,note:'The original supplied leaf-and-bowl identity, before the minimal flower.'});
for(const [key,title]of [['morning','Morning routine'],['evening','Evening routine'],['connection','Connection routine']])for(const [suffix,name]of [['-hd-1086','concept'],['-story-hd-1672','story']])entries.push({id:`${key}-${name}`,title:`${title} · ${name}`,category:'Illustration',stage:'00 · The beginning',src:`/images/${key}${suffix}.webp`,dark:false,current:false,note:'An early multi-routine direction, before the focus on one Korean tea bundle.'});
for(const [src,title,category]of [['/brand/flower-logo-nacre-v3.svg','Flower · nacre print artwork v3','Identity'],['/product-designs/charim-tea-label-front-v3.svg','Black tea label · print artwork v3','Packaging'],['/diary/cover-front-v2.svg','Tea Diary · hardcover front artwork v2','Tea Diary']])entries.push({id:title,title,category,stage:'08 · Black, nacre & embroidery',src,dark:src.includes('flower-logo'),current:true,note:'Current flat artwork. Printed nacre appearance is a proposed effect, not real shell inlay.'});
entries.sort((a,b)=>b.stage.localeCompare(a.stage)||a.title.localeCompare(b.title));
await fs.writeFile('app/archive/designs.json',JSON.stringify(entries,null,2)+'\n');
console.log(`Exported ${entries.length} visual studies.`);
