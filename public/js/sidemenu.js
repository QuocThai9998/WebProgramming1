// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

$(document).ready(() => {
    const cateSidemenu = $("#cate-sidemenu")
    const hamburgerMenu = $("#hamburger-menu")
    const filterMenu = $('#filter-menu')

    // Create a backdrop and hide it
    const offcanvasBackdrop = $("<div>")
    offcanvasBackdrop.attr('id', 'offcanvas-backdrop')
    offcanvasBackdrop.fadeOut(0)
    $("body").append(offcanvasBackdrop)

    $("#cate-btn").on('click', () => {
        offcanvasBackdrop.fadeIn(300)
        cateSidemenu.toggleClass("show")
    })

    $("#navbar-burger").on('click', () => {
        offcanvasBackdrop.fadeIn(300)
        hamburgerMenu.toggleClass("show")
    })

    $("#filter-btn").on('click', () => {
        offcanvasBackdrop.fadeIn(300)
        filterMenu.toggleClass("show")
    })

    // Hide the sidemenu when clicked outside
    offcanvasBackdrop.on('click', () => {
        offcanvasBackdrop.fadeOut(300)
        cateSidemenu.removeClass("show")
        hamburgerMenu.removeClass("show")
        filterMenu.removeClass("show")
    })
})
