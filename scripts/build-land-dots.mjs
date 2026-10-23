// Generates src/data/landDots.json: a compact list of [lat, lon] points on land,
// used to draw the dotted 3D globe without shipping a full world map.
import fs from 'node:fs/promises'
import { feature } from 'topojson-client'
import { geoContains } from 'd3-geo'

const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json')
const topo = await res.json()
const land = feature(topo, topo.objects.land)

const STEP = 2.2
const dots = []
for (let lat = -58; lat <= 78; lat += STEP) {
  const ring = Math.cos((lat * Math.PI) / 180)
  const lonStep = STEP / Math.max(ring, 0.2)
  for (let lon = -180; lon < 180; lon += lonStep) {
    if (geoContains(land, [lon, lat])) dots.push([+lat.toFixed(1), +lon.toFixed(1)])
  }
}

await fs.writeFile('src/data/landDots.json', JSON.stringify(dots))
console.log(`wrote ${dots.length} dots`)
