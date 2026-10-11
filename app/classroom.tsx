'use client';
import {useEffect,useState} from 'react';
import {BookOpen,SlidersHorizontal,Play,Check,Clock,Film,Plus,Save,ChevronRight,Menu,Layers,Lightbulb,Keyboard,ExternalLink,ChevronDown,X} from 'lucide-react';
import {Sidebar,SidebarProvider,SidebarContent,SidebarHeader,SidebarFooter,SidebarInset,useSidebar} from '@/components/ui/sidebar';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Slider} from '@/components/ui/slider';
import {Checkbox} from '@/components/ui/checkbox';
import {Progress} from '@/components/ui/progress';
import {Toaster,toast} from 'sonner';
import {seed,drivePreview,moduleLevel,type Lesson,type Module} from '@/lib/course';
import {AirportReference} from './airport-reference';
import {playerReference} from '@/lib/player';
import {RippleReference,RippleWeightsDemo} from './ripple-reference';
import {NullCameraGuide,NullCameraVideo} from './null-camera-guide';

function Demo({kind}:{kind:Lesson['demo']}){
 const [v,setV]=useState(40),[area,setArea]=useState(0),[playing,setPlaying]=useState(false);
 useEffect(()=>{if(!playing)return;const i=setInterval(()=>setV(x=>(x+1)%101),65);return()=>clearInterval(i)},[playing]);
 if(kind==='none')return null;
 if(kind==='interface')return <div className="demo-panel"><div className="demo-heading"><Keyboard size={16}/>介面地圖 <small>點選區域認識用途</small></div><div className="interface-map"><button className={'viewport '+(area===0?'selected':'')} onClick={()=>setArea(0)}><span>01</span>Viewport<small>查看與操作場景</small></button><div><button className={area===1?'selected':''} onClick={()=>setArea(1)}><span>02</span>Object Manager</button><button className={area===2?'selected':''} onClick={()=>setArea(2)}><span>03</span>Attribute Manager</button></div><button className={'timeline '+(area===3?'selected':'')} onClick={()=>setArea(3)}><span>04</span>Timeline <i>0 ━━━━━ 30 ━━━━━ 60 ━━━━━ 89</i></button></div><p className="demo-caption">{['在這裡看場景，用 E／R／T 移動、旋轉、縮放選中的物件。','每個物件都是清單中的一項，縮排代表父子關係。','選中物件後，在這裡改尺寸、位置與工具設定。','移動播放頭到不同影格，再對參數記錄 Key。'][area]}</p></div>;
 if(kind==='sequence')return <SequenceDemo/>;
 return <div className="demo-panel"><div className="demo-heading">{kind==='light'?<Lightbulb size={16}/>:<Layers size={16}/>} {kind==='keys'?'Keyframe 插值':kind==='mask'?'材質遮罩示範':kind==='light'?'燈光角色示意':'Field 權重示範'}<small>概念示範 · 非 C4D 渲染</small></div>{kind==='light'?<LightDemo/>:<><div className="data-demo">{kind==='keys'?<><div className="key-track"><div className="position-marker" style={{left:`${8+v*.8}%`}}><span>P.X</span><b>{Math.round(-150+v*3)}</b></div></div><div className="key-labels"><span>◆ 0 格 · -150</span><span>◆ 60 格 · 150</span></div></>:<div className="weights">{Array.from({length:12},(_,i)=>{const w=Math.max(0,Math.min(1,(v/100*1.4-i/12)*5));return <div key={i} className={kind==='mask'?'material-sample':'weight-sample'} style={{background:kind==='mask'?`rgba(7,84,255,${1-w*.92})`:`rgba(7,84,255,${.12+w*.88})`,transform:kind==='field'?`translateY(${-w*35}px)`:'none',borderColor:w>.7?'#86bbec':'#0754ff'}}><span>{w.toFixed(1)}</span></div>})}</div>}</div><div className="slider-row"><button className="mini" onClick={()=>setPlaying(x=>!x)} aria-label={playing?'暫停示範':'播放示範'}>{playing?'暫停':<Play size={15}/>}</button><Slider value={[v]} onValueChange={x=>{setPlaying(false);setV(x[0])}} min={0} max={100} step={1} aria-label="動畫進度"/><b>{v}%</b></div><p className="demo-caption">{kind==='mask'?'藍色 = Diffuse，淡色 = Glass。灰階權重控制兩種材質的混合；實際反射與折射請看 Octane。':kind==='field'?'每個柱代表一個複製物件的權重。Field 移動時，受影響的位置也移動。':'拖動時間，觀察兩個 Key 之間的位置如何改變。'}</p></>}</div>
}
function SequenceDemo(){const [end,setEnd]=useState(89),[fps,setFps]=useState(30);return <div className="demo-panel"><div className="demo-heading"><Film size={16}/>序列設定計算器</div><div className="sequence-form"><label>起始格<input value="0" readOnly/></label><label>結束格<input type="number" min="0" max="10000" value={end} onChange={e=>setEnd(Math.max(0,Math.min(10000,+e.target.value)))}/></label><label>FPS<input type="number" min="1" max="120" value={fps} onChange={e=>setFps(Math.max(1,Math.min(120,+e.target.value)))}/></label><div><b>{end+1}</b><span>張圖片 · {((end+1)/fps).toFixed(2)} 秒</span></div></div><p className="demo-caption">Frame Step = 1。檔名示例：frame_0000.png … frame_{String(end).padStart(4,'0')}.png</p></div>}
function LightDemo(){const [on,setOn]=useState([true,false,false]);return <><div className="light-controls">{['Key · 主要形狀','Rim · 邊緣分離','Dome · 環境補光'].map((s,i)=><label key={s}><Checkbox checked={on[i]} onCheckedChange={x=>setOn(a=>a.map((v,j)=>j===i?x===true:v))}/>{s}</label>)}</div><div className="lighting-bars">{['正面明暗','輪廓亮度','環境反射'].map((s,i)=><div key={s}><span>{s}</span><Progress value={on[i]?85:10}/><b>{on[i]?'強':'弱'}</b></div>)}</div><p className="demo-caption">逐一開關，理解各燈的角色。實際結果也取決於角度、材質與功率。</p></>}

