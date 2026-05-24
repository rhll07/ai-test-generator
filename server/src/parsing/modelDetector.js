const modelNameRegex = /mongoose\.model\s*\(\s*['"`]([^'"`]+)['"`]/g;
const schemaBlockRegex = /new\s+mongoose\.Schema\s*\(\s*\{([\s\S]*?)\}\s*(?:,\s*\{[\s\S]*?\})?\s*\)/g;
const fieldRegex = /^\s*([a-zA-Z_$][\w$]*)\s*:/gm;

export const detectModels = (files) => {
  const models = [];

  for (const file of files) {
    if (!['JavaScript', 'TypeScript'].includes(file.language)) continue;

    const modelNames = [];
    let modelMatch = modelNameRegex.exec(file.content);
    while (modelMatch) {
      modelNames.push(modelMatch[1]);
      modelMatch = modelNameRegex.exec(file.content);
    }
    modelNameRegex.lastIndex = 0;

    if (!modelNames.length && !file.content.includes('mongoose.Schema')) continue;

    const fields = new Set();
    let schemaMatch = schemaBlockRegex.exec(file.content);
    while (schemaMatch) {
      let fieldMatch = fieldRegex.exec(schemaMatch[1]);
      while (fieldMatch) {
        fields.add(fieldMatch[1]);
        fieldMatch = fieldRegex.exec(schemaMatch[1]);
      }
      fieldRegex.lastIndex = 0;
      schemaMatch = schemaBlockRegex.exec(file.content);
    }
    schemaBlockRegex.lastIndex = 0;

    const names = modelNames.length ? modelNames : [file.path.split('/').pop().replace(/\.[jt]s$/, '')];
    for (const name of names) {
      models.push({
        name,
        file: file.path,
        fields: [...fields]
      });
    }
  }

  return models;
};
