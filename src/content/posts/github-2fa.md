---
title: "Github：设置两步验证（2FA）"
description: "两步验证，为你的账户安全保驾护航"
date: 2024-04-26
tags: ["GitHub", "安全", "2FA"]
categories: ["技术"]
---

## 前言

今天准备上Github传项目，结果收到要求两步验证的提示。于是我翻了一下Github博客

![Github官方博客指明了必须添加两步验证](https://s2.loli.net/2025/09/06/clK9VkvNhiYGmDT.webp)

[博客链接](https://github.blog/2023-03-09-raising-the-bar-for-software-security-github-2fa-begins-march-13/)

这篇新闻总的意思来说就是要求用户必须添加“两步验证”方式，否则无法访问某些功能

这里给大家出了一个设置Github两步验证的教程，希望大家喜欢！

## 1. 找到Github设置“两步验证”的地方

在Github设置可以找到，不过你可以通过下面的链接👇快速进入

[https://github.com/settings/two_factor_authentication/setup/intro](https://github.com/settings/two_factor_authentication/setup/intro)

进入后应该会看到这样的界面

![Github“两步验证（2FA）“设置中心](https://s2.loli.net/2025/09/06/nUaADWLFt9Ymdfi.webp)

## 2. 使用“两步验证”App进行验证

这里先把电脑放一边，拿出移动设备（手机或平板，为了排版好看我使用的是iPad），下载一个两步验证App（推荐1Password和Microsoft Authenticator，我比较喜欢用Microsoft Authenticator）。下载完成后，打开你的两步验证App：

![Microsoft Authenticator主界面](https://s2.loli.net/2025/09/06/2Bfwpq9EbUum7MQ.webp)

这里以Microsoft Authenticator为例，进入后点击右上角加号会看到如下界面

![Microsoft Authenticator账户选择页面](https://s2.loli.net/2025/09/06/tAvJqsMP7469OFm.webp)

点击“其他”（另外的是Microsoft帐户，如果使用了Microsoft365订阅，应该用过这个），会出现一个扫码界面，只需扫描刚刚Github出现的二维码就可以了！

![扫描红框里的二维码](https://s2.loli.net/2025/09/06/7A2V8Meqf1zhQyj.webp)

扫描之后你的两步验证App应该会出现以下界面

![img](https://s2.loli.net/2025/09/06/Dax9F5TLy2n6AZB.webp)

可以看到两步验证App中已经添加了Github了

这时候你会得到一串数字，将其填入刚刚Github页面的输入框中（在30秒内，否则数字会更换，这时候如果没有及时填入就只能填新的了）

![在红框内填入那串数字](https://s2.loli.net/2025/09/06/PcTwHB3xZVGNviS.webp)

## 3. 备份“两步验证数据”

> 这里我操作的时候忘截图了，遇到问题的可以问题评论一下

首先点击Download按钮，下载一个txt文件，请将此文件妥善保管，这是很重要的备份信息！！

然后会发现下面激活“下一步”按钮，点击它进行下一步

## 4. VOILA!

![成功设置“两步验证”页面](https://s2.loli.net/2025/09/06/y6E7sqTF8enM5CS.webp)

看到这个界面，就说明成功啦！！那么本次教程也就进入尾声啦～

## 总结

本次教程主要是说明了在Github上设置“两步验证”的方法～新人作者，烦请各位大佬指点！有任何问题欢迎评论，虽然很忙，但一定会看的！
