import {env} from 'cloudflare:workers';
import {seed,withCourseUpdates,type Module} from './course';
export function db(){if(!env.DB)throw new Error('Database unavailable');return env.DB}
export async function readCourse(){const row=await db().prepare('SELECT payload,revision FROM course WHERE id = ?').bind('main').first<{payload:string;revision:number}>();return row?{modules:withCourseUpdates(JSON.parse(row.payload) as Module[]),revision:row.revision}:{modules:seed,revision:0}}
export async function readProgress(userId:string|null){if(!userId)return [];const rows=await db().prepare('SELECT lesson_id FROM progress WHERE user_id = ?').bind(userId).all<{lesson_id:string}>();return rows.results.map(r=>r.lesson_id)}
