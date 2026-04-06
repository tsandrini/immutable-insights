import { visit } from "unist-util-visit";

/**
 * Remark plugin that transforms :::aside container directives and ::aside[]
 * leaf directives into <aside class="margin-note"> elements.
 *
 * Requires remark-directive for the ::: / :: syntax.
 *
 * CSS handles positioning via float: right + negative margin to pull
 * asides into the right column. The aside appears in the document flow
 * exactly where it's placed in the markdown source, which means it
 * floats beside the surrounding content naturally.
 *
 * When an aside splits a paragraph (para → aside → para), the plugin
 * marks the continuation paragraph with class "continues" so CSS can
 * remove the top margin for visual continuity.
 */
export function remarkAside() {
  return (tree) => {
    // First pass: transform directive nodes into aside elements
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "aside") {
        if (!node.data) node.data = {};
        node.data.hName = "aside";
        node.data.hProperties = {
          class: "margin-note",
        };
      }

      if (node.type === "leafDirective" && node.name === "aside") {
        if (!node.data) node.data = {};
        node.data.hName = "aside";
        node.data.hProperties = {
          class: "margin-note margin-note-leaf",
        };
      }
    });

    // Second pass: detect split paragraphs (para → aside → para)
    // and mark the continuation with class "continues"
    const children = tree.children;
    if (!children || children.length < 3) return;

    for (let i = 2; i < children.length; i++) {
      const prev = children[i - 2];
      const mid = children[i - 1];
      const cur = children[i];

      const midIsAside = mid.data?.hProperties?.class?.includes("margin-note");

      if (prev.type === "paragraph" && midIsAside && cur.type === "paragraph") {
        if (!cur.data) cur.data = {};
        if (!cur.data.hProperties) cur.data.hProperties = {};
        const existing = cur.data.hProperties.class || "";
        cur.data.hProperties.class = existing
          ? `${existing} continues`
          : "continues";
      }
    }
  };
}
