'use client';
import {useEffect,useState} from 'react';
import {Film,SlidersHorizontal} from 'lucide-react';
import {Slider} from '@/components/ui/slider';
import {Checkbox} from '@/components/ui/checkbox';

export function RippleReference(){
 const [show,setShow]=useState(false);
 useEffect(()=>{setShow(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)},[]);
 return <figure className="ripple-reference"><div className="ripple-reference-head"><span><Film size={16}/>本章動畫參考</span><button type="button" aria-expanded={show} aria-controls="ripple-reference-image" onClick={()=>setShow(s=>!s)}>{show?'收起動畫':'展開動畫'}</button></div>{show?<img id="ripple-reference-image" src="/ripple-knob-reference.gif" alt="教師提供的動畫參考：金屬旋鈕位於環狀波紋面板中心，表面呈現暖色反射" width={600} height={338}/>:<div id="ripple-reference-image" className="ripple-reference-hidden">動畫已收起，展開可觀察波紋與高光。</div>}<figcaption>教師提供的 027.gif · 練習重點：環狀波浪、金屬旋鈕與色光。</figcaption></figure>
}
export function RippleWeightsDemo(){
 const [phase,setPhase]=useState(0),[height,setHeight]=useState(2),[protect,setProtect]=useState(true);
 const clamp=(v:number)=>Math.min(1,Math.max(0,v));
 const path=Array.from({length:151},(_,i)=>{const radius=i,wave=.5+.5*Math.sin(radius*.18-phase/100*Math.PI*2),outer=clamp((150-radius)/30),inner=protect?clamp((radius-22)/12):1;return `${i===0?'M':'L'}${(10+i/150*400).toFixed(2)},${(104-height*12*wave*outer*inner).toFixed(2)}`}).join(' ');
 return <div className="demo-panel ripple-demo"><div className="demo-heading"><SlidersHorizontal size={16}/>波浪與 Field 權重<small>概念剖面 · 非 C4D 算圖</small></div><svg className="ripple-graph" viewBox="0 0 420 130" role="img" aria-label={`波浪高度剖面，中心${protect?'有':'沒有'}保護遮罩，高度上限 ${height} cm`}><rect x="10" y="20" width="59" height="84" fill={protect?'#e4edff':'transparent'}/><path d="M10,104 L410,104" stroke="#b2c8ea"/><path d={path} stroke="#0754ff" strokeWidth="2.5" fill="none"/><text x="10" y="123">0 · 中央</text><text x="193" y="123">75 cm</text><text x="357" y="123">150 cm</text></svg><label className="ripple-slider">時間相位<Slider value={[phase]} onValueChange={v=>setPhase(v[0])} max={100} step={1} aria-label="波浪時間相位"/><b>{phase}%</b></label><label className="ripple-slider">波浪高度<Slider value={[height]} onValueChange={v=>setHeight(v[0])} min={0} max={6} step={.5} aria-label="波浪高度"/><b>{height} cm</b></label><label className="ripple-protect"><Checkbox checked={protect} onCheckedChange={v=>setProtect(v===true)}/>保護旋鈕中心</label><p className="demo-caption">拖動時間，波峰會向外移動。打開中心保護後，靠近旋鈕的位移回到 0；外緣也逐漸淡出。這裡用簡化權重示意，實際過渡由你的 Field 設定決定。</p></div>
}
