
import * as vscode from 'vscode';
var fs = require('fs');

//1 获取本文
const getFunctionNames = () => {
    // 获取当前打开的文件的editor
    const editor = vscode.window.activeTextEditor;
    // editor === undefind 表示没有打开的文件
    if (!editor) { return; }
    // 当前被选中文本的位置信息数组（实际上就是range组成的数组）
    const ranges = editor.selections;
    const functionNames: string[] = [];
    ranges.forEach((range) => {
        // 通过位置信息拿到被选中的文本，然后拼接要插入的log
        const text = editor.document.getText(range);
        functionNames.push(text);
    });
    return functionNames;
};

// 截取文件后缀
function sliceFile(fileName: string) {
    const reg = /\.[^\.]*$/;
    const res = fileName.match(reg);
    if (res) {
        return res[0];
    }
}


//2 获取单前文件路径
function getFilePath() {
    const filePath = vscode.window.activeTextEditor?.document.fileName;
    return filePath
}

//3 创建test 文件夹， 并创建文件
function createTestFile(filePath: string) {
    if (filePath) {
        const suffix = sliceFile(filePath)
        if (!suffix) { return; }
        if (['.ts', '.js'].includes(suffix)) {
            const testFileName = filePath.slice(0, filePath.length - suffix.length) + '.test' + suffix
            console.log(testFileName, vscode.workspace.workspaceFile)
            fs.writeFile(testFileName, 'HelloWorld', function (err: Error) {
                if (err) {
                    throw err;
                }
            });
        }
    }

}

//4 写入基础测试用例， 并列出常用api



export default function createJestFile() {
    const names = getFunctionNames();
    if (!names?.length) { return; }
    const filePath = getFilePath()
    if (!filePath) { return; }
    createTestFile(filePath)
    vscode.window.showInformationMessage('Hello World from vscode-plugin-jest!');
}