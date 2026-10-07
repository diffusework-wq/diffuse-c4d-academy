# Diffuse C4D 學習室

互動式 Cinema 4D 課程原始碼，提供初階與中階課程、可收合目錄、可編輯教學筆記、Google Drive 錄影連結與學習進度。介面以 Diffuse Studio OS 為設計參考。

## 本機開發

此專案使用 Vinext 與 Cloudflare Workers，API 與教師內容管理依賴 Cloudflare D1，使用者登入則依賴目前 Sites 平台提供的身分服務。GitHub Pages 為靜態主機，無法直接執行這些 API 與資料庫功能。

部署前需要設定自己的 Cloudflare Worker、D1 資料庫與教師存取控制；請勿將平台金鑰或環境變數提交至 GitHub。網站目前仍由原 Sites 主機服務。

```bash
npm install
npm run dev
npm run build
```

課程預設內容位於 `lib/course.ts`，資料庫 schema 和 migrations 位於 `db/` 與 `drizzle/`。