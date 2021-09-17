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
    'acrithia',
    // 'allodsbight',
    'ashfields',
    'basinsionnach',
    // 'callahanspassage',
    'clansheadvalley',
    // 'deadlands',
    // 'drownedvale',
    // 'endlessshore',
    // 'farranaccoast',
    // 'fishermansrow',
    // 'godcrofts',
    // 'greatmarch',
    // 'heartlands',    
    'howlcounty',
    'kalokai',
    // 'linnMercy',
    // 'lochMor',
    'nevishline',
    // 'marbanhollow',
    'morgenscrossing',
    // 'mooringcounty',
    // 'oarbreaker',
    'origin',
    // 'reachingtrail',
    'redriver',
    // 'shackledchasm',
    'speakingwoods',
    // 'stonecradle',
    // 'tempestisland',
    'terminus',
    'thefingers',
    // 'umbralwildwood',
    // 'viperpit',
    // 'weatheredexpanse',
    // 'westgate',

    // 'homeregionc',
    // 'homeregionw',
];

async function run()
{
    // Tile war map
    console.log('-----[ Start wap map tiles ]-----');
    tileImage('dist/maps/clasic/warmap.png', { minZoom: 6, maxZoom: 6 });
    console.log('-----[ End wap map tiles ]-----');

    // Tile hexagons
    // console.log('-----[ Start hexagons tiles generation ]-----');
    // for await (hexagon of hexagonsList)
    // {
    //     console.log('Start ' + hexagon + ' hexagon');
    //     await tileImage('dist/maps/clasic/' + hexagon + '.png', { minZoom: 7, maxZoom: 7 });
    //     // await tileImage('dist/maps/satellite/' + hexagon + '.png');
    // }
    // console.log('-----[ End hexagons tiles generation ]-----');
}

// Run
run();