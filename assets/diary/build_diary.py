from pathlib import Path
import json, math, base64
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/Charim-A-Tea-Diary-80-pages.pdf'
F=Path('/Users/minkim/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name,file in [('Body','NotoSans-Regular.ttf'),('Title','NotoSerif-Regular.ttf')]:pdfmetrics.registerFont(TTFont(name,str(F/file)))
pdfmetrics.registerFont(TTFont('Korean','/System/Library/Fonts/Supplemental/AppleMyungjo.ttf'))
W,H=105/25.4*72,148/25.4*72
INK='#252e2a';MUTED='#68766d';LINE='#cbd5cb';GREEN='#6c8b7b';PAPER='#faf9f4';M=29
c=canvas.Canvas(str(OUT),pagesize=(W,H));c.setTitle('Charim - A Tea Diary | 80-page interior design');c.setAuthor('millionroutines');page=0;ledger=[]
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
text(M,42,'Historical source notes on page 78.',size=6,color=MUTED);end()
notes=[('Tea and place','Daam Sicheop / Dasan Chodang','The National Institute of Korean History discusses Jeong Yak-yong’s tea poetry and the landscape around Dasan Chodang.','This diary leaves room for the place, sounds and people around a cup. That is a contemporary design connection.','National Institute of Korean History'),('Tea and the senses','Dasinjeon','Dasinjeon separately addresses fragrance, color and taste. Choui Uisun transcribed this tea text from an earlier Chinese source.','Those subjects inspire the observation prompts. Using them with barley, fruit or ginger drinks is Charim’s modern extension.','Encyclopedia of Korean Culture'),('Tea and relationships','Dasin-gye / 1818','The Dasin-gye provisions describe sending tea with verse letters. The National Folk Museum documents surviving copies of the provisions.','This connection inspired space for remembering people and two message leaves to share with a future cup.','NIKH / National Folk Museum of Korea')]
for title,sub,body,connection,source in notes:
 begin(title);text(M,H-93,sub,'Title',10,color=GREEN);y=paragraph(body,H-133);y-=30;y=paragraph(connection,y);text(M,65,'HISTORICAL MATERIAL / MODERN INTERPRETATION',size=5.6,color=GREEN);paragraph(source,48,size=6,leading=10);end()
begin('About this diary');y=paragraph('A contemporary diary inspired by Korean tea poems, correspondence and tea literature.',H-107,size=9,leading=16);y-=24;y=paragraph('Its prompts, layout and thirty-entry format are new designs. This is not a reproduction of a historical diary.',y);y-=24;y=paragraph('The historical notes use institutional descriptions and excerpts, rather than a complete comparison of original manuscripts.',y);y-=24;paragraph('The sequence is optional. There is no streak, deadline or requirement to finish in a month.',y);end()
begin('Before you begin');text(M,H-103,'This diary belongs to',size=8);line(H-129);y=H-165
for t in ['Find a moment that suits you.','Prepare a tea you want to drink.','','While it steeps or cools, look around.','After a sip, write something you noticed.','','A word is enough.','A drawing is welcome.','Blank spaces are welcome, too.','','Return whenever you have another cup','you would like to remember.']:text(M,y,t,size=8);y-=16
end()
for entry in range(1,31):
 begin('The Cup',f'ENTRY {entry:02} / THE CUP')
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
paragraph('Concept interior by millionroutines. A6, 80 pages, 30 undated entries. Sewn binding, paper stock and perforated message leaves are proposed production features, not verified by this PDF.',y,size=7,leading=12);end()
begin('The next cup.');y=paragraph('Return whenever there is another moment you would like to keep.',H-110,'Title',12,20);lines(y-35,9,21);end()
begin(None,'A LITTLE OPEN SPACE');end()
c.save();reader=PdfReader(str(OUT));assert len(reader.pages)==80,len(reader.pages)
(ROOT/'assets/diary/page-map.json').write_text(json.dumps(ledger,indent=2));(ROOT/'public/diary/Charim-A-Tea-Diary.pdf').write_bytes(OUT.read_bytes());print(f'{len(reader.pages)} pages / {W:.2f} x {H:.2f} pt / {OUT}')
# Editable front, back and paper band concept art.
front='''<svg xmlns="http://www.w3.org/2000/svg" width="105mm" height="148mm" viewBox="0 0 420 592"><rect width="420" height="592" fill="#90afa0"/><text x="210" y="130" text-anchor="middle" font-family="AppleMyungjo,Noto Serif KR,serif" font-size="38" fill="#f8f7ef">차림</text><text x="210" y="171" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="4" fill="#f8f7ef">CHARIM</text><text x="210" y="270" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="#f8f7ef">A Tea Diary</text><text x="210" y="319" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#f8f7ef">Keep a little of each cup.</text><g stroke="#759887" fill="none" stroke-width="1.4"><circle cx="210" cy="426" r="21"/><path d="M196 419v13q14 14 28 0v-13M196 419q14 6 28 0"/></g><text x="210" y="532" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="1" fill="#f8f7ef">by millionroutines</text></svg>'''
(ROOT/'assets/diary/cover-front.svg').write_text(front);(ROOT/'public/diary/cover-front.svg').write_text(front)
