const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Map size
// H : 5 (4440px)
// W : ~7 (7168px)
const canvas = createCanvas(5644, 6216);
const ctx = canvas.getContext('2d');

// 1024 x 888
// + y 444
// + x 770
const maps = {
    // 1 line (0)
	'basinsionnach': {
        x: 770 * 3,
        y: 0
	},
	// 2 line (444)
    'speakingwoods': {
        x: 770 * 2,
        y: 444
    },
    'howlcounty': {
        x: 770 * 4,
        y: 444
    },
    // 3 line (888)
    'callumscape': {
        x: 770,
        y: 888
    },
    'reachingtrail': {
        x: 770 * 3,
        y: 888
    },
    'clansheadvalley': {
        x: 770 * 5,
        y: 888
    },
    // 4 line (1332)
    'nevishline': {
        x: 0,
        y: 1332
    },
    'mooringcounty': {
        x: 770 * 2,
        y: 1332
    },
    'viperpit': {
        x: 770 * 4,
        y: 1332
    },
    'morgenscrossing': {
        x: 770 * 6,
        y: 1332
    },
    // 5 line (1776)
    'stonecradle': {
        x: 770,
        y: 1776
    },
    'callahanspassage': {
        x: 770 * 3,
        y: 1776
    },
    'weatheredexpanse': {
        x: 770 * 5,
        y: 1776
    },
    // 6 line (2220)
    'oarbreaker': {
        x: 0,
        y: 2220
    },
    'linnmercy': {
        x: 770 * 2,
        y: 2220
    },
    'marbanhollow': {
        x: 770 * 4,
        y: 2220
    },
    'godcrofts': {
        x: 770 * 6,
        y: 2220
    },
    // 7 line (2664)
    'farranaccoast': {
        x: 770,
        y: 2664
    },
    'deadlands': {
        x: 770 * 3,
        y: 2664
    },
    'endlessshore': {
        x: 770 * 5,
        y: 2664
    },
    // 8 line (3108)
    'fishermansrow': {
        x: 0,
        y: 3108
    },
    'lochmor': {
        x: 770 * 2,
        y: 3108
    },
    'drownedvale': {
        x: 770 * 4,
        y: 3108
    },
    'tempestisland': {
        x: 770 * 6,
        y: 3108
    },
    // 9 line (3552)
    'westgate': {
        x: 770,
        y: 3552
    },
    'umbralwildwood': {
        x: 770 * 3,
        y: 3552
    },
    'allodsbight': {
        x: 770 * 5,
        y: 3552
    },
    // 10 line (3996)
    'origin': {
        x: 0,
        y: 3996
    },
    'heartlands': {
        x: 770 * 2,
        y: 3996
    },
    'shackledchasm': {
        x: 770 * 4,
        y: 3996
    },
    'thefingers': {
        x: 770 * 6,
        y: 3996
    },
    // 11 line (4440)
    'ashfields': {
        x: 770,
        y: 4440
    },
    'greatmarch': {
        x: 770 * 3,
        y: 4440
    },
    'terminus': {
        x: 770 * 5,
        y: 4440
    },
    // 12 line (4884)
    'redriver': {
        x: 770 * 2,
        y: 4884
    },
    'acrithia': {
        x: 770 * 4,
        y: 4884
    },
    // 13 line (5328)
    'kalokai': {
        x: 770 * 3,
        y: 5328
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
    fs.writeFileSync(publicDirectory + "/maps/clasic/warmap.png", buf);

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
     fs.writeFileSync(publicDirectory + "/maps/satellite/warmap.png", buf);
 
 }

/**
 * Generate big map
 */
 async function generateColorMap()
 {
     const mapsDirectory = publicDirectory + '/maps/color';

     for await (const [ mapName, values ] of Object.entries(maps))
     {
         const image = await loadImage(mapsDirectory + '/' + mapName + '.png');
         ctx.drawImage(image, values.x, values.y);
     }

     const buf = canvas.toBuffer();
     fs.writeFileSync(publicDirectory + "/maps/color/warmap.png", buf);
 
 }

 async function Run()
 {
    // await generateClasicMap();
    // await generateSateliteMap();
    await generateColorMap();
 }
 

module.exports = Run;