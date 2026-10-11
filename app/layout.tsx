import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Diffuse · C4D 學習室',description:'從零開始學習 Cinema 4D：30 分鐘入門、MoGraph 材質轉換、Octane 打燈與作品練習。',icons:{icon:'/diffuse-mark.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body>{children}</body></html>}
