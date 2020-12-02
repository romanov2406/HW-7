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
                <button class="details" id="${el.imdbID}" onclick="AboutFilm(event)">More details</button></div>`;
            });
        }
    }
    suchen.value = ''
    xhr.send();

});

modalOpen = false;

function closeAlert(e) {
    if ((e.target === document.querySelector('.close') || !document.querySelector('.about').contains(e.target)) && modalOpen) {
        modalOpen = false;
        about.innerHTML = ''
        about.style.display = ' none';
    }
}

window.addEventListener('click', closeAlert);

function AboutFilm(e) {
    e.stopImmediatePropagation();
    modalOpen = true;
    let jj = user.Search.find(el => el.imdbID === event.target.id)
    about.style.position = 'fixed'
    about.style.top = ' 58px';
    about.style.left = ' 358px';
    about.style.display = ' grid';

    fetch(`http://www.omdbapi.com/?t=${jj.Title}&page=2&apikey=2a95a77e`)
        .then(response => response.json())
        .then(movieDetails => {
            let ratingsList = '';
            
            for (let el of movieDetails.Ratings) {
                ratingsList += ' ' + el.Source + ' ' + el.Value + ' ';
            }

                about.innerHTML = `
                <div class="about-img">
                <img src="${movieDetails.Poster}" alt="">
                </div>
                <div class="about-info">
                <div class="close">Close</div>
            <div class="about-title">
              ${movieDetails.Title}
            </div>
            <div class="genre">
                ${movieDetails.Genre}: ${movieDetails.Rated}
            </div>
            <div class="plot">
               ${movieDetails.Plot}
            </div>
            <div class="writtetBy">
                <span>WrittetBy:</span> ${movieDetails.Writer}
            </div>
            <div class="directedBy">
               <span>Directed By: </span>${movieDetails.Director}
            </div>
            <div class="starring">
                <span>Starring: </span>${movieDetails.Actors}
            </div>
            <div class="boxOffice">
             <span>Box Office: </span> ${movieDetails.BoxOffice}
            </div>
            <div class="awards">
                <span>Awards: </span> ${movieDetails.Awards}
            </div>
            <div class="ratings">
                <span>Ratings: </span> ${ratingsList}
            </div>
        </div>`
        });
}