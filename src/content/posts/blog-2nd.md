---
title: "博客两周年，换框架？"
description: "时间真快，不知不觉两周年了"
date: 2025-04-05
tags: ["博客", "周年", "建站"]
categories: ["博客"]
---

是的，我的博客又又又又换框架了……

不管你细不细心，你应该都会发现这个问题。

如果你访问本站比较勤快且很早开始访问本站，你应该发现这是今年的第 2 版，本博的第 5 版。

不知道各位想不想问一个问题：为什么换？

## 博客变化

### 2023

使用了一个二级域名，用 Hexo + Anzhiyu 主题，0 篇文章。

### 2024（上半年）

域名 ohdragonboi.cn 注册，使用 Hexo + Solitude 主题，写了 3 篇文章。

<img src="https://jsd.onmicrosoft.cn/gh/fenychn0206/picx-images-hosting@master/blog2024-1.JPG" alt="blog2024-1" style="zoom: 33%;" />

▲ 2024 上半年博客状态，这里因为 Wayback Machine 没有爬到，放了张当时手机的截图

### 2024（下半年）

换了一个域名 setbun.com，使用 Hexo + Redefine 主题，文章多了些许、访客多了几个。

![blog2024](https://jsd.onmicrosoft.cn/gh/fenychn0206/picx-images-hosting@master/setimg-%E6%88%AA%E5%B1%8F2025-04-05-%E4%B8%8B%E5%8D%8810.32.20.45v2158oi.webp)

### 2024（年底）

这属于一个半成品，废了，使用 Astro。

![blog2024](https://jsd.onmicrosoft.cn/gh/fenychn0206/picx-images-hosting@master/%E6%88%AA%E5%B1%8F2025-04-05-%E4%B8%8B%E5%8D%8810.35.29.8l09lopgxq.webp)

▲ 其实这个做出来效果是不错的，但是因为配置复杂被我放弃了

### 2025（1-3 月博客重构计划开始）

域名换回 ohdragonboi.cn，使用 Hexo + Redefine 主题，基本可以说只写了配置文件，其他什么也没干。

![blog-2025start](https://jsd.onmicrosoft.cn/gh/fenychn0206/picx-images-hosting@master/%E6%88%AA%E5%B1%8F2025-04-05-%E4%B8%8B%E5%8D%8810.38.32.99tj5pgwol.webp)

▲ 该死的 Wayback Machine 把样式表吃的差不多了

### 2025（4 月愚人节重生）

就是你现在看到的这个东西，采用 Astro 构建。

![blog-2025respawnqwq](https://jsd.onmicrosoft.cn/gh/fenychn0206/picx-images-hosting@master/%E6%88%AA%E5%B1%8F2025-04-05-%E4%B8%8B%E5%8D%8810.40.35.7egyd373a2.webp)

## 我想说的

多次更换博客框架，主要是为了提现个人认为的个人博客的特点：简单、个性、记录为主

前些阵子用的 Anzhiyu 和 Solitude 主题，配置文件比较复杂。虽然好看花哨，但对于我这种学业为主的学生来说，配置、维护一个这样的博客还是挺麻烦的。特别是开源社区更新频繁，如果你能够抽出来维护博客的时间很少，那么你很有可能无法专注于写作而是配置花里胡哨的博客。

换成 Redefine 主题，一是因为喜欢，而是因为作者也是个大忙人。大忙人对于项目的 Release 发布自然是频率比较慢的，而且我也能适应。

但是是我放弃的原因，是因为 Hexo 主题的页面模板。其实也不是怎么怎么样吧，反正我觉得 Hexo 和类似适用主题驱动的**静态框架**这麻烦那麻烦。

这时候聪明的你可能会问：动态框架呢？

相比起动态，静态框架还是省心的多。因为动态牵扯服务器，服务器又牵扯到更多安全问题等等。

最后我换成了 Astro，因为 Astro 我可以不因为主题更新而烦恼，甚至我还可以通过大佬的东西进行修改。而且 Typography 这个主题就非常适合我的所需。

> 对于博客，我仅仅需要一个能放文章、友链和简单页面的东西。

毕竟你建了一个博客，更多的是自娱自乐，因为现在许多人喜欢在知乎等平台写文章、答疑问题，博客在你不是知名人物或 SEO 做得特别棒，你是不会有什么人来看的对吧。

### 对于评论

评论我也是换了又换，线路如下

Waline + LeanCloud → Twikoo + MongoDB → Artalk → Waline + Deta → Waline + Postgres → Giscus

毕竟是个人博客，我认为其实没有必要用很复杂的评论系统。自部署更没必要了，数据库啥的也不重要，现成的最棒！

最后选择 Giscus，这款评论系统简洁、开源、使用 GitHub API（只要 GitHub 不倒闭，数据就不会丢），就没有什么不香的。

## 博客接下来的发展

现在新博客基本迁移完了，还差的内容如下：

项目
解决方案

截止今天，还需搬迁 6 篇文章（废了部分烂稿）
字面意思

统一所有题解格式
字面意思

友链页面处理
先用一个 Markdown 列表凑合，后续准备写一个页面或者独立出单独的站点

博客关联项目
开往、无聊湾、十年之约、萌备（好像要换域名）、Kegongteng 的友链

## 感谢有你

在建博 2 年中，我认识了你们：

[EvanNotFound（开发方面问题解决、Redefine 作者）](https://ohevan.com)、[Kegongteng（邮箱问题反馈）](https://kegongteng.cn/)、[杜老师（博客活跃用户、运维大佬）](https://dusays.com/)、[CX330（使用 Redefine 主题时认识的）](https://cx330.tw/)

感谢你们在本博客的成长路上相伴！
