部署前簡短檢查與在 Vercel 部署步驟

1) 概要
- 此專案的 client build 輸出為 `dist/public`（已由 `pnpm run build` 產生）。
- 建議做法：把前端靜態站部署到 Vercel；後端 (Express) 保留在可長期運行 Node 的平台（Render / Railway / Fly / DigitalOcean）。

2) 在 Vercel 建專案（快速步驟）
- 登入 Vercel -> New Project -> Import Git Repository。
- 在 Project Settings 或 Import 設定中：
  - Install Command: `pnpm install`
  - Build Command: `pnpm run build`
  - Output Directory: `dist/public`

- Vercel 會使用你的 `pnpm-lock.yaml` 自動採用 `pnpm`。

3) 必要的 Environment Variables（在 Vercel 的 Project > Settings > Environment Variables 設定）
- 前端（Build 時必須注入，請為 Preview & Production 都設定）：
  - `VITE_OAUTH_PORTAL_URL` = (例如: https://api.example.com 或 https://your-backend.example.com)
  - `VITE_APP_ID` = (你的應用 id)

- 後端（若另行部署到 Render/Other）需設定的 env 範例：
  - `DATABASE_URL`, `JWT_SECRET`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, 等（視 server/_core/env.ts 而定）

4) 測試本地 build（在本機驗證）
```bash
pnpm install
pnpm run build
# 臨時啟靜態檔（需要 npx serve 或其他靜態 server）
npx serve dist/public -p 5000
# or
npx http-server dist/public -p 5000
```

5) 常見注意事項
- 如果前端需要在執行時呼叫後端 API，請確保 `VITE_OAUTH_PORTAL_URL` 指向正確的後端 URL（例如 `https://api.example.com`）。
- 若想把後端也放在 Vercel，需改寫為 serverless functions 或使用容器部署（較複雜）。

6) 我可以幫你：
- 協助在 Vercel 上建立專案的具體欄位設定文字（我可代你填入準備好的 env 清單），或
- 產生推送到遠端並按步驟完成部署的指引。
