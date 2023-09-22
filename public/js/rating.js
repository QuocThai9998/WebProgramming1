// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

$(document).ready(function () {
    // Create stars element
    const fullStar = $('<img src="/svg/yellow-star-fill.svg" alt="yellow-star-fill">')
    const halfStar = $('<img src="/svg/yellow-half-star-fill.svg" alt="yellow-star-fill">')
    const emptyStar = $('<img src="/svg/no-star-fill.svg" alt="yellow-star-fill">')

    // Get all the element with class rating and loop
    const rating = $('.rating')
    rating.each(function(idx, ele) {
        const size = $(this).data('size')
        const isCard = $(this).data('card')
        const ratingValue = $(this).data('rating')
        const reviewNumber = $(this).data('review-number')
        const devider = $('<span>|</span>').css('color', 'rgb(209 213 219)')
        const ratingInfo = $(`<p>${ratingValue} ${devider[0].outerHTML} ${reviewNumber} Review${checkPlural(reviewNumber)}</p>`)
        const simplifiedRatingInfo = $(`<p style="font-size: 14px" >(${reviewNumber})</p>`)
        let roundedRatingValue = roundToHalf(ratingValue)

        const starArr = [fullStar, halfStar, emptyStar]

        starArr.forEach(star => {
            star.css('width', size)
        })

        // Append star elements base on the rating value
        checkRating(emptyStar, halfStar, fullStar, roundedRatingValue).forEach(starValue => {
            // console.log(starValue)
            let starClone = starValue.clone()
            $(this).append(starClone)
        })

        ratingInfo.css('margin-left', '8px')
        if (isCard == 'card') {
            $(this).append(simplifiedRatingInfo)
        } else {
            $(this).append(ratingInfo)
        }
    })
})

function checkRating(empty, half, full, rating) {
    let ratingArr = []
    for (let i = 0; i < 5; i++) {
        if (rating < 0) {
            ratingArr.push(empty)
            continue
        }
        // (rating - 1) < 0 means its a 0.5 else its a 1
        if ((rating - 1) >= 0) {
            ratingArr.push(full)
        } else {
            ratingArr.push(half)
        }

        rating -= 1
    }
    return ratingArr
}

function roundToHalf(floatNumber) {
    return Math.round(floatNumber * 2) / 2;
}

function checkPlural(n) {
    return n > 1 ? 's' : ''
}
