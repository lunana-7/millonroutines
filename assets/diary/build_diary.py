from pathlib import Path
import json, math, base64
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/Charim-A-Tea-Diary-96-pages.pdf'
F=Path('/Users/minkim/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name,file in [('Body','NotoSans-Regular.ttf'),('Title','NotoSerif-Regular.ttf')]:pdfmetrics.registerFont(TTFont(name,str(F/file)))
pdfmetrics.registerFont(TTFont('Korean','/System/Library/Fonts/Supplemental/AppleMyungjo.ttf'))
W,H=105/25.4*72,148/25.4*72
INK='#252e2a';MUTED='#68766d';LINE='#cbd5cb';GREEN='#6c8b7b';PAPER='#faf9f4';M=29
c=canvas.Canvas(str(OUT),pagesize=(W,H));c.setTitle('Charim - A Tea Diary | 96-page illustrated interior design');c.setAuthor('millionroutines');page=0;ledger=[]
def text(x,y,t,font='Body',size=8.5,color=INK):
 c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,y,t)
def paragraph(t,y,font='Body',size=8.5,leading=14,width=W-2*M):
 for line in simpleSplit(t,font,size,width):text(M,y,line,font,size);y-=leading
 return y

def begin(title=None,tag='CHARIM / A TEA DIARY'):
 global page
 page+=1;c.setFillColor(HexColor(PAPER));c.rect(0,0,W,H,fill=1,stroke=0)
 text(M,H-26,tag,size=5.3,color=GREEN)
 if title:text(M,H-65,title,'Title',19)
 text(M,16,'millionroutines',size=5.5,color=MUTED);text(W-M-12,16,f'{page:02}',size=5.5,color=MUTED)
 c.setStrokeColor(HexColor(LINE));c.setLineWidth(.35)
 c.line(M,H-35,W-M,H-35)
 c.line(M,28,W-M,28)
 ledger.append({'page':page,'title':title or tag})
def end():c.showPage()
def line(y):c.setStrokeColor(HexColor(LINE));c.setLineWidth(.35);c.line(M,y,W-M,y)
def lines(y,n=2,gap=18):
 for i in range(n):line(y-i*gap)
def section(label,prompt,y,n=1):
 text(M,y,label,size=6.7,color=GREEN)
 yy=y-13
 for ln in prompt.split('\n'):text(M,yy,ln,size=6.2,color=MUTED);yy-=10
 lines(yy-6,n)
# Seven preliminary pages; entry one begins on left-hand (even) page 8.
begin();text(M,H-92,'차림','Korean',27);text(M,H-121,'CHARIM',size=8,color=GREEN);text(M,H-179,'A Tea Diary','Title',24);text(M,H-216,'Keep a little of each cup.','Title',11);text(M,86,'Thirty undated entries.',size=8);text(M,68,'No fixed schedule.',size=8);end()
begin('A cup is finished.');y=H-89;text(M,y,'Something remains.','Title',15);y-=38
y=paragraph('Jeong Yak-yong wrote about the spring, stone hearth and landscape around Dasan Chodang. His tea life found a place in writing.',y);y-=14
y=paragraph('The 1818 Dasin-gye provisions connected tea with letters in verse. Tea could travel with words, carrying a relationship beyond a shared place.',y);y-=22
for t in ['A fragrance you recognize.','A view from the window.','Someone who comes to mind.','','You do not need to write a poem.','A few words can hold a moment.']:text(M,y,t,'Title',9);y-=16
text(M,42,'Historical source notes on page 94.',size=6,color=MUTED);end()
notes=[('Tea and place','Daam Sicheop / Dasan Chodang','The National Institute of Korean History discusses Jeong Yak-yong’s tea poetry and the landscape around Dasan Chodang.','This diary leaves room for the place, sounds and people around a cup. That is a contemporary design connection.','National Institute of Korean History'),('Tea and the senses','Dasinjeon','Dasinjeon separately addresses fragrance, color and taste. Choui Uisun transcribed this tea text from an earlier Chinese source.','Those subjects inspire the observation prompts. Using them with barley, fruit or ginger drinks is Charim’s modern extension.','Encyclopedia of Korean Culture'),('Tea and relationships','Dasin-gye / 1818','The Dasin-gye provisions describe sending tea with verse letters. The National Folk Museum documents surviving copies of the provisions.','This connection inspired space for remembering people and two message leaves to share with a future cup.','NIKH / National Folk Museum of Korea')]
for title,sub,body,connection,source in notes:
 begin(title);text(M,H-93,sub,'Title',10,color=GREEN);y=paragraph(body,H-133);y-=30;y=paragraph(connection,y);text(M,65,'HISTORICAL MATERIAL / MODERN INTERPRETATION',size=5.6,color=GREEN);paragraph(source,48,size=6,leading=10);end()
