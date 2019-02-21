/**
 * fs模块:
 * 
 *      readdirSync:    查看文件夹 下的所有内容
 *          @return: Array
 * 
 *      isDirectory:    判断是否是文件夹
 *          @return: Boolean
 * 
 *      statSync:       查看(文件|文件夹)信息
 *          @return: Object
 * 
 *      unlinkSync:     删除文件
 *      rmdirSync:      删除文件夹
 * 
 *      existsSync:     判断文件夹是否存在
 *          @return: Boolean
 */


const fs = require('fs');


/**
 * 清空文件夹
 * @param {String} url 文件夹路径
 */
function emptyDir(url) {
    if (!fs.existsSync(url)) return false;

    const files = fs.readdirSync(url);

    // 循环递归删除文件夹 里面的内容
    files.forEach(filename => {
        let stat = fs.statSync(url + '/' + filename);
        if (stat.isDirectory()) {
            rmdir(url + '/' + filename);
        } else {
            // 删除文件
            fs.unlinkSync(url + '/' + filename);
        }
    });
}


/**
 * 删除文件夹
 * @param {String} url 文件夹路径
 */
function rmdir(url) {
    emptyDir(url);
    // 删除传入的文件夹路径的 文件夹
    fs.rmdirSync(url);
}

/**
 * 创建文件夹
 * @param {String} url 文件夹路径
 */
function mkdir(url) {
    !fs.existsSync(url) && fs.mkdirSync(url)
}


/**
 * 获取当前文件的同胞文件
 * @param {String} url 文件路径
 */
function siblings(url) {
    let outputPath = url.slice(0, url.lastIndexOf('/'));
    return fs.readdirSync(outputPath);
}

/**
 * 获取当前文件的 上一级目录
 * @param {String} url 文件路径
 */
function parentDir(url) {
    let arr = url.split('/');
    return arr[arr.length - 2];
}


module.exports = {
    rmdir,
    mkdir,
    emptyDir,
    siblings,
    parentDir
};