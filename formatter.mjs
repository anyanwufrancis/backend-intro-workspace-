// formatter.mjs
// ES Module — uses export/import instead of require()/module.exports.
// The .mjs extension is what tells Node to treat this file as an ES Module.

export function formatTimestamp() {
  const now = new Date();

  // Adds a leading zero to single digits: 9 -> "09"
  const pad = (num) => String(num).padStart(2, '0');

  // getMonth() is zero-based (Jan = 0), so add 1 to match real calendar months
  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return `${datePart} ${timePart}`;
}