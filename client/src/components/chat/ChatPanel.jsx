import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Field, Textarea } from '../common/Field.jsx';
import { Panel } from '../common/Panel.jsx';
import { formatDate } from '../../utils/formatters.js';
import { useChatStore } from '../../store/chatStore.js';

export function ChatPanel({ projectId }) {
  const { chats, sendMessage, loading, error } = useChatStore();
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    await sendMessage({ projectId, message });
    setMessage('');
  };

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">AI QA assistant</h2>
      <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-2">
        {chats.length ? (
          chats.map((chat) => (
            <div key={chat._id} className="space-y-2 rounded-md border border-slate-200 p-3 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{chat.userMessage}</p>
              <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">{chat.assistantMessage}</pre>
              <p className="text-xs text-slate-500">{formatDate(chat.createdAt)}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Ask about missing tests, edge cases, assertions, or coverage gaps.</p>
        )}
      </div>

      <form className="mt-4 space-y-3" onSubmit={submit}>
        <Field label="Message">
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Identify missing tests for this project." />
        </Field>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button type="submit" disabled={loading || !message.trim()}>
          <Send className="h-4 w-4" />
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </Panel>
  );
}
