const cliProgress = require('cli-progress');

// Directorys path
global.publicDirectory = __dirname + '/dist';
global.appDirectory = __dirname;

// Import functions
const tileImage = require('./src/tileImage');

// Create new container
// shades_grey, shades_classic
global.progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
global.multibar = new cliProgress.MultiBar({
    clearOnComplete: false
}, cliProgress.Presets.shades_grey);

const hexagonsList = [
    'allodsbight',
    'callahanspassage',
    'deadlands',
    'drownedvale',
    'endlessshore',
    'farranaccoast',
    'fishermansrow',    
	'godcrofts',
    'greatmarch',
    'heartlands',
    'linnMercy',
	'lochMor',
    'marbanhollow',    
	'mooringcounty',
    'oarbreaker',
	'reachingtrail',	
    'shackledchasm',
    'stonecradle',
    'tempestisland',
    'umbralwildwood',
    'viperpit',
    'weatheredexpanse',
    'westgate',
    'homeregionc',
    'homeregionw'
];

async function run()
{
    // Tile war map
    console.log('-----[ Start wap map tiles ]-----');
    // tileImage('public/Maps/warmap.png');
    console.log('-----[ End wap map tiles ]-----');

    // Tile hexagons
    console.log('-----[ Start hexagons tiles generation ]-----');
    for await (hexagon of hexagonsList)
    {
        console.log('Start ' + hexagon + ' hexagon');
        await tileImage('dist/maps/clasic/' + hexagon + '.png');
        // await tileImage('dist/maps/satellite/' + hexagon + '.png');
    }
    console.log('-----[ End hexagons tiles generation ]-----');
}

// Run
run();