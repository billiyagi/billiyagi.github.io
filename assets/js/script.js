$(document).ready( function() {
$('.loading-overlay').remove();

// AJAX Data
$.getJSON( "assets/projects.json", function( data ) {

    // Menambahkan item project ke container project
    $.each( data, function(key, val) {
        $('#rowProjects').append(`
        <div class="col-md-6 col-lg-4 clients-card" data-aos="fade-up" data-aos-duration="1${key}00">
            <div class="card border-0 shadow-hover">
                <div class="position-relative">
                    <img src="assets/img/projects/${val.directory}/${val.thumbnail}" class="card-img-top w-100 h-100" alt="${val.title}">
                    <div class="clients-overlay-go position-absolute top-0 left-0 w-100 h-100">

                        <button class="btn btn-secondary clients-overlay-btn position-absolute top-50 start-50 translate-middle rounded-pill px-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" data-id="${key}"><i class="bi bi-link fs-1"></i></button>

                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${val.title}</h5>
                </div>
            </div>
        </div>`);
    })

    $('.clients-overlay-btn').on('click', function() {

        // Bersihkan child screenshots
        $('.gallery-photoswipe').html('');

        let id = $(this).attr('data-id');

        // Project Label
        $('#showProjectsLabel').text(data[id].title);

        // Project Title
        $('#projectTitle').text(data[id].title);

        // Project Purpose
        $('#projectPurpose').text(data[id].purpose);

        // Project Logo
        $('#logoProject').attr('src', `assets/img/projects/${data[id].directory}/${data[id].logo}`);

        // Project Preview Link
        $('#projectLink').attr('href', data[id].preview);
        
        // Project Description
        $('#projectDescription').text(data[id].description);

        // Project Detail
        $('#projectDetail').html(`
        <li><strong>Project : </strong>${data[id].title}</li>
        <li><strong>Project purpose: </strong>${data[id].purpose}</li>
        <li><strong>Owner : </strong>${data[id].owner}</li>
        <li><strong>Release : </strong>${data[id].release[0]}, ${data[id].release[1]} ${data[id].release[2]}</li>
        <li><strong>Library & Framework : </strong> 
            <p class="ps-3"> ${$.each(data[id].frameworklibrary, (key,val) => val)} </p>
        </li>
        `);
        
        // Project Screenshots
        $.each(data[id].screenshots, (key, val) => {

            // Jika index array baru pertama kali, tampilkan kolom yang lebar nya full
            if(key == 0) {
                $('.gallery-photoswipe').append(`
                    <div class="col-md-12 shadow-sm">
                        <a href="assets/img/projects/${data[id].directory}/${val}" data-pswp-width="3000" data-pswp-height="1500" target="_blank">
                            <img src="assets/img/projects/${data[id].directory}/${val}" class="w-100 h-100">
                        </a>
                    </div>`);

            } else {
                $('.gallery-photoswipe').append(`
                                <div class="col-md-6 shadow-sm">
                                    <a href="assets/img/projects/${data[id].directory}/${val}" data-pswp-width="3000" data-pswp-height="1500" target="_blank">
                                        <img src="assets/img/projects/${data[id].directory}/${val}" alt="" class="w-100 h-100">
                                    </a>
                                </div>`)
            }
        })

    })
} );

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

})