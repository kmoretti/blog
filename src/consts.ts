// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = "https://blog.081531.xyz";
export const SITE_TITLE = "喵洛阁";
export const SITE_DESCRIPTION =
  "克喵的博客我在这里记录我的日常生活、踩坑记录和资源分享。";

export const EMAIL = "mcy@kemiaosw.top";

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
  description: "一个更完整的自我介绍，关于写作、技术栈和最近在做的事。",
  hero: {
    eyebrow: "About",
    greeting: "你好，我是",
    name: "克喵 Moretti",
    motto: "记录日常、踩坑和资源，也给自己留一点折腾的注脚。",
    summary:
      "这里是我的个人博客，一个拿来写字、折腾、存档，也偶尔自言自语的小地方。",
    floatingTagsLeft: ["日常记录", "踩坑复盘", "资源分享", "静态博客"],
    floatingTagsRight: ["Astro", "TypeScript", "Tailwind", "Arch Linux"],
  },
  profile: {
    kicker: "Identity",
    title: "基础信息",
    intro: "",
    infoItems: [
      { label: "姓名", value: "柳清扬" },
      { label: "昵称", value: "LiuShen" },
      { label: "性别", value: "男" },
      { label: "毕业院校", value: "武汉理工大学" },
      { label: "专业", value: "人工智能" },
      { label: "当前工作", value: "华为" },
      { label: "地址", value: "陕西西安" },
      {
        label: "邮箱",
        value: "01@liushen.fun",
        href: "mailto:01@liushen.fun",
      },
      { label: "QQ", value: "3162475700" },
    ] as AboutInfoItem[],
  },
  writing: {
    kicker: "Writing",
    title: "写作取向",
    heading: "真实记录比完美表达更重要",
    summary:
      "这里更多是过程型内容：日常、踩坑、复盘、偶尔的牢骚。文笔一般，但尽量把问题写清楚。",
    traits: ["实用", "坦诚", "折腾", "归档"],
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
      { key: "javascript", label: "JavaScript", icon: "material-icon-theme:javascript" },
      { key: "astro", label: "Astro", icon: "skill-icons:astro" },
      { key: "Nuxt", label: "Nuxt", icon: "material-icon-theme:nuxt" }
    ] as AboutSkillItem[],
    tags: [
      "C++",
      "TypeScript",
      "Tailwind CSS",
      "Astro",
      "Unix / Linux",
      "Arch Linux",
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
        badge: "GH",
      },
      {
        label: "邮箱",
        href: `mailto:${EMAIL}`,
        note: "偏正式联系请直接发邮件。",
        badge: "@",
      },
      {
        label: "开往",
        href: "https://www.travellings.cn/go.html",
        note: "和更多博客站点串门。",
        badge: "Go",
      },
    ] as AboutLinkItem[],
    hobbies: ["阅读", "写作", "编程", "折腾系统"],
  },
  projects: {
    kicker: "Projects",
    title: "最近在做的事",
    items: [
      {
        title: "hexo-theme-redefine",
        description:
          "参与过一些细枝末节的修补和完善，算是我比较长期接触过的博客主题项目之一。",
        href: "https://github.com/EvanNotFound/hexo-theme-redefine",
      },
      {
        title: "lps-community-guide",
        description:
          "MTR 齐齐玩服务器玩家社区的导航站点项目，目前仍然会参与一些附属内容维护。",
        href: "https://github.com/mtrlps-community/lps-community-guide",
      },
    ] as AboutProjectItem[],
    focusTitle: "近期节奏",
    focus: [
      {
        title: "站点体验",
        description: "把页面做得更稳定、更顺手，也更像自己的东西。",
      },
      {
        title: "内容沉淀",
        description: "把零散经验整理成以后自己也愿意回看的文章。",
      },
      {
        title: "系统折腾",
        description: "继续研究 Arch、开发环境和一些效率相关配置。",
      },
    ] as AboutFocusItem[],
  },
  evaluation: {
    kicker: "Snapshot",
    title: "自我评价",
    items: [
      {
        label: "表达",
        description: "不追求华丽措辞，更在意把问题和过程说明白。",
      },
      {
        label: "做事",
        description: "喜欢从实际需求出发，先解决问题，再慢慢打磨细节。",
      },
      {
        label: "总结",
        description: "热衷记录、喜欢折腾，也愿意把踩过的坑留给后来者参考。",
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
