// Toggle the header accent-hue slider. Flip to false before deploying
// to hide the dev control without removing the underlying plumbing.
export const SHOW_ACCENT_SLIDER = true;

export const READING_WPM = 200;

export const SITE = {
  title: "/immutable-insights/",
  subtitle: "tsandrini",
  description:
    "Nix, algorithms, speedcubing, and the occasional existential tangent. A personal blog by tsandrini.",
  author: "tsandrini",
  url: "https://tsandrini.sh",
};

export const LICENSE = {
  name: "CC BY-NC-SA 4.0",
  href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const CODE_LICENSE = {
  name: "EUPL v1.2",
  href: "https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12",
};

export const NAV_LINKS: { text: string; href: string; external?: boolean }[] = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Projects", href: "/projects" },
  { text: "Blog", href: "/blog" },
  { text: "GitHub", href: "https://github.com/tsandrini", external: true },
];

export const SOCIAL_LINKS = [
  { name: "Email", href: "mailto:t@tsandrini.sh", icon: "email" },
  { name: "GitHub", href: "https://github.com/tsandrini", icon: "github" },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@tsandrini",
    icon: "mastodon",
    rel: "me",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tsandrini_",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tsandrini",
    icon: "linkedin",
  },
  { name: "RSS", href: "/rss.xml", icon: "rss" },
];
