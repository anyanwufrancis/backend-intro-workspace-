const fs = require('fs');

function logRequest(message) {
  fs.appendFileSync('requests.log', message + '\n');
}

module.exports = { logRequest };