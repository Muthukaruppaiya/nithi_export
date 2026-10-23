// Downloads sample photos from Wikimedia Commons and writes optimised WebP
// files to public/images. Replace these with the client's own photos later.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const OUT = path.resolve('public/images')
const C = 'https://thumb.wikimedia.org/wikipedia/commons/thumb'
const U = 'https://upload.wikimedia.org/wikipedia/commons'

const images = [
  ['green-cardamom-pods', `${C}/8/82/Green_Cardamom_Pods.jpg/1280px-Green_Cardamom_Pods.jpg`],
  ['cardamom-pods-bowl', `${C}/6/69/Cardamom_pods_-_Green_BNC.jpg/1280px-Cardamom_pods_-_Green_BNC.jpg`],
  ['cardamom-capsules-seeds', `${C}/2/2c/Elettaria_cardamomum_Capsules_and_seeds.jpg/1280px-Elettaria_cardamomum_Capsules_and_seeds.jpg`],
  ['cardamom-close-up', `${C}/b/ba/Cardamom_Pods_%284157454523%29.jpg/1280px-Cardamom_Pods_%284157454523%29.jpg`],
  ['cardamom-hundred-pods', `${C}/6/61/100_Cardamom_pods.jpg/1280px-100_Cardamom_pods.jpg`],
  ['cardamom-flower-fruit', `${C}/f/fe/Cardamom_inflorescence_and_fruit_IMG20170901151029.jpg/1280px-Cardamom_inflorescence_and_fruit_IMG20170901151029.jpg`],
  ['cardamom-pods-on-plant', `${U}/b/b1/Cardamom_pods_on_plant.jpg`],
  ['cardamom-plantation-ghats', `${C}/1/18/Cardamom_plantation_Southern_Western_Ghats.jpg/1280px-Cardamom_plantation_Southern_Western_Ghats.jpg`],
  ['cardamom-plantation-view', `${C}/f/fb/View_of_cardamom_plantation.jpg/1280px-View_of_cardamom_plantation.jpg`],
  ['spice-plantation', `${C}/b/b0/Green_Park_Spices_plantation-WUS07415.jpg/1280px-Green_Park_Spices_plantation-WUS07415.jpg`],
  ['cardamom-hills', `${C}/8/8e/Cardamom_Hills.jpg/1280px-Cardamom_Hills.jpg`],
  ['idukki-hills', `${C}/d/d9/Idukki_Reservoir_Calvary_Mount_Kerala_Mar22_A7C_01222.jpg/1280px-Idukki_Reservoir_Calvary_Mount_Kerala_Mar22_A7C_01222.jpg`],
  ['container-ship', `${C}/2/2b/Container_Ship_at_the_Hai_Phong_International_Container_Terminal_01.jpg/1280px-Container_Ship_at_the_Hai_Phong_International_Container_Terminal_01.jpg`],
  ['container-ship-sunset', `${C}/7/7d/Port_Jersey_container_ship_sunset_2018.jpg/1280px-Port_Jersey_container_ship_sunset_2018.jpg`],
]

await fs.mkdir(OUT, { recursive: true })

for (const [name, url] of images) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NithiGlobalTradersSite/1.0 (build script)' } })
  if (!res.ok) {
    console.error(`FAILED ${name}: ${res.status}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}.webp`))
  await sharp(buf).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join(OUT, `${name}-sm.webp`))
  await sharp(buf).rotate().resize({ width: 1200, height: 630, fit: 'cover' }).jpeg({ quality: 80 }).toFile(path.join(OUT, `${name}-og.jpg`))
  console.log(`ok ${name}`)
}
