import { AppState } from "../AppState.js"
import { housesService } from "../services/HousesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


export class HousesController {
    constructor() {
        AppState.on('houses', this.DrawHouses)
        AppState.on('account', this.ShowHouseForm)
        AppState.on('account', this.DrawHouses)
        this.GetHouses()
        this.ShowHouseForm()
    }

    DrawHouses() {
        let housesHTML = ''
        AppState.houses.forEach(house => housesHTML += house.HouseTemplate)
        setHTML('houses-view', housesHTML)
    }

    async GetHouses() {
        await housesService.GetHouses()
    }

    ShowHouseForm() {
        if (AppState.account) {
            let houseFormElm = document.getElementById('house-form')
            houseFormElm.classList.remove('d-none')
        }
    }

    async ListHouse() {
        try {
            event.preventDefault()
            const form = event.target
            console.log(form)
            const houseData = getFormData(form)
            await housesService.ListHouse(houseData)
        }
        catch (error) {
            console.error(error)
            Pop.toast("Could Not list house", "error")
        }
    }

    ShowUpdateHouseModal(houseId) {
        let modalHTML = ''
        //let modalElm = document.getElementById('exampleModal')
        const currentHouse = AppState.houses.find(house => house.id == houseId)
        modalHTML += currentHouse.UpdateModal
        setHTML('new-modal', modalHTML)
    }

    async UpdateHouse(houseId) {
        try {
            event.preventDefault()
            const form = event.target
            const houseData = getFormData(form)
            await housesService.UpdateHouse(houseData)
        }
        catch (error) {
            console.error(error)
            Pop.toast("Could Not update house", "error")
        }
    }

    async DeleteHouse(houseId) {
        try {
            const result = await Pop.confirm("Are you sure you want to delete this listing?")
            if (result == false) return
            await housesService.DeleteHouse(houseId)
        }
        catch (error) {
            console.error(error)
            Pop.toast("Couldn't delete listing", "error")
        }
    }
}