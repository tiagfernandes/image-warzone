const { generateImageStats } = require('../app');
const d = require('./stats.json')
const fs = require('fs')

generateImageStats(d).then(imageBase64 => {
    console.log(imageBase64);
    var imageBuffer = Buffer.from(imageBase64, 'base64'); 
    fs.writeFile("test/stats.png", imageBuffer, (err) => console.log(err));
})
