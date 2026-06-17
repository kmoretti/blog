---
title: "OI 赛制的实用工具"
description: "没有大测点？自己造！"
date: 2025-07-09
tags: ["算法竞赛", "工具", "OI"]
categories: ["技术"]
---

最近考试比较频繁，自己在代码检查方面也是写了很多工具，这里汇总一下。

## 数据机

有的时候我们可能写了一些奇怪的算法，这些算法可能会超出时间复杂度，我们可以通过数据机来看看他们的极限。

我将这种数据机器分为两种类型：随机型 / 爆炸型

但是再分别将这两种类型之前，我需要声明一点。

在大部分 OI 赛制的比赛中，会要求使用文件读写 `freopen`，这就这就导致我们代码的框架是这样的：

```cpp
#include <bits/stdc++.h>

using namespace std;
typedef long long lo;

int main() {
	freopen("[problemName].in", "r", stdin);
	freopen("[problemName].out", "w", stdout);

	return 0;
}
```

这里的 `[problemName]` 代表着你的文件名称，所以数据机的模板头应该有语句。

```cpp
freopen("[problemName].in", "w", stdout);
```

与我们的解决程序不同的是，我们的 `.in` 文件在这里是被写入，而不是被读入。

所以，我们的数据机框架为：

```cpp
#include <bits/stdc++.h>
#define pname [problemName]  // 把 [problemName] 改成你题目对应的名字

using namespace std;
typedef long long lo;

int main() {
	freopen("pname.in", "w", stdout);
	/* 制造程序在这里写 */
	return 0;
}
```

我们还可以再优化一下，因为每次手动运行、打开很麻烦，所以我们可以偷个懒。

**注意，这里有的会用到 Windows 命令，Linux 的使用我还不太清楚，如果有知道的可以评论留言。**

```cpp
#include <bits/stdc++.h>
#include <windows.h>  //  导入 Windows 库来执行 start 命令

#define pname [problemName]  // 把 [problemName] 改成你题目对应的名字

using namespace std;
typedef long long lo;

int main() {
	freopen("pname.in", "w", stdout);
	/* 制造程序在这里写 */
	fclose(stdout);
	system("start pname.exe");
	system("start pname.out");
	return 0;
}
```

你可能会问：为什么没有编译。

问就是我背不到那个死长的编译命令（逃

### 随机型

随机型主要应用于一些不太适合重复的测试数据。

但是因为我们只是想测极限数据，所以可以用不着毫秒随机数。

```cpp
#include <bits/stdc++.h>
#include <windows.h>

#define pname [problemName]  // 把 [problemName] 改成你题目对应的名字

using namespace std;
typedef long long lo;

int main() {
	freopen("pname.in", "w", stdout);
	srand(time(0));  // 随机数种子，一秒变换一次
	int n = 1e5;  // 一般是最大值，这里如果有多个变量请根据题目更改
	for (int i = 1; i <= n; i++) {
		int mod = 1e5;  // 这里用于限制 a, b 大小
		int a = rand() % (mod + 1), b = rand() % (mod + 1);
		cout << a << " " << b << "\n";  // 按照题目的输入格式完善
	}
	fclose(stdout);
	system("start pname.exe");
	system("start pname.out");
	return 0;
}
```

但是如果你真的想用毫秒级随机数，可以看 Edison 大佬的文章：

https://www.cnblogs.com/EdisonBa/p/17589796.html

但是这就增加了你背代码的负担，如果你没有办法驾驭这个背诵量，还是背简单版本吧。

### 爆炸型

爆炸型就是在随机性的基础上，改成极大值就好了，这个我用的比较多。

```cpp
#include <bits/stdc++.h>
#include <windows.h>

#define pname [problemName]  // 把 [problemName] 改成你题目对应的名字

using namespace std;
typedef long long lo;

int main() {
	freopen("pname.in", "w", stdout);
	int n = 1e5;  // 一般是最大值，这里如果有多个变量请根据题目更改
	for (int i = 1; i <= n; i++) {
		int maxx = 1e5;  // 这里用于表示 a, b 的最大值
		cout << maxx << " " << maxx << "\n";  // 按照题目的输入格式完善
	}
	fclose(stdout);
	system("start pname.exe");
	system("start pname.out");
	return 0;
}
```

