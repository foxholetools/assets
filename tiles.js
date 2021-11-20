const cliProgress = require('cli-progress');

// Directorys path
global.publicDirectory = __dirname + '/dist';
global.appDirectory = __dirname;
global.libDirectory = appDirectory + '/libs';

// Config
const useLibs = true;

// Import functions
const tileImage     = require('./src/tileImage');
const tileImageLibs = require('./src/tileImageLibs');

// Create new container
// shades_grey, shades_classic
global.progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
global.multibar = new cliProgress.MultiBar({
    clearOnComplete: false
}, cliProgress.Presets.shades_grey);

const hexagonsList = [
    'acrithia', // WIP
    'allodsbight', // WIP
    'ashfields', // # Update WIP
    'basinsionnach', // # Update WIP

    'callahanspassage',
    'clansheadvalley', // #
    'deadlands',
    'drownedvale',

    'endlessshore',
    'farranaccoast',
    'fishermansrow',
    'godcrofts',

    'greatmarch',
    'heartlands',
    'howlcounty', // #
    'kalokai', // #

    'linnMercy',
    'lochMor',
    'nevishline', // #
    'marbanhollow',

    'morgenscrossing', // #
    'mooringcounty',
    'oarbreaker',
    'origin', // #

    'reachingtrail',
    'redriver', // #
    'shackledchasm',
    'speakingwoods', // #

    'stonecradle',
    'tempestisland',
    'terminus', // #
    'thefingers', // #

    'umbralwildwood',
    'viperpit',
    'weatheredexpanse',
    'westgate',

    'homeregionc', // Ok
    'homeregionw', // OK
];

async function run()
{
    // Tile war map
    //console.log('-----[ Start wap map tiles ]-----');
    //tileImage('dist/maps/clasic/warmap.png', { minZoom: 7, maxZoom: 7 });
    //console.log('-----[ End wap map tiles ]-----');

    // Tile hexagons
    console.log('-----[ Start hexagons tiles generation ]-----');
    for await (hexagon of hexagonsList)
    {
        console.log('Start ' + hexagon + ' hexagon');

         await tileImage('dist/maps/clasic/' + hexagon + '.png');
         await tileImage('dist/maps/color/' + hexagon + '.png');

    }
    console.log('-----[ End hexagons tiles generation ]-----');
}

// Run
run();