import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import AdmZip from 'adm-zip';

const tempBaseDir = () => path.resolve(process.cwd(), 'tmp');

const safeEntryName = (entryName) => {
  const normalized = path.normalize(entryName).replace(/^(\.\.(\/|\\|$))+/, '');
  if (path.isAbsolute(normalized) || normalized.startsWith('..')) return null;
  return normalized;
};

const extractZip = async (zip) => {
  const destination = path.join(tempBaseDir(), `repo-${randomUUID()}`);
  await fs.mkdir(destination, { recursive: true });

  for (const entry of zip.getEntries()) {
    const safeName = safeEntryName(entry.entryName);
    if (!safeName) continue;

    const target = path.resolve(destination, safeName);
    if (!target.startsWith(destination)) continue;

    if (entry.isDirectory) {
      await fs.mkdir(target, { recursive: true });
      continue;
    }

    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, entry.getData());
  }

  return destination;
};

export const extractZipFile = async (zipFilePath) => {
  const zip = new AdmZip(zipFilePath);
  return extractZip(zip);
};

export const extractZipBuffer = async (buffer) => {
  const zip = new AdmZip(buffer);
  return extractZip(zip);
};

export const cleanupExtractedRepository = async (directory) => {
  if (!directory || !directory.startsWith(tempBaseDir())) return;
  await fs.rm(directory, { recursive: true, force: true });
};
