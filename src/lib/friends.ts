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

export async function fetchFriends(): Promise<FriendItem[]> {
  try {
    const response = await fetch(FRIEND_DATA_URL);

    if (!response.ok) {
      console.warn(
        `Failed to fetch friends data: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const text = await response.text();
    const groups = yamlLoad(text) as YAMLGroup[] | null;

    if (!Array.isArray(groups)) {
      console.warn("Unexpected YAML structure: expected an array of groups");
      return [];
    }

    const friends: FriendItem[] = [];

    for (const group of groups) {
      const items = group.link_list;
      if (!Array.isArray(items)) continue;

      for (const item of items) {
        const name = (item.name ?? "").trim();
        const url = (item.link ?? "").trim();

        if (!name || !url) continue;

        friends.push({
          name,
          url,
          avatar: (item.avatar ?? "").trim(),
          desc: (item.descr ?? "").trim(),
          snapshot: (item.siteshot ?? "").trim(),
          feed: (item.feeds ?? "").trim(),
          tags: "",
        });
      }
    }

    return friends;
  } catch (err) {
    console.warn("Failed to load friends data:", err);
    return [];
  }
}
