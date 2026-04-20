import { visit } from "unist-util-visit";
import { READING_WPM } from "../consts.ts";

function collectText(tree) {
  let text = "";
  visit(tree, (node) => {
    if (node.type === "text" || node.type === "inlineCode") {
      text += `${node.value} `;
    }
  });
  return text;
}

export function remarkReadingTime() {
  return (tree, { data }) => {
    const text = collectText(tree);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / READING_WPM));
    data.astro.frontmatter.words = words;
    data.astro.frontmatter.minutes = minutes;
  };
}
