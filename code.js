const apiKey = 'N-KS8wfGs1S2Jjw-RtA12zpJ7dEv5MGOYTlMxMPdfwo'
const formElem = document.querySelector('form');
const inputElem = document.querySelector('.search-input');
const resultGrid = document.querySelector('.result-grid');
const showMoreButtonElem = document.querySelector('.show-more');

let page;

async function searchImage(){
  const imageSearch = inputElem.value;
  const imgUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${imageSearch}&client_id=${apiKey}`;
  console.log(imgUrl);
  imgUrlFetch = await fetch(imgUrl);
  imgJSONObject = await imgUrlFetch.json();
  console.log(imgJSONObject);
  if(page===1){
    resultGrid.innerHTML = '';
  }
  results = imgJSONObject.results;
  console.log(results);
  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('single-result');
    const img = document.createElement('img');
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const aLink = document.createElement('a');
    aLink.href = result.links.html;
    aLink.target = '_blank';
    aLink.textContent = result.alt_description;
    resultDiv.appendChild(img);
    resultDiv.appendChild(aLink);
    resultGrid.appendChild(resultDiv);
  });
  page++;
  if(page>1){
    showMoreButtonElem.style.display = 'block';
  }
}


formElem.addEventListener('submit', (event)=>{
  event.preventDefault();
  page = 1;
  document.querySelector('.result-detail').innerHTML = `The search results for <em>${inputElem.value}</em>`;
  searchImage();
})
showMoreButtonElem.addEventListener('click',(event)=>{
  event.preventDefault();
  searchImage();
})