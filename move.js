const fs = require('fs');
const path = require('path');

// Directorys path
global.appDirectory = __dirname;
global.sourcesDirectory = appDirectory + '/tmp/sources';
global.publicDirectory = appDirectory + '/dist';

const {promisify} = require('util');
const mv = promisify(fs.rename);

// Convert tga to png
const directorys = [
    { source: 'HexMaps', dest: 'maps/satellite' },
    { source: 'HexMaps/Processed', dest: 'maps/clasic' },
    { source: 'ItemIcons', dest: 'icons/items' },
	{ source: 'Slate/Images', dest: 'icons/items' }, // "Textures\War\Content\Slate\Images"
	{ source: 'ItemIcons/Uniforms', dest: 'icons/uniforms' },
    { source: 'MapIcons', dest: 'icons/map' },
    { source: 'MapIcons/Intel', dest: 'icons/map' },
    { source: 'Menus', dest: 'icons/menus' },
    { source: 'Menus/TechTree', dest: 'icons/techtree' },
    { source: 'StructureIcons', dest: 'icons/structures' },
    { source: 'VehicleIcons', dest: 'icons/vehicles' },
    { source: 'WorldMap', dest: 'icons/map' },
];

async function run()
{
    // Convert Tga to PNG
    console.log('-----[ Start convertion ]-----');;
    for await (directory of directorys)
    {
		console.log("Start convert " + directory.source);
        const sourcePath = sourcesDirectory + '/' + directory.source;
        const destPath = publicDirectory + '/' + directory.dest;
		
		const filesList = fs.readdirSync(sourcePath);
		for await (fileName of filesList)
		{
			console.log(fileName);
			const filePath = sourcePath + '/' + fileName;
			
			// Fix name
            let saveName = fileName.replace('.tga', '');
            saveName = saveName.replace('Map', '');
            saveName = saveName.replace('Hex', '');
            saveName = saveName.replace('Icon', '');
            saveName = saveName.toLowerCase();

			if(path.extname(filePath) === '.png' && fs.existsSync(destPath + '/' + saveName) === false)
			{
				console.log("MOVE " + destPath + '/' + saveName); 
				await mv(filePath, destPath + '/' + saveName);
			}
			
		}

    }
    console.log('-----[ End convertion ]-----');
}

// Run
run();