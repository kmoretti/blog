---
title: "算法竞赛：拥有一个顺手的 IDE · Windows 篇"
description: "Sublime Text了解一下？"
date: 2025-07-02
tags: ["算法竞赛", "Windows", "开发环境"]
categories: ["技术"]
---

如果你第一次学习 OI，你一定会了解一个名为 Dev-C++ 的编辑器。

![Dev-C++](https://s2.loli.net/2025/09/06/5CFJbGOHijlUQv9.webp)

▲ Dev-C++

这的确是一个易于上手的编辑器，教练为我们安装的版本自带编译器、且不需要过多的配置就可以上手写代码。

但是他的缺陷也暴露了出来：Dev-C++ 本质上作为一个开发编辑器，其开箱即用（不需要个性化设置）的特点已经局限了他（对于我们算法竞赛不是特别的方便）。那么，我们又该何从下手呢？

## 选择一个编辑器

市面上的代码编辑器有很多，比如微软的 [Visual Studio Code](https://code.visualstudio.com/)，[CP Editor](https://cpeditor.org/zh/)、Sublime 公司的 [Sublime Text](https://sublimetext.com)。

这三款编辑器是非常适合作为 OIer 日常使用的，其中 CP Editor 是一款开箱即用的，支持导入测试点的编辑器，如果你不喜欢折腾，那么 CP Editor 一定是你的不二之选！

## Sublime Text

Sublime Text 是一款轻量级编辑器，拥有许多可以个性化的内容。

如果你想要尝试，请跟随本文操作、配置。

注意：本教程为 Windows 教程！

## 下载 Sublime Text

打开官网：[sublimetext.com](https://sublimetext.com)

![官方网站](https://s2.loli.net/2025/09/06/QUqSYRA5jiH8NyW.webp)

▲ Sublime Text 官网

打开之后不要被满屏的英文吓住，直接点击“DOWNLOAD FOR WINDOWS”下载。

下载之后一路下一步安装，打开，你就可以继续跟着本文配置了！

## （可选）插件安装器

首先按下 `Control` + `Shift` + `P` 打开操作面板，输入 `Install` 后点击“Install Package Control”安装插件安装器，等待一会会出现弹窗提示，然后就安装好了！

## （可选）中文

此操作需要安装插件安装器。

在安装好插件安装器的情况下，按下 `Control` + `Shift` + `P` 打开操作面板，输入 `Install` 后选择 “Package Control: Install Package”。

![操作 1](https://s2.loli.net/2025/09/06/yWNjnizEwo8pUdT.webp)

加载比较慢，不要着急，等他弹出来之后输入 `Chinese`，然后选择“ChineseLocalizations”

![操作 2](https://s2.loli.net/2025/09/06/kQtFT8lDZriYCWb.webp)

安装的时候等待一下，会弹出来一个叫“Package Control Messages”的文件（会帮你打开），上面给出了方法。

![操作 3](https://s2.loli.net/2025/09/06/EqwOfvu698LdjY3.webp)

好像最新版的插件会直接给你调好（雾）。

你就可以愉快的使用中文了！

## 个性化

首先是编辑器设置，操作方法见下图：

![操作方法](https://s2.loli.net/2025/09/06/t1LVSqHCIvmDNBb.webp)

打开之后的画面可能令你不解：为什么是一个我看不懂的代码？

其实这是一个比较不错的优点，你可以很快地迁移配置在各个电脑之间。

如果你熟悉英文，那么恭喜你，你可以通过参照左边的默认配置来自定义。如果你不熟悉，没有关系，我可以给你一个示范。

```json
{
  "spell_check": true,
  "indent_to_bracket": true,
  "draw_white_space": ["selection", "trailing", "isolated"]
}
```

这个文件其实就只达到了一个目的：显示行尾空格、缩进。

这有利于防止玄学错误，对于 OIer 来说已经够用了！

如果你要调整颜色主题，没问题，按照下图操作即可：

![主题](https://s2.loli.net/2025/09/06/DEmA19vVWzTbM5Q.webp)

这里的调整有一个优点，你可以直接在一个类似于之前命令面板的可视化模块中调整主题，并且支持实时预览，你可以使用上下键切换并查看效果。

## 编译与代码框架

如果说上方的教程帮助你有一个更舒适的代码撰写环境，那么接下来的配置则让你的编写与编译更加方便！

接下来的内容相对无脑，小心你的 CtrlCV 键被按废。

首先按下 `Control` + `Shift` + `P` 打开操作面板，输入 `Browse`，选择“Preferences: Browse Packages”，会打开一个文件夹。

你也可以直接访问这个路径（理论上都在这个位置）：

```
C:\Users\[你的电脑用户名]\AppData\Roaming\Sublime Text\Packages
```

可能会出现一些文件夹，我们进入 `User` 文件夹。

新建一个叫 `[名字随意].sublime-build` 的文件（请打开后缀名显示）。

双击使用 Sublime Text 打开，粘贴这个文件：

```json
{
  "encoding": "utf-8",
  "working_dir": "$file_path",
  "shell_cmd": "g++ -Wall \"${file}\" -o \"${file_path}/${file_base_name}\"",
  "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
  "selector": "source.c++",

  "variants": [
    {
      "name": "Run",
      "shell_cmd": "g++ -Wall -std=c++14 -O2 \"${file}\" -o \"${file_base_name}\" && start cmd /c \"\"${file_path}/${file_base_name}\" & pause\""
    }
  ]
}
```

保存退出，在正式编译之前我们还需要做一点事情。

### 安装编译器

由于笔者也忘了怎么安装 C++ 编译器了，请自行百度/必应：“C++编译器安装”

### 设置编译器环境变量

如果你是在网上搜的安装教程，他可能已经教你如何配置环境变量了，但如果你没有配置，请看这里。

首先打开开始菜单，搜索“环境变量”，打开之后你需要在上方的“用户变量”进行如下操作：点击“新建” → 在“变量名”中输入 `PATH` → 在“变量值”中输入你的编译器目录，类似于 `C:\Program Files (x86)\[你所安装的编译器名字，比如 MinGW64]\bin` → 点击“确定” → 点击“确定”。

当然如果你之前装过如 Python 等工具，你的 PATH 变量已经被占用，不用担心，按照这个步骤操作：双击“PATH”变量那一行 → 在“变量值”的原有内容后加一个英文分号（`;`） → 输入你的编译器目录，类似于 `C:\Program Files (x86)\[你所安装的编译器名字，比如 MinGW64]\bin` → 点击“确定” → 点击“确定”

完成后打开命令提示符（cmd），输入 `g++ -v` ，只要能正确输出版本等信息就说明配置成功了！

### 写下你的第一个程序

回到 Sublime Text 中，写好一个带有输入输出功能的程序，按下 `Control + B` 开始运行，会弹出一个类似命令面板的界面。

![选择器](https://s2.loli.net/2025/09/06/obkpsUwGrudVg8P.webp)

选择“[你刚刚创建的那个 `.sublime-build` 文件的文件名] - Run”那一个选项，就可以一键编译运行（会弹出来一个终端窗口供你输入输出），运行成功后就代表着编译系统的配置成功！

### 代码模板

在 Dev-C++ 中，我们都知道可以通过设置使新建文件时能够为我们自动补全头文件。

虽然 Sublime 不能够实现这个功能，对，不能够！但是我们仍然可以顺利偷懒！

首先按下 `Control` + `Shift` + `P` 打开操作面板，输入 `Browse`，选择“Preferences: Browse Packages”，会打开一个文件夹。

你也可以直接访问这个路径（理论上都在这个位置）：

```
C:\Users\[你的电脑用户名]\AppData\Roaming\Sublime Text\Packages
```

可能会出现一些文件夹，我们进入 `User` 文件夹。

新建一个叫 `[名字随意].sublime-snippet` 的文件（请打开后缀名显示）。

用 Sublime Text 打开，粘贴这个代码，然后修改其中的内容：

```html
<snippet>
  <content> <![CDATA[ [你的代码框架] ]]> </content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>[关键词]</tabTrigger>
  <description>[取名随意]</description>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>source.c, source.c++</scope>
</snippet>
```

如果你不理解，你可以参考这个例子：

```html
<snippet>
  <content>
    <![CDATA[ #include <bits/stdc++.h> #define op if (debug) using namespace
    std; typedef long long lo; const bool debug = 0; int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); return 0;
    } ]]>
  </content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>_algo</tabTrigger>
  <description>竞赛模板</description>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>source.c, source.c++</scope>
</snippet>
```

这样，每当你新建一个 `.cpp` 的文件时，输入`上面代码的[关键词]` 然后在弹出的菜单中选择你的预设，就可以为你补全框架了！

![大概是这样](https://s2.loli.net/2025/09/06/oAkSlebhF6Q8WPU.webp)

▲ 大概是这样的吧

## 总结

至此，你应该已经配置好了一个完整的 Sublime Text 并且可以用于竞赛的调试代码，希望本篇文章可以为你提高效率。

## 彩蛋：让你的 Sublime Text 像 CP Editor 一样

在安装好插件安装器的情况下，按下 `Control` + `Shift` + `P` 打开操作面板，输入 `Install` 后选择 “Package Control: Install Package”。

![操作 1](https://s2.loli.net/2025/09/06/yWNjnizEwo8pUdT.webp)

加载比较慢，不要着急，等他弹出来之后输入 `CppFastOly`，然后选择“CppFastOlympicCoding”安装，稍等一会安装完成。

![操作 2](https://s2.loli.net/2025/09/06/HsXRw2Jgpt9DLNa.webp)

请注意左下角的安装状态，当显示安装完成之后你就可以愉快的使用了。

由于篇幅原因，请各位自行前往官方 GitHub 学习使用：https://github.com/Jatana/FastOlympicCoding

**完结撒花！感谢各位阅读！**
