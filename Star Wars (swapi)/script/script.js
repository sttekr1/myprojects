const btnPeople = document.getElementById("btnPeople");
const btnShips = document.getElementById("btnShips");
const result = document.getElementById("result");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const loader = document.getElementById("loader");

let urlPeople = "https://swapi.dev/api/people/?page=1";
let urlShips = "https://swapi.dev/api/starships/?page=1";

// Get SW Characters
function getPeople(url) {
    loader.style.display = "block";
    $.ajax({
        url: url,
        success: function (response) {
            loader.style.display = "none";
            console.log("Request successful", response);
            displayPeople(response, result);
        },
        error: function (error) {
            console.log("Error", error);
        }
    });
};

function displayPeople(allPeople, element) {
    if (allPeople.results != null) {
        element.innerHTML = '';
        element.innerHTML = `
        <div class="row different">
            <div class="col-md-3">Name</div>
            <div class="col-md-2">Height</div>
            <div class="col-md-2">Mass</div>
            <div class="col-md-2">Gender</div>
            <div class="col-md-2">Birth Year</div>
            <div class="col-md-1">Films:</div>
        </div>`;
        for (let i = 0; i < allPeople.results.length; i++) {
            element.innerHTML += `
            <div class="row">
                <div class="col-md-3">${allPeople.results[i].name}</div>
                <div class="col-md-2">${allPeople.results[i].height}</div>
                <div class="col-md-2">${allPeople.results[i].mass}</div>
                <div class="col-md-2">${allPeople.results[i].gender}</div>
                <div class="col-md-2">${allPeople.results[i].birth_year}</div>
                <div class="col-md-1">${allPeople.results[i].films.length}</div>
            </div>`;
        }
    } else {
        element.innerHTML = `<h2 id="notification">Please Wait until data is loaded!</h2>`
    }
};

btnPeople.addEventListener("click", function () {
    getPeople(urlPeople);
});

// Get SW Starships
function getShips(url) {
    loader.style.display = "block";
    $.ajax({
        url: url,
        success: function (response) {
            loader.style.display = "none";
            console.log("Request successful", response);
            displayShips(response.results, result);
        },
        error: function (error) {
            console.log("Error", error);
        }
    });
};

function displayShips(allStarships, element) {
    if (allStarships != null) {
        element.innerHTML = '';
        element.innerHTML = `
        <div class="row different">
            <div class="col-md-2">Name</div>
            <div class="col-md-3">Model</div>
            <div class="col-md-3">Manufacturer</div>
            <div class="col-md-1">Length</div>
            <div class="col-md-1">Passengers</div>
            <div class="col-md-1">Hyperdrive Rating</div>
        </div>`;
        for (starship of allStarships) {
            element.innerHTML += `
            <div class="row">
                <div class="col-md-2">${starship.name}</div>
                <div class="col-md-3">${starship.model}</div>
                <div class="col-md-3">${starship.manufacturer}}</div>
                <div class="col-md-1">${starship.length}</div>
                <div class="col-md-1">${starship.passengers}</div>
                <div class="col-md-1">${starship.hyperdrive_rating}</div>
            </div>`;
        }
    } else {
        element.innerHTML = `<h2 id="notification">Please Wait until data is loaded!</h2>`;
    }
};

btnShips.addEventListener("click", function () {
    getShips(urlShips);
});