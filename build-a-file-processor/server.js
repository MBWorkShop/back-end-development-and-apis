const fs = require('fs'); console.log(fs);
fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
fs.appendFileSync("assets/output.txt", "\nICh bin Matti und los gehts!");
const exists = fs.existsSync("assets/output.txt");
console.log(exists);
const entries = fs.readdirSync("assets");
console.log(entries);