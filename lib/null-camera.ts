import type {Lesson, Module} from './course';

const nullSource='https://help.maxon.net/c4d/r23/en-us/Content/html/ONULL.html';
const curvesSource='https://help.maxon.net/c4d/2026/en-us/Content/html/10608.html';
function lesson(id:string,title:string,minutes:number,summary:string,note:string,steps:string[],tips:string,practice:string,checklist:string[],question:string,options:string[],answer:number,explanation:string,source=nullSource):Lesson{
 return {id,title,minutes,summary,note,steps,tips,practice,checklist,quiz:{question,options,answer,explanation},video:'',source,sourceTitle:source===curvesSource?'Maxon · F-Curve 插值':'Maxon · Null Object',demo:'none'};
}
export const nullCamera:Module={id:'null-camera',level:'beginner',contentVersion:1,title:'Null 軸心與 XYZ 相機運鏡',subtitle:'教師錄影拆解 · 階層 / 單軸動畫 / F-Curve',lessons:[
 lesson('null-01','Null：把軸心放在你要的位置',5,'相機退開一段距離，轉 Null 就能繞著它運動。','Null 是沒有可渲染表面的控制物件。子物件會繼承父層的變換，因此它不只用來收納，也能作為旋轉中心。影片延續掃描機場景，用兩層 Null 控制相機，角色沿輸送帶移動是另一組動畫。這堂課可以用上一章的行李箱代替影片角色。',[
  '另存第四章場景為 camera-rig-practice.c4d，先停在起始影格並關閉 Auto Key。',
  '用 Shift + C 搜尋 Null。先用一個 Cube 當測試物件，建立「Null → Cube」父子關係。',
  '把 Null 放在想繞行的位置，再把 Cube 沿局部 X 移開。旋轉 Null 的 H，觀察 Cube 繞著 Null 移動。',
  '把 Cube 移回 Null 的中心再轉一次，比較「繞行」與「原地旋轉」。',
  '回到掃描機場景，決定相機要圍繞哪個位置：行李箱附近、機器出口，或整體場景中心。'
 ],'軸心不在預期位置時，先看 Null 放在哪裡。父層旋轉會帶動子物件的位置與方向；Null 與子物件重合時，不會出現有半徑的繞行。','做兩個對照：Cube 與 Null 重合／相距 100 cm，各轉 H 30°。數值是練習用，不是影片逐字參數。',['能指出 Null 位置','理解偏移距離是繞行半徑','區分角色與相機動畫'],'要讓物件繞某個點轉，最先確認？',['Null 的位置與子物件偏移','渲染採樣','材質顏色'],0,'父層的原點提供旋轉中心；子物件與它的距離決定繞行半徑。'),
 lesson('null-02','搭好三層相機控制架',6,'外層 H＋平移，內層 P，相機管前後距離。','錄影約 01:40 可見「左右旋轉 H＋平移 → 上下旋轉 P → RS Camera－前進含後退」。這是功能分工：把旋轉與位移交給不同層，方便修改。畫面使用 RS Camera；本章只教變換與動畫，一般 Camera 也能練習，已有 Octane 相機亦可沿用。',[
  '建立新的 Null，命名「CAM_ROOT｜平移＋H」，放到選好的控制中心；開始練習時保持旋轉 0、縮放 1。',
  '建立第二個 Null，拖進 CAM_ROOT，命名「CAM_PITCH｜上下 P」。對這個新物件設定相對位置 0、旋轉 0、縮放 1，使兩個 Null 軸心重合。',
  '建立新 Camera，放入 CAM_PITCH。先讓相對 X、Y 與旋轉為 0，再沿相機局部 Z 拉開到能看見場景的距離。',
  '使用相機旁的啟用圖示切入它的視角；另開透視或四視圖觀察相機與 Null 的位置。',
  '逐層小幅修改：外層 H、內層 P、相機 P.Z，確認各自改變方向、俯仰和前後距離。',
  '已有構圖的相機不要直接歸零。先複製相機備份，再加入父層並比較畫面，必要時重設局部偏移。'
 ],'不要把掃描機或行李箱也拖進相機控制架；否則場景會和相機一起動。建立階層前後都確認構圖；有既存 Key 的物件不可直接套用歸零步驟。','保存一個命名清楚的三層相機架，拍下物件管理器階層截圖。',['三層縮排正確','Null 縮放維持 1','場景在相機架外','能切換相機與外部視角'],'前後推近應先操作哪一層？',['內層 Null 的 P 旋轉','Camera 的局部 P.Z','行李箱的縮放'],1,'沿相機局部 Z 改位置是推近／拉遠；改焦距是另一種效果。'),
 lesson('null-03','拆開 XYZ：一條軌道只處理一件事',6,'X 平移、Y 升降、相機局部 Z 推近，分開設 Key。','「拆開 XYZ」在這裡指分開檢視與編輯 Position.X／Y／Z 動畫軌道，不必先做三個名叫 X、Y、Z 的 Null。影片約 03:00 可見外層 Position.X，04:40 可見 Position.Y；07:20 則是相機的 Position.Z。各軌道分工清楚，但最後仍會受到父層變換共同影響。',[
  '本章練習設 30 FPS、0–89 格。先停用其他測試動畫，讓行李箱保持靜止，看清相機的動作。',
  '選 CAM_ROOT，在起點對 P.X 單一參數新增 Key；移到終點只改 X，再對同一參數設 Key。依場景大小先試左右差 100 cm。',
  '回到起點，對 P.Y 設 Key；終點把 Y 增加約 30 cm，再設 Key。這是教材練習值，請按場景調整。',
  '選 Camera，在起點與終點對 P.Z 設 Key。先小幅試移動，確認推近方向，再增加距離；不要讓鏡頭穿過機器。',
  '打開 Timeline 的 F-Curve 模式，展開物件 → Position，只選 X、Y 或 Z 軌道觀察。',
  '一次只調一條曲線並播放，再恢復其他軌道；最後檢查相機畫面與外部路徑。'
 ],'Attribute Manager 中的座標是相對父層的。外層 H 或內層 P 旋轉後，相機局部 Z 不再等於世界 Z；不能把藍色軌道一概解讀成世界前後。P.X 的 P 是 Position，不是 Rotation.P 的 Pitch。','做出平移＋抬升＋推近的短鏡頭，交三條位置曲線截圖，並指出它們屬於哪個物件。',['X 與 Y 在外層 Null','Z 在 Camera','只在需要的參數設 Key','知道局部與世界座標不同'],'相機父層轉向後，Camera 的局部 Z 會？',['永遠等於世界 Z','隨父層方向改變','自動變成焦距'],1,'父子階層會改變子物件的世界方向；局部軸跟著控制架轉向。',curvesSource),
 lesson('null-04','H 與 P：把左右和上下分工',5,'外層轉向，內層抬頭低頭，讓畫面保持水平。','影片約 03:40 單獨調內層 Rotation.P，約 06:10 檢查外層與內層的動畫軌道。預設、軸向對齊的控制架中，可以把 H 理解為左右轉向、P 理解為上下俯仰、B 理解為畫面傾斜。HPB 是有順序的旋轉系統，不是把 H/P/B 永久直接改名成世界 Y/X/Z。',[
  '固定 Camera 的旋轉，先選外層 CAM_ROOT，只改 R.H 約 10°，觀察左右繞行，再回到 0°。',
  '選內層 CAM_PITCH，只改 R.P 約 5°，觀察上下構圖，再回到初始值。',
  '對外層 R.H 設起點與終點 Key，讓鏡頭慢慢轉到行李箱。',
  '對內層 R.P 設起點與終點 Key，少量補償俯仰，使主角留在畫面內。',
  '把 Camera 的 B 與不需要的旋轉軌道保持固定；播放檢查地平線與機器垂直線。'
 ],'若畫面突然翻轉，先檢查是否選錯層、角度差過大或有多餘旋轉 Key。Null 分層讓工作更好管理，但不是保證所有旋轉狀況都沒有萬向鎖。','做一版只有 H 的鏡頭，再加上 P；比較終點主角在畫面中的位置。',['左右與上下分在不同 Null','畫面沒有意外歪斜','起中末都看得到主角'],'上下構圖需要微調，這套架構應先選？',['CAM_PITCH 的 R.P','Camera 的縮放','外層 P.X'],0,'內層 Null 專門負責 Pitch，讓俯仰調整不必重改外層平移。'),
 lesson('null-05','F-Curve：從會動到移動舒服',6,'直線等速，曲線加減速；先分軌看，再合起來播放。','影片從角色的 Linear 位移，轉到相機的 Spline 曲線，並反覆修正切線。曲線橫軸是時間、縱軸是參數值；位置曲線的斜率反映該通道變化快慢。每條軌道各自平順，合成後的鏡頭仍需要播放檢查。',[
  '先記住起點與終點構圖，選一條 Position 軌道的兩個 Key，比較 Linear 與 Spline。',
  'Linear 作為等速對照；Spline 可用 Auto No Overshoot 等切線預設作起點，再觀察是否出現超過起終值的回彈。',
  '單獨調 X 的時間節奏，再檢查 Y，最後看相機 Z；不要一次改所有曲線而失去比較基準。',
  '若想柔和起步與停下，讓首末位置曲線的切線較平；若物件持續穿越畫面，不一定要在每個 Key 都停住。',
  '把 H、P 一起打開，檢查靠近主角時是否轉得太急、鏡頭穿模，或突然看向地板。',
  '用正常播放速度看完整鏡頭，再慢慢拖時間軸定位問題影格。'
 ],'F-Curve 的曲線形狀不是相機在空間中的路線圖。父層旋轉與子層位移疊加後，世界空間速度不一定等速；最後仍以完整播放為準。','同一組起終構圖輸出 Linear 與 Spline 兩版預覽，選一版說明原因。',['保留起終構圖','比較直線與曲線','無意外回彈','完整播放沒有突然停頓'],'位置 F-Curve 越陡通常表示？',['該位置通道變化越快','畫面一定更亮','相機焦距更長'],0,'斜率是該通道每單位時間的變化量，並不直接等於合成後的世界移動速度。',curvesSource),
 lesson('null-06','作業：掃描機出口的揭曉鏡頭',12,'用 Null 控制架拍出一支 3 秒的場景運鏡。','延續第四章的掃描機與行李箱：鏡頭從較遠的位置開始，沿場景平移、稍微升高，再推近出口的行李箱。影片的角色可以直接換成你的行李箱；這次評量相機控制與節奏，不要求重做材質或複製角色模型。',[
  '先做兩張構圖：起點看見掃描機與輸送帶，終點清楚看見行李箱。先讓行李箱靜止，完成相機後再選擇是否加入輸送動畫。',
  '建立並命名 CAM_ROOT → CAM_PITCH → Camera，確認機器和行李箱在架構外。',
  '在 0 與 89 格分別設定 X／Y 平移與 Camera 局部 Z；視構圖需要加外層 H、內層 P。不要為了湊數加入不必要的動作。',
  '以 F-Curve 修正速度，檢查 0、45、89 格及完整播放，避免穿模、空畫面與地平線意外傾斜。',
  'Viewport Renderer 先輸出 1280 × 720、30 FPS、0–89 格、Frame Step 1 的 PNG 序列，共 90 張。',
  '交付 3 秒預覽、相機階層截圖、X／Y／Z 曲線截圖；註明每條軌道控制哪一層。想進一步練習，再套用第三章的 Octane 輸出。'
 ],'錄影中時間軸使用到 90F；本作業統一採 0–89F 輸出，30 FPS 恰好 3 秒。先固定 FPS 再設 Key。沒有角色模型可用有貼紙的行李箱或簡單方塊替代。','交 3 秒運鏡影片＋1 張 Null 階層圖＋1 張可辨認 X／Y／Z 的曲線圖，說明一次你用單一控制層解決構圖問題的調整。',['3 秒且完整 90 張序列','Null 層級與命名清楚','能分辨位置與旋轉軌道','主角清楚且鏡頭不穿模','繳交預覽與兩張操作截圖'],'發現終點需要更靠近主角，最先小幅調整？',['Camera 的局部 P.Z','整個場景縮放','所有曲線同時拉大'],0,'依功能找到負責前後距離的相機 Z 軌道，再回看整段運鏡。')
]};

export const nullObservations=[
 {time:45,label:'00:45｜角色 X 等速移動',image:'linear',detail:'角色 Position.X 的 Linear 曲線，與後面的相機運鏡分開。'},
 {time:100,label:'01:40｜三層相機階層',image:'hierarchy',detail:'外層 H＋平移、內層 P、相機前進後退。'},
 {time:180,label:'03:00｜外層 X 的緩入緩出',image:'x-curve',detail:'只選外層 Null 的 Position.X，比較曲線與畫面。'},
 {time:220,label:'03:40｜內層 Pitch 曲線',image:'pitch',detail:'Rotation.P 單獨改上下構圖。'},
 {time:280,label:'04:40｜加入 Y 升降',image:'y-curve',detail:'Position.Y 分開調整，不必改其他通道。'},
 {time:370,label:'06:10｜檢查 Null 與場景位置',image:'pivot',detail:'外部視角查看相機架，避免只看相機畫面。'},
 {time:440,label:'07:20｜相機局部 Z 推近',image:'z-curve',detail:'相機的 Position.Z 藍色曲線控制前後距離。'}
];
