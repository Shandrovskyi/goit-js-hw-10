
const URL = "https://restcountries.com/v3.1/name/";
const fields = "name,capital,population,flags,languages"



function fetchCountries(inputValue) {
    return fetch(`${URL}${inputValue}?fields=${fields}`).then((res) => res.json());
};
export { fetchCountries };



function createMarkupForMany(el) {
    canClick = true;
    return `
      <li data-name="${el.name.common}" class="list">
        <img src="${el.flags.svg}" alt="${el.flags.alt}" width="35px" height="15px" version="1.1" viewBox="0 0 25 25"/> 
        <p>${el.name.common}</p>
      </li>
    `;
  }

export {createMarkupForMany};



function createMarkupForOne(el) {
    const languages = Object.values(el.languages).join(",");
    return `
      <li class="list">
        <img 
          src="${el.flags.svg}" 
          alt="${el.flags.alt}"
          width="50px" 
          height="25px"
          version="1.1"
          viewBox="0 0 25 25"
        /> 
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

  export {createMarkupForOne};