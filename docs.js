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

    // Uniforms
    await addToMd('Uniforms', "icons/uniforms");
	
    // Items
    await addToMd('Items', "icons/items");

    // Map
    await addToMd('Map', "icons/map");

    // Menu 
    await addToMd('Menus', "icons/menus");

    // Structures 
    await addToMd('Structuresenu', "icons/structures");

    // Techtree 
    await addToMd('Techtree', "icons/techtree");

    // Vehicles 
    await addToMd('Vehicles', "icons/vehicles");

    // Hexagon map 
    await addToMd('Hexagon map', "maps/clasic");

}

// Run
run();