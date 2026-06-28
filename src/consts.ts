// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = "https://blog.081531.xyz";
export const SITE_TITLE = "喵洛阁";
export const SITE_DESCRIPTION =
  "克喵的博客我在这里记录我的日常生活、踩坑记录和资源分享。";

export const EMAIL = "mcy@kemiaosw.top";

export const FRIENDLINK_API = "https://verify.081531.xyz";
export const FRIEND_DATA_URL =
  "https://friends-api.081531.xyz/link.yml";
export const LATENCY_API_URL = "https://fc.081531.xyz/link.json";

interface AboutLinkItem {
  label: string;
  href: string;
  note: string;
  badge: string;
}

interface AboutInfoItem {
  label: string;
  value: string;
  href?: string;
}

interface AboutProjectItem {
  title: string;
  description: string;
  href?: string;
}

interface AboutFocusItem {
  title: string;
  description: string;
}

interface AboutEvaluationItem {
  label: string;
  description: string;
}

interface AboutSkillItem {
  key: string;
  label: string;
  icon?: string;
}

export const ABOUT_PAGE = {
  title: "关于我",
  description: "一个更完整的自我介绍。",
  hero: {
    eyebrow: "About",
    greeting: "你好，我是",
    name: "克喵 Moretti",
    motto: "人生如逆旅，我亦是行人。",
    summary:
      "这里是我的个人博客，一个拿来写字、折腾、存档，也偶尔自言自语的小地方。",
    floatingTagsLeft: ["日常记录", "踩坑过程", "资源分享", "静态博客"],
    floatingTagsRight: ["Astro", "Vue", "Nuxt", "Windows 11"],
  },
  profile: {
    kicker: "Identity",
    title: "基础信息",
    intro: "",
    infoItems: [
      { label: "姓名", value: "MCY" },
      { label: "昵称", value: "克喵Moretti" },
      { label: "性别", value: "男" },
      { label: "毕业院校", value: "南京工业职业技术大学" },
      { label: "专业", value: "自动化技术与应用" },
      { label: "当前工作", value: "施耐德（实习）" },
      { label: "地址", value: "江苏南京" },
      {
        label: "邮箱",
        value: "mcy@kemiaosw.top",
        href: "mailto:mcy@kemiaosw.top",
      },
      { label: "QQ", value: "3149261770" },
      { label: "Telegram", value: "@Kemeow0815" },
    ] as AboutInfoItem[],
  },
  writing: {
    kicker: "Writing",
    title: "写作取向",
    heading: "随便记录的一些东西",
    summary: "这里记录着一些生活经历、资源分享和博客魔改。",
    traits: ["博客", "资源", "折腾", "归档"],
    cta: {
      label: "所有文章",
      href: "/posts/1/",
    },
  },
  skills: {
    kicker: "Stack",
    title: "技能与工具",
    note: "正在持续学习中",
    featured: [
      { key: "html", label: "HTML5", icon: "material-icon-theme:html" },
      { key: "css", label: "CSS3", icon: "ion:social-css3-outline" },
      {
        key: "javascript",
        label: "JavaScript",
        icon: "material-icon-theme:javascript",
      },
      { key: "astro", label: "Astro", icon: "skill-icons:astro" },
      { key: "Nuxt", label: "Nuxt", icon: "material-icon-theme:nuxt" },
      {
        key: "typescript",
        label: "TypeScript",
        icon: "material-icon-theme:typescript",
      },
      { key: "Vue", label: "Vue", icon: "material-icon-theme:vue" },
      {
        key: "Markdown",
        label: "Markdown",
        icon: "material-icon-theme:markdown",
      },
    ] as AboutSkillItem[],
    tags: [
      "C++",
      "TypeScript",
      "Tailwind CSS",
      "Astro",
      "Nuxt",
      "Vue",
      "Docker",
    ],
  },
  contact: {
    kicker: "Connect",
    title: "联系与兴趣",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kmoretti",
        note: "代码、提交记录和开源折腾都在这里。",
        badge: "mdi:github",
      },
      {
        label: "邮箱",
        href: `mailto:${EMAIL}`,
        note: "偏正式联系请直接发邮件。",
        badge: "mdi:email-outline",
      },
      {
        label: "telegram",
        href: "https://t.me/Kemeow0815",
        note: "很熟的可以直接QQ加我，TG私聊用bot",
        badge: "mdi:telegram",
      },
    ] as AboutLinkItem[],
    hobbies: ["小说", "写作", "编程", "折腾项目"],
  },
  projects: {
    kicker: "Projects",
    title: "最近在做的事",
    items: [
      {
        title: "博客源码",
        description: "基于开源项目对博客进行一些自改。",
        href: "https://github.com/kmoretti/blog",
      },
      {
        title: "Friends-circle-lite",
        description: "友链朋友圈",
        href: "https://github.com/kmoretti/Friend-Circle-Lite",
      },
    ] as AboutProjectItem[],
    focusTitle: "近期节奏",
    focus: [
      {
        title: "修改博客",
        description: "完善项目内容，丰富内容。",
      },
      {
        title: "准备实训",
        description: "下个月出发实习。",
      },
      {
        title: "期末备考",
        description: "一天考三门，要燃尽了~",
      },
    ] as AboutFocusItem[],
  },
  evaluation: {
    kicker: "Snapshot",
    title: "自我评价",
    items: [
      {
        label: "表达",
        description: "平时说话语速快，有可能听不清。",
      },
      {
        label: "做事",
        description: "喜欢摸着石头过河（当然也是个人能力不足的原因）",
      },
      {
        label: "折腾",
        description: "喜欢随便折腾点东西。",
      },
    ] as AboutEvaluationItem[],
  },
  comments: {
    kicker: "Guestbook",
    title: "留言板",
    description: "来过的话，留下一句近况、意见或者你最近在折腾的东西。",
  },
} as const;

type GiscusMapping =
  | "pathname"
  | "url"
  | "title"
  | "og:title"
  | "specific"
  | "number";

interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: GiscusMapping;
  strict: "0" | "1";
  reactionsEnabled: "0" | "1";
  emitMetadata: "0" | "1";
  inputPosition: "top" | "bottom";
  lang: string;
}

export const GISCUS_CONFIG: GiscusConfig = {
  repo: "kmoretti/blog",
  repoId: "R_kgDOS9I8wA",
  category: "评论",
  categoryId: "DIC_kwDOS9I8wM4C_VFM",
  mapping: "pathname",
  strict: "1",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "zh-CN",
};
