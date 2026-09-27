# 皓洋包装厂官网 - 可部署版

## 已包含
- 中英文切换基础框架（导航与全站公共文案）
- WhatsApp 悬浮咨询按钮
- 邮箱询盘表单（FormSubmit，无需后端）
- About Us / Factory / Custom Packaging 独立页面
- SEO title / description / canonical / Open Graph / JSON-LD
- robots.txt / sitemap.xml，便于 Google 收录
- 滚动进入动画、悬浮卡片、轨道动画、跑马灯等效果
- 响应式手机端布局

## 上线前必须填写
编辑 `site-config.js`：
- whatsapp：国际区号+号码，只写数字，例如 8613812345678
- email：真实收件邮箱
- phone：电话
- wechat：微信号
- addressZh / addressEn：真实工厂地址
- domain：正式域名

同时把全部 HTML、robots.txt、sitemap.xml 中的 `https://YOUR-DOMAIN.com` 替换成正式域名。

## 邮件表单
网站使用 FormSubmit。首次客户提交后，你的收件邮箱会收到验证邮件，点击确认后，之后询盘会直接发到该邮箱。

## Google 收录
1. 部署网站并绑定正式域名。
2. 替换所有 `YOUR-DOMAIN.com`。
3. 在 Google Search Console 添加域名并验证。
4. 提交：`https://你的域名/sitemap.xml`。
5. 首页可在 Search Console 使用“请求编入索引”。

## 部署
这是纯静态网站，可直接部署到 Vercel、Netlify、GitHub Pages、Cloudflare Pages、宝塔或 cPanel。

Website update 2026-09-27
