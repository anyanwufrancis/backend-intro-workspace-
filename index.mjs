import http from 'http';
import chalk from 'chalk';
import { formatTimestamp } from './formatter.mjs';

const PORT = 3000;

const server = http.createServer((req, res) => {
  const timestamp = formatTimestamp();
  const message = `[${timestamp}] ${req.method} ${req.url}`;

  console.log(chalk.green(message));

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});

server.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server running at http://localhost:${PORT}`));
});