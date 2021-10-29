const fs = require('fs');

const appDirectory = __dirname;

const hexagonsList = [
	'acrithia',
    'allodsbight',
    'ashfields',
    'basinsionnach',
    'callahanspassage',
    'clansheadvalley',
    'deadlands',
    'drownedvale',
    'endlessshore',
    'farranaccoast',
    'fishermansrow',
    'godcrofts',
    'greatmarch',
    'heartlands',    
    'howlcounty',
    'kalokai',
    'linnMercy',
    'lochMor',
    'nevishline',
    'marbanhollow',
    'morgenscrossing',
    'mooringcounty',
    'oarbreaker',
    'origin',
    'reachingtrail',
    'redriver',
    'shackledchasm',
    'speakingwoods',
    'stonecradle',
    'tempestisland',
    'terminus',
    'thefingers',
    'umbralwildwood',
    'viperpit',
    'weatheredexpanse',
    'westgate',

    'homeregionc',
    'homeregionw',
	'warmap'
];

async function clearDirectory(path, hexagon)
{
    const filesList = fs.readdirSync(path);
    for await (file of filesList)
    {
        const stats = fs.statSync(path + "/" + file);
        const fileSizeInBytes = stats.size;
        if (fileSizeInBytes == 190)
        {
            await fs.renameSync(path + "/" + file, appDirectory + "/tmp/trash/" + hexagon + "-" + file);
        }
    }
}

async function run()
{
    for await (hexagon of hexagonsList)
    {
        const dirPath = appDirectory + "/dist/maps/tiles/" + hexagon;
        const zoomsList = fs.readdirSync(dirPath);
        for await (zoom of zoomsList)
        {
            await clearDirectory(dirPath + "/" + zoom, hexagon);
        }
    }
}

// Run
run();