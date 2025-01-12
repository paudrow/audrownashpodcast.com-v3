export interface SocialLinkEntry {
  url: string;
  displayName: string;
  icon: string;
}

export type SocialLinks = {
  [key: string]: SocialLinkEntry;
};

export interface MenuItem {
  href: string;
  label: string;
  page: PageName;
}

export type PageName =
  | "home"
  | "about"
  | "contact"
  | "listen"
  | "posts"
  | "where-to-find"
  | undefined;
