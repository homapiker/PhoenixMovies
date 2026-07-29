const params = new URLSearchParams(window.location.search);

const cat = params.get("cat");

const title = document.getElementById("title");

const moviesDiv = document.getElementById("movies");

const pageText = document.getElementById("page");

const prev = document.getElementById("prev");

const next = document.getElementById("next");

const perPage = 10;

let currentTab = "Movie";
let currentPage = 1;

let movies = [];

if(cat=="iranian")
    title.innerText="ایرانی";

if(cat=="foreignMovie")
    title.innerText = "سینمایی خارجی";

if(cat=="foreignSeries")
    title.innerText = "سریال خارجی";

if(cat=="animation")
    title.innerText="انیمیشن";

fetch(`../data/${cat}.json?v=${Date.now()}`, {
    cache: "no-store"
})
.then(r => r.json())
.then(data => {
    movies = data;
    showPage();
});

function showPage() {

    moviesDiv.innerHTML="";

    let start=(currentPage-1)*perPage;

    let end=start+perPage;

    let pageMovies=movies.slice(start,end);

    pageMovies.forEach(movie=>{

        const div=document.createElement("div");

        div.className="movie";

        div.innerHTML=`

        <img src="${movie.poster}">

        <div class="info">

            <div class="row">
                <h3>${movie.title}</h3>
                <p style="color: Gold;">${movie.score}</p>
            </div>
            <div class="row">
                <p>${movie.genre}</p>
                <p>${movie.year}</p>
            </div>
            <p id="summary">${movie.summary}</p>

        </div>

        `;

        // div.onclick=()=>{};

        moviesDiv.appendChild(div);

    });

    let total=Math.ceil(movies.length/perPage);

    pageText.innerText=`صفحه ${currentPage} از ${total}`;

    prev.disabled=currentPage==1;

    next.disabled=currentPage==total;

}

next.onclick=()=>{

    if(currentPage<Math.ceil(movies.length/perPage)){

        currentPage++;

        showPage();

    }

};

prev.onclick=()=>{

    if(currentPage>1){

        currentPage--;

        showPage();

    }

};