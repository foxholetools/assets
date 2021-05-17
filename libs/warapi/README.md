
# War API v1

### Overview

The War API allows developers to query information about the state of the current Foxhole World Conquest.

1. [Schema](#schema)
2. [Root Endpoint](#root-endpoint)
3. [API Endpoints](#api-endpoints)
    1. [War Data](#war-data)
    2. [Map Data](#map-data)
4. [Rate Limiting and Caching](#rate-limiting-and-caching)
5. [Discord](#discord)

## Schema

All data returned by the API is JSON. The API is accessed only via HTTPS. 

## Root Endpoint

The base of all API requests is `/api`. In this documentation all API endpoints will be specified relative to this root.

The root endpoints for each shard are:

| Shard | Root Endpoint URL | 
|-------|------|
| Live-1|https://war-service-live.foxholeservices.com/api|
| Live-2|https://war-service-live-2.foxholeservices.com/api|

### Dev Branch

When the dev branch is active, its API will be available at: `https://war-service-dev.foxholeservices.com/api`. In general, any data 
from this endpoint should not be considered final, and is subject to change frequently.

## API Endpoints

### War Data

#### Get war state (v0.27)

`GET /worldconquest/war`

Returns data about the current state of the war.

Field descriptions:

- `warId`: unique id for the war.
- `warNumber`: current war number for the shard.
- `winner`: one of `NONE`, `WARDENS`, or `COLONIALS`.
- `conquestStartTime`: unix time stamp for when conquest started, or null if it hasn't started yet.
- `conquestEndTime`: unix time stamp for when conquest ended, or null if it hasn't ended yet.
- `resistanceStartTime`: unix time stamp for when resistance phase started, or null if it hasn't started yet.
- `requiredVictoryTowns`: number of victory towns required to win the war.

The number of required victory towns that's returned by this endpoint represents a static configuration value and does not take any scorched victory towns into account.  This means that if you wish to determine how many victory towns are required to win the war, you must reduce it by one for each scorched victory town.  A scorched victory town is any map item that has both the `IsVictoryBase` and `IsScorched` flags set.  See the [Map Data](#map-data) section for more details.

```
{
  "warId" : "9b33b555-e587-4915-89a5-50eb37f2949d",
  "warNumber" : 33,
  "winner" : "NONE",
  "conquestStartTime" : 1563291629686,
  "conquestEndTime" : null,
  "resistanceStartTime" : null,
  "requiredVictoryTowns" : 20
}
```

_This data may update every 60 seconds._

### Map Data

#### List map names

`GET /worldconquest/maps`

Returns a list of the active World Conquest map names.

Note: The maps `HomeRegionC` and `HomeRegionW` are returned here, but do not have map data available in this version.

#### Get map war report (v0.27)

`GET /worldconquest/warReport/:mapName`

Returns the number of enlistments, casualties, and other map specific information.

```
{
  "totalEnlistments" : 148,
  "colonialCasualties" : 202,
  "wardenCasualties" : 222,
  "dayOfWar" : 2
}
```

_This data may update every 3 seconds._

#### Get static map data

`GET /worldconquest/maps/:mapName/static`

Static map data includes things that never change over the lifecycle of a map. This includes
map text labels, resource nodes, and world structures.

You only need to request this once per map between World Conquests.

#### Get dynamic map data

`GET /worldconquest/maps/:mapName/dynamic/public`

Dynamic map data includes map icons that could change over the lifecycle of a map. This includes
static bases and static base build sites.

Team-specific data for and forward bases are excluded.

_This data may update every 3 seconds._

#### Map data schema

All endpoints that return map data have the same response format:

`GET /worldconquest/maps/:mapName/static`
```
{
  "regionId" : 1,
  "scorchedVictoryTowns": 0,
  "mapItems" : [ {
    "teamId" : "NONE",
    "iconType" : 22,
    "x" : 0.21965122,
    "y" : 0.6231655,
    "flags" : 0
  },

  ...

 ],
  "mapTextItems" : [ {
    "text" : "Abandoned Ward",
    "x" : 0.410076,
    "y" : 0.4957782,
    "mapMarkerType": "Major"
  },

  ...
 ],
  "lastUpdated" : 1524672871955,
  "version" : 2
}
```

World Extents:

The minimum and maximum in-game world units. Used for mapping normalized coordinates to in-game coordinates.

```
WorldExtent.Minimum = (-109199.999997, -94499.99999580906968410989)
WorldExtent.Maximum = (109199.999997, 94499.99999580906968410989)

```
Note: The previous field `worldExtents*` which was present in every map's data is now a constant and consistent value across all maps since they are all of the same size.

Field descriptions:

- `regionId`: internal region ID for this map
- `lastUpdated`: timestamp in milliseconds from epoch of when this map was last updated
- `version`: version index, increments whenever this map data changes. Used for caching.

Map item fields:

- `teamId`: one of `NONE`, `WARDENS`, or `COLONIALS`.
- `iconType`: the type of the map icon, see the [Map Icons](#map-icons) section
- `x`, `y`: normalized map coordinate
- `flags`: bitmask of flags that apply to this icon, see the [Map Flags](#map-flags) section

Map text item fields:

- `text`: text string as it would appear on the map ingame
- `x`, `y`: normalized map coordinate
- `mapMarkerType`: "Major" or "Minor". Major markers form the basis of Region Zones. Minor markers simply indicate areas of interest on the map, but don't have major gameplay impact.

##### Map Icons

```
    StaticBase1         (5)
    StaticBase2         (6)
    StaticBase3         (7)

    ForwardBase1        (8)
    ForwardBase2        (9)
    ForwardBase3        (10)

    Hospital            (11)
    VehicleFactory      (12)
    Armory              (13)
    Supply Station      (14)
    Workshop            (15)
    Manufacturing Plant (16)
    Refinery            (17)
    Shipyard            (18)
    Tech Center         (19) (Engineering Center in v0.37)

    Salvage Field       (20)
    Component Field     (21)
    Fuel Field          (22)
    Sulfur Field        (23)
    World Map Tent      (24)
    Travel Tent         (25)
    Training Area       (26)
    Special Base (Keep) (27) v0.14
    Observation Tower   (28) v0.14
    Fort                (29) v0.14
    Troop Ship          (30) v0.14
    Sulfur Mine         (32) v0.16
    Storage Facility    (33) v0.17
    Factory             (34) v0.17
    Garrison Station    (35) v0.20
    Ammo Factory        (36) v0.20
    Rocket Site         (37) v0.20
    Salvage Mine        (38) v0.22
    Construction Yard   (39) v0.26
    Component Mine      (40) v0.26
    Oil Well            (41) v0.26
	
    Relic Base 1        (45) v0.32
    Relic Base 2        (46) v0.32
    Relic Base 3        (47) v0.32
	
    Mass Production Factory (51) v0.35
    Seaport                 (52) v0.37
    CoastalGun              (53) v0.37
	SoulFactory				(54) v0.39
```

##### Map Icon Colours

There might not necessarily be a Colonial/Warden version of an icon.  In this case, it is recommended to use these colours for rendering Colonial and Warden versions of that icon.

```
Colonial
- (0.082283, 0.14996, 0.07036, 1.0)
- RGB: (21, 38, 18, 255)
- Hex Linear: 152612FF
- Hex SRGB: 516C4BFF

Warden
- (0.017642, 0.093059, 0.223228, 1.0)
- RGB: (4, 23, 57, 255)
- Hex Linear: 041739FF
- Hex SRGB: 245682FF
```

##### Map Flags

```
    IsVictoryBase           (0x01)
    IsHomeBase              (0x02) // Removed in v0.29
    IsBuildSite             (0x04)
    IsScorched              (0x10) v0.22
    IsTownClaimed           (0x20) v0.26
```

Any other map flags not listed here are for internal use only, and should not be relied upon as they may be removed at any time.

##### Rocket launches

Each Rocket Site is a one time use launch site for Rockets.  When a Rocket is launched, the Rocket Site will become scorched, and its team id will be set to the faction that initiated the Rocket launch.

This means that you can determine that a Rocket has launched based on the following conditions:
- `iconType` is set to Rocket Site (37).  See [Map Icons](#map-icons)
- `teamId` is set to `COLONIALS` or `WARDENS`.  See [Map Data Schema](#map-data-schema)
- `flags` has `IsScorched` set.  See [Map Flags](#map-flags)

## Rate Limiting and Caching

We ask that you respect the caching headers as returned by the API. They reflect the lifetime of the data
returned in the body of the request and requests sooner than the cache expiry will return the same data.

The API fully supports [ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag).
API responses include the `ETag` header. When you make an API request, include the `If-None-Match`
header with the value of the `ETag` you last received from that endpoint. If the server returns `304 Not Modified`,
then your cached data is still the latest version.

It is good practice to use the ETag, as even though the cache may have expired the underlying data may not have changed.
For example in the case of dynamic map data, if no bases have changed teams within 5 minutes, the cache will have
expired but requests using the ETag will return `304 Not Modified`, preventing wasting bandwidth on duplicate data.

## Discord

If you're looking for assistance or just want to chat about the WarAPI, there is a discord channel called `code-talk` on the official Foxhole discord.


