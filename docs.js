const fs   = require('fs');
const appDirectory = __dirname + "/dist";
const fileName = appDirectory + "/LIST.md";

async function addToMd(title, dir)
{
    const listDir = appDirectory + "/" + dir;
    const content = await fs.readFileSync(fileName);
    let newContent = "# " + title + "\n\n| Image | Path |\n| - | - |\n";

    await fs.readdirSync(listDir).forEach(function(file)
    {
        newContent = newContent + "| ![" + file + "]("+ dir + "/" + file + ") | " + file + " |\n";
    });
    newContent = newContent + "\n";

    await fs.writeFileSync(fileName, content + newContent);

}

async function run()
{
    // Remove file
    await fs.writeFileSync(fileName, "## Credits\nAll images these are property of Clapfoot Inc.\n");

    // Items
    await addToMd('Items', "images/items");

    // Map
    await addToMd('Map', "images/map");

    // Menu 
    await addToMd('Menus', "images/menus");

    // Structures 
    await addToMd('Structuresenu', "images/structures");

    // Techtree 
    await addToMd('Techtree', "images/techtree");

    // Vehicles 
    await addToMd('Vehicles', "images/vehicles");

    // Hexagon map 
    await addToMd('Hexagon map', "maps/clasic");

}

// Run
run();