# WorkBuddy 介绍站 · ZeroEngine Pages

本仓库托管「WorkBuddy 是什么｜给每个岗位，配一位数字员工」静态介绍站，供零点引擎主站
「产品矩阵 → 通用智能体 → WorkBuddy 渠道合作入口」跳转使用。

## 站点结构

```
├── index.html          入口
├── styles.css
├── app.js
├── assets/
│   ├── posters/        演示与案例封面图
│   ├── videos/         9 段演示视频（intro-full.mp4 约 13MB）
│   ├── cases/          12 段案例视频
│   ├── wb-logo.svg
│   └── lingdian-logo.svg
└── .nojekyll           禁用 Jekyll，按静态文件原样托管
```

共 47 个站点文件 / 约 30MB，全部使用相对路径，无第三方图片外链。

## 正式访问地址

启用 GitHub Pages 后：

```
https://stevenlau2000.github.io/ZeroEngine/
```

**启用方式（一次即可）**：仓库 Settings → Pages → Build and deployment →
Source 选 `Deploy from a branch` → Branch 选 `main` / `(root)` → Save。
也可用 API：`POST /repos/Stevenlau2000/ZeroEngine/pages`，body `{"source":{"branch":"main","path":"/"}}`。

## 更新 SOP

1. 改源站 `Workbuddy培训/workbuddy-intro-site/`（或拿到新版介绍站文件）。
2. **整体覆盖**本仓库根目录，保持目录名与文件名不变 —— 页面按相对路径引用资源。
3. `commit` + `push` 到 `main`，Pages 会自动重新部署（约 1–2 分钟）。
4. 核验：`curl -I https://stevenlau2000.github.io/ZeroEngine/` 与
   `/assets/videos/intro-full.mp4` 均为 200，且首页标题为「WorkBuddy 是什么」。

## 注意

- 视频较大，请勿改名或改成外链；页面与 CSS/JS 均按相对路径引用。
- 零点引擎主站与部署包里的入口目前仍是站内相对链接 `workbuddy-intro/index.html`。
  若要统一切到本线上 URL，须同步修改主站 `check_site.py` 的 `WB_INTRO_HREF` / F07d 断言
  （现有护栏禁止未授权外链），并重打包部署包。
