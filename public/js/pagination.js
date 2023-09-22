const paginationDiv = $('#pagination')
const currentPage = paginationDiv.data('current-page')
const totalPage = paginationDiv.data('total-page')
const pageSize = paginationDiv.data('page-size')
const threeDots = $('<span></span>').addClass('text-gray-500').text('. . .').css('padding', '0.25rem 0.rem')

const pageSelectedStyle = {
    'color': 'white',
    'background': 'rgb(139, 92, 246)',
    'cursor': 'default',
}

if (currentPage == 1 || currentPage == 2) {
    for (let i = 1; i <= (totalPage <= 3 ? totalPage : 3); i++) {
        paginationDiv.append(getPageElement(i))
    }
    if (totalPage > 3) {
        paginationDiv.append(threeDots)
        paginationDiv.append(getPageElement(totalPage))
    }
} else if (currentPage == totalPage || currentPage == (totalPage - 1)) {
    paginationDiv.append(getPageElement(1))
    paginationDiv.append(threeDots)
    for (let i = 3; i >= 1; i--) {
        paginationDiv.append(getPageElement(totalPage - (i - 1)))
    }
} else {
    for (let i = 1; i <= 3; i++) {
        paginationDiv.append(getPageElement(currentPage + (i - 2)))
    }
    if (totalPage > (currentPage + 1)) {
        paginationDiv.append(threeDots)
        paginationDiv.append(getPageElement(totalPage))
    }
}

$('.page-link').each(function () {
    if ($(this).data('page-number') == currentPage) {
        $(this).css(pageSelectedStyle)
    }
});

function getPageElement(pageNumber) {
    return $('<span></span>')
        .addClass('page-link')
        .css({ 'cursor': 'pointer', 'user-select': 'none' })
        .attr('data-page-number', pageNumber)
        .text(pageNumber)
        .clone()
}