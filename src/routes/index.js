// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import express from "express";
import { Product } from "../models/productSchema.js";
export const indexRouter = express.Router();

indexRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: 'desc'}).limit(4)

        res.render("index", {products});
    } catch(e) {
        console.error(e)
    }
})

indexRouter.get("/about-us", (req, res) => {
    res.render("about_us")
})

indexRouter.get("/contact-us", (req, res) => {
    res.render("contact_us")
})

indexRouter.get("/privacy-policy", (req, res) => {
    res.render("privacy_policy")
})
