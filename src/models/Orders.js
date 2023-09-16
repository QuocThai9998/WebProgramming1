// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import mongoose from "mongoose"

const distributionHubs = ["District 1 Hub", "District 2 Hub", "District 7 Hub"]

const orderSchema = new mongoose.Schema({
    distributionHub: {
        type: String,
        required: true,
        enum: distributionHubs,
        default: () => {
            // Randomizing the distribution hub for orders
            const randomIndex = Math.floor(Math.random() * distributionHubs.length)
            return distributionHubs[randomIndex]
        }
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        type: String,
        required: true,
    },
    userFullName: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Delivered", "Canceled"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('Order', orderSchema)

export { Order }