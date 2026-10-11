'use client';
import {useRef,useState} from 'react';
import {nullObservations} from '@/lib/null-camera';

export function NullCameraVideo(){
 const video=useRef<HTMLVideoElement>(null);
 const [selected,setSelected]=useState(-1);
 const [failed,setFailed]=useState(false);
 function seek(index:number){setSelected(index);if(video.current)video.current.currentTime=nullObservations[index].time;}
 return <section className="nc-guide" aria-label="第五章教師錄影">
  <span className="eyebrow">TEACHER RECORDING · 08:12</span><h3>Null 相機控制架：原始操作示範</h3>
  <video ref={video} className="nc-video" controls playsInline preload="metadata" poster="/null-camera/hierarchy.jpg" onError={()=>setFailed(true)} aria-label="教師 C4D Null 相機操作錄影，無旁白，請搭配學習筆記觀看"><source src="/null-camera/teacher-demo.mp4" type="video/mp4"/></video>
  {failed&&<p role="alert">影片暫時無法播放，請重新整理或使用下方連結開啟。各操作畫面也已放在學習筆記。</p>}
  <p className="nc-caption">依你提供的 2026-10-10 錄影整理。網頁版保留完整時長、降低影格率與檔案大小；原片無可辨識旁白。以下時間是畫面觀察點，點選後按播放。</p>
  <div className="nc-markers">{nullObservations.map((point,i)=><button type="button" aria-pressed={selected===i} className={selected===i?'active':''} key={point.time} onClick={()=>seek(i)}>{point.label}</button>)}</div>
  <p aria-live="polite">{selected<0?'先播放完整示範，或選擇上方觀察點。':nullObservations[selected].detail}</p>
  <a className="source" href="/null-camera/teacher-demo.mp4" target="_blank" rel="noreferrer">單獨開啟教師影片</a>
 </section>;
}

function NullRigDemo(){
 const [x,setX]=useState(0),[y,setY]=useState(0),[z,setZ]=useState(-130),[h,setH]=useState(0),[p,setP]=useState(0);
 const yaw=h*Math.PI/180,pitch=p*Math.PI/180;
 const cx=x+z*Math.cos(pitch)*Math.sin(yaw),cz=z*Math.cos(pitch)*Math.cos(yaw),cy=y-z*Math.sin(pitch);
 const controls:[string,number,(value:number)=>void,number,number,string][]=[['外層 P.X｜左右位移',x,setX,-70,70,'cm'],['外層 P.Y｜升降',y,setY,-30,60,'cm'],['相機 P.Z｜局部前後',z,setZ,-180,-40,'cm'],['外層 R.H｜左右轉向',h,setH,-50,50,'°'],['內層 R.P｜俯仰',p,setP,-25,25,'°']];
 return <div className="nc-demo"><h4>試著只改一個控制</h4><p>藍點是相機、十字是 Null 軸心。兩張正投影圖呈現同一組簡化控制架；這是概念示意，非 C4D 畫面。</p>
 <div className="nc-projections">
  <svg viewBox="0 0 360 250" role="img" aria-label={`俯視：外層左右 ${x} cm、H ${h} 度、相機局部 Z ${z} cm`}><rect x="1" y="1" width="358" height="248" rx="16" fill="#f1f6ff"/><text x="18" y="27">俯視 X／Z</text><path d="M30 65H330M180 45V228" stroke="#c4d5ee"/><text x="316" y="57">X</text><text x="186" y="232">−Z</text><rect x="164" y="49" width="32" height="30" rx="5" fill="#eeae38"/><line x1={180+x*.65} y1="65" x2={180+cx*.65} y2={65-cz*.8} stroke="#005cff" strokeDasharray="5 4"/><path d={`M${172+x*.65} 65h16M${180+x*.65} 57v16`} stroke="#142b50" strokeWidth="3"/><circle cx={180+cx*.65} cy={65-cz*.8} r="8" fill="#005cff"/></svg>
  <svg viewBox="0 0 360 250" role="img" aria-label={`側視：高度 ${y} cm、P ${p} 度`}><rect x="1" y="1" width="358" height="248" rx="16" fill="#f1f6ff"/><text x="18" y="27">側視 Z／Y</text><path d="M40 195H330M300 45V216" stroke="#c4d5ee"/><text x="304" y="47">Y</text><text x="40" y="218">−Z</text><rect x="284" y="120" width="32" height="30" rx="5" fill="#eeae38"/><line x1="300" y1={150-y*.65} x2={300+cz} y2={150-cy*.65} stroke="#005cff" strokeDasharray="5 4"/><path d={`M292 ${150-y*.65}h16M300 ${142-y*.65}v16`} stroke="#142b50" strokeWidth="3"/><circle cx={300+cz} cy={150-cy*.65} r="8" fill="#005cff"/></svg>
 </div><div className="nc-controls">{controls.map(([label,value,change,min,max,unit],i)=><label key={label} htmlFor={`nc-control-${i}`}><span>{label}<output>{value} {unit}</output></span><input id={`nc-control-${i}`} type="range" min={min} max={max} value={value} onChange={e=>change(Number(e.target.value))}/></label>)}</div>
 <button type="button" className="nc-reset" onClick={()=>{setX(0);setY(0);setZ(-130);setH(0);setP(0)}}>重設示意</button>
 <p className="nc-caption">試試先轉 H，再改相機 Z：它會沿轉向後的局部方向移動。橘色方塊代表固定的場景主角。</p></div>;
}

export function NullCameraGuide({lessonId}:{lessonId:string}){
 const selected=({'null-01':5,'null-02':1,'null-03':4,'null-04':3,'null-05':2,'null-06':6} as Record<string,number>)[lessonId]??1;
 const point=nullObservations[selected];
 return <section className="nc-guide" aria-label="Null 軸心教學圖解"><span className="eyebrow">CHAPTER 05 · CAMERA RIG</span><h3>先分工，再設 Key</h3>
 <ol className="nc-hierarchy"><li><b>CAM_ROOT · 外層 Null</b><span>Position X／Y 平移與升降 · Rotation H 左右轉向</span><ol><li><b>CAM_PITCH · 內層 Null</b><span>Rotation P 上下俯仰</span><ol><li><b>Camera</b><span>局部 Position Z 前進／後退</span></li></ol></li></ol></li></ol>
 <p className="nc-caption">影片實際採兩層 Null＋相機。「拆 XYZ」指拆開位置通道，不是把旋轉 H／P／B 直接當世界 X／Y／Z。場景物件放在這個架構外。</p>
 <figure><a href={`/null-camera/${point.image}.jpg`} target="_blank" rel="noreferrer" aria-label={`放大教師截圖：${point.label}`}><img src={`/null-camera/${point.image}.jpg`} width="1600" height="1025" alt={`教師錄影 ${point.label}：${point.detail}`} loading="lazy"/></a><figcaption>{point.label}。{point.detail} 點圖可放大。</figcaption></figure>
 {['null-01','null-02','null-03'].includes(lessonId)&&<NullRigDemo/>}
 </section>;
}
