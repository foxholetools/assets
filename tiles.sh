#!/bin/bash

list="acrithia allodsbight ashfields basinsionnach callahanspassage clansheadvalley deadlands drownedvale endlessshore farranaccoast fishermansrow godcrofts greatmarch heartlands howlcounty kalokai linnmercy lochmor nevishline marbanhollow morgenscrossing mooringcounty oarbreaker origin reachingtrail redriver shackledchasm speakingwoods stonecradle tempestisland terminus thefingers umbralwildwood viperpit weatheredexpanse westgate homeregionc homeregionw"

path=$PWD

for hexagone in $list
do

    echo --------------------
    echo   Start $hexagone
    echo --------------------
	

    # Clasic
    echo - Clasic
	
	echo Clear old dir
	rm -Rf $path/dist/tiles/clasic/$hexagone

    echo Generate tiles
    $path/libs/tiler/binaries/Tiler-Linux-amd64 -zoom 7 -input $path/dist/maps/clasic/$hexagone.png -output $path/dist/tiles/clasic/$hexagone

    cd $path/dist/tiles/clasic/$hexagone

    # create dirs
    mkdir 0 1 2 3 4 5 6 7

    # clean empty image
    #find . -size 1k -delete

    # move to dirs
    echo Move to dirs
    for f in $(ls *.png)
    do
        newname=$(echo "$f" | sed 's/\([0-9]\+\)_\([0-9]\+\)_\([0-9]\+\)\.png/\1\/\1_\2_\3.png/')
        mv "$f" "$newname"
    done

    # Color
    echo - Color	
	
	echo Clear old dir
	rm -Rf $path/dist/tiles/color/$hexagone

    echo Generate tiles
    $path/libs/tiler/binaries/Tiler-Linux-amd64 -zoom 7 -input $path/dist/maps/color/$hexagone.png -output $path/dist/tiles/color/$hexagone

    cd $path/dist/tiles/color/$hexagone

    # create dirs
    mkdir 0 1 2 3 4 5 6 7 8

    # clean empty image
    #find . -size 1k -delete

    # move to dirs
    echo Move to dirs
    for f in $(ls *.png)
    do
        newname=$(echo "$f" | sed 's/\([0-9]\+\)_\([0-9]\+\)_\([0-9]\+\)\.png/\1\/\1_\2_\3.png/')
        mv "$f" "$newname"
    done

done