const fs = require('fs');

const appDirectory = __dirname;

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