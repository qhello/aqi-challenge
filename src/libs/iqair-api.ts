import axios from "axios";
import config from "../config";

const baseApi = axios.create({
    baseURL: "https://api.airvisual.com/v2/",
})

export type CityAQI = {
    ts: string
    aqius: number
    mainus: string
    aqicn: number
    maincn: string
}

export type IQAirCityEndpointResponse = {
    status: string;
    data: {
        city: string
        state: string
        country: string
        location: {
            type: string
            coordinates: number[]
        },
        current: {
            pollution: CityAQI,
            weather: {
                ts: string
                tp: number
                pr: number
                hu: number
                ws: number
                wd: number
                ic: string
            }
        }
    }
}

export const getCityAQI = async (latitude: number, longitude: number): Promise<CityAQI> => {

    const { data: { data: result } } = await baseApi.get<IQAirCityEndpointResponse>('/nearest_city', {
        params: {
            key: config.IQAIR_API_KEY,
            lat: latitude,
            lon: longitude
        }
    })

    return {
        ts: result.current.pollution.ts,
        aqius: result.current.pollution.aqius,
        mainus: result.current.pollution.mainus,
        aqicn: result.current.pollution.aqicn,
        maincn: result.current.pollution.maincn
    }

}