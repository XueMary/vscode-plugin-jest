const fs = require('fs');
const path = require('path');


// 根据地址获取项目主目录
export default async function getHomeUrl (filePath) {
    
    if(fs.lstatSync(filePath).isFile()){
        if(/\.package.json$/.test(filePath)){
            const exists =  await fs.promises.access(filePath).then(() => true).catch(() => false)
            if(exists) {return filePath;}
        }
        const preUrl = path.resolve(filePath, '..');
        // const url = path.join(filePath, 'package.json');
        return getHomeUrl(preUrl);
    }else{
        
        
        return getHomeUrl(preUrl);
    }
}