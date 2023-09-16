// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import express from "express"
export const shipperRouter = express.Router();
import mongoose from "mongoose";

import { Shipper } from "../models/User.js"
import { Order } from "../models/Orders.js"
const imageMimeTypes = ['image/png', 'image/jpeg']



shipperRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})

shipperRouter.post('/profile/update-picture', (req, res) => {
    const user = req.user
    const profilePicture = req.body.profilePicture

    if (profilePicture != null) {
        Shipper.findById(user.id)
        .then(shipper => {
            saveUserCover(shipper, profilePicture)
            const updatedShipper = new Shipper(shipper)
            return updatedShipper.save()
        })
        .then(() => {
            res.redirect('/users/shipper/profile')
        })
        .catch(e => {
            console.error(e)
        })
    } else {
        res.redirect('/users/shipper/profile')
    }

})

shipperRouter.post('/active-order/:id/update-status', (req, res) => {
    const orderID = req.params.id
    const newStatus = req.body.status 
    Order.findByIdAndUpdate(orderID, {status: newStatus}, { new: true })
    .then(updatedOrder => {
        console.log(updatedOrder)
        res.redirect(`/users/shipper/active-order/${orderID}`)
    })
    .catch(err => {
        console.error(err)
    })
})

shipperRouter.get('/active-order/:id', (req, res) => {
    let order = null
    const orderID = req.params.id
    Order.findOne({ _id: orderID }).populate('products.product')
    .then(results => {
        order = results
        console.log("Active order to be displayed ", results)
        res.render("active_order_details", { order })
    })
    .catch(err => {
        console.error(err)
    })
})


shipperRouter.get('/', async (req, res) => {
    const user = req.user

    // Getting the shipper's distribution hub
    const distributionHub = user.distributionHub

    try {
        const activeOrders = await Order.find({distributionHub: distributionHub, status: 'Active'}).populate('products.product').exec()
        const inactiveOrders = await Order.find({distributionHub: distributionHub, status: { $in: ['Cancelled', 'Delivered'] }}).populate('products.product').exec()

        // To prevent cases where Orders are undefined
        res.render("shipper_page", {
            activeOrders: activeOrders || [],
            inactiveOrders: inactiveOrders || []
        })
    } catch (error) {
        console.log(error)
    }
})


function saveUserCover(user, coverEncoded) {
    if (coverEncoded == null) return
    const profilePicture = JSON.parse(coverEncoded)
    if (profilePicture != null && imageMimeTypes.includes(profilePicture.type)) {
        user.profilePicture = new Buffer.from(profilePicture.data, 'base64')
        user.profilePictureType = profilePicture.type
    }
}
