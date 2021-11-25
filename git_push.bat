@echo off

set list=acrithia allodsbight ashfields basinsionnach callahanspassage clansheadvalley deadlands drownedvale endlessshore farranaccoast fishermansrow godcrofts greatmarch heartlands howlcounty kalokai linnmercy lochmor nevishline marbanhollow morgenscrossing mooringcounty oarbreaker origin reachingtrail redriver shackledchasm speakingwoods stonecradle tempestisland terminus thefingers umbralwildwood viperpit weatheredexpanse westgate homeregionc homeregionw

for %%v in (%list%) do (

    echo Start %%v
	
    :: Clasic
    git add %cd%\dist\tiles\clasic\%%v

    :: Color
    git add %cd%\dist\tiles\color\%%v
	
	:: Commit and push
	git commit -m "Update %%v"
	git push
	
	pause

)