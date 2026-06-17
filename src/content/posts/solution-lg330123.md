---
title: "题解 | 字符串反转"
description: "一道简单的字符串操作题的解题思路"
date: 2024-07-02
tags: ["题解", "算法", "字符串"]
categories: ["题解"]
---

## 题目

![题目](https://s2.loli.net/2025/09/06/ghIJ7HTtqrlAYCv.webp)

## 1.题目分析

一道简单的字符串操作题，直接套用C++中字符串对应的操作即可

## 2.做题思路

- 使用 `while` 循环读入字符串 `inpt ` 为 `.` 时停止读入

- 对 `inpt` 字符串执行 `inpt.append(1,' ')` 意思是在读入的字符串后加一个空格，因为 `cin` 会排掉空格

- 定义一个 `str` 字符串用来储存答案

- 对 `str` 字符串执行 `str.insert(0, inpt)` 即将输入内容添加至 `str` 字符串最前面

- 输出 `str` 即可

## 3.复杂度计算

由于只需要循环长度次，所以时间复杂度为 $O(n)$ 是完全不会超的

## 4.完整代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	string str;
	string inpt;
	while(true)
	{
		cin >> inpt ;
		if(inpt == ".")
		{
			break;
		}
		inpt.append(1, ' ');
		str.insert(0, inpt);
	}
	cout << str ;
	return 0;
}
```

## 写在最后

有问题请及时评论，我会做出对应的修改！
