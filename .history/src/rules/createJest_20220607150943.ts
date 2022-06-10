// 获取本文
const getText = () => {
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

    // “光标换行” 调用vscode内置的换行命令，所有focus的光标都会换行
    // vscode.commands.executeCommand('editor.action.insertLineAfter')
    // .then(()=> {
    //     const editor = vscode.window.activeTextEditor;
    //     const ranges = editor.selections;
    //     const positionList = [];
    //     ranges.forEach((range, index) => {
    //         // 通过range拿到start位置的position
    //         const position = new vscode.Position(range.start.line, range.start.character);
    //         positionList.push(position);
    //     });
    //     // 编辑当前文件
    //     editor.edit((editBuilder) => {
    //         positionList.forEach((position, index) => {
    //             // 通过”坐标点“插入我们之前预设好的log文本
    //             editBuilder.insert(position, textArray[index]);
    //         });
    //     });
    // });
};

// 获取单前文件路径

// 创建test 文件夹， 并创建文件

// 写入基础测试用例， 并列出常用api


import * as vscode from 'vscode';
export default function createJestFile() {
    getText()
    vscode.window.showInformationMessage('Hello World from vscode-plugin-jest!');
}