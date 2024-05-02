let countryList = document.querySelector(".countrys");
let countriesListUl = document.querySelector(".country");
const filterList = document.querySelector(".filter-cart") || "Aisa";
const searchInput = document.querySelector(".search-filter input");
let allCountriesData;
let params;
let newdata = [
  1,

  2,

  3,

  4,
];
let limit = 12;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    fetchData(paginate(data, params[1] || limit, params[0] || 1));
  });

function getParams() {
  let index = document.URL.indexOf("?");
  let params = new Array();
  if (index != -1) {
    let pairs = document.URL.substring(index + 1, document.URL.length).split(
      "&"
    );
    for (let i = 0; i < pairs.length; i++) {
      nameVal = pairs[i].split("=");
      params.push(nameVal[1]);
    }
  }
  return params;
}

params = getParams();

filterList.addEventListener("change", (e) => {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/region/${filterList.value}`)
    .then((res) => res.json())
    .then((data) => {
      displayCountries(paginate(data, params[1] || limit, params[0] || 1));
    });
});

// sort////////
// Sort

let api = "https://restcountries.com/v3.1/all";

async function fetchDataapi(api) {
  let response = await fetch(api);
  let data = await response.json();
  Sort(data);
}
fetchDataapi(api);

let sort = document.querySelector(".region");

function Sort(data) {
  console.log(data);
  sort.addEventListener("change", (e) => {
    let value = e.target.value;
    countMis = 0;
    countMus = 16;
    if (value === "population") {
      data.sort((a, b) => b?.population - a?.population);
    }
    if (value === "all") {
      console.log(1);
      fetchData(data);
    }
    if (value === "region") {
      data.sort((a, b) => {
        let regionA = a.region.toLowerCase();
        let regionB = b.region.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }
    if (value === "capital") {
      data.sort((a, b) => {
        let capitalA =
          Array.isArray(a.capital) && a.capital.length > 0
            ? a.capital[0].toLowerCase()
            : "";
        let capitalB =
          Array.isArray(b.capital) && b.capital.length > 0
            ? b.capital[0].toLowerCase()
            : "";
        if (capitalA < capitalB) {
          return -1;
        }
      });
    }
    if (value === "title") {
      data.sort((a, b) => {
        let regionA = a.name?.common?.toLowerCase();
        let regionB = b.name?.common?.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }

    fetchData(data);
  });
}

// fetchData(api);

// srt end//////

function displayCountries(data) {
  countryList.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/cart.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="country">
              <h3 class="country-card__name">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countryList.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  countryList.innerHTML = "";
  filteredCountries.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/cart.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="country">
              <h3 class="country__name">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countryList.append(countryCard);
  });
});

darkList.addEventListener("click", function () {
  document.body.classList.toggle(".dark");
});

function fetchData(data) {
  let newdata = [
    1,

    2,

    3,

    4,

    5, 6, 7, 8, 9, 10, 11, 12,
  ];
  countryList.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/cart.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="country">
              <h3 class="country__name">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countryList.append(countryCard);
  });
  const countryCardUl = document.createElement("ul");
  countryCardUl.classList.add("country-list");
  newdata.forEach((p) => {
    countryCardUl.innerHTML += `
     		 <li class="box-list px-2"><a class="box-list__link" href="?page=${p}&limit=${limit}">${p}</a></li>
 			`;
    countryList.appendChild(countryCardUl);
  });
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
