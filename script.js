// http://www.omdbapi.com/?i=tt3896198&apikey=2a95a77e


const container = document.querySelector('.container');

let search = document.querySelector('#search');
let suchen = document.querySelector('#suchen');
const about = document.querySelector('.about');

let user
const xhr = new XMLHttpRequest();

search.addEventListener('click', function () {
    container.innerHTML = ''
    xhr.open('GET', `http://www.omdbapi.com/?s=${suchen.value}&page=2&apikey=2a95a77e`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let infoFromXhr = xhr.responseText;
            let obj = JSON.parse(infoFromXhr);
            user = obj
            obj.Search.map(el => {
                console.log(el);
                container.innerHTML += `<div class="content"><img src="${el.Poster}" alt="">
                <div class="title">${el.Title}</div>
                <h5>${el.Type}</h5>
                <h5>${el.Year}</h5>
                <button class="details" id="${el.imdbID}" onclick="AboutFilm()">More details</button></div>`;
            });
        }
    }
    suchen.value = ''
    xhr.send();

});

function AboutFilm(){
    let jj = user.Search.filter(el => el.imdbID === event.target.id)
    // about.style.position =  'fixed'
    // about.style.top =  ' 58px';
    // about.style.left =  ' 358px';
    console.log(jj);
   
}

