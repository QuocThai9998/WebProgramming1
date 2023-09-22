// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm')
  const pageLinks = document.querySelectorAll('.page-link')
  const sortForm = document.querySelector('.sortForm')

  document.querySelectorAll(".queryForm").forEach(form => {
    form.addEventListener('submit', (event) => {
      // Prevent default submission
      event.preventDefault()

      const params = new URLSearchParams(window.location.search)
      params.delete('tags')

      const formData = new URLSearchParams(new FormData(form)).toString();
      console.log(new URLSearchParams(formData));

      const newParams = new URLSearchParams(formData);
      newParams.forEach((value, key) => {
        if (key == 'tags') {
          params.append(key, value)
        } else params.set(key, value)
      });

      const url = `${window.location.pathname}?${params.toString()}`;
      window.location.href = url;
    })
  })

  sortForm.addEventListener('submit', (event) => {
    // Prevent default submission
    event.preventDefault()

    const params = new URLSearchParams(window.location.search)

    const clickedButton = document.querySelector('button[type="submit"]:focus');
    const sortValue = clickedButton.getAttribute('value');

    params.set('sort', sortValue)

    const url = `${window.location.pathname}?${params.toString()}`;
    window.location.href = url;
  })

  searchForm.addEventListener('submit', (event) => {
    // Prevent default submission
    event.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)

    const newUrlParams = new URLSearchParams()
    saveParam(urlParams, newUrlParams, 'category')

    const formData = new URLSearchParams(new FormData(searchForm)).toString();

    const newParams = new URLSearchParams(formData);
    newParams.forEach((value, key) => {
      newUrlParams.set(key, value);
    });

    const url = `${window.location.pathname}?${newUrlParams.toString()}`;
    window.location.href = url;
  })

  pageLinks.forEach((pageLink) => {
    pageLink.addEventListener('click', () => {
      goTo(pageLink.getAttribute('data-page-number'))
      console.log('HJKJHJKJHJKJHJK');
    })
  })
});

function goTo(pageQuery) {
  const params = new URLSearchParams(window.location.search)

  params.set('page', pageQuery);

  const url = `${window.location.pathname}?${params.toString()}`;
  window.location.href = url;
}

function saveParam(oldUrlPrams, newUrlParams, key) {
  const keyParam = oldUrlPrams.get(key)
  newUrlParams.set(key, keyParam || '')
}
