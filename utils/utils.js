const fs = require('fs');

/**
 * 文件路径取出文件名
 * @param {String} path 文件路径
 */
function filePathToFilename (path){
    let start = path.lastIndexOf('/') + 1;
    let end = path.lastIndexOf('.');
    return path.slice(start, end);
}

// filePathToFilename('./src/input_fonts/DIN-MediumAlternate.otf') DIN-MediumAlternate


/**
 * 字体文件转 base64
 * @param {String} filePath 
 */
function fontFileToBase64(filePath) {
    let fontData = fs.readFileSync(filePath);
    let bufferData = Buffer.from(fontData);
    return 'data:application/octet-stream;base64,' + bufferData.toString('base64');
}

module.exports = {
    filePathToFilename,
    fontFileToBase64
}