global.sharp = require('sharp');

// Directorys path
global.publicDirectory = __dirname + '/dist';
global.appDirectory = __dirname;

// Import functions
const generateMap = require('./src/generateMap');

async function run()
{
    // Generate war map
    console.log('-----[ Start map generation ]-----');
    await generateMap();
    console.log('-----[ End map generation ]-----');
}

// Run
run();