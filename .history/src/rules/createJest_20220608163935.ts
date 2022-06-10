
import * as vscode from 'vscode';
var fs = require('fs');

// 初始化备注
const remark = `
// toBe 等于
// toEqual 深度比对对象的值
// not.toBe 不等于， 和其他也能组合

// toBeGreaterThan 大于
// toBeGreaterThanOrEqual 大于等于
// toBeLessThan 小于
// toBeLessThanOrEqual // 小于等于

// toMatch 正则匹配
// toContain 是否包含 数组和可迭代对象都可以使用
// toThrow 函数抛出错误
// 更加全面 匹配器查看 https://jestjs.io/zh-Hans/docs/expect
`

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
    return filePath;
}

// 获取测试文件创建地址
function getTestFilePath(filePath: string) {
    if (filePath) {
        const suffix = sliceFile(filePath);
        if (!suffix) { return; }
        if (['.ts', '.js'].includes(suffix)) {
            const testFileName = filePath.slice(0, filePath.length - suffix.length) + '.test' + suffix;
            return testFileName;
        }
    }
   
}

//3 创建test 文件夹， 并创建文件
async function createTestFile(filePath: string) {
    try {
        const exists = await fs.promises.access(filePath).then(() => true).catch(() => false);
        if(exists) {return true;}
        fs.writeFileSync(filePath, '');
        return true;
    } catch (error) {
        return false;
    }
}



//4 写入基础测试用例， 并列出常用api
function writeBaseJestContext(filePath: string, fnName = '') {
    const reg = /(\/?|\\?)([^\/\\]+)\.test\.[A-Za-z]+$/;
    const res = filePath.match(reg);
    if(!res) {return;};
    const fileName = res[2];
    let data = '';
    let localImport = `import { ${fnName} } from './${fileName}'`;
    let allImport = `import ${fileName} from './${fileName}'`;
    const localBaseContext = `
test('adds 1 + 2 to equal 3', () => {
    expect(${fnName}(1, 2)).toBe(3);
});
`;
const allBaseContext = `
test('adds 1 + 2 to equal 3', () => {
    expect(${fileName}(1, 2)).toBe(3);
});
`;
    if(fnName) { 
        data = `
${localImport};
${remark}
${localBaseContext}
`;
    } else {
        data = `
${allImport};
${remark}
${allBaseContext}
`;
    }

    const fileContext = fs.readFileSync(filePath, 'utf8');
    const allReg = /import\s+[^\s{}]+\s+from\s+['"][^'"]+['"]/;
    const localReg = /import\s+{(\s*[^}]+)}\s+from\s+['"][^'"]+['"]/;
    const allAndLocalReg = /import\s+([^{}\s]+,)\s*{(\s*[^}]+)}\s+from\s+['"][^'"]+['"]/;
    const isLen = !!fileContext.replace(/\n/g, '').length
    if(isLen){
        const allRes = fileContext.match(allReg);
        const localRes = fileContext.match(localReg);
        const allAndLocalRes = fileContext.match(allAndLocalReg);
        let importStr = '';
        if(allRes) {
            if(fnName) {
                importStr = `import ${fileName},{${fnName}} from './${fileName}'`;
                const _fileContext = fileContext.replace(allReg, importStr);
                fs.writeFileSync(filePath, _fileContext);
                fs.appendFileSync(filePath, localBaseContext);
            }
        } else if(localRes) {
            let importStr = '';
            if(fnName) {
                const arr = localRes[1].split(',').map((item:string)=>item.trim())
                if(arr.includes(fnName)) {return;}
                importStr =  `import {${arr.join(', ')}, ${fnName}} from './${fileName}'`;
            } else {
                importStr = `import ${fileName},{${localRes[1]}} from './${fileName}'`;
            }
            const _fileContext = fileContext.replace(localReg, importStr);
            fs.writeFileSync(filePath, _fileContext);
            if(fnName){
                fs.appendFileSync(filePath, localBaseContext);
            }else{
                fs.appendFileSync(filePath, allBaseContext);
            }
        } else if(allAndLocalRes) {
            if(fnName) {
                const arr = allAndLocalRes[2].split(',').map((item:string)=>item.trim())
                if(arr.includes(fnName)) {return;}
                importStr = `import ${allAndLocalRes[1]}{${arr.join(', ')}, ${fnName}} from './${fileName}'`;
                const _fileContext = fileContext.replace(allAndLocalReg, importStr);
                fs.writeFileSync(filePath, _fileContext);
                fs.appendFileSync(filePath, localBaseContext);
            }
        }
    } else {
        fs.appendFileSync(filePath, data);
    }
    
}



export default async function createJestFile() {
    const names = getFunctionNames();
    const filePath = getFilePath();
    if (!filePath) { return; }
    const testFilePath = getTestFilePath(filePath);
    if(!testFilePath) {return;}
    const isCreate =  await createTestFile(testFilePath);
    if(!isCreate) {return;}
    const fnName = names ? names[0] : '';
    writeBaseJestContext(testFilePath, fnName);
}