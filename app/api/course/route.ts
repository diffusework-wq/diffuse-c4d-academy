import {z} from 'zod';
import {db,readCourse,readProgress} from '@/lib/storage';
import {drivePreview} from '@/lib/course';
export const dynamic='force-dynamic';
const text=z.string().max(12000),line=z.string().min(1).max(2000);
const lesson=z.object({id:z.string().regex(/^[a-zA-Z0-9_-]{1,60}$/),title:line,minutes:z.number().int().min(1).max(180),summary:line,note:text,steps:z.array(line).min(1).max(40),tips:text,practice:text,checklist:z.array(line).min(1).max(30),quiz:z.object({question:line,options:z.array(line).min(2).max(6),answer:z.number().int().min(0),explanation:text}).refine(q=>q.answer<q.options.length),video:z.string().max(2000).refine(v=>!v||!!drivePreview(v)),source:z.string().max(2000).refine(v=>{if(!v)return true;try{return new URL(v).protocol==='https:'}catch{return false}}),sourceTitle:text,demo:z.enum(['interface','keys','sequence','field','mask','light','none'])});
const payload=z.object({modules:z.array(z.object({id:line,title:line,subtitle:text,level:z.enum(['beginner','intermediate']).optional(),contentVersion:z.number().int().min(0).max(100).optional(),archivedLessons:z.array(lesson).max(60).optional(),lessons:z.array(lesson).min(1).max(60)})).min(1).max(10),revision:z.number().int().min(0)}).refine(p=>{const ids=p.modules.flatMap(m=>m.lessons.map(l=>l.id));return new Set(ids).size===ids.length});
export async function GET(request:Request){try{const c=await readCourse();return Response.json({...c,completed:await readProgress(request.headers.get('oai-authenticated-user-id'))},{headers:{'Cache-Control':'no-store'}})}catch(e){console.error('Course read failed',e);return Response.json({error:'課程暫時無法載入，請稍後重試。'},{status:503})}}
export async function PUT(request:Request){
 // This site's platform audience is owner-private. Keep owner-only access while this editor is enabled.
 if(!request.headers.get('oai-authenticated-user-id'))return Response.json({error:'請先登入網站。'},{status:401});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'無效的來源。'},{status:403});
 if(Number(request.headers.get('content-length')||0)>600000)return Response.json({error:'內容太大。'},{status:413});
 try{const parsed=payload.safeParse(await request.json());if(!parsed.success)return Response.json({error:'請檢查標題、步驟、分鐘數與影片連結；步驟不可留空行。'},{status:400});const p=parsed.data;
 const result=await db().prepare('INSERT INTO course (id,payload,revision,updated_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, revision = excluded.revision, updated_at = excluded.updated_at WHERE course.revision = ?').bind('main',JSON.stringify(p.modules),p.revision+1,new Date().toISOString(),p.revision).run();
 if(!result.meta.changes)return Response.json({error:'課程已在另一個視窗更新。草稿仍保留，請重新載入後合併修改。'},{status:409});return Response.json({modules:p.modules,revision:p.revision+1});
 }catch(e){console.error('Course save failed',e);return Response.json({error:'保存失敗，草稿仍保留，請稍後重試。'},{status:503})}}
