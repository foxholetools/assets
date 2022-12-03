# Foxhole Tools assets

## Credits
All images these are property of Clapfoot Inc.

## Using

Refer to [README.md](https://github.com/foxhole-tools/assets/tree/main/dist/README.md)

## Requirement for manual generation

- [Node.js v14+](https://nodejs.org/)
- [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) (Windows only)
- [node-gyp](https://www.npmjs.com/package/node-gyp#on-windows) (Windows only)

## Extrac game content (FModel)
- Download FModel https://github.com/4sval/FModel

## Extract game contents (Umode)

PRE-REQUISITES: 
- Unreal Engine VERSION 4.24 installed (it's huge)
- Download Umodel (https://www.gildor.org/en/projects/umodel)
- Duplicated War-WindowsNoEditor.pak file (obtained from C:\Steam\steamapps\common\Foxhole\War\Content\Paks)

1) Open up Command Prompt. Within there, navigate to your Unreal Engine directory, within there go to: C:\...\UE_4.20\Engine\Binaries\Win64
2) Now in this directory, type this: UnrealPak.exe [DIRECTORY OF DUPLICATED PAK FILE] -Extract [DIRCTORY YOU WANT THE ASSETS TO BE UNPACKED TO]
3) In Command Prompt, navigate to wherever you installed Umodel into. Within the Umodel folder, type this: umodel.exe -out=[DIRECTORY YOU WANT THE ASSETS TO BE *EXTRACTED* TO]
4) A GUI for Umodel should appear. In "Path to Game Files" put this file path: [DIRECTORY OF ASSETS THAT WERE UNPACKED]\War\Content
- If you want to be able to export sound files, check off "Sound" on the right side.
- Package Compression: Auto
- Platform: PC
5) It might take a while to load the game files... once Umodel is done fiddling around, a new Umodel window should appear that has a folder navigation window on the left side, and a file explorer on the right side.
6) To export image assets, navigate to Textures > UI.
7) Now start clicking on each folder within here, select all files then hit "Export".
- Don't forget that the base folder "UI" has some files in itself too.

EXTRACT LIST:
- Achievements
- HexMaps
- HUD
- ItemIcons
- MapIcons
- Menus
- StructureIcons
- VehicleIcons
- WorldMap

## Submodules list
- Map image using https://github.com/clapfoot/warapi

## Code ref
- Generate map tiles from a large image with nodejs (https://gist.github.com/josephrocca/b4d0a13b0e679f85506d46c33c5481f5)

## Update gh-pages
git subtree push --prefix dist origin gh-pages

## Deploy to netlify
netlify deploy --build
