const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/url\(['"]?\.\/assets/g, "url('/assets");
fs.writeFileSync('src/index.css', css);
console.log('CSS Fixed');
