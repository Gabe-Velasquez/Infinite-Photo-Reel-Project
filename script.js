const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 25;
const apiKey = 'wM740DV-CFvhCG04yovcs70KLHitsevtkMU8vtHC8gQ';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for Links and Photos added to DOM
function displayPhotos(){
    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Creates image tag
        const img = document.getElementById('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description)
        // Puts image inside and inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Fetches photos from Unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){

    }
}

// Onload
getPhotos();