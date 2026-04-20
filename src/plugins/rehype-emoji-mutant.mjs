import { visit } from "unist-util-visit";

/**
 * Rehype plugin that replaces :shortcode: occurrences in text with inline
 * <img> tags pointing at Mutant Standard SVGs in /emoji/.
 *
 * Why shortcodes instead of unicode-emoji replacement:
 *   Mutant Standard files are named by shortcode (dog.svg, paw_prints.svg,
 *   trans_flag.svg), not by unicode codepoint. And Mutant includes emoji
 *   with no unicode equivalent (paw/claw/tail modifiers, expanded flags).
 *   Shortcodes map 1:1 to filenames with no lookup table to maintain.
 *
 * Usage in markdown: `hello :puppy: world`
 * Renders as:        `hello <img class="emoji" src="/emoji/puppy.svg" …> world`
 *
 * Skips <code>, <pre>, and element contents where shortcode-looking text is
 * probably code, not emoji.
 */

const SHORTCODE_RE = /:([a-z0-9][a-z0-9_-]*):/gi;
const SKIP_TAGS = new Set(["code", "pre", "kbd", "samp", "script", "style"]);

export function rehypeEmojiMutant(options = {}) {
  const base = options.base || "/emoji/";
  const ext = options.ext || ".svg";

  return (tree) => {
    visit(tree, "element", (node) => {
      if (SKIP_TAGS.has(node.tagName)) return "skip";

      if (!node.children) return;

      const newChildren = [];
      let changed = false;

      for (const child of node.children) {
        if (child.type !== "text") {
          newChildren.push(child);
          continue;
        }

        const text = child.value;
        SHORTCODE_RE.lastIndex = 0;

        if (!SHORTCODE_RE.test(text)) {
          newChildren.push(child);
          continue;
        }

        SHORTCODE_RE.lastIndex = 0;
        let lastIndex = 0;

        for (const match of text.matchAll(SHORTCODE_RE)) {
          const [full, name] = match;
          const start = match.index;

          if (start > lastIndex) {
            newChildren.push({
              type: "text",
              value: text.slice(lastIndex, start),
            });
          }

          newChildren.push({
            type: "element",
            tagName: "img",
            properties: {
              src: `${base}${name}${ext}`,
              alt: full,
              className: ["emoji"],
              loading: "lazy",
              decoding: "async",
            },
            children: [],
          });

          lastIndex = start + full.length;
          changed = true;
        }

        if (lastIndex < text.length) {
          newChildren.push({ type: "text", value: text.slice(lastIndex) });
        }
      }

      if (changed) node.children = newChildren;
    });
  };
}
