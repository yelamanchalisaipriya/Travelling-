import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N8N_FORM_URL = 'https://yelamanchalisaipriya.app.n8n.cloud/form/55518f9f-408d-4aca-9194-4d81a6963c09';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check & status of the n8n form integration
  app.get('/api/n8n/status', async (_req, res) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const check = await fetch(N8N_FORM_URL, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timeout);

      res.json({
        connected: check.ok || check.status === 200,
        statusCode: check.status,
        url: N8N_FORM_URL,
        workflowTitle: 'Travelling Agent',
        owner: 'Yelamanchali Sai Priya',
      });
    } catch (err: unknown) {
      const error = err as Error;
      res.json({
        connected: false,
        url: N8N_FORM_URL,
        error: error.message,
      });
    }
  });

  // Submit trip parameters directly to n8n webhook
  app.post('/api/n8n/submit', async (req, res) => {
    try {
      const {
        name,
        from,
        destination,
        startDate,
        endDate,
        budget,
        email,
      } = req.body;

      if (!name || !from || !destination || !startDate || !endDate || !budget || !email) {
        return res.status(400).json({
          success: false,
          error: 'Missing required travel parameters (name, from, destination, startDate, endDate, budget, email)',
        });
      }

      // Append both field-* format and friendly names to accommodate any n8n node configuration
      const formData = new FormData();
      formData.append('field-0', String(name).trim());
      formData.append('field-1', String(from).trim());
      formData.append('field-2', String(destination).trim());
      formData.append('field-3', String(startDate).trim());
      formData.append('field-4', String(endDate).trim());
      formData.append('field-5', String(budget).trim());
      formData.append('field-6', String(email).trim());

      // Friendly aliases:
      formData.append('name', String(name).trim());
      formData.append('Name', String(name).trim());
      formData.append('from', String(from).trim());
      formData.append('From', String(from).trim());
      formData.append('destination', String(destination).trim());
      formData.append('Destination', String(destination).trim());
      formData.append('startDate', String(startDate).trim());
      formData.append('Start date', String(startDate).trim());
      formData.append('endDate', String(endDate).trim());
      formData.append('End date', String(endDate).trim());
      formData.append('budget', String(budget).trim());
      formData.append('Budget', String(budget).trim());
      formData.append('email', String(email).trim());
      formData.append('Email', String(email).trim());

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(N8N_FORM_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const responseText = await response.text();
      let responseJson: Record<string, unknown> | null = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Not JSON
      }

      if (response.ok || response.status === 200) {
        return res.json({
          success: true,
          status: response.status,
          n8nResponse: responseJson || { text: responseText },
          message: 'Your travel brief was successfully dispatched to Travelling Agent! Itinerary generation initiated.',
          submittedData: {
            name,
            from,
            destination,
            startDate,
            endDate,
            budget,
            email,
          },
        });
      } else {
        return res.status(response.status).json({
          success: false,
          status: response.status,
          error: `n8n responded with status ${response.status}`,
          raw: responseText,
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Error proxying to n8n:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to submit to Travelling Agent n8n workflow',
      });
    }
  });

  // Serve static assets in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Travelling Agent] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
