import type {Lesson, Module} from './course';
const extrude='https://help.maxon.net/c4d/en-us/Content/html/OEXTRUDE.html';
const boole='https://help.maxon.net/c4d/en-us/Content/html/OBOOLE-ID_OBJECTPROPERTIES.html';
const cloner='https://help.maxon.net/c4d/2025/en-us/Content/html/OMOGRAPH_CLONER-ID_OBJECTPROPERTIES.html';
export const playerReference='https://www.behance.net/gallery/206950771/SW-1-Music-Player';
function L(id:string,title:string,minutes:number,summary:string,note:string,steps:string[],tips:string,practice:string,checklist:string[],question:string,options:string[],answer:number,explanation:string,source:string,sourceTitle:string):Lesson{
 return {id,title,minutes,summary,note,steps,tips,practice,checklist,quiz:{question,options,answer,explanation},video:'',source,sourceTitle,demo:'none'};
}
export const player:Module={id:'player',level:'intermediate',title:'產品建模：音樂播放器',subtitle:'Spline / Extrude / Boolean / Cloner',lessons:[
 L('04-01','Spline：先畫出模型輪廓',8,'先畫平面輪廓，再讓它變成立體。','Spline 是輪廓線。封閉線可以形成有封口的外殼；開放線比較適合路徑。先用 Rectangle 練習圓角，再用 Spline Pen 畫自己的輪廓。本章的尺寸都是練習起點，可按構圖調整。',
 ['用 Shift + C 建立 Rectangle，Plane 選 XY。','Width 與 Height 都設 400 cm，勾 Rounding，Radius 試 50 cm。','切到正面視圖，檢查圓角；先保留參數物件。','另建練習線，用 Spline Pen 在同一平面放四個點，回到起點閉合，或勾 Close Spline。','想改 Rectangle 的點，先複製備份，再按 C 轉可編輯線段，在點模式移動一個點。','輪廓命名 Spline_Outer，確認沒有交叉或多餘的小線段。'],
 '線看起來接近不代表閉合。先查 Close Spline、端點與自交；所有點保持同一平面。','建立圓角矩形與一條自己畫的封閉輪廓，先不加材質。',['輪廓在同一平面','矩形有圓角','自己畫的線確實閉合'],'要做有封口的外殼，先檢查？',['輪廓有沒有閉合','採樣數量','燈板亮度'],0,'先確認輪廓完整，再增加厚度。',extrude,'Maxon · Spline 與 Extrude'),
 L('04-02','Extrude：線段擠出厚度',12,'用一條輪廓建立圓角主體。','Spline 決定正面形狀，Extrude 的距離決定深度。把線段放進 Extrude 下一層，就能保留輪廓、厚度與圓角的調整空間。本課用 Extrude 生成器，不是多邊形面的擠出指令。',
 ['用上一課圓角 Rectangle，再用 Shift + C 建立 Extrude。','把 Rectangle 拖進 Extrude，縮排一層：Extrude → Rectangle。','XY 輪廓沿 Z 擠出 40 cm；依版本使用 Direction／Offset 或 Movement。','Caps 開啟前後封口，從透視視圖確認有實體厚度。','Caps 倒角先試 2 cm、3 段，觀察邊緣有沒有互相穿插。','調 Rectangle 尺寸或 Radius，確認模型跟著更新。','命名 Body_Outer，保存檔案；下一課用另一組 Extrude 切槽。'],
 '沒有厚度就查父子關係、方向與距離；封口不見就查輪廓與 Caps。倒角要比最窄細節小。','建立 400 × 400 cm、厚 40 cm 的圓角主體，保留可調參數。',['線段是 Extrude 子物件','擠出方向正確','前後封口可見','輪廓仍可修改'],'Extrude 下應放哪個物件？',['相機','Spline 輪廓','燈板'],1,'生成器把子層線段沿指定方向拉出厚度。',extrude,'Maxon · Extrude Object'),
 L('04-03','Boolean：挖槽與布林方塊',12,'A 是留下的主體，B 是切割工具。','差集就是 A 減去 B。讓兩個實體重疊，再指定順序。教師截圖使用兩組 Rectangle＋Extrude 放入 MeshBoolean 1.8 做圓角內槽；也能先用內建 Boole 練同一概念。',
 ['複製 Body_Outer 作切割組 Cutter_Recess；Rectangle 改 340 × 340 cm，Radius 試 40 cm。','外殼擠出 40 cm，切割組擠出 60 cm。沿 Z 移動切割組，只切入正面約 25 cm，留約 15 cm 背板；側視確認交集。','內建 Boole：Body_Outer 第一個子層、Cutter_Recess 第二個，選 A Subtract B。','MeshBoolean 1.8：同樣指定主體、切割組與差集；精確按鈕以你安裝版本和教師錄影為準。','把切割組加深穿過背面，觀察凹槽變通孔，再回到保留背板的版本。','另建 Cube 與軸向 Z 的 Cylinder，讓圓柱穿過方塊，用差集挖圓孔。','用側光查切面，倒角先用小值；保存原始生成器，避免過早全部轉成可編輯。'],
 '切不到先查交集與 A／B 順序。避免切割面剛好貼著主體表面。槽穿了背板，就縮短切割深度。','完成圓角凹槽外殼與圓孔方塊，各存正面、側面截圖。',['差集留下正確主體','凹槽保留背板','圓柱切出圓孔','原始物件可調整'],'A Subtract B 留下？',['B 的全部體積','A 扣掉與 B 重疊的部分','兩者交集'],1,'A 是主體，B 移除相交區域。',boole,'Maxon · Boole 差集'),
 L('04-04','Cloner：撒柱子，挖出一排孔',14,'一根柱子複製成切割工具，整批挖孔。','Cylinder 放進 Cloner，就能一起調所有柱子的半徑。規則孔洞先用 Grid Array；想撒得不規則，再加小量 Random。這些柱子代表要挖掉的空間。',
 ['建立 Cube：120 × 120 × 12 cm，正面朝 Z。','Cylinder：Radius 3 cm、Height 30 cm、軸向 Z，穿過方塊前後表面。','Cylinder 放入 Cloner，先用 Linear 排 5 根，間距約 16 cm，位置落在主體內。','改 Grid Array：X、Y 各 5 個，Z 只 1 層；整組覆蓋約 64 × 64 cm。依 Size／Spacing 模式調到約 16 cm 間距。','Boole 的 A 放 Cube、B 放 Cloner。版本不接受生成器時，複製 Cloner 備份，用 Current State to Object，將柱子合併成一個切割網格再試。','MeshBoolean 1.8 同樣指定主體與柱子群做差集；不接受生成器時，用上一步備份轉換方式。','想撒柱子：加 Random，只小量改 X／Y 位置，先關旋轉與縮放，避免孔洞相撞或超出邊界。','先確認 25 孔再加數量。修改時可暫停布林，只看柱子排列。'],
 '柱子重疊、孔落在倒角或薄壁消失，都會讓結果難檢查。先用少量，並確認完整切割群。','做一塊 5 × 5 孔面板，另存輕微隨機排列版。',['柱子軸向正確且穿過方塊','Cloner 只有一層深度','完成 25 個孔','孔間有實體間隔'],'柱子在這個布林練習代表？',['要挖掉的體積','最終燈光','相機路徑'],0,'柱子群是 B，從主體 A 中減去。',cloner,'Maxon · Cloner 排列模式'),
 L('04-05','組裝：外殼、螢幕與旋鈕',12,'用基本形狀組成可讀的產品。','以 SW-1 Music Player 為造型參考，先做自己的簡化練習版。拆成薄型外殼、深色螢幕、圓形旋鈕、按鈕與背面孔洞，先看比例再補細節。',
 ['開參考連結看正面、側面與背面，草圖標出主要零件。','練習尺寸約 120 × 180 × 12 cm：Rectangle → Extrude 建圓角外殼。','較小的 Extrude 切正面凹槽、留背板；槽內放薄深色螢幕，避免與表面共面。','用軸向 Z 的 Cylinder 做下方旋鈕，加小倒角，與螢幕留空間。','小 Cube／Extrude 做側邊按鈕；背面用柱子群挖孔，避開邊框及旋鈕區域。','外殼用金屬、螢幕用深色材質。先檢查灰模輪廓，再看金屬高光。','模型放 PRODUCT Null，切割群命名 CUTTERS，保存可修改版本。'],
 '先修外殼厚度與比例。螢幕閃爍時查共面，把表面稍微分開。孔洞數量不要蓋過主要形狀。','完成播放器灰模與材質測試圖，看得到外殼厚度、螢幕及旋鈕。',['薄型外殼與凹槽','螢幕和旋鈕清楚','至少一區規則孔洞','物件名稱清楚'],'組裝時最先確定？',['幾百個小螺絲','外殼與主要零件比例','最高採樣'],1,'先讓大形狀成立，再加細節。',playerReference,'作品參考 · SW-1 Music Player / Steelworks Studio 等創作者'),
 L('04-06','作業：我的音樂播放器',30,'把建模、材質與打燈做成產品短片。','以 SW-1 為參考完成自己的簡化播放器：線段建外殼、布林挖槽、Cloner 挖孔，再用 Octane 打燈。30 分鐘是課內收尾與檢查時間，第一次做完整模型可以分次練習。',
 ['至少有圓角外殼、螢幕、旋鈕和重複孔洞；保留 Spline／Extrude 與切割群。','至少兩種可辨認材質，例如銀色金屬外殼、深色螢幕，按鈕可用霧面材質。','先 Key 燈板找長條高光，再加 Rim 和低強度 Texture Environment，保留主光方向。','用三分之四視角看正面及厚度，再拍孔洞或旋鈕特寫。','PRODUCT Null 在 0、89 格設旋轉 Key，做 3 秒小幅轉動；也可讓旋鈕慢轉。','先 Viewport Render 查動作，再 Octane 測首中末，檢查穿插、反射、孔洞和噪點。','輸出 0–89 格、30 FPS 圖片序列，合成 3 秒影片，尺寸先用 1280 × 720。','交可編輯 C4D 檔、影片、全景及細節圖、物件階層截圖；展示時附原作連結與創作者，標明學習練習。'],
 '先做乾淨的簡化版。時間不足就保留少量但正確的孔，先修比例、倒角與高光。','提交 C4D 可編輯檔、3 秒動畫、全景與細節圖、物件階層截圖；展示 Spline＋Extrude、Boolean、Cloner 挖孔三種做法。',['Spline＋Extrude 建外殼','Boolean 有凹槽或通孔','Cloner 完成重複挖孔','兩種材質可辨認','3 秒動畫沒有明顯穿插','附模型檔、截圖及參考來源'],'作業合格的重點？',['照抄所有細節','三種做法可檢查，形狀與動畫清楚','只交螢幕截圖'],1,'可修改的模型與完整輸出，比堆滿細節更適合第一次練習。',playerReference,'作業參考 · SW-1 Music Player / Steelworks Studio 等創作者')
]};