### 操作方法

- 编译源文件

- 更改数据机的 `[problemName]` 为你的题目名字（一般比赛题面会给）

- 运行数据机

- 你可以通过打开的输出数据查看是否炸空间、时间、数据范围

## 对拍

什么是对拍：

> 对拍，是一个比较实用的工具。它能够非常方便地对于两个程序的输出文件进行比较，可以帮助我们实现一些自动化的比较输出结果的问题。

众所周知，几乎每一道编程题目，都会有某种正解能拿到满分；当我们想不出正解时，我们往往可以打暴力代码来获取部分分数。

但是，当我们觉得有思路写正解，但又担心自己正解写的不对，而恰好，我们又有一个能够暴力骗分的代码。这个时候就可以用到对拍。 暴力骗分代码必须保证正确性，只是超出时间限制，不能出现答案错误的情况。

这样，我们可以造多组数据，让暴力骗分的程序跑一遍，再让我们自己写的正解跑一遍，二者进行多次对比。如果多组数据都显示二者的输出结果一样，那么这个正解大概率没问题。相反地，如果两组数据不同，我们就找到了一组错误数据，方便调试，找到正解哪里出了问题。

——引自 [EdisonBa's Blog](https://www.cnblogs.com/EdisonBa)

对拍，我们可以拆解为三个步骤：造数据 → 运行存疑代码（正解） → 运行保证正确的代码（暴力） → 比对输出数据

当然做这些工作会耗费许多时间，请保证你在时间充裕的情况下完成。

### 先是数据机

直接参考上面的数据机代码就好，只是我们不需要运行和打开输出文件文件的操作，所以删掉就好了

```cpp
#include <bits/stdc++.h>
#include <windows.h>  //  导入 Windows 库来执行 start 命令

#define pname [problemName]  // 把 [problemName] 改成你题目对应的名字

using namespace std;
typedef long long lo;

int main() {
	freopen("pname.in", "w", stdout);
	/* 制造数据程序在这里写 */
	return 0;
}
```

不过这里最好用毫秒级随机数。

### 然后是运行

首先得保证你的两个程序都写了文件读写。

直接 `system` 一下文件名：

这里的 `baoli.exe` 是你的暴力代码可执行文件名，`std.exe` 是你的正解代码可执行文件名。

```cpp
system("baoli.exe");
system("std.exe");
```

然后使用 Windows 自带的 `fc` 命令比较一下就好了。

### 完整代码

```cpp
#include <bits/stdc++.h>
#include <windows.h>

#define pname [problemName]

using namespace std;
typedef long long lo;

int main() {
	system("dataMaker.exe");
	system("baoli.exe");
	system("std.exe");
	system("fc baoli.out std.out")  // 会输出你的对比结果，其中 baoli.out 是暴力代码的输出文件，std.out 是正解代码的输出文件
	return 0;
}
```

当然你可以一直生成数据，直到找到问题数据（一定要用毫秒级随机数！！！）

```cpp
#include <bits/stdc++.h>
#include <windows.h>

#define pname [problemName]

using namespace std;
typedef long long lo;

int main()
{
    while (1) //一直循环，直到找到不一样的数据
    {
        system("dataMaker.exe");
        system("baoli.exe");
		system("std.exe");
        if (system("fc baoli.out std.out")) //当 fc 返回 1 时，说明这时数据不一样
            break;
    }
    return 0;
}
```

## 总结

本次介绍了数据机与对拍两种考试工具，如果需要使用可以理解他们极其简单的实现过程，然后在考试中用上。

### 参考资料

- [C++ 对拍详解 - EdisonBa - 博客园 (cnblogs.com)](https://www.cnblogs.com/EdisonBa/p/13509379.html)
