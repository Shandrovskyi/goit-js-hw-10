import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
let canClick = false;




const searchBox = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener("input", debounce(() => {
  const inputValue = searchBox.value.trim();
  inputValue === "" ? (valueNotValid(), searchBox.value = "") : valueValid(inputValue);
}, DEBOUNCE_DELAY));

function valueNotValid() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
};

function valueValid(inputValue) {
    fetchCountries(inputValue)
        .then((resalt) => {
            if (resalt.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
                valueNotValid()
                return
            }
            else if(resalt.length === 1) {
                return resalt.reduce((acc, el) => acc + createMarkupForOne(el), "")
            }
            else {
                return resalt.reduce((acc, el) => acc + createMarkupForMany(el), "")
            }
        })
        .then(data => sendToHTML(data))
        .catch(error => {
            valueNotValid()
            Notify.failure(`Oops, there is no country with name "${searchBox.value}"`)
        });
    
};

function createMarkupForMany(el) {
  canClick = true;
  return `
  <li data-name="${el.name.common}" class="list">
      <img src="${el.flags.svg}" alt="${el.flags.alt}" width="50px" height="25px" version="1.1" viewBox="0 0 25 25"/> 
      <p>${el.name.common}</p>
  </li>
  `;
}



function createMarkupForOne(el) {
  canClick = false;
  const languages = Object.values(el.languages).join(",");
  return `
  <li class="list">
      <img src="${el.flags.svg}" alt="${el.flags.alt}" width="50px" height="25px" version="1.1" viewBox="0 0 25 25"/> 
      <h1>${el.name.common}</h1>
  </li>
  <li class="list"> 
      <h4>Capital:</h4> 
      <p>${el.capital}</p>
  </li>
  <li class="list"> 
      <h4>Population:</h4> 
      <p>${el.population}</p>
  </li>
  <li class="list"> 
      <h4>Languages:</h4> 
      <p>${languages}</p>
  </li>
  `;
}




function sendToHTML(data) {
    if (data) {
        countryList.innerHTML = data
        countryList.addEventListener("click", selectCountries);
    } 
};

function selectCountries(event) {
    if (canClick === false) return;
    if (event.target.tagName === "IMG" || event.target.tagName === "P") {
        const click = event.target.parentElement.dataset.name;
        valueValid(click);
    }
   
};




