begin('About this diary');y=paragraph('A contemporary diary inspired by Korean tea poems, correspondence and tea literature.',H-107,size=9,leading=16);y-=24;y=paragraph('Its prompts, layout and thirty-entry format are new designs. This is not a reproduction of a historical diary.',y);y-=24;y=paragraph('The historical notes use institutional descriptions and excerpts, rather than a complete comparison of original manuscripts.',y);y-=24;paragraph('The sequence is optional. There is no streak, deadline or requirement to finish in a month.',y);end()
begin('Before you begin');text(M,H-103,'This diary belongs to',size=8);line(H-129);y=H-165
for t in ['Find a moment that suits you.','Prepare a tea you want to drink.','','While it steeps or cools, look around.','After a sip, write something you noticed.','','A word is enough.','A drawing is welcome.','Blank spaces are welcome, too.','','Return whenever you have another cup','you would like to remember.']:text(M,y,t,size=8);y-=16
end()
# Original vector illustrations: porcelain, botanical sprigs and nacre flowers.
def leaf(x,y,angle=0,col=GREEN):
 c.saveState();c.translate(x,y);c.rotate(angle);c.setFillColor(HexColor(col));c.setStrokeColor(HexColor(PAPER));c.setLineWidth(.6)
 p=c.beginPath();p.moveTo(0,0);p.curveTo(-19,12,-15,41,0,52);p.curveTo(15,35,18,13,0,0);c.drawPath(p,fill=1,stroke=0);c.line(0,3,0,46);c.restoreState()
def cup(x,y,tone='#b8b985'):
 c.saveState();c.translate(x,y);c.setLineWidth(.8);c.setStrokeColor(HexColor('#7c998c'))
 c.setFillColor(HexColor('#dfe9df'));p=c.beginPath();p.moveTo(-45,9);p.curveTo(-42,-41,42,-41,45,9);p.close();c.drawPath(p,fill=1,stroke=1)
 c.setFillColor(HexColor('#f8f5ea'));c.ellipse(-45,-1,45,20,fill=1,stroke=1)
 c.setFillColor(HexColor(tone));c.ellipse(-37,2,37,16,fill=1,stroke=0)
 c.setStrokeColor(HexColor('#7c998c'));c.line(-14,-30,14,-30);c.line(-12,-33,12,-33)
 c.setStrokeColor(HexColor('#a9b8ae'));c.bezier(-8,27,-21,40,1,47,-5,62);c.bezier(10,27,-3,42,20,48,13,64)
 c.restoreState()
def flower(x,y,size=1):
 c.saveState();c.translate(x,y);c.scale(size,size);c.setLineWidth(.65)
 for a,col in zip(range(0,360,72),['#adc9bb','#c6bdd0','#d7d1b1','#b5d3cb','#ccc2ce']):
  c.saveState();c.rotate(a);c.setFillColor(HexColor(col));c.ellipse(-5,0,5,14,fill=1,stroke=0);c.restoreState()
 c.setFillColor(HexColor(INK));c.circle(0,0,1.5,fill=1,stroke=0);c.restoreState()
def botanical(kind,x,y):
 c.saveState();c.translate(x,y)
 if kind in ['green','amber']:
  col=GREEN if kind=='green' else '#886953';c.setStrokeColor(HexColor(col));c.setLineWidth(1);c.bezier(0,0,10,24,-5,50,8,88)
  for xx,yy,aa in [(3,15,-57),(4,37,49),(5,58,-42)]:leaf(xx,yy,aa,col)
 elif kind=='barley':
  c.setStrokeColor(HexColor('#9f845b'));c.setFillColor(HexColor('#bca478'));c.setLineWidth(.7);c.line(0,0,3,85)
  for i in range(6):
   yy=25+i*9;c.ellipse(-10,yy,0,yy+14,fill=1,stroke=0);c.ellipse(3,yy+4,13,yy+18,fill=1,stroke=0);c.line(-5,yy+10,-17,yy+38);c.line(8,yy+14,21,yy+41)
 else:
  c.setFillColor(HexColor('#d4b660'));c.setStrokeColor(HexColor('#ab985d'));c.circle(0,29,29,fill=1,stroke=1)
  c.setFillColor(HexColor('#f3e5ab'));c.circle(24,10,23,fill=1,stroke=1)
  for a in range(0,360,45):
   c.line(24,10,24+20*math.cos(math.radians(a)),10+20*math.sin(math.radians(a)))
  leaf(-3,58,55)
 c.restoreState()
