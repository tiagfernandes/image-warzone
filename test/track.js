const { generateImageMatch } = require('../app');
const d = require('./track.json')
const fs = require('fs')

generateImageMatch(d).then(imageBase64 => {
    console.log(imageBase64);
    var imageBuffer = Buffer.from(imageBase64, 'base64'); 
    fs.writeFile("test/track.png", imageBuffer, (err) => console.log(err));
})
