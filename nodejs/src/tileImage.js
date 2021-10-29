const fs   = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
* 
* @param {int} zoom 
*/
async function tileImage(input, options)
{
    // Config
    options = options || {};
    const tmpDir = options.tmpDir || appDirectory + '/tmp';
    const outputDir = options.outputDir || publicDirectory + '/maps/tiles';
    const minZoom = options.minZoom || 0;
    const maxZoom = options.maxZoom || 7;
    const tileSize = options.tileSize || 256;

    // Get filename
    const filePath = input.split('/');
    const fileName = filePath[filePath.length - 1].replace('.png', '');
    const squarified = tmpDir + '/' + fileName + '-squarified.png';

    // Create folder if not exit
    if (!fs.existsSync(tmpDir))
    {
        fs.mkdirSync(tmpDir);
    }

    if (!fs.existsSync(outputDir))
    {
        fs.mkdirSync(outputDir);
    }

    if (!fs.existsSync(outputDir + '/' + fileName))
    {
        fs.mkdirSync(outputDir + '/' + fileName);
    }

    // Create best image
    let metadata = await sharp(appDirectory + '/' + input).metadata();
    let fullPixelSize = Math.max(metadata.width, metadata.height);

    console.log("Start squarified");

    if (!fs.existsSync(squarified))
    {
        await sharp(appDirectory + '/' + input, {
            limitInputPixels: false,
            sequentialRead: true
        })
        .resize({
            width: fullPixelSize,
            height: fullPixelSize,
            fit: sharp.fit.contain,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
            limitInputPixels: false
        })
        .toFormat('png')
        .png({
            quality: 100
        })
        .toFile(squarified);
    }
    
    console.log("Squarified ok");

    // progress bar
    const b1 = await multibar.create((maxZoom - minZoom) + 1, 0);
    const b2 = await multibar.create(0, 0);
    const b3 = await multibar.create(0, 0);

    // Tiles
    let zoom = minZoom;
    while(true)
    {
        // double size for each consecutive zoom level, starting at 256px:
        if (zoom > maxZoom)
        {
            zoom--;
            break;
        }

        // console.log(`Processing zoom level ${zoom}...`);

        // Create dir if not exit
        if (!fs.existsSync(outputDir + '/' + fileName + '/' + zoom))
        {
            fs.mkdirSync(outputDir + '/' + fileName + '/' + zoom);
        }

        const resized = tmpDir + '/' + fileName + '-resized-' + zoom + '.png';
        const pixelSize = tileSize * 2**zoom;

        if (!fs.existsSync(resized))
        {
            await sharp(squarified, {
                    limitInputPixels: false
                })
                .resize({
                    width: pixelSize,
                    height: pixelSize,
                    fit: sharp.fit.contain,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .toFormat('png')
                .png({
                    quality: 100
                })
                .toFile(resized);
        }

        // Global object
        const image = sharp(resized, {
            limitInputPixels: false,
            sequentialRead: true
        });

        let rows = 2**zoom;
        let cols = 2**zoom;

        await b2.setTotal(rows);
        await b2.update(0);
        await b3.setTotal(cols);
        await b3.update(0);

        for(let row = 0; row < rows; row++)
        {
            // Reset
            let promises = [];
            await b3.update(0);

            for(let col = 0; col < cols; col++)
            {
                const tileName = outputDir + '/' + fileName + '/' + zoom + '/' + zoom + '_' + col  + '_' + row + '.png';
                const img = image;
                await img.extract({
                    left: col*tileSize,
                    top: row*tileSize,
                    width: tileSize,
                    height: tileSize
                })
                .png({
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    quality: 80,
                    force: true,
                })
                .toFormat('png')
                .toFile(tileName);
                await b3.increment();
            }

            await b2.increment();
        }

        zoom++;
        await b1.increment();
    }

    // Stop and remove
    await b1.stop();
    await multibar.remove(b1);
    await b2.stop();
    await multibar.remove(b2);
    await b3.stop();
    await multibar.remove(b3);
    await multibar.stop();

}
    
module.exports = tileImage;

// Reprise post arret
// Supprimer le ficher dans TMP