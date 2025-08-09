const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const INDEX_PATH = path.join(__dirname, 'public', 'index.html');

function parseMachines(raw) {
  if (!raw) return [];
  return raw
    .replace(/[;,\s]+/g, '\n')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
}

function runPsexec(username, password, machine, command) {
  return new Promise((resolve) => {
    const target = `${username}:${password}@${machine}`;
    const argv = ['-m', 'impacket.examples.psexec', target, command];

    const child = spawn('python3', argv, { stdio: ['ignore', 'pipe', 'pipe'] });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      resolve({ machine, returncode: code, stdout: stdout.slice(-10000), stderr: stderr.slice(-10000) });
    });

    child.on('error', (err) => {
      resolve({ machine, returncode: null, stdout: '', stderr: `Error: ${err.message}` });
    });
  });
}

async function handleExecute(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const data = JSON.parse(body || '{}');
      const username = String(data.username || '').trim();
      const password = String(data.password || '').trim();
      const machinesRaw = String(data.machines || '');
      const command = String(data.command || '').trim();

      if (!username || !password || !command) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'username, password, and command are required' }));
        return;
      }

      const machines = parseMachines(machinesRaw);
      if (machines.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'At least one machine is required' }));
        return;
      }

      const results = [];
      for (const m of machines) {
        // Sequential execution per requirement
        /* eslint-disable no-await-in-loop */
        const r = await runPsexec(username, password, m, command);
        results.push(r);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ results }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    }
  });
}

function serveIndex(res) {
  fs.readFile(INDEX_PATH, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    serveIndex(res);
    return;
  }
  if (req.method === 'POST' && req.url === '/execute') {
    handleExecute(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});