const fs = require('fs');
const path = require('path');


function isRoot(filePath) {
    if(fs.lstatSync(filePath).isDirectory()){
        const url = path.join(filePath, 'package.json');
        const exists =  await fs.promises.access(url).then(() => true).catch(() => false)
        if(exists) {return true;}
    }
    return false;
}


// 根据地址获取项目主目录
export default async function getHomeUrl (filePath) {
    
    if(fs.lstatSync(filePath).isDirectory()){
        if(isRoot(filePath)){
            return filePath;
        }
        
    }else{
        
        const url = path.join(filePath, 'package.json');
        return getHomeUrl(preUrl);
    }
    const preUrl = path.resolve(filePath, '..');
        return getHomeUrl(preUrl);
}