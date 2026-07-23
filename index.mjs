// index.mjs
// Main entry point — ES Module, ties everything together.

import http from 'http';                          // built-in Node module
import chalk from 'chalk';                          // npm package
import { formatTimestamp } from './formatter.mjs';   // our ES Module
import logger from './logger.js';                    // our CommonJS module

// When an ESM file imports a CJS file, the whole module.exports object
// comes through as the "default" import. So we pull the two functions
// off it here.
const { logRequest, getLastLogs } = logger;

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const timestamp = formatTimestamp();
  const logLine = `[${timestamp}] ${req.method} ${req.url}`;

  // Log EVERY request, no matter which route it hits
  logRequest(logLine);
  console.log(chalk.green(logLine));

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js!');

  } else if (req.method === 'GET' && req.url === '/logs') {
    try {
      const lastLogs = await getLastLogs(5);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ logs: lastLogs }, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not read log file' }));
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Route not found');
  }
});

server.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server running at http://localhost:${PORT}`));
});