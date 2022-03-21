import { htmlDom } from "./domElements.js";

function createCard(country) {
    return `
    <div class="col mb-4">
    <div class="card">
        <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} image">
        <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">${country.name.common} is country with population of ${country.population} with an Area of ${country.area} square killometers.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Open on <a href="https://en.wikipedia.org/wiki/${createWikiLink(country.name.common)}" target="_blank">Wikipedia</a></small>
        </div>
        <div class="card-footer">
            <small class="text-muted">Open on <a href="${country.maps.googleMaps}" target="_blank">Google Maps</a></small>
        </div>
    </div>
</div>`
};

function createWikiLink(name) {
    return name.split(" ").join("_");
};

htmlDom.searchBtn.addEventListener("click", function () {
    htmlDom.spinner.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${htmlDom.searchInput.value}`)
        .then(data => data.json())
        .then(function (result) {
            htmlDom.spinner.style.display = "none";
            htmlDom.cardContainer.innerHTML = '';
            htmlDom.notification.innerHTML = '';
            try {
                for (let country of result) {
                    htmlDom.cardContainer.innerHTML += createCard(country)
                };
            } catch (err) {
                console.log(err);
                htmlDom.notification.innerHTML = `
            <div class="alert alert-danger" role="alert">
                You have entered wrong country name, try again! 
            </div>`
            };
        })
});

// Search on keydown enter
htmlDom.searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        htmlDom.spinner.style.display = "block";
        fetch(`https://restcountries.com/v3.1/name/${htmlDom.searchInput.value}`)
            .then(data => data.json())
            .then(function (result) {
                htmlDom.spinner.style.display = "none";
                htmlDom.cardContainer.innerHTML = '';
                htmlDom.notification.innerHTML = '';
                try {
                    for (let country of result) {
                        htmlDom.cardContainer.innerHTML += createCard(country)
                    };
                } catch (err) {
                    console.log(err);
                    htmlDom.notification.innerHTML = `
            <div class="alert alert-danger" role="alert">
                You have entered wrong country name, try again! 
            </div>`
                };
            })
    };
});

htmlDom.resetBtn.addEventListener("click", function () {
    htmlDom.cardContainer.innerHTML = "";
    htmlDom.searchInput.innerHTML = "";
    htmlDom.searchInput.value = "";
    htmlDom.notification.innerHTML = "";
});

// Navbar buttons event handlers

htmlDom.btnCurrency.addEventListener("click", function () {
    htmlDom.cardContainer.innerHTML = '';
    htmlDom.notification.innerHTML = '';
    htmlDom.searchInput.value = '';

    fetch("https://restcountries.com/v3.1/currency/eur")
        .then(data => data.json())
        .then(function (result) {
            result.forEach(element => {
                htmlDom.cardContainer.innerHTML += createCard(element);
            })
        })
});

htmlDom.btnEnglish.addEventListener("click", function () {
    htmlDom.cardContainer.innerHTML = '';
    htmlDom.notification.innerHTML = '';
    htmlDom.searchInput.value = '';

    fetch("https://restcountries.com/v3.1/lang/english")
        .then(data => data.json())
        .then(function (result) {
            result.forEach(element => {
                htmlDom.cardContainer.innerHTML += createCard(element)
            })
        })
});

htmlDom.btnMacedonia.addEventListener("click", function () {
    htmlDom.cardContainer.innerHTML = '';
    htmlDom.notification.innerHTML = '';
    htmlDom.searchInput.value = '';

    fetch("https://restcountries.com/v3.1/name/macedonia")
        .then(data => data.json())
        .then(function (result) {
            result.forEach(element => {
                htmlDom.cardContainer.innerHTML = createCard(element);
            })
        })
});