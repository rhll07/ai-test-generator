import PDFDocument from 'pdfkit';
import { getExportPayload, toMarkdown } from '../services/exportService.js';

const safeFilename = (name) => name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();

export const exportMarkdown = async (req, res) => {
  const payload = await getExportPayload({
    userId: req.user._id,
    projectId: req.params.projectId
  });
  const markdown = toMarkdown(payload);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename(payload.project.projectName)}.md"`);
  return res.send(markdown);
};

export const exportJson = async (req, res) => {
  const payload = await getExportPayload({
    userId: req.user._id,
    projectId: req.params.projectId
  });

  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename(payload.project.projectName)}.json"`);
  return res.json({
    success: true,
    data: payload
  });
};

export const exportPdf = async (req, res) => {
  const payload = await getExportPayload({
    userId: req.user._id,
    projectId: req.params.projectId
  });
  const markdown = toMarkdown(payload);
  const document = new PDFDocument({ margin: 48 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename(payload.project.projectName)}.pdf"`);

  document.pipe(res);
  document.fontSize(18).text(payload.project.projectName, { underline: true });
  document.moveDown();
  document.fontSize(10).text(markdown, {
    width: 500,
    lineGap: 3
  });
  document.end();
};
