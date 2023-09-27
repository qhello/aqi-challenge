// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { CityAQI } from './iqair-api'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '../db.json')

type Data = {
    aqiCities: { [cityName: string]: { [timestamp: string]: CityAQI } }
}

// Configure lowdb to write data to JSON file
const defaultData: Data = { aqiCities: {} }
const adapter = new JSONFile<Data>(file)


export const db = new Low<Data>(adapter, defaultData)

await db.read()