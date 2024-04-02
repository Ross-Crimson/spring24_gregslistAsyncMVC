import { AppState } from "../AppState.js"


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get HouseTemplate() {
        return `
        <div class="col-5 card p-2 m-2">
            <img class="card-img-top"
                src="${this.imgUrl}"
                alt="house">
            <div class="card-body">
                <div class="card-text">
                    <div class="row">
                        <div class="levels">Levels: ${this.levels}</div>
                        <div>Bedrooms: ${this.bedrooms}</div>
                        <div>Bathrooms: ${this.bathrooms}</div>
                        <div>${this.year}</div>
                    </div>
                    <div class="row">
                        <p>${this.description}</p>
                        <h3>$${this.price}</h3>
                    </div>
                </div>
                <div class="text-start">
                    ${this.UpdateButton}
                </div>
                <div class="text-end">
                    ${this.DeleteButton}
                </div>
            </div>
        </div>
        `
    }

    get DeleteButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
            <button onclick="app.HousesController.DeleteHouse('${this.id}')" class="btn btn-danger"><i class="mdi mdi-trash-can-outline"></i></button>
            `
        }
        return ``
    }

    get UpdateButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
            <button onclick="app.HousesController.ShowUpdateHouseModal('${this.id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
            `
        }
        return ``
    }

    get UpdateModal() {
        return `
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Listing</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="house-form" onsubmit="app.HousesController.UpdateHouse()" class="row bg-white d-none">
                    <div class="col-4 p-3">
                        <label for="bedrooms">Bedrooms</label>
                        <input class="form-control" type="number" name="bedrooms" id="bedrooms" min="1" required>
                    </div>
                    <div class="col-4 p-3">
                        <label for="bathrooms">Bathrooms</label>
                        <input class="form-control" type="number" name="bathrooms" id="bathrooms" min="1" required>
                    </div>
                    <div class="col-4 p-3">
                        <label for="levels">Levels</label>
                        <input class="form-control" type="number" name="levels" id="levels" min="1" required>
                    </div>
                    <div class="col-12 p-3">
                        <input class="form-control" type="url" name="imgUrl" id="imgUrl"
                            placeholder="Image URL of House">
                    </div>
                    <div class="col-4 p-3">
                        <label for="year">Year</label>
                        <input class="form-control" type="number" name="year" id="year" min="1900" required>
                    </div>
                    <div class="col-4 p-3">
                        <label for="price">Price</label>
                        <input class="form-control" type="number" name="price" id="price" min="1" required>
                    </div>
                    <div class="col-12 p-3">
                        <textarea class="form-control" type="text" name="description" id="description" cols="60"
                            rows="5" placeholder="Description of the home." min="3" required></textarea>
                    </div>
                    <div class="text-end p-3">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        `
    }
}