// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

// Register filePond plugins
FilePond.registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
)

FilePond.parse(document.body)

// Create file upload for products
const productCover = document.querySelector('.productCover')
FilePond.create(productCover, {
    acceptedFileTypes: ['image/png', 'image/jpeg'],
    maxFileSize: '2MB',
    imageResizeTargetWidth: 1024,
    imageResizeTargetHeight: 1024,
})

// Create file upload for user profile
const profileCover = document.querySelector('.profileCover')
FilePond.create(profileCover, {
    acceptedFileTypes: ['image/png', 'image/jpeg'],
    maxFileSize: '1MB',
    imageResizeTargetWidth: 1024,
    imageResizeTargetHeight: 1024,
})

// FilePond.create(
// 	document.querySelector('input'),
// 	{
// 		labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
//     imagePreviewHeight: 170,
//     imageCropAspectRatio: '1:1',
//     imageResizeTargetWidth: 200,
//     imageResizeTargetHeight: 200,
//     stylePanelLayout: 'compact circle',
//     styleLoadIndicatorPosition: 'center bottom',
//     styleButtonRemoveItemPosition: 'center bottom'
// 	}
// );
