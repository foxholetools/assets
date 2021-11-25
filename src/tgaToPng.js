const fs   = require('fs');
const path = require('path');
const tga2png = require('tga2png');

async function createDirectory(path)
{
    path = path.replace(publicDirectory + '/', '');
    let currentPath = publicDirectory;
    for await (dir of path.split('/'))
    {
        currentPath = currentPath + '/' + dir;
        if (!fs.existsSync(currentPath))
        {
            fs.mkdirSync(currentPath);
        }
    }
}

/**
 * 
 * @param {sting} file 
 * @param {string} savePath 
 * @returns void
 */
 async function tgaToPng(source, dest)
 {
    const filesList = fs.readdirSync(source);
    for await (fileName of filesList)
    {
        const filePath = source + '/' + fileName;
        if(path.extname(filePath) === '.tga')
        {
            await createDirectory(dest);

            // Fix name
            let saveName = fileName.replace('.tga', '');
            saveName = saveName.replace('Map', '');
            saveName = saveName.replace('Hex', '');
            saveName = saveName.replace('Icon', '');
            saveName = saveName.toLowerCase();

            // Save to png
            await tga2png(source + '/' + fileName, dest + '/' + saveName + '.png');
        }

    }
 }

 module.exports = tgaToPng;