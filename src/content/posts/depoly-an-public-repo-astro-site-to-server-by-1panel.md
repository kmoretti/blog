---
title: "通过 1Panel 部署 Astro 站点到服务器——公开仓库篇"
description: "部署平台太拉垮？那就上服务器！"
date: 2026-03-13
tags: ["Astro", "部署", "1Panel", "GitHub Actions"]
categories: ["技术"]
---

## 碎碎念

之前博客一直用的 Vercel 部署，然后为了提速就让服务器反代了一下。

结果发现 Vercel 的防火墙他太离谱了，用几下就给我拦截/质询。

![截止文章发布的前一天数据](https://blog-assets.ooowl.net/images/20260218/20260218114150083.png)

▲ 截止 2026/2/18 的质询数据，其中下午已经切换服务器部署，故无数据。

然后我尝试关掉 Vercel Firewall，结果发现他压根没有关闭入口🤪。好好好，那我设置一个 bypass 规则呗～

结果他的 Bypass 规则要 Pro Plan 才能用，玩我呢🤮。

![可恶的 bypass 要 pro](https://blog-assets.ooowl.net/images/20260218/20260218114445364.png)

好好好，你不让我绕过你的防火墙，那我就不要你了呗。我服务器摆在那里不是吃素的谢谢，直接上！

参考六神的 [1Panel自动同步Github仓库](https://blog.liushen.fun/posts/327826ac/)，然后手搓了一个 Action 并让 Gemini 修了修一些问题，现在已经是完全的服务器部署啦～

## 准备工作：创建站点

本片教程适用于 GitHub 中设置为 `public` 的朋友，如果你是 `private` 仓库，请耐心等待另一篇教程😅～

首先在 1Panel 上创建一个**静态网站**，根据自己的需要配置好域名代号端口 HTTPS 这些内容，确认。

![1panel创建网站](https://blog-assets.ooowl.net/images/20260313/20260313225341365.png)

然后进入网站详细信息，找到 `网站目录`，记下 `root 目录` 这一参数。

![网站目录页面](https://blog-assets.ooowl.net/images/20260313/20260313230321048.png)

然后在侧边栏找到 `系统` - `SSH管理`，创建一个 SSH 密钥并记下**私钥**。

![创建密钥](https://blog-assets.ooowl.net/images/20260313/20260313231020764.png)

<img src="https://blog-assets.ooowl.net/images/20260313/20260313231110085.png" alt="存下私钥" style="zoom:33%;" />

## 配置仓库 Secrets

当这些准备完成之后，就可以开始着手配置 GitHub 的仓库 Secrets 了。

在你的 Astro 项目 GitHub 仓库中，进入 `Settings` - `Secrets and variables` - `Actions`，添加以下变量：

- `SERVER_IP`: 服务器公网 IP。
- `USERNAME`: SSH 用户名（通常为 `root`）。
- `PORT`: SSH 端口（默认 `22`）。
- `KEY`: 你的 SSH 私钥（刚刚存下的私钥）。
- `PASSPHRASE`: 如果私钥设置了密码则填入，否则留空

![仓库密钥设置页面](https://blog-assets.ooowl.net/images/20260313/20260313231337323.png)

## 创建 Action 文件

回到仓库根目录，创建一个 `.github/workflows/build.yml`（其中 `build` 可以是你喜欢的任何英文文件名），内容如下：

```yml
name: Astro 1Panel Depoly

on:
  push:
    branches:
      - main

permissions:
  contents: write

env:
  TZ: Asia/Shanghai

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检查
        uses: actions/checkout@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: 安装依赖
        run: |
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
      - name: 构建
        run: npm run build

      - name: 构建静态产物到 deploy 分支
        run: |
          cd dist
          git init
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          git add .
          git commit -m "Deploy: ${{ github.event.head_commit.message }} [$(date +'%Y-%m-%d %H:%M:%S')]"
          # 强制推送到仓库的 deploy 分支
          git push --force --quiet "https://${{ github.actor }}:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git" master:deploy
      - name: 推送至服务器
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          passphrase: ${{ secrets.PASSPHRASE }}
          port: ${{ secrets.PORT }}
          script: |
          	# 请将 SITE_DIR 设置为你的站点目录
            SITE_DIR=""
            mkdir -p $SITE_DIR
            cd $SITE_DIR
            git config --global --add safe.directory $SITE_DIR
            if [ ! -d ".git" ]; then
              git init
              git remote add origin https://github.com/${{ github.repository }}.git
            else
              git remote set-url origin https://github.com/${{ github.repository }}.git
            fi
            git fetch origin deploy --depth=1
            git reset --hard origin/deploy
            git checkout -f deploy
            git clean -fd
            chown -R 1000:1000 $SITE_DIR
            echo "Build successfully deployed to server at $(date +'%Y-%m-%d %H:%M:%S')!"
```

其中，在推送部分的 script 中，你需要将 `SITE_DIR` 这一变量设置为刚刚存下的 1Panel 站点目录，比如 `/opt/1panel/www/sites/www.example.com/index`。

保存文件，推送。当以上内容完成之后，恭喜你🎉，你已经可以成功的将你的 Astro 站点部署至服务器上！

每当出现新的推送时，这个 Action 会自动触发运行，不需要人为的任何干预，不过需要注意在构建中出现的报错！
