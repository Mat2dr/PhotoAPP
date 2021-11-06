const auth = "563492ad6f91700001000001e1d7e9594440411699003967f12217e2";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;


// Event listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
});


function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url, 
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated/?page=1&per_page=16");

    generatePictures(data);
}

async function searchPhotos(query) {
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=1`);
    
    generatePictures(data);
}

curatedPhotos();


