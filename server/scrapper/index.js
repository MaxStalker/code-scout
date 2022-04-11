require = require("esm")(module /*, options*/);

let [filename] = process.argv.slice(2);
require(`./${filename}`)
