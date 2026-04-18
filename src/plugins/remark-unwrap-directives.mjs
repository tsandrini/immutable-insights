import { visit } from "unist-util-visit";

/**
 * Remark plugin that converts any remaining directive nodes (left unhandled
 * by earlier plugins) back to literal text. Run LAST, after all directive
 * handlers have assigned `data.hName`.
 *
 * Why: remark-directive eagerly parses `:name` inline, so prose like
 * `Route:Handler` or `foo:bar` gets swallowed as a text directive and
 * disappears from the output. This restores the source text for anything
 * that wasn't explicitly handled.
 */
export function remarkUnwrapDirectives() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index == null) return;
      const handled = node.data?.hName;
      if (handled) return;

      if (node.type === "textDirective") {
        const label = stringifyChildren(node.children);
        const attrs = stringifyAttrs(node.attributes);
        const text = `:${node.name}${label ? `[${label}]` : ""}${attrs}`;
        parent.children.splice(index, 1, { type: "text", value: text });
        return index;
      }

      if (node.type === "leafDirective") {
        const label = stringifyChildren(node.children);
        const attrs = stringifyAttrs(node.attributes);
        const text = `::${node.name}${label ? `[${label}]` : ""}${attrs}`;
        parent.children.splice(index, 1, {
          type: "paragraph",
          children: [{ type: "text", value: text }],
        });
        return index;
      }

      if (node.type === "containerDirective") {
        const label = stringifyChildren(
          node.children?.[0]?.data?.directiveLabel
            ? node.children[0].children
            : [],
        );
        const attrs = stringifyAttrs(node.attributes);
        const opener = {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: `:::${node.name}${label ? `[${label}]` : ""}${attrs}`,
            },
          ],
        };
        const closer = {
          type: "paragraph",
          children: [{ type: "text", value: ":::" }],
        };
        const inner = node.children.filter((c) => !c.data?.directiveLabel);
        parent.children.splice(index, 1, opener, ...inner, closer);
        return index;
      }
    });
  };
}

function stringifyChildren(children) {
  if (!children) return "";
  return children
    .map((c) => {
      if (c.value != null) return c.value;
      if (c.children) return stringifyChildren(c.children);
      return "";
    })
    .join("");
}

function stringifyAttrs(attrs) {
  if (!attrs) return "";
  const entries = Object.entries(attrs);
  if (entries.length === 0) return "";
  const parts = entries.map(([k, v]) => (v === "" ? k : `${k}="${v}"`));
  return `{${parts.join(" ")}}`;
}
