// logger.js
// CommonJS module — uses require() and module.exports

const fs = require('fs');
const path = require('path');

// __dirname always points to the folder this file is in.
// This builds an absolute path to requests.log so it's always
// created in the right place, no matter where you run the app from.
const LOG_FILE_PATH = path.join(__dirname, 'requests.log');

function logRequest(message) {
  const line = message + '\n';

  // fs.appendFile creates the file if it doesn't exist,
  // and adds to the end if it does. It's asynchronous.
  fs.appendFile(LOG_FILE_PATH, line, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

function getLastLogs(count = 5) {
  return new Promise((resolve, reject) => {
    fs.readFile(LOG_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        // ENOENT = file doesn't exist yet, so just return an empty list
        if (err.code === 'ENOENT') return resolve([]);
        return reject(err);
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      resolve(lines.slice(-count));
    });
  });
}

module.exports = { logRequest, getLastLogs };