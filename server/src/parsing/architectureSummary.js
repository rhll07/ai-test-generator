const insertPath = (tree, parts) => {
  if (!parts.length) return;
  const [head, ...tail] = parts;
  tree[head] = tree[head] || {};
  insertPath(tree[head], tail);
};

const renderTree = (node, depth = 0) => {
  return Object.keys(node)
    .sort((a, b) => a.localeCompare(b))
    .flatMap((key) => {
      const children = renderTree(node[key], depth + 1);
      return [`${'  '.repeat(depth)}- ${key}`, ...children];
    });
};

export const buildFolderStructure = (files) => {
  const tree = {};
  for (const file of files) {
    insertPath(tree, file.path.split('/'));
  }
  return renderTree(tree).slice(0, 300).join('\n');
};

export const createArchitectureSummary = ({ files, technologies, routes, models }) => {
  const topFolders = [...new Set(files.map((file) => file.path.split('/')[0]))]
    .filter(Boolean)
    .slice(0, 12)
    .join(', ');

  const frontend = technologies.frontend.length ? technologies.frontend.join(', ') : 'not detected';
  const backend = technologies.backend.length ? technologies.backend.join(', ') : 'not detected';
  const database = technologies.database.length ? technologies.database.join(', ') : 'not detected';

  return [
    `Scanned ${files.length} source/config files across ${topFolders || 'the repository root'}.`,
    `Frontend framework: ${frontend}.`,
    `Backend framework: ${backend}.`,
    `Database layer: ${database}.`,
    `Detected ${routes.length} API route(s) and ${models.length} data model(s).`
  ].join(' ');
};
