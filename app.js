const auth = "563492ad6f91700001000001e1d7e9594440411699003967f12217e2";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.submit-btn');
let searchValue;

async function curatedPhotos() {
    const dataFetch = await fetch('https://api.pexels.com/v1/curated/?page=1&per_page=16', 
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();


