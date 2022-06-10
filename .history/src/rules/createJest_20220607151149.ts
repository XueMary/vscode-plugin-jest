// 获取本文
const getFunctionNames = () => {
    // 获取当前打开的文件的editor
    const editor = vscode.window.activeTextEditor;
    // editor === undefind 表示没有打开的文件
    if(!editor) {return;}
    // 当前被选中文本的位置信息数组（实际上就是range组成的数组）
    const ranges = editor.selections;
    const functionNames:string[] = [];
    ranges.forEach((range) => {
        // 通过位置信息拿到被选中的文本，然后拼接要插入的log
        const text = editor.document.getText(range);
        functionNames.push(text);
    });
    return functionNames;
};

// 获取单前文件路径

// 创建test 文件夹， 并创建文件

// 写入基础测试用例， 并列出常用api


import * as vscode from 'vscode';
export default function createJestFile() {
    const names = getFunctionNames();
    if(!names?.length) {return;}
    vscode.window.showInformationMessage('Hello World from vscode-plugin-jest!');
}