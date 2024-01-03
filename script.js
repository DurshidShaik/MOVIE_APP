const API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"; //api
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280"; // imagae path
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query="; //search api

let box_container = document.querySelector(".box-container");  //main container
let input = document.querySelector(".input");


const fetchapi = async (api) => {
  const result = await fetch(api);
  const data = await result.json();
  show_data(data.results);
};


const show_data = (data)=>{
  box_container.innerHTML=""
  data.forEach((item) =>{
    console.log(item);
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `<img src="${IMAGEPATH + item.poster_path}" alt="" class="image">
    <div class="content">
    <h3 class="title">${item.title}<span class="rating">${item.vote_average}</span></h3>
    <h2 class="released-date">${item.release_date}</h2>
    <p class="description">${item.overview.slice(0,150) + "."}</p>
  </div>`
  box_container.appendChild(box);
  
  
  })
}


input.addEventListener('keyup',(event)=>{
  console.log(event.target.value);
  if(event.target.value != ""){
    fetchapi(SEARCHAPI + event.target.value)
  }
  else{
    fetchapi(API)
  }
})

fetchapi(API);
