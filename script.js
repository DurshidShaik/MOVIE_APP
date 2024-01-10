const API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"; //api path
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280"; // imagae path
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query="; //search api
let google = "https://www.google.com/search?q=";  //google path

let box_container = document.querySelector(".box-container"); //main container
let input = document.querySelector(".input");  // input from user

const fetchapi = async (api) => {    //Starting fetch api usage
  const result = await fetch(api);
  const data = await result.json();
  show_data(data.results);
};

const show_data = (data) => {
  box_container.innerHTML = "";
  data.forEach((item) => {
    console.log(item);
    const box = document.createElement("div");  //creating a external node to add all childs into it.
    box.classList.add("box");  //adding class to it.


    box.innerHTML = `<img src="${
      IMAGEPATH + item.poster_path
    }" alt="" class="image">
    <div class="content">
    <h3 class="title">${item.title}<span class="rating">${
      item.vote_average
    }</span></h3>
    <h2 class="released-date">${item.release_date}</h2>
    <p class="description">${item.overview.slice(0, 150) + "."}</p>
  </div>`;
    box_container.appendChild(box);
    box.addEventListener('click',()=>{
      window.open((google + item.title),"-blank");    //onclicking the image an external page will be open..
    })
  });
};




input.addEventListener("keyup", (event) => {   //key up event for searching
  //searching the movies
  console.log(event.target.value);
 
  if (event.target.value != "") {   //if target value is not equal to empty it means user not entered anything into search bar.
    fetchapi(SEARCHAPI + event.target.value);
  } else {
    fetchapi(API); //calling the fetch api
  }
});

fetchapi(API);  //calling the fetch function
