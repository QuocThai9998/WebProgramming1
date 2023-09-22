// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

$(document).ready(() => {
    const userProfile = $('#user')
    const dropDown = $('<div>', {
        id: 'user-drop-down'
    })
    const viewProfile = $('<a>', {
        id: 'user-drop-down-links',
        text: 'View profile'
    })
    const logOut = $('<a>', {
        id: 'user-drop-down-links',
        text: 'Log out'
    })

    const userType = userProfile.data('user-type').toLowerCase()
    const profileLink = `/users/${userType}/profile`

    viewProfile.attr('href', profileLink)
    logOut.attr('href', '/auth/logout')

    dropDown.append(viewProfile)
    dropDown.append(logOut)

    userProfile.append(dropDown)

    userProfile.on('click', () => {
        dropDown.toggle()
    })
})