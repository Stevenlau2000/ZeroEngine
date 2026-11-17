# 零点引擎主站（V6 场景联结版）

线上地址：https://stevenlau2000.github.io/ZeroEngine/

本仓库承载零点引擎官网线上版本，由 GitHub Pages 从 `main` 分支根路径直接发布（`.nojekyll` 关闭 Jekyll 处理）。

## 当前线上版本

| 项 | 值 |
|---|---|
| 版本 | V6 场景联结版 |
| 形态 | 单页锚点式官网（首屏 / 业务总览 / 数字AI / 物理AI / 融合方案 / 新手体验 / FAQ / 需求清单） |
| 页面 | `index.html` |
| 样式 | `style.css`（基础层）+ `v6-refine.css`（精修层） |
| 交互 | `app.js`（锚点导航、滚动进度、分类筛选、FAQ 展开） |
| 资源 | `assets/`（等距场景插画、产品萌宠、设备图、流程 SVG、LOGO、favicon） |

## 部署方式

站点为纯静态，无构建步骤。更新流程：替换 `index.html` / `style.css` / `v6-refine.css` / `app.js` / `assets/` 后推送到 `main`，Pages 自动重新构建。

## 维护约定

- 换版前保留上一版完整目录作为回滚锚点；回滚 = 反向推送上一版文件。
- `assets/` 内被引用的文件不可随意重命名，`index.html` 使用相对路径引用。
- 合规声明、免责措辞、「AI 生成示意」图注属合规资产，改版不得删除。
- 品牌色值以品牌手册 V1.4 为准（品牌黄 `#FFE200` / 引擎黑 `#0B0D10`）。
