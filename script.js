const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = 10;
const apiKey = 'wM740DV-CFvhCG04yovcs70KLHitsevtkMU8vtHC8gQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Checks if images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
    }
}

//Helper function to set alts on dom
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links and Photos added to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank',
        });
        // Creates image tag
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when is is finished loading
        img.addEventListener('load', imageLoaded);
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
        console.log('Something went wrong ')
    }
}

//Scrolling function added
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false; 
        getPhotos();
    }
});

// Onload
getPhotos();