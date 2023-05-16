import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
import {createMarkupForMany, createMarkupForOne} from "./fetchCountries"
const DEBOUNCE_DELAY = 300;
let canClick = false;


// Отримую Refs 
const searchBox = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

// Очищуємо коли значення не валідне
function valueNotValid() {
  countryList.innerHTML = "";
  countryInfo.innerHTML = "";
};


function valueValid(inputValue) {
  fetchCountries(inputValue)
      .then((result) => {

          if (result.length > 10) {
              Notify.info("Too many matches found. Please enter a more specific name.")
              valueNotValid()
              return
          }

          else if(result.length === 1) {
              return result.reduce((acc, el) => acc + createMarkupForOne(el), "")
          }

          else {
              return result.reduce((acc, el) => acc + createMarkupForMany(el), "")
          }
      })

      .then(data => sendToHTML(data))
      .catch(error => {
          valueNotValid()
          Notify.failure(`Oops, there is no country with name "${searchBox.value}"`)
      });
  
};


// Слухач
searchBox.addEventListener("input", 
debounce(() => {
const inputValue = searchBox.value.trim() 
inputValue === "" ? valueNotValid() : valueValid(inputValue);
},DEBOUNCE_DELAY)
);



function sendToHTML(data) {
    if (data) {
        countryList.innerHTML = data
        countryList.addEventListener("click", selectCountries);
    } 
};

function selectCountries(event) {
    if (!canClick === false) return;
    if (event.target.tagName === "IMG" || event.target.tagName === "P") {
        const click = event.target.parentElement.dataset.name;
        valueValid(click);
    }
    
};






































