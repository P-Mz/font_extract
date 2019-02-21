
// 引入font-carrier.js
const fontCarrier = require('font-carrier');
const { mkdir, emptyDir } = require('./dir');
const { filePathToFilename } = require('./utils');

/**
 * 字体瘦身，抽取指定字体
 * @param {String} inputFontPath 要被抽取的字体文件路径
 * @param {String} targetText 要被抽取的字
 * @param {String} outputFontPath 输出的路径
 * @return {String} outputPath
 */
function extract_fonts(inputFontPath, targetText, outputFontPath, outputFilename = 'font') {

    // 输出路径
    let currentFilePath = `${outputFontPath}/${filePathToFilename(inputFontPath)}`;
    mkdir(currentFilePath);
    emptyDir(currentFilePath);


    // 解析本地原来的字体文件
    let transFont = fontCarrier.transfer(inputFontPath);

    // 创建目标字体
    let font = fontCarrier.create();

    // 向字体中写入抽取的字形信息
    font.setGlyph(transFont.getGlyph(targetText));

    // 导出新字体到文件夹
    // 默认会导出svg,ttf,eot,woff四种字体
    // path结尾默认为导出新字体文件的名称
    // 在当前路径导出fontMin.ttf等四种字体文件
    font.output({ path: `${currentFilePath}/${outputFilename}` });

    return `${currentFilePath}/${outputFilename}.ttf`;
}

// extract_fonts(
//     '../input_fonts/DIN-MediumAlternate.otf',
//     '0123456789',
//     '../output_fonts'
// );

module.exports = extract_fonts;