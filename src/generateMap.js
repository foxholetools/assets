const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Map size
// H : 5 (4440px)
// W : ~7 (7168px)
const canvas = createCanvas(5644, 4440);
const ctx = canvas.getContext('2d');

// 1024 x 888
// + y 444
// + x 770
const maps = {
    // 1 line (0)
    'reachingtrail': {
        x: 770 * 3,
        y: 0
    },
    // 2 line (444)
    'mooringcounty': {
        x: 770 * 2,
        y: 444
    },
    'viperpit': {
        x: 770 * 4,
        y: 444
    },
    // 3 line (888)
    'stonecradle': {
        x: 770,
        y: 888
    },
    'callahanspassage': {
        x: 770 * 3,
        y: 888
    },
    'weatheredexpanse': {
        x: 770 * 5,
        y: 888
    },
    // 4 line (1332)
    'oarbreaker': {
        x: 0,
        y: 1332
    },
    'linnmercy': {
        x: 770 * 2,
        y: 1332
    },
    'marbanhollow': {
        x: 770 * 4,
        y: 1332
    },
    'godcrofts': {
        x: 770 * 6,
        y: 1332
    },
    // 5 line (1776)
    'farranaccoast': {
        x: 770,
        y: 1776
    },
    'deadlands': {
        x: 770 * 3,
        y: 1776
    },
    'endlessshore': {
        x: 770 * 5,
        y: 1776
    },
    // 6 line (2220)
    'fishermansrow': {
        x: 0,
        y: 2220
    },
    'lochmor': {
        x: 770 * 2,
        y: 2220
    },
    'drownedvale': {
        x: 770 * 4,
        y: 2220
    },
    'tempestisland': {
        x: 770 * 6,
        y: 2220
    },
    // 7 line (2664)
    'westgate': {
        x: 770,
        y: 2664
    },
    'umbralwildwood': {
        x: 770 * 3,
        y: 2664
    },
    'allodsbight': {
        x: 770 * 5,
        y: 2664
    },
    // 8 line (3108)
    'heartlands': {
        x: 770 * 2,
        y: 3108
    },
    'shackledchasm': {
        x: 770 * 4,
        y: 3108
    },
    // 9 line (3552)
    'greatmarch': {
        x: 770 * 3,
        y: 3552
    },
};

/**
 * Generate big map
 */
async function generateClasicMap()
{
    const mapsDirectory = publicDirectory + '/maps/clasic';

    for await (const [ mapName, values ] of Object.entries(maps))
    {
        const image = await loadImage(mapsDirectory + '/' + mapName + '.png');
        ctx.drawImage(image, values.x, values.y);
    }   

    const buf = canvas.toBuffer();
    fs.writeFileSync(publicDirectory + "/maps/clasic/global.png", buf);

}

/**
 * Generate big map
 */
 async function generateSateliteMap()
 {
     const mapsDirectory = publicDirectory + '/maps/satellite';
 
     for await (const [ mapName, values ] of Object.entries(maps))
     {
         const image = await loadImage(mapsDirectory + '/' + mapName + '.png');
         ctx.drawImage(image, values.x + 1024, values.y + 1160);
     }   
 
     const buf = canvas.toBuffer();
     fs.writeFileSync(publicDirectory + "/maps/satellite/global.png", buf);
 
 }

 async function Run()
 {
    await generateClasicMap();
    // await generateSateliteMap();
 }
 

module.exports = Run;