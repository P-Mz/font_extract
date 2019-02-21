
const extract_fonts =  require('./utils/extract_fonts');
const fontFileToBase64 = require('./utils/fontFileToBase64');

// 输入字体文件路径
const INPUT_FONT_PATH = './DIN-MediumAlternate.otf';
// 输出字体文件路径
const OUTPUT_FONT_PATH = './output_fonts';
// 待抽取的字
const TARGET_TEXT = '0123456789';


// 抽取字体，建立新的文件夹
let outputpath = extract_fonts(INPUT_FONT_PATH, TARGET_TEXT, OUTPUT_FONT_PATH);

// 转换成base64
let base64 = fontFileToBase64(outputpath);

console.log(base64);