def illustration(kind,tone):
 c.setFillColor(HexColor('#eef0e6'));c.circle(W*.5,H-164,69,fill=1,stroke=0)
 botanical(kind,W*.5+42,H-193);cup(W*.5-25,H-184,tone);flower(W-M-17,H-83,1.1)
def block(label,body,y):
 text(M,y,label,size=6.4,color=GREEN)
 return paragraph(body,y-17,size=8,leading=13)-22
begin('An illustrated tea atlas','THE ILLUSTRATED EDITION / 차의 작은 도감')
illustration('green','#b7bc86')
paragraph('Leaves, grains, fruit. A small collection of Korean cups to get to know - and room to discover your own.',H-272,'Title',12,19)
text(M,55,'Four tea portraits / Illustrated preparation / Your own notes',size=6.3,color=GREEN);end()
begin('Find your next cup','THE ATLAS / 차를 알아가는 시간')
y=H-106
for n,title,sub in [('01','Nokcha','Green leaf tea / grassy, fresh'),('02','Balhyocha','Oxidized leaf tea / rounded, amber'),('03','Boricha','Roasted barley infusion / toasty'),('04','Yujacha','Citron preserve drink / fragrant, tangy')]:
 text(M,y,n,size=7,color=GREEN);text(M+30,y,title,'Title',14);text(M+30,y-21,sub,size=7);line(y-36);y-=65
paragraph('This is a tasting companion, not a list of teas supplied in the Charim set. Flavor words are invitations to notice, not fixed tasting guarantees.',68,size=6.7,leading=10);end()
teas=[
 ('green','Nokcha','녹차','#b7bc86','Green tea leaves','Korean green tea is a leaf tea. Heat treatment limits oxidation; the finished taste varies with the grower, harvest and processing.','Fresh grass, tender greens, a gentle nutty note. What does your own cup suggest?','Start with the producer\'s directions. Green tea can respond well to cooler water and shorter infusions.','One published sensory study compared about 3 minutes at 60 C with 1 minute at 80 C. These are study conditions, not a rule for every tea.','Ewha Womans University / Lee et al., 2008','https://pure.ewha.ac.kr/en/publications/development-of-sample-preparation-presentation-procedure-and-sens/'),
 ('amber','Balhyocha','발효차','#b58a51','Oxidized leaf tea','Korean makers also produce oxidized teas alongside green tea. Balhyocha is a broad trade term: processing and oxidation can differ by maker.','Dried fruit, wood, honey-like aroma. These are possible tasting words, not ingredients.','Read the label for the specific tea. Measure the leaves and water, steep for the maker\'s time, then strain into a cup.','Do not assume one temperature suits every balhyocha. Record the exact product and method so you can repeat a cup you enjoy.','Digital Hadong Culture Encyclopedia / Goryeo Dawon','https://hadong.grandculture.net/hadong/toc/GC03400755'),
 ('barley','Boricha','보리차','#b89a65','Roasted barley infusion','A grain infusion made with roasted barley. It belongs to a different ingredient family from Camellia sinensis leaf tea.','Toasted grain, warm bread, a gentle roasted finish. Notice how warm and cooled cups differ.','For roasted loose barley, simmer in water following the product instructions, then strain. A packaged tea bag may instead call for steeping.','Use the package\'s grain-to-water ratio and timing. The Korean Traditional Knowledge Portal records a roasted-barley drink prepared by boiling.','Korean Traditional Knowledge Portal / Rural Development Administration','https://koreantk.com/ktkp2014/food/food-view.view?foodCd=TF10003220'),
 ('yuja','Yujacha','유자차','#d4b660','Citron preserve drink','A fragrant drink prepared by mixing yuja preserve with water. This is a fruit-based cup rather than a steeped leaf tea.','Citrus peel, bright acidity, sweetness. How does the balance change with a little more water?','Spoon prepared yuja-cheong into a cup and stir in hot water. Adjust to the preserve\'s instructions and your taste. Let it cool comfortably before sipping.','Maangchi\'s preparation uses sliced yuja and sugar, served with hot water. Keep the peel and pulp if you enjoy their texture.','Maangchi / Yujacha recipe','https://www.maangchi.com/recipe/yujacha')]
