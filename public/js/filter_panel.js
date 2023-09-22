// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

$(document).ready(() => {
    const panel_filter = $(".filter-panel")
    const subpanel_filter = $(".filter-subpanel")
    const show_icon = $(".show-icon")
    const hide_icon = $(".hide-icon")

    for (let i = 0; i < panel_filter.length; i++) {
        panel_filter.eq(i).on('click', () => {
            subpanel_filter.eq(i).toggleClass('hidden')
            show_icon.eq(i).toggleClass('hidden')
            hide_icon.eq(i).toggleClass('hidden')
        })
    }

    // Toggle sort dropdown
    $('.sort').on('click', () => {
        console.log('hell')
        $('.drop-down-container').toggle()
    })
})