function MobileNavigationToggle(){
 const {isMobile,openMobile,toggleSidebar}=useSidebar();
 if(!isMobile)return null;
 return <button type="button" className="navigation-toggle" onClick={toggleSidebar} aria-label={openMobile?'關閉課程目錄':'開啟課程目錄'} aria-expanded={openMobile}><Menu size={18}/><span>課程目錄</span></button>
}
function MobileNavigationClose(){
 const {isMobile,setOpenMobile}=useSidebar();
 if(!isMobile)return null;
 return <button type="button" className="navigation-toggle" onClick={()=>setOpenMobile(false)} aria-label="關閉課程目錄"><X size={18}/></button>
}
export default function Classroom(){
 const [navigation,setNavigation]=useState<{chapters:Record<string,boolean>;groups:Record<string,boolean>}>({chapters:{},groups:{}});
 useEffect(()=>{
  try{
   const saved=localStorage.getItem('diffuse-grouped-course-navigation');
   if(!saved)return;
   const parsed=JSON.parse(saved);
   const flags=(value:unknown):Record<string,boolean>=>value&&typeof value==='object'&&!Array.isArray(value)?Object.fromEntries(Object.entries(value).filter(([,flag])=>typeof flag==='boolean')):{};
   setNavigation({chapters:flags(parsed?.chapters),groups:flags(parsed?.groups)});
  }catch{}
 },[]);
 function updateNavigation(change:(current:typeof navigation)=>typeof navigation){
  setNavigation(current=>{
   const next=change(current);
   try{localStorage.setItem('diffuse-grouped-course-navigation',JSON.stringify(next))}catch{}
   return next;
  });
 }
 function toggleGroup(level:string){updateNavigation(current=>({...current,groups:{...current.groups,[level]:!current.groups[level]}}))}

 const [modules,setModules]=useState<Module[]>(seed),[active,setActive]=useState('01-01'),[view,setView]=useState('learn'),[tab,setTab]=useState('notes'),[completed,setCompleted]=useState<string[]>([]),[revision,setRevision]=useState(0),[loaded,setLoaded]=useState(false),[error,setError]=useState(''),[saving,setSaving]=useState(false),[answer,setAnswer]=useState<number|null>(null),[checks,setChecks]=useState<string[]>([]),[draft,setDraft]=useState<Lesson|null>(null),[editorRevision,setEditorRevision]=useState(0);
 const flat=modules.flatMap(m=>m.lessons),lesson=flat.find(l=>l.id===active)||flat[0],mod=modules.find(m=>m.lessons.some(l=>l.id===lesson.id))!,selectedLevel=moduleLevel(mod),visibleModules=modules.filter(m=>moduleLevel(m)===selectedLevel),visibleLessons=visibleModules.flatMap(m=>m.lessons),index=visibleLessons.findIndex(l=>l.id===lesson.id);
 async function load(){try{const r=await fetch('/api/course');if(!r.ok)throw new Error('課程暫時無法載入，請重試。');const data:any=await r.json();setModules(data.modules);setRevision(data.revision);setCompleted(data.completed);setLoaded(true);setError('')}catch(e){setError((e as Error).message)}}
 useEffect(()=>{void load()},[]);
 function navigate(id:string,expandChapter=true){
  const chapter=modules.find(m=>m.lessons.some(l=>l.id===id));
  if(chapter)updateNavigation(current=>({...current,chapters:{...current.chapters,[chapter.id]:!expandChapter},groups:{...current.groups,[moduleLevel(chapter)]:false}}));
  setActive(id);setAnswer(null);setChecks([]);setDraft(null);setTab('notes');setView('learn');window.scrollTo({top:0,behavior:'smooth'});
 }
 function selectChapter(chapter:Module){
  if(view==='learn'&&mod.id===chapter.id){
   updateNavigation(current=>({...current,chapters:{...current.chapters,[chapter.id]:current.chapters[chapter.id]===false}}));
   return;
  }
  const target=chapter.lessons.find(l=>l.id===lesson.id)||chapter.lessons[0];
  if(target)navigate(target.id);
 }
 async function mark(){if(!loaded){toast.error('請先成功載入雲端課程');return}try{const done=!completed.includes(lesson.id);const r=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:lesson.id,done})});if(!r.ok)throw new Error('進度未保存，請重試。');setCompleted(await r.json());toast.success(done?'已完成這堂課':'已取消完成')}catch(e){toast.error((e as Error).message)}}
 function edit(){setDraft(structuredClone(lesson));setEditorRevision(revision);setView('manage')}
 async function save(){if(!draft||!loaded)return;setSaving(true);try{const next=modules.map(m=>({...m,lessons:m.lessons.map(l=>l.id===draft.id?draft:l)}));const r=await fetch('/api/course',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({modules:next,revision:editorRevision})});if(!r.ok){const e:any=await r.json();throw new Error(e.error||'保存失敗，草稿仍保留。')}const data:any=await r.json();setModules(data.modules);setRevision(data.revision);setEditorRevision(data.revision);toast.success('已更新課程，所有內容已保存')}catch(e){toast.error((e as Error).message)}finally{setSaving(false)}}
 useEffect(()=>{const ctx=(document as any).modelContext;if(!ctx?.registerTool)return;const life=new AbortController();for(const tool of [{name:'read_c4d_course',description:'Read course lesson titles and current selected lesson.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({selected:active,modules:modules.map(m=>({level:moduleLevel(m),title:m.title,lessons:m.lessons.map(l=>({id:l.id,title:l.title}))}))})},{name:'open_c4d_lesson',description:'Navigate to a lesson without changing completion or course content.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false},execute:(input:any)=>{if(typeof input?.id!=='string'||!flat.some(l=>l.id===input.id))throw new Error('Unknown lesson');navigate(input.id);return {selected:input.id}}}]){try{void Promise.resolve(ctx.registerTool(tool,{signal:life.signal})).catch(()=>{})}catch{}}return()=>life.abort()},[active,modules]);
 return <SidebarProvider open={true} onOpenChange={()=>{}}>
 <Sidebar className="studio-sidebar" collapsible="offcanvas">
  <SidebarHeader><div className="sidebar-heading"><a className="brand" href="/" aria-label="Diffuse C4D 學習室"><img src="/diffuse-mark.png" alt=""/><div>Diffuse<small>C4D LEARNING ROOM</small></div></a><MobileNavigationClose/></div></SidebarHeader>
  <SidebarContent className="course-navigation">
   {(['beginner','intermediate'] as const).map(level=>{
    const chapters=modules.filter(m=>moduleLevel(m)===level);
    const groupCollapsed=!!navigation.groups[level];
    return <section className="course-group" key={level}>
     <button type="button" className="course-group-heading" onClick={()=>toggleGroup(level)} aria-expanded={!groupCollapsed} aria-controls={`course-group-${level}`}>
      <b>{level==='beginner'?'初階課程':'中階課程'}</b><span>{chapters.length} 章</span><ChevronDown size={17} className={'group-chevron'+(groupCollapsed?' collapsed':'')}/>
     </button>
     <div id={`course-group-${level}`} hidden={groupCollapsed}>
      {chapters.map((chapter,i)=>{
       const chapterCollapsed=navigation.chapters[chapter.id]!==false;
       return <section className="module-nav" key={chapter.id}>
        <button type="button" className={'module-title'+(view==='learn'&&mod.id===chapter.id?' active':'')} onClick={()=>selectChapter(chapter)} aria-expanded={!chapterCollapsed} aria-controls={`chapter-${chapter.id}`}>
         <span>{String(i+1).padStart(2,'0')}</span><b>{chapter.title}</b>
        </button>
        <div className="chapter-lessons" id={`chapter-${chapter.id}`} hidden={chapterCollapsed}>
         {chapter.lessons.map((item,j)=><button key={item.id} className={'lesson-nav'+(view==='learn'&&lesson.id===item.id?' active':'')} onClick={()=>navigate(item.id)} aria-current={view==='learn'&&lesson.id===item.id?'page':undefined}>
          <span className="lesson-number">{completed.includes(item.id)?<Check size={13}/>:String(j+1).padStart(2,'0')}</span><span>{item.title}</span>
         </button>)}
        </div>
       </section>;
      })}
     </div>
    </section>;
   })}
  </SidebarContent>
  <SidebarFooter className="course-navigation-footer">
   <button type="button" className={'content-management'+(view==='manage'?' active':'')} onClick={edit} aria-current={view==='manage'?'page':undefined}><SlidersHorizontal size={18}/><span>內容管理</span></button>
  </SidebarFooter>
 </Sidebar>

 <SidebarInset className="main-shell"><header className="topbar">
  <div><MobileNavigationToggle/><span className="breadcrumb-root">Learning Room</span><ChevronRight size={14} className="breadcrumb-separator"/>{view==='learn'&&<span className="course-level-badge">{selectedLevel==='beginner'?'初階課程':'中階課程'}</span>}<b title={view==='manage'?'內容管理':mod.title}>{view==='manage'?'內容管理':mod.title}</b></div>
  <span className="top-meta">CINEMA 4D + OCTANE <span className="avatar">D</span></span>
 </header><main className="class-main">{error&&<div className="error-banner" role="alert">{error}<button onClick={load}>重新載入</button></div>}

 {view==='manage'&&draft?<section className="editor surface"><div className="editor-head"><div><span className="eyebrow">COURSE EDITOR / {draft.id}</span><h1>更新這堂課</h1></div><button className="primary" onClick={save} disabled={saving||!loaded}><Save size={16}/>{saving?'保存中…':'保存更新'}</button></div><p className="editor-hint">修改筆記與錄影，保存後會更新雲端課程。Google Drive 影片需讓學生有檢視權限。</p><div className="editor-grid"><label>課程標題<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label><label>預估分鐘<input type="number" min="1" max="180" value={draft.minutes} onChange={e=>setDraft({...draft,minutes:+e.target.value})}/></label></div><label>一句話重點<input value={draft.summary} onChange={e=>setDraft({...draft,summary:e.target.value})}/></label><label>Google Drive 影片連結<input type="url" placeholder="https://drive.google.com/file/d/…/view" value={draft.video} onChange={e=>setDraft({...draft,video:e.target.value})}/></label>{draft.video&&<p className={drivePreview(draft.video)?'valid':'invalid'}>{drivePreview(draft.video)?'可辨識的 Drive 影片連結':'請貼上 Drive 單一影片的分享連結，不能使用資料夾連結。'}</p>}<label>概念筆記<textarea value={draft.note} onChange={e=>setDraft({...draft,note:e.target.value})}/></label><label>操作步驟（每行一個）<textarea rows={7} value={draft.steps.join('\n')} onChange={e=>setDraft({...draft,steps:e.target.value.split('\n')})}/></label><label>卡關提醒<textarea value={draft.tips} onChange={e=>setDraft({...draft,tips:e.target.value})}/></label><label>練習／作業<textarea value={draft.practice} onChange={e=>setDraft({...draft,practice:e.target.value})}/></label><label>完成條件（每行一個）<textarea value={draft.checklist.join('\n')} onChange={e=>setDraft({...draft,checklist:e.target.value.split('\n')})}/></label><div className="editor-grid"><label>參考來源名稱<input value={draft.sourceTitle} onChange={e=>setDraft({...draft,sourceTitle:e.target.value})}/></label><label>參考來源網址<input value={draft.source} onChange={e=>setDraft({...draft,source:e.target.value})}/></label></div><label>小測驗題目<input value={draft.quiz.question} onChange={e=>setDraft({...draft,quiz:{...draft.quiz,question:e.target.value}})}/></label>{draft.quiz.options.map((option,i)=><div className="quiz-editor" key={i}><Checkbox aria-label={`選項 ${i+1} 為正確答案`} checked={draft.quiz.answer===i} onCheckedChange={()=>setDraft({...draft,quiz:{...draft.quiz,answer:i}})}/><input aria-label={`測驗選項 ${i+1}`} value={option} onChange={e=>setDraft({...draft,quiz:{...draft.quiz,options:draft.quiz.options.map((o,j)=>j===i?e.target.value:o)}})}/></div>)}<label>答案解說<textarea value={draft.quiz.explanation} onChange={e=>setDraft({...draft,quiz:{...draft.quiz,explanation:e.target.value}})}/></label><div className="editor-bottom"><button onClick={()=>{setView('learn');setDraft(null)}}>返回課程</button><button className="primary" onClick={save} disabled={saving||!loaded}>保存更新</button></div></section>:<div className="lesson-layout"><article className="surface lesson-surface"><div className="lesson-head"><div className="lesson-meta"><span>LESSON {String(visibleModules.findIndex(m=>m.id===mod.id)+1).padStart(2,'0')}-{String(mod.lessons.findIndex(l=>l.id===lesson.id)+1).padStart(2,'0')}</span><span><Clock size={14}/>{lesson.minutes} 分鐘</span></div><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><Tabs value={tab} onValueChange={setTab}><TabsList className="lesson-tabs"><TabsTrigger value="notes"><BookOpen size={15}/>學習筆記</TabsTrigger><TabsTrigger value="video"><Film size={15}/>螢幕錄影{(lesson.video||mod.id==='null-camera')&&<span className="video-dot"/>}</TabsTrigger><TabsTrigger value="practice"><Layers size={15}/>動手練習</TabsTrigger></TabsList><TabsContent value="notes" className="lesson-content"><p className="concept">{lesson.note}</p>{mod.id==='null-camera'&&<NullCameraGuide key={`guide-${lesson.id}`} lessonId={lesson.id}/>}{lesson.id.startsWith('05-')&&<RippleReference/>}{(lesson.id==='05-02'||lesson.id==='05-03')&&<RippleWeightsDemo/>}{lesson.id==='05-05'&&<a className="reference-card" href="/ripple-groove-heightmap.png" download="ripple-groove-heightmap.png"><div><span className="eyebrow">PRACTICE TEXTURE</span><b>下載同心圓灰階貼圖</b><small>2048 × 2048 PNG · 本課練習素材，接低強度 Bump，數值以線性資料讀取。</small></div></a>}<Demo key={lesson.id} kind={lesson.demo}/>{(['04-airport-02','04-airport-03','04-02','04-03'].includes(lesson.id))&&<figure className="modeling-reference"><a href="/extrude-meshboolean-reference.png" target="_blank" rel="noreferrer"><img src="/extrude-meshboolean-reference.png" alt="教師的 C4D 截圖：圓角 Rectangle 放入兩組 Extrude，再用 MeshBoolean 1.8 做內槽" loading="lazy"/></a><figcaption>教師操作參考：Rectangle 的 Rounding 與 Radius，以及兩組 Extrude 的布林階層。點圖片可放大。</figcaption></figure>}{lesson.id.startsWith('04-airport-')&&<AirportReference lessonId={lesson.id}/>}{mod.id==='player'&&mod.lessons.findIndex(l=>l.id===lesson.id)>=4&&<a className="reference-card" href={playerReference} target="_blank" rel="noreferrer"><div><span className="eyebrow">ASSIGNMENT REFERENCE</span><b>SW-1 Music Player</b><small>觀察外殼、螢幕與旋鈕，拆解自己的產品模型。</small></div><ExternalLink size={19}/></a>}<h3>跟著做</h3><ol className="steps">{lesson.steps.map((step,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{step}</p></li>)}</ol><div className="tip"><Lightbulb size={19}/><div><b>卡住時，先檢查這裡</b><p>{lesson.tips}</p></div></div>{lesson.source&&<a className="source" href={lesson.source} target="_blank" rel="noreferrer">{lesson.sourceTitle}<ExternalLink size={13}/></a>}</TabsContent><TabsContent value="video" className="lesson-content">{lesson.video&&drivePreview(lesson.video)?<><iframe className="video-player" src={drivePreview(lesson.video)!} title={`${lesson.title} · 教師錄影`} allow="autoplay; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><a className="source" href={lesson.video} target="_blank" rel="noreferrer">在 Google Drive 開啟<ExternalLink size={14}/></a><p className="muted">如果播放器要求登入，請使用有檢視權限的 Google 帳號。</p></>:mod.id==='null-camera'?<NullCameraVideo/>:<div className="video-empty"><Film size={36}/><h3>這堂課的錄影尚未加入</h3><p>先跟著筆記操作。教師可在內容管理貼上 Google Drive 影片連結。</p><button onClick={edit}>加入錄影連結</button></div>}</TabsContent><TabsContent value="practice" className="lesson-content"><div className="assignment"><span className="eyebrow">YOUR TURN</span><h3>{lesson.id.endsWith('05')||lesson.id==='03-07'||lesson.id==='04-airport-08'||lesson.id==='04-06'||lesson.id==='05-08'?'這次的交付目標':'現在換你試試'}</h3><p>{lesson.practice}</p>{lesson.id==='04-06'&&<a className="assignment-source" href={playerReference} target="_blank" rel="noreferrer">觀看 SW-1 原作參考<ExternalLink size={14}/></a>}{lesson.id==='04-airport-08'&&<AirportReference lessonId={lesson.id}/>}</div>{lesson.id==='05-08'&&<RippleReference/>}<h3>完成檢查</h3><div className="practice-checks">{lesson.checklist.map((c,i)=><label key={i}><Checkbox checked={checks.includes(c)} onCheckedChange={x=>setChecks(a=>x?[...a,c]:a.filter(s=>s!==c))}/><span>{c}</span></label>)}</div><div className="quiz"><span className="eyebrow">QUICK CHECK</span><h3>{lesson.quiz.question}</h3>{lesson.quiz.options.map((o,i)=><button key={i} className={answer===i?(i===lesson.quiz.answer?'correct':'wrong'):''} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{o}{answer===i&&i===lesson.quiz.answer&&<Check size={16}/>}</button>)}{answer!==null&&<p role="status" className={answer===lesson.quiz.answer?'valid':'invalid'}>{answer===lesson.quiz.answer?'答對了。':'再想一下。'}{lesson.quiz.explanation}</p>}</div></TabsContent></Tabs><footer className="lesson-footer"><button onClick={mark} disabled={!loaded} className={completed.includes(lesson.id)?'done-btn':'primary'}><Check size={16}/>{completed.includes(lesson.id)?'已完成這堂課':'標記為已完成'}</button><button onClick={()=>navigate(visibleLessons[index+1]?.id||visibleLessons[0].id)}>{index===visibleLessons.length-1?'回到本課第一堂':'下一堂'}<ChevronRight size={16}/></button></footer></article><aside className="lesson-side"><div className="side-card"><span className="eyebrow">THIS UNIT</span><h3>{mod.title}</h3><p>{mod.subtitle}</p><div className="stat"><b>{mod.lessons.reduce((a,l)=>a+l.minutes,0)}</b><span>分鐘學習與實作</span></div><Progress value={mod.lessons.filter(l=>completed.includes(l.id)).length/mod.lessons.length*100}/><small>{mod.lessons.filter(l=>completed.includes(l.id)).length} / {mod.lessons.length} 堂已完成</small></div><div className="side-card shortcuts"><Keyboard size={21}/><h3>先記住這幾個</h3>{[['Shift + C','命令搜尋'],['E / R / T','移動／旋轉／縮放'],['1 / 2 / 3','平移／縮放／轉視角'],['S','框入所選物件']].map(([k,s])=><div key={k}><kbd>{k}</kbd><span>{s}</span></div>)}<small>預設快捷鍵，依你的配置為準。</small></div></aside></div>}
 <footer className="page-footer">DIFFUSE STUDIO / C4D LEARNING ROOM <span>學習，從動手開始。</span></footer></main></SidebarInset><Toaster richColors position="bottom-right"/></SidebarProvider>
}
