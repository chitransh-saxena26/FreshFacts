const API_KEY = 'a45d9df4da2d437a8e4e8fabc708c68d';
const url = "https://newsapi.org/v2/everything?q="

let currentPage = 1;
const pageSize = 20;
let currentQuery;
let prevBtn = document.getElementById('prev-page');
let nextBtn = document.getElementById('next-page');

window.addEventListener('load', () => fetchNews('india'));

function reload(){
    window.location.reload();
}

async function fetchNews(query, page = 1){
    document.getElementById('loading').style.display = 'flex';
    currentQuery = query;
    currentPage = page;
    const res = await fetch(`${url}${query}&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apikey=${API_KEY}`);
    const data = await res.json();
    nextBtn.style.display = 'block'
    document.getElementById('loading').style.display = 'none';
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    cardContainer.style.display = 'flex';
    const newsTemplate = document.getElementById('news-template');

    cardContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardContainer.appendChild(cardClone);
 });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0,60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0,100)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: 'Asia/Jakarta'     
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click',() => {window.open(article.url, "_blank");
    });
}

let currentNav = null;

function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentNav?.classList.remove('active');
    currentNav = navItem;
    currentNav.classList.add('active');
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('news-input');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    currentNav?.classList.remove('active');
})

nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchNews(currentQuery, currentPage);
    prevBtn.style.display = 'block';
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

})

prevBtn.addEventListener('click', ()=>{
    if(currentPage>1){
        currentPage--;
        fetchNews(currentQuery, currentPage);
    }
    if(currentPage == 1) prevBtn.style.display = 'none';
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 200){
        backToTopBtn.style.display = 'block'; 
    }
    else{
        backToTopBtn.style.display = 'none';
    }
})

backToTopBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

function showSidebar(){
    const sideBar = document.querySelector('.side-navbar');
    sideBar.style.display = 'flex';
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.style.display = 'none';
}
function hideSidebar(){
    const sideBar = document.querySelector('.side-navbar');
    sideBar.style.display = 'none';
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.style.display = '';
}
