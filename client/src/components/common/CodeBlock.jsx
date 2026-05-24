const fencePattern = /```(\w+)?\n([\s\S]*?)```/g;
const tokenPattern =
  /(\/\/.*|\/\*[\s\S]*?\*\/|`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\b(?:async|await|class|const|describe|else|expect|export|false|from|function|if|import|it|let|new|null|return|throw|true|try|undefined|var)\b|\b\d+(?:\.\d+)?\b)/g;

const tokenClass = (token) => {
  if (token.startsWith('//') || token.startsWith('/*')) return 'text-slate-500';
  if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) return 'text-emerald-700 dark:text-emerald-300';
  if (/^\d/.test(token)) return 'text-amber-700 dark:text-amber-300';
  return 'text-teal-700 dark:text-teal-300';
};

function HighlightedCode({ code }) {
  const parts = [];
  let lastIndex = 0;
  let match = tokenPattern.exec(code);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ value: code.slice(lastIndex, match.index), className: '' });
    }
    parts.push({ value: match[0], className: tokenClass(match[0]) });
    lastIndex = match.index + match[0].length;
    match = tokenPattern.exec(code);
  }

  if (lastIndex < code.length) {
    parts.push({ value: code.slice(lastIndex), className: '' });
  }

  tokenPattern.lastIndex = 0;

  return (
    <pre className="overflow-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <code>
        {parts.map((part, index) => (
          <span key={index} className={part.className}>
            {part.value}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function CodeBlock({ content = '', editable = false, onChange }) {
  if (editable) {
    return (
      <textarea
        value={content}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-h-96 w-full resize-y rounded-md border border-slate-300 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-50 outline-none focus:border-teal-500 dark:border-slate-700"
      />
    );
  }

  const blocks = [];
  let lastIndex = 0;
  let match = fencePattern.exec(content);

  while (match) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'code', language: match[1] || 'javascript', value: match[2] });
    lastIndex = match.index + match[0].length;
    match = fencePattern.exec(content);
  }

  if (lastIndex < content.length) {
    blocks.push({ type: 'text', value: content.slice(lastIndex) });
  }

  fencePattern.lastIndex = 0;

  if (!blocks.length) {
    blocks.push({ type: 'text', value: content });
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, index) =>
        block.type === 'code' ? (
          <HighlightedCode key={`${block.type}-${index}`} code={block.value} language={block.language} />
        ) : (
          <pre key={`${block.type}-${index}`} className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">
            {block.value.trim()}
          </pre>
        )
      )}
    </div>
  );
}
