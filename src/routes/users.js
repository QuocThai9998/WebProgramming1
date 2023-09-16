// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import express from "express";
export const userRouter = express.Router();
import { vendorRouter } from "./vendor.js";
import { shipperRouter } from "./shipper.js";
import { customerRouter } from "./customer.js";

// Checking userTypes
// The three middleware below is used to restrict access for each user type to their respective routes only 

const checkCustomer = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Customer") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}

const checkVendor = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Vendor") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}

const checkShipper = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Shipper") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}

// Customer route
userRouter.use("/customer", checkCustomer, customerRouter)

// Vendor route
userRouter.use("/vendor", checkVendor, vendorRouter)

// Shipper route
userRouter.use("/shipper", checkShipper, shipperRouter)
