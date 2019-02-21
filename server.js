
const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const path = require('path');
const app = express();



const extract_fonts = require('./utils/extract_fonts');
const { siblings, parentDir } = require('./utils/dir');
const { fontFileToBase64 } = require('./utils/utils');


// 输出字体文件路径
const OUTPUT_FONT_PATH = './output_fonts';


// 静态资源路径
app.use('/public', express.static(path.join(__dirname, "public")));
app.use('/download', express.static(path.join(__dirname, "output_fonts")));

app.get('/', async (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});


app.post('/upload_file', multipartMiddleware, async (req, res) => {
    let { name, path } = req.files.file;
    let { target_text } = req.body;

    if (!/\.(otf|ttf|woff|woff2|eot)$/.test(name)) {
        res.send({ msg: '文件类型不符合', data: '' });
        return false;
    }

    if (!target_text) {
        res.send({ msg: 'target_text参数不能为空', data: '' });
        return false;
    }

    // 输入字体文件路径
    const INPUT_FONT_PATH = path.replace(/\\/g, '/');
    // 抽取字体，建立新的文件夹
    let outputFilepath = extract_fonts(INPUT_FONT_PATH, target_text, OUTPUT_FONT_PATH);
    // 转换成base64
    let base64 = fontFileToBase64(outputFilepath);
    // 生成的所有的 新字体文件
    let outputFiles = siblings(outputFilepath);

    let dirname = parentDir(outputFilepath);

    res.send({
        msg: 'success',
        data: {
            base64,
            files: outputFiles,
            dirname
        }
    });

});

app.listen(8080, function (){
    console.log('\r\r');
    console.log('     http://localhost:8080');
    console.log('\r');
});