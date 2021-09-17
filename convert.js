const fs = require('fs');

// Directorys path
global.appDirectory = __dirname;
global.publicDirectory = appDirectory + '/dist';
global.sourcesDirectory = appDirectory + '/sources';

// Import functions
const tgaToPng = require('./src/tgaToPng');

// Convert tga to png
const directorys = [
    { source: 'HexMaps', dest: 'maps/satellite' },
    { source: 'HexMaps/Processed', dest: 'maps/clasic' },
    { source: 'ItemIcons', dest: 'icons/items' },
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
        await tgaToPng(sourcePath, destPath);
    }
    console.log('-----[ End convertion ]-----');
}

// Run
run();