global.sharp = require('sharp');
const fs     = require('fs');

// Directorys path
global.publicDirectory = __dirname + '/../dist';
global.appDirectory = __dirname + '/..';

async function run()
{
	
    console.log('-----[ Start color generation ]-----');
	const filesList = fs.readdirSync(appDirectory + '/tmp/color');
    for await (fileName of filesList)
    {
		// Fix name
        let saveName = fileName.replace('.tga', '');
        saveName = saveName.replace('Map', '');
        saveName = saveName.replace('Hex', '');
        saveName = saveName.replace('Icon', '');
        saveName = saveName.toLowerCase();
		
        // Copie to dist folder
		await fs.copyFileSync(appDirectory + '/tmp/color/' + fileName, publicDirectory + '/maps/color/' + saveName);

    } 
    console.log('-----[ End color generation ]-----');
}

// Run
run();