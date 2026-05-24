const routeRegex = /\b(?:app|router)\s*\.\s*(get|post|put|patch|delete|options|head)\s*\(\s*['"`]([^'"`]+)['"`]/gi;

export const detectRoutes = (files) => {
  const routes = [];

  for (const file of files) {
    if (!['JavaScript', 'TypeScript', 'React JSX', 'React TSX'].includes(file.language)) continue;

    let match = routeRegex.exec(file.content);
    while (match) {
      routes.push({
        method: match[1].toUpperCase(),
        path: match[2],
        file: file.path
      });
      match = routeRegex.exec(file.content);
    }

    routeRegex.lastIndex = 0;
  }

  return routes;
};
