import { Elysia } from 'elysia'
import { cron } from '@elysiajs/cron'


import config from './config'
import { getCityAQI } from './libs/iqair-api'
import { db } from './libs/db'

const PARIS_DB_KEY = "Paris,FR"


const app = new Elysia()
    .get('/aqi/city', async ctx => {
        const latitude = parseFloat(ctx.query.latitude || "")
        const longitude = parseFloat(ctx.query.longitude || "")

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error("Lat & long needed")
        }

        const cityAQI = await getCityAQI(latitude, longitude)

        return {
            Result: {
                Pollution: cityAQI
            }
        }


    })
    .get('/aqi/city/paris/worst', async ctx => {

        const cityMeasurements = Object.values(db.data.aqiCities[PARIS_DB_KEY])

        // Sort by desc AQI US
        const worstCityAQI = cityMeasurements.sort((a, b) => a.aqius + b.aqius)

        return worstCityAQI[0]


    })
    .use(
        cron(
            {
                name: "getParisAQI",
                pattern: "* */1 * * *", // every minutes
                run: async () => {

                    const parisAQI = await getCityAQI(48.856613, 2.352222)

                    const { aqiCities } = db.data

                    if (!aqiCities[PARIS_DB_KEY]) {
                        aqiCities[PARIS_DB_KEY] = {}
                    }

                    aqiCities[PARIS_DB_KEY][parisAQI.ts] = parisAQI

                    await db.write()

                    console.log(`pushed new measurement ${parisAQI.ts} for Paris city in DB`)

                }
            }
        )
    )
    .listen(config.APP_PORT)

console.log(`🦊 API is running at ${app.server?.hostname}:${app.server?.port}`)