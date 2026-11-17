# 零点引擎主网站 · GitHub Pages

线上地址：https://stevenlau2000.github.io/ZeroEngine/

## 当前版本
- **站点版本**：V1.4 · 2026.11.10（含「定位与边界」栏目）
- **部署包版本**：2026-11-17-v5
- **部署日期**：2026-11-17

## 说明
本仓库托管零点引擎主网站静态站点（单页，CSS/JS 全内联，无构建步骤）。
`index.html` + `assets/` 即完整站点；`.nojekyll` 确保 GitHub Pages 正确处理下划线资源。

- WorkBuddy 渠道合作入口指向正式介绍站：https://stevenlau2000.github.io/workbuddy-intro/
- 豆包Work 渠道合作入口指向：https://stevenlau2000.github.io/volcengine-liushi/
- 千问Work / 纳米Work 入口待更新（占位状态）

## 更新 SOP
1. 从部署包 `零点引擎主网站_部署包_20261117_V14定位与边界/site/` 取 `index.html` 与 `assets/`；
2. 通过 GitHub Contents API 或 git push 推送到本仓库 `main` 分支；
3. 等待 Pages 构建（通常 1-2 分钟），核验线上标题、版本号、外链与图片；
4. 若变更外链/版本 pill，须同步 `check_site.py` 的白名单与断言后再打包。

> 本仓库原托管 WorkBuddy 介绍站；介绍站已于 2026-11-12 迁至 `Stevenlau2000/workbuddy-intro`，本仓库自 2026-11-17 起恢复为主网站用途。
