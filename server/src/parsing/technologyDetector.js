const collectPackageJsonDeps = (files) => {
  const deps = new Set();

  for (const file of files.filter((item) => item.path.endsWith('package.json'))) {
    try {
      const parsed = JSON.parse(file.content);
      for (const section of ['dependencies', 'devDependencies']) {
        for (const dependency of Object.keys(parsed[section] || {})) {
          deps.add(dependency.toLowerCase());
        }
      }
    } catch {
      // Invalid package.json content should not block repository analysis.
    }
  }

  return deps;
};

const hasExtension = (files, extensions) => {
  return files.some((file) => extensions.some((extension) => file.path.endsWith(extension)));
};

export const detectTechnologies = (files) => {
  const deps = collectPackageJsonDeps(files);
  const frontend = [];
  const backend = [];
  const database = [];
  const tooling = [];
  const languages = [];

  if (deps.has('react')) frontend.push('React');
  if (deps.has('vite')) tooling.push('Vite');
  if (deps.has('tailwindcss')) tooling.push('Tailwind CSS');
  if (deps.has('zustand')) tooling.push('Zustand');
  if (deps.has('axios')) tooling.push('Axios');
  if (deps.has('react-router-dom')) tooling.push('React Router');

  if (deps.has('express')) backend.push('Express.js');
  if (deps.has('mongoose')) backend.push('Mongoose');
  if (deps.has('jsonwebtoken')) backend.push('JWT');
  if (deps.has('bcryptjs') || deps.has('bcrypt')) backend.push('Password hashing');

  if (deps.has('mongodb') || deps.has('mongoose')) database.push('MongoDB');

  if (hasExtension(files, ['.js', '.jsx'])) languages.push('JavaScript');
  if (hasExtension(files, ['.ts', '.tsx'])) languages.push('TypeScript');

  return {
    frontend: [...new Set(frontend)],
    backend: [...new Set(backend)],
    database: [...new Set(database)],
    languages: [...new Set(languages)],
    tooling: [...new Set(tooling)]
  };
};
