# backend-intro-workspace-


# Simple File-Logging HTTP Server

A small Node.js project that builds an HTTP server using only Node's
built-in `http` and `fs` modules (no Express), and logs every request
it receives to a file called `requests.log`.

## What it uses

- `http` (built-in) — creates the server
- `fs` (built-in) — writes and reads requests.log
- `logger.js` — CommonJS module (require / module.exports) that
  handles all file logging
- `formatter.mjs` — ES Module (export / import) that formats the
  current timestamp
- `chalk` (npm package) — colors the console output

## How to run it

1. Install dependencies:
   npm install

2. Start the server:
   npm start

3. Visit these routes in your browser or with curl:
   - GET /       -> "Hello from Node.js!"
   - GET /logs   -> JSON list of the last 5 log entries
   - any other route -> 404 message

4. Check requests.log in the project folder — it's created
   automatically the first time a request comes in, and gets a new
   line appended every time after that.