@echo off

set list=acrithia allodsbight ashfields basinsionnach callahanspassage clansheadvalley deadlands drownedvale endlessshore farranaccoast fishermansrow godcrofts greatmarch heartlands howlcounty kalokai linnmercy lochmor nevishline marbanhollow morgenscrossing mooringcounty oarbreaker origin reachingtrail redriver shackledchasm speakingwoods stonecradle tempestisland terminus thefingers umbralwildwood viperpit weatheredexpanse westgate homeregionc homeregionw

for %%v in (%list%) do (

    echo Start %%v

    :: Clasic
    %cd%\libs\tiler\binaries\Tiler-Windows-x64.exe -zoom 7 -input %cd%\dist\maps\clasic\%%v.png -output %cd%\tmp\maps\clasic\%%v

    :: Color
    %cd%\libs\tiler\binaries\Tiler-Windows-x64.exe -zoom 7 -input %cd%\dist\maps\color\%%v.png -output %cd%\tmp\maps\color\%%v

)