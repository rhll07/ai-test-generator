import fs from 'fs/promises';
import path from 'path';

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.vite',
  'tmp',
  'uploads'
]);

const SCANNED_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.md',
  '.env.example',
  '.yml',
  '.yaml'
]);

const languageByExtension = {
  '.js': 'JavaScript',
  '.jsx': 'React JSX',
  '.ts': 'TypeScript',
  '.tsx': 'React TSX',
  '.json': 'JSON',
  '.md': 'Markdown',
  '.yml': 'YAML',
  '.yaml': 'YAML'
};

export const detectLanguage = (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  return languageByExtension[extension] || 'Text';
};

const shouldScanFile = (filePath) => {
  const basename = path.basename(filePath);
  const extension = path.extname(filePath).toLowerCase();
  return SCANNED_EXTENSIONS.has(extension) || basename === '.env.example';
};

export const scanRepositoryFiles = async (rootDir, options = {}) => {
  const maxFiles = options.maxFiles || 250;
  const maxContentChars = options.maxContentChars || 20000;
  const files = [];

  const walk = async (dir) => {
    if (files.length >= maxFiles) return;

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (files.length >= maxFiles) break;
      const absolutePath = path.join(dir, entry.name);
      const relativePath = path.relative(rootDir, absolutePath).replaceAll(path.sep, '/');

      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          await walk(absolutePath);
        }
        continue;
      }

      if (!entry.isFile() || !shouldScanFile(absolutePath)) continue;

      const stat = await fs.stat(absolutePath);
      const rawContent = await fs.readFile(absolutePath, 'utf8').catch(() => '');

      files.push({
        path: relativePath,
        language: detectLanguage(absolutePath),
        size: stat.size,
        content: rawContent.slice(0, maxContentChars)
      });
    }
  };

  await walk(rootDir);
  return files;
};
