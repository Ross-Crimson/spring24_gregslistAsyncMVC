import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"


class HousesService {

    async GetHouses() {
        const response = await api.get('api/houses')

        const houses = response.data.map(house => new House(house))

        AppState.houses = houses
    }

    async ListHouse(houseData) {
        const response = await api.post('api/houses', houseData)

        const house = new House(response.data)

        AppState.houses.push(house)
    }

    UpdateHouse(houseData) {
        throw new Error("Method not implemented.")
    }

    async DeleteHouse(houseId) {
        await api.delete(`api/houses/${houseId}`)
        const indexToRemove = AppState.houses.findIndex(house => house.id == houseId.id)
        AppState.houses.splice(indexToRemove, 1)
    }
}

export const housesService = new HousesService