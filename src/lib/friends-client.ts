import { load as yamlLoad } from "js-yaml/browser";
import { FRIEND_DATA_URL } from "../consts";

interface YAMLGroup {
  class_name?: unknown;
  class_desc?: unknown;
  link_list?: unknown;
}

interface YAMLItem {
  name?: unknown;
  link?: unknown;
  avatar?: unknown;
  descr?: unknown;
  siteshot?: unknown;
  feeds?: unknown;
  friendslink?: unknown;
  tags?: unknown;
}

export interface FriendItem {
  name: string;
  url: string;
  avatar: string;
  snapshot: string;
  desc: string;
  feed: string;
  tags: string[];
  links: string;
}

export interface FriendGroup {
  name: string;
  description: string;
  friends: FriendItem[];
}

const getText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const getHttpUrl = (value: unknown) => {
  const url = getText(value).replace(/^`|`$/g, "").replace(/\/+$/, "");
  if (!url) return "";

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? url
      : "";
  } catch {
    return "";
  }
};

const getTags = (value: unknown) => {
  const tags = Array.isArray(value)
    ? value.map(getText)
    : getText(value)
        .split(",")
        .map((tag) => tag.trim());

  return tags.filter(Boolean);
};

const normalizeFriend = (value: unknown): FriendItem | null => {
  if (!value || typeof value !== "object") return null;

  const item = value as YAMLItem;
  const name = getText(item.name);
  const url = getHttpUrl(item.link);
  if (!name || !url) return null;

  return {
    name,
    url,
    avatar: getHttpUrl(item.avatar),
    desc: getText(item.descr),
    snapshot: getHttpUrl(item.siteshot),
    feed: getHttpUrl(item.feeds),
    tags: getTags(item.tags),
    links: getHttpUrl(item.friendslink),
  };
};

export const parseFriendGroups = (value: unknown): FriendGroup[] => {
  if (!Array.isArray(value)) {
    throw new Error("Unexpected YAML structure: expected an array of groups");
  }

  return value.flatMap((value) => {
    if (!value || typeof value !== "object") return [];

    const group = value as YAMLGroup;
    const friends = (Array.isArray(group.link_list) ? group.link_list : [])
      .map(normalizeFriend)
      .filter((friend): friend is FriendItem => friend !== null);

    if (friends.length === 0) return [];

    return [
      {
        name: getText(group.class_name) || "未分组",
        description: getText(group.class_desc),
        friends,
      },
    ];
  });
};

export const loadFriendGroups = async (): Promise<FriendGroup[]> => {
  const response = await fetch(FRIEND_DATA_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch friends data: ${response.status}`);
  }

  return parseFriendGroups(yamlLoad(await response.text()));
};
