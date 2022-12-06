const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();     /*prevents default event associated with e (which is submitting of form here)*/
    searchQuery = e.target.querySelector('input').value; // e.target returns the element that triggered the event e. (<form> in this case) If we had a submit button, it would be returned instead
    fetchFunction();
})

async function fetchFunction(){
    const baseURL = `https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw&limit=20` //backticks bcoz we're using variables in it
    const response = await fetch(baseURL);      /* harry videos on promise, async-await*/
    const data = await response.json();
    generateHTML(data.data); //the array of results inside response/data is named data by this particular api
    console.log(data.data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result=>{
        generatedHTML +=
        `
        <div class="item">
        <img src="${result.images.webp.large_image_url}" alt="image aani thi yaha :(" />
        <div class="flex-container">
          <h1 class="title">${result.title}</h1>
          <a class="view-button" href="${result.url}" target="_blank">Explore</a>
        </div>
        <p class="item-data">${result.aired.prop.from.year}${(result.aired.prop.to.year && result.aired.prop.to.year !== result.aired.prop.from.year) ? -result.aired.prop.to.year : ''}</p>
        <p class="item-data" >${result.genres[0].name}</p>
      </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
