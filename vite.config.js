import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'telegram-api-proxy',
        configureServer(server) {
          server.middlewares.use('/api/telegram', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
            }

            let raw = '';
            req.on('data', chunk => { raw += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(raw || '{}');
                const token = data.botToken || env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
                const defaultChatId = env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
                const method = data.method || 'sendMessage';
                const body = { ...(data.body || {}) };

                if (!body.chat_id && defaultChatId) {
                  body.chat_id = defaultChatId;
                }

                if (!token) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ ok: false, description: 'Telegram Bot Token topilmadi' }));
                }

                const tgRes = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body)
                });

                const tgJson = await tgRes.json();
                res.statusCode = tgRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(tgJson));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, description: err.message }));
              }
            });
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use('/api/telegram', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
            }

            let raw = '';
            req.on('data', chunk => { raw += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(raw || '{}');
                const token = data.botToken || env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
                const defaultChatId = env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
                const method = data.method || 'sendMessage';
                const body = { ...(data.body || {}) };

                if (!body.chat_id && defaultChatId) {
                  body.chat_id = defaultChatId;
                }

                if (!token) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ ok: false, description: 'Telegram Bot Token topilmadi' }));
                }

                const tgRes = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body)
                });

                const tgJson = await tgRes.json();
                res.statusCode = tgRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(tgJson));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, description: err.message }));
              }
            });
          });
        }
      }
    ],
  }
})