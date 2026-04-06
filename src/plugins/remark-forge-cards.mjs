import { visit } from "unist-util-visit";

const FORGE_TYPES = new Map([
	[
		"github",
		{ apiBase: "https://api.github.com/repos", urlBase: "https://github.com" },
	],
	// Future: gitlab, codeberg, sourcehut, etc.
]);

/**
 * Remark plugin that transforms leaf directives like ::github{repo="owner/repo"}
 * into forge repository cards. Requires remark-directive.
 */
export function remarkForgeCards() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== "leafDirective") return;
			if (!FORGE_TYPES.has(node.name)) return;

			const forge = node.name;
			const config = FORGE_TYPES.get(forge);
			const repo = node.attributes?.repo;

			if (!repo?.includes("/")) {
				node.data = {
					hName: "div",
					hProperties: { class: "hidden" },
				};
				node.children = [
					{
						type: "text",
						value: `Invalid directive: ::${forge}{repo="owner/repo"} — "repo" must be in "owner/repo" format.`,
					},
				];
				return;
			}

			const [owner, repoName] = repo.split("/");
			const uid = `fc-${Math.random().toString(36).slice(2, 8)}`;

			if (!node.data) node.data = {};
			const data = node.data;
			data.hName = "a";
			data.hProperties = {
				id: uid,
				class: `forge-card forge-card--${forge} forge-card--loading`,
				href: `${config.urlBase}/${repo}`,
				target: "_blank",
				rel: "noopener noreferrer",
			};

			node.children = [
				// Header row: avatar + owner/repo + forge icon
				{
					type: "paragraph",
					data: { hName: "div", hProperties: { class: "forge-card__header" } },
					children: [
						{
							type: "paragraph",
							data: {
								hName: "div",
								hProperties: {
									id: `${uid}-avatar`,
									class: "forge-card__avatar",
								},
							},
							children: [],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: { class: "forge-card__owner" },
							},
							children: [{ type: "text", value: owner }],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: { class: "forge-card__sep" },
							},
							children: [{ type: "text", value: "/" }],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: { class: "forge-card__repo" },
							},
							children: [{ type: "text", value: repoName }],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: {
									class: `forge-card__icon forge-card__icon--${forge}`,
								},
							},
							children: [],
						},
					],
				},
				// Description
				{
					type: "paragraph",
					data: {
						hName: "div",
						hProperties: { id: `${uid}-desc`, class: "forge-card__desc" },
					},
					children: [{ type: "text", value: "Loading\u2026" }],
				},
				// Stats row
				{
					type: "paragraph",
					data: { hName: "div", hProperties: { class: "forge-card__stats" } },
					children: [
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: {
									id: `${uid}-stars`,
									class: "forge-card__stat forge-card__stat--stars",
								},
							},
							children: [{ type: "text", value: "\u2606 \u2014" }],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: {
									id: `${uid}-forks`,
									class: "forge-card__stat forge-card__stat--forks",
								},
							},
							children: [{ type: "text", value: "\u2442 \u2014" }],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: {
									id: `${uid}-lang`,
									class: "forge-card__stat forge-card__stat--lang",
								},
							},
							children: [],
						},
						{
							type: "paragraph",
							data: {
								hName: "span",
								hProperties: {
									id: `${uid}-license`,
									class: "forge-card__stat forge-card__stat--license",
								},
							},
							children: [],
						},
					],
				},
				// Inline script to hydrate from API
				{
					type: "html",
					value: buildFetchScript(forge, config, repo, uid),
				},
			];
		});
	};
}

function buildFetchScript(forge, config, repo, uid) {
	if (forge === "github") {
		return `<script defer>
(function(){
	var id="${uid}";
	fetch("${config.apiBase}/${repo}",{referrerPolicy:"no-referrer"})
		.then(function(r){return r.json()})
		.then(function(d){
			var fmt=function(n){return Intl.NumberFormat("en",{notation:"compact",maximumFractionDigits:1}).format(n)};
			var el=function(s){return document.getElementById(s)};
			el(id+"-desc").textContent=d.description?d.description.replace(/:[a-zA-Z0-9_]+:/g,""):"No description";
			el(id+"-stars").textContent="\\u2606 "+fmt(d.stargazers_count);
			el(id+"-forks").textContent="\\u2442 "+fmt(d.forks_count);
			if(d.language){el(id+"-lang").textContent=d.language}
			el(id+"-license").textContent=d.license?d.license.spdx_id:"";
			var av=el(id+"-avatar");
			if(d.owner&&d.owner.avatar_url){av.style.backgroundImage="url("+d.owner.avatar_url+")";av.style.backgroundColor="transparent"}
			document.getElementById(id).classList.remove("forge-card--loading");
		})
		.catch(function(){document.getElementById(id).classList.add("forge-card--error")});
})();
</script>`;
	}
	return "";
}
