const { execSync } = require("child_process");

execSync("node test/stats.js");
execSync("node test/track.js");