for kind,name,ko,tone,family,desc,tasting,method,note,source,url in teas:
 begin(name,'TEA PORTRAIT / '+family.upper());text(M,H-92,ko,'Korean',16,color=GREEN);illustration(kind,tone)
 y=block('WHAT IT IS',desc,H-262);y=block('WORDS TO TRY',tasting,y);end()
 begin('Prepare & notice','THE ATLAS / '+name.upper());cup(W/2,H-131,tone)
 y=block('01 / PREPARE',method,H-202);y=block('02 / NOTICE',note,y)
 text(M,66,'SOURCE / READ MORE',size=5.8,color=GREEN);paragraph(source,52,size=6,leading=9);c.linkURL(url,(M,35,W-M,70),relative=0,thickness=0);end()
steps=[('Choose & measure','차를 고르고','Choose your tea. Follow its label for the leaf or ingredient amount and the water volume. Write down both, so the next cup can begin here.','green'),('Water & time','천천히 우리고','For leaf tea, use the water temperature and time recommended by its maker. For grain or fruit drinks, use the method on the ingredient pages.','amber'),('Pour & pause','향을 만나고','Strain leaf tea into a cup. Notice its color and fragrance. Allow hot tea to cool until it is comfortable to sip.','barley'),('Sip & remember','한 모금을 기록해요','Take a small sip. Notice the first flavor and what remains. A few words or a sketch are enough; adjust only one thing for the next cup.','yuja')]
for i,(title,ko,body,kind) in enumerate(steps):
 begin(title,f'AN EVERYDAY SEQUENCE / 0{i+1}');text(M,H-94,ko,'Korean',14,color=GREEN)
 if i==0:botanical('green',W/2,H-215)
 elif i==1:
  cup(W/2,H-165);c.setStrokeColor(HexColor('#8da99d'));c.setLineWidth(2);c.bezier(W/2+65,H-100,W/2+10,H-110,W/2+23,H-133,W/2,H-151)
 elif i==2:cup(W/2,H-165,'#b7bc86');flower(W/2+55,H-180,1.6)
 else:
  c.setFillColor(HexColor('#e2eade'));c.rect(W/2-42,H-214,84,72,fill=1,stroke=0)
  for yy in range(4):c.setStrokeColor(HexColor('#9db3a6'));c.line(W/2-30,H-159-yy*12,W/2+28,H-159-yy*12)
  c.setLineWidth(3);c.line(W/2+34,H-160,W/2+5,H-201);flower(W/2-45,H-145,1)
 paragraph(body,H-269,'Title',11,18);text(M,54,'A modern everyday sequence, not a formal ceremonial protocol.',size=6,color=MUTED);end()
begin('A vocabulary of a cup','THE SENSES / 감각의 기록');y=H-115
for label,body in [('FRAGRANCE','Fresh grass / toasted grain / citrus peel / floral / woody'),('COLOR','Pale jade / straw / gold / amber / a color of your own'),('TASTE & TEXTURE','Sweet / tart / bitter / savory / rounded / drying')]:y=block(label,body,y)
paragraph('These are prompts rather than an answer key. Different teas, water and brewing methods can give different impressions.',95,size=7,leading=12);end()
begin('The colors I remember','YOUR OWN PALETTE / 나의 차색')
for i,tone in enumerate(['#cad3ac','#d8cd96','#bc9868','#b07c4c']):
 c.setFillColor(HexColor(tone));c.circle(M+20+i*61,H-128,16,fill=1,stroke=0)
paragraph('Sketch a cup. Name its color. Add the tea and preparation underneath. Your palette does not have to match the one above.',H-190,'Title',10,17)
lines(103,3,20);end()

