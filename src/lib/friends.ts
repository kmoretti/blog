import { load as yamlLoad } from "js-yaml";
import { FRIEND_DATA_URL } from "../consts";

interface YAMLGroup {
  class_name?: string;
  class_desc?: string;
  link_list?: YAMLItem[];
}

interface YAMLItem {
  name?: string;
  link?: string;
  avatar?: string;
  descr?: string;
  siteshot?: string;
  feeds?: string;
  friendslink?: string;
  tags?: string | string[];
}

export interface FriendItem {
  name: string;
  url: string;
  avatar: string;
  snapshot?: string;
  desc?: string;
  feed?: string;
  tags: string;
  links?: string;
}

export interface FriendGroup {
  name: string;
  description: string;
  friends: FriendItem[];
}

const normalizeFriend = (item: YAMLItem): FriendItem | null => {
  const name = (item.name ?? "").trim();
  const url = (item.link ?? "").trim();

  if (!name || !url) return null;

  const tags = Array.isArray(item.tags)
    ? item.tags.join(",")
    : (item.tags ?? "");

  return {
    name,
    url,
    avatar: (item.avatar ?? "").trim(),
    desc: (item.descr ?? "").trim(),
    snapshot: (item.siteshot ?? "").trim(),
    feed: (item.feeds ?? "").trim(),
    tags: tags.trim(),
    links: (item.friendslink ?? "").trim(),
  };
};

async function loadFriendGroups(): Promise<FriendGroup[]> {
  const response = await fetch(FRIEND_DATA_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch friends data: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  const groups = yamlLoad(text) as YAMLGroup[] | null;

  if (!Array.isArray(groups)) {
    throw new Error("Unexpected YAML structure: expected an array of groups");
  }

  return groups.flatMap((group) => {
    const friends = (Array.isArray(group.link_list) ? group.link_list : [])
      .map(normalizeFriend)
      .filter((friend): friend is FriendItem => friend !== null);

    if (friends.length === 0) return [];

    return [
      {
        name: (group.class_name ?? "未分组").trim() || "未分组",
        description: (group.class_desc ?? "").trim(),
        friends,
      },
    ];
  });
}

export async function fetchFriendGroups(): Promise<FriendGroup[]> {
  try {
    return await loadFriendGroups();
  } catch (err) {
    console.warn("Failed to load friends data:", err);
    return [];
  }
}

export async function fetchFriends(): Promise<FriendItem[]> {
  return (await fetchFriendGroups()).flatMap((group) => group.friends);
}
