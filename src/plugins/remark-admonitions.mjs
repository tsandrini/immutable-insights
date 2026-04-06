import { visit } from "unist-util-visit";

const ADMONITION_TYPES = new Set([
	"note",
	"tip",
	"important",
	"warning",
	"caution",
]);

/**
 * Remark plugin that transforms container directives (:::note, :::tip, etc.)
 * into admonition markup. Requires remark-directive to parse the ::: syntax.
 *
 * Supports optional custom titles via :::type[Custom Title]
 */
export function remarkAdmonitions() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== "containerDirective") return;
			if (!ADMONITION_TYPES.has(node.name)) return;

			const type = node.name;
			if (!node.data) node.data = {};
			const data = node.data;

			// Check for custom title in directive label (:::type[Custom Title])
			let title = type;
			const firstChild = node.children[0];
			if (firstChild?.data?.directiveLabel) {
				// Extract text content from the label paragraph
				title = firstChild.children.map((c) => c.value || "").join("");
				node.children = node.children.slice(1);
			}

			data.hName = "div";
			data.hProperties = {
				class: `admonition admonition-${type}`,
				"data-admonition": type,
			};

			// Prepend a title node
			node.children.unshift({
				type: "paragraph",
				data: {
					hName: "p",
					hProperties: { class: "admonition-title" },
				},
				children: [{ type: "text", value: title }],
			});
		});
	};
}
