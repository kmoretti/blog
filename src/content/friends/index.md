---
title: 交换友链
description: 交换友链说明与要求
---

- 名称：<code onclick="copyText(event, '喵洛阁', this)" style="cursor:pointer" title="点击复制">喵洛阁</code>
- 链接：<code onclick="copyText(event, 'https://blog.081531.xyz', this)" style="cursor:pointer" title="点击复制">https://blog.081531.xyz</code>
- 头像：<a href="javascript:void(0)" onclick="copyText(event, 'https://q2.qlogo.cn/headimg_dl?dst_uin=3149261770&spec=0', event.target, '点此复制头像链接')" style="cursor:pointer;text-decoration:underline;color:inherit">点此复制头像链接</a>
- 介绍：<code onclick="copyText(event, '人生如逆旅，我亦是行人。', this)" style="cursor:pointer" title="点击复制">人生如逆旅，我亦是行人。</code>
- Feed：<code onclick="copyText(event, 'https://blog.081531.xyz/rss.xml', this)" style="cursor:pointer" title="点击复制">https://blog.081531.xyz/rss.xml</code>
- 截图：<code onclick="copyText(event, '暂未拍摄', this)" style="cursor:pointer" title="点击复制">https://imgbed.081531.xyz/file/telegram/image(1).png</code>

### 友链基本要求

1. 站点运营时常达到三个月及以上。
2. 站点至少包含 5 篇文章。
3. 站点内容遵守中国大陆法律。
4. 您本人曾今没有给我留下过太差的印象。
5. 规矩是死的，人是活的，最终解释权归本站所有。

### 我已经满足以上要求，快告诉我如何申请友链

请点击下方的按钮跳转**GitHub议题**添加友链~

<!-- <div class="not-prose my-6 flex justify-center">
  <a
    href="https://github.com/kmoretti/blog/issues/new?template=add-friend.yml"
    target="_blank"
    rel="noopener noreferrer"
    class="friend-apply-btn"
  >
    申请友链
  </a>
</div> -->

<style>
  .friend-apply-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.65rem 1.8rem;
    border-radius: 9999px;
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    color: #27272a;
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }
  .friend-apply-btn:hover {
    background: #e4e4e7;
    border-color: #d4d4d8;
    color: #18181b;
  }
  html.dark .friend-apply-btn {
    color: #e4e4e7;
    background: #27272a;
    border-color: #3f3f46;
  }
  html.dark .friend-apply-btn:hover {
    background: #3f3f46;
    border-color: #52525b;
    color: #f4f4f5;
  }

  /* ── Copy Toast ── */
  #copy-toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(16px);
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    z-index: 9999;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    background: #18181b;
    color: #f4f4f5;
    border: 1px solid #3f3f46;
  }
  #copy-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  html.dark #copy-toast {
    background: #f4f4f5;
    color: #18181b;
    border-color: #e4e4e7;
  }
</style>

<div id="copy-toast"></div>

<script>
  var _toastTimer;
  function showCopyToast(ok) {
    var t = document.getElementById('copy-toast');
    if (!t) return;
    clearTimeout(_toastTimer);
    t.textContent = ok ? '已复制 ✓' : '复制失败';
    t.classList.add('show');
    _toastTimer = setTimeout(function() { t.classList.remove('show'); }, 1800);
  }

  function copyText(e, text, el, originalLabel) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    navigator.clipboard.writeText(text).then(
      function() {
        showCopyToast(true);
        if (originalLabel && el) {
          el.textContent = '已复制 ✓';
          setTimeout(function() { el.textContent = originalLabel; }, 1500);
        } else if (el) {
          el.style.color = '#16a34a';
          setTimeout(function() { el.style.color = ''; }, 800);
        }
      },
      function() { showCopyToast(false); }
    );
  }
</script>

<!-- ```json
{
    "name": "网站名称",
    "url": "网站链接",
    "avatar": "头像",
    "snapshot": "截图",
    "desc": "介绍",
    "feed": "RSS",
    "links": "友链页"
},
```

当站点加入成功之后，会邮件通知您。 -->