for entry in range(1,31):
 begin('The Cup',f'ENTRY {entry:02} / THE CUP')
 c.saveState();c.translate(W-75,H-77);c.scale(.25,.25);cup(0,0);c.restoreState()
 for i,label in enumerate(['Date','Time','Tea / ingredients','Where it came from','How I prepared it']):
  y=H-100-i*20;text(M,y,label,size=6.7,color=MUTED);c.line(M+88,y-2,W-M,y-2)
 section('FRAGRANCE','What did I notice before the first sip?',H-215)
 section('COLOR','A word, a sketch or a small description.',H-263)
 section('TASTE','What came first? What lingered?',H-311)
 section('NEXT TIME','Something I would keep or change.',H-359)
 end()
 begin('The Moment',f'ENTRY {entry:02} / THE MOMENT')
 section('WHERE AM I?','',H-105,2)
 section('WHAT CAN I SEE OR HEAR?','',H-165,2)
 section('WHO AM I WITH?','Or who comes to mind?',H-225,2)
 section('SOMETHING I WANT TO KEEP','From today.',H-294,2)
 section('GIVE THIS CUP A TITLE','',H-366,1)
 end()
 if entry%10==0:
  begin('Looking back',f'AFTER ENTRY {entry:02} / LOOKING BACK')
  for y,p in [(H-112,'Which cup would I like to make again?'),(H-200,'What flavors have I enjoyed most?'),(H-288,'When does tea fit most comfortably into my day?')]:
   yy=paragraph(p,y,'Title',9,14);lines(yy-12,3,19)
  end()
  begin('A little more room',f'AFTER ENTRY {entry:02} / LOOKING BACK')
  yy=paragraph('Has a particular place become my tea place?',H-112,'Title',9,14);lines(yy-15,4,19)
  yy=paragraph('Someone I would like to share the next cup with:',H-261,'Title',9,14);lines(yy-15,4,19);end()
for n in [1,2]:
 begin(None,f'MESSAGE {n:02} / A CUP I WOULD SHARE WITH YOU');y=H-75;text(M,y,'A cup I would','Title',18);text(M,y-25,'share with you.','Title',18)
 for y,label in [(H-151,'To'),(H-185,'Today I drank'),(H-219,'It made me think of')]:text(M,y,label,size=7.2,color=GREEN);line(y-17)
 text(M,H-269,'If we had a cup together,','Title',9);text(M,H-285,'I would tell you:','Title',9);lines(H-309,2,20)
 text(M,H-365,'From',size=7.2,color=GREEN);c.line(M+28,H-367,W-M,H-367);text(M,H-390,'Date',size=7.2,color=GREEN);c.line(M+28,H-392,W-M,H-392);end()
 begin(None,'MESSAGE LEAF / REVERSE');text(M,H-65,'A little more to say.','Title',15);lines(H-112,12,21);end()
begin('Sources & credits');y=H-98
sources=[('National Institute of Korean History','Tea poetry, place and the 1818 Dasin-gye provisions.','https://contents.history.go.kr/mobile/km/view.do?levelId=km_010_0070_0040_0010'),('Encyclopedia of Korean Culture','Dasinjeon: fragrance, color, taste and tea practice.','https://encykorea.aks.ac.kr/Article/E0013480'),('National Folk Museum of Korea','Dasin-gye exhibition and surviving copies.','https://www.nfm.go.kr/user/museumbbs/home/3/1274/selectMuseumBbsView.do?museumBbsIdx=10571&page=1&row=12')]
for name,desc,url in sources:
 text(M,y,name,'Title',8.3);y-=17;y=paragraph(desc,y,size=7.4,leading=12);text(M,y-3,'Open institutional source',size=6.7,color=GREEN);c.linkURL(url,(M,y-6,W-M,y+7),relative=0,thickness=0);y-=40
paragraph('Illustrated tea sources appear with their portraits on pages 11-17. Original vector artwork by millionroutines. A6, 96 pages, 30 undated entries. Sewn binding, paper stock and perforated message leaves are proposed production features, not verified by this PDF.',y,size=7,leading=12);end()
begin('The next cup.');y=paragraph('Return whenever there is another moment you would like to keep.',H-110,'Title',12,20);lines(y-35,9,21);end()
begin(None,'A LITTLE OPEN SPACE');end()
c.save();reader=PdfReader(str(OUT));assert len(reader.pages)==96,len(reader.pages)
(ROOT/'assets/diary-v3/page-map.json').write_text(json.dumps(ledger,indent=2));(ROOT/'public/diary/Charim-A-Tea-Diary.pdf').write_bytes(OUT.read_bytes());print(f'{len(reader.pages)} pages / {W:.2f} x {H:.2f} pt / {OUT}')
