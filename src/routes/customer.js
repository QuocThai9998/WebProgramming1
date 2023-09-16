// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import express from "express";
export const customerRouter = express.Router();
import { Product, tags } from "../models/productSchema.js";
import pagination from "../middlewares/pagination.js"
import { Customer } from "../models/User.js"
import { Order } from "../models/Orders.js"
const imageMimeTypes = ['image/png', 'image/jpeg']


// Customer route
// users/customer
customerRouter.get("/", pagination, async (req, res) => {
    let productQuery = Product.find()
    const minPrice = req.query.minPrice || 0;
    let sortValue = req.query.sort || 'Sort'
    const { page: currentPage, limit: pageSize, skip } = req.pagination

    // Filter on category
    if (checkQuery(req.query.category)) {
        productQuery = productQuery.regex('category', new RegExp(req.query.category, 'i'))
    }

    // Filter on user search
    if (checkQuery(req.query.name)) {
        productQuery = productQuery.regex('name', new RegExp(req.query.name, 'i'))
    }

    // Filter on tags
    if (checkQuery(req.query.tags) && req.query.tags.length !== 0) {
        productQuery = productQuery.find({ tags: { $in: req.query.tags } })
    }

    // Filter on price range
    productQuery = productQuery.where('price').gte(minPrice)
    if (checkQuery(req.query.maxPrice)) {
        productQuery = productQuery.lte('price', req.query.maxPrice)
    }

    // Sort the products
    if (checkQuery(req.query.sort)) {
        if (req.query.sort == 'priceAsc') {
            productQuery = productQuery.sort('price')
            sortValue = 'Price ascending'
        } else if (req.query.sort == 'priceDesc') {
            productQuery = productQuery.sort('-price')
            sortValue = 'Price descending'
        }
    }

    try {
        const numberOfProducts = await Product.count(productQuery)
        const products = await productQuery.skip(skip).limit(pageSize).exec()
        const totalPage = countPages(numberOfProducts, pageSize)
        res.render("customer_shopping", {
            products,
            tags,
            pageInfo: {currentPage, totalPage, pageSize, numberOfProducts},
            searchOption: req.query,
            category: req.query.category,
            minMaxPrice: [req.query.minPrice, req.query.maxPrice],
            selectedTags: req.query.tags || [],
            sortValue
        })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products.'});
        console.log(error);
    }
})

customerRouter.get('/shopping-cart', async (req, res) => {
    try {
        const shoppingCart = req.session.cart || []
        let cartItems = []    

        for (const item of shoppingCart) {
            const productId = item[1]
            const product = await Product.findById(productId)
            cartItems.push([item[0], product])
        }

        res.render("shopping_cart", { cartItems })
    } catch (error) {
        console.error(error)
    }
})


customerRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})

customerRouter.post('/profile/update-picture', (req, res) => {
    const user = req.user
    const profilePicture = req.body.profilePicture

    if (profilePicture != null) {
        Customer.findById(user.id)
        .then(customer => {
            saveUserCover(customer, profilePicture)
            const updatedCustomer = new Customer(customer)
            return updatedCustomer.save()
        })
        .then(() => {
            res.redirect('/users/customer/profile')
        })
        .catch(e => {
            console.error(e)
        })
    } else {
        res.redirect('/users/customer/profile')
    }

})

// Add product to cart
customerRouter.get("/:id/add", (req, res) => {
    // Getting productQuantity from query
    const productQuantity = req.query.productQuantity
    // Getting shopping cart from session
    req.session.cart = req.session.cart || []
    // Adds the product to cart with quantity first then the product ID
    let productWithQuantity = [productQuantity, req.params.id]
    req.session.cart.push(productWithQuantity)
    res.redirect(`/users/customer/${req.params.id}`)
})

// Remove product from cart 
customerRouter.get("/:id/remove", (req, res) => {
    req.session.cart = req.session.cart || []
    const productId = req.params.id

    const itemIndex = req.session.cart.findIndex(item => item[1] === productId)

    if (itemIndex !== -1) {
        req.session.cart.splice(itemIndex, 1)
    }
    res.redirect("/users/customer/shopping-cart")
})

// Checkout shopping cart
customerRouter.post("/checkout", async (req, res) => {
    // Getting user and order information
    const user = req.user
    const checkoutSummary = req.body 
    const productQuantities = convertToArray(checkoutSummary.productQuantity) 
    const productIds = convertToArray(checkoutSummary.productId)

    // console.log(productQuantities);
    // console.log(productIds)

    // Creating a new order
    if (productIds.length !== 0) {
        let products = []
        for (let i = 0; i < productQuantities.length; i++) {
            const productId = productIds[i]
            const quantity = parseInt(productQuantities[i])

            // Finding the product by id
            const product = await Product.findById(productId)

            // Copying the products details to the order
            const productObject = {
                product: product,
                quantity: quantity
            }

            // Adding the product to the products list
            products.push(productObject)
        }
        const newOrder = await Order.create({
            user: user.username,
            userFullName: user.name,
            userAddress: user.address,
            status: "Active",
            products: products,
        })
        req.session.cart = []
        // res.send({productQuantities, productIds})
        res.redirect("/users/customer/shopping-cart")
    } else {
        res.redirect("/users/customer")
    }
})


customerRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('publisher', 'businessName')
        res.render('productDetail', {product})
    } catch (error) {
        // Send users to the previous page in case sth wrong
        try {
            res.redirect(req.headers.referer)
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    }
})

function convertToArray(value) {
    if (!Array.isArray(value)) {
      return [value]; // return value in array
    }
    return value; // Return the value if it already is an array
}

function checkQuery(query) {
    return query != null && query != '';
}

function countPages(numberOfDatas, limit) {
    return Math.ceil(numberOfDatas / limit);
}

function saveUserCover(user, coverEncoded) {
    if (coverEncoded == null) return
    const profilePicture = JSON.parse(coverEncoded)
    if (profilePicture != null && imageMimeTypes.includes(profilePicture.type)) {
        user.profilePicture = new Buffer.from(profilePicture.data, 'base64')
        user.profilePictureType = profilePicture.type
    }
}