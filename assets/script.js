// ON LOAD
window.addEventListener("DOMContentLoaded", function () {

    //if light mode has been set previously, set it
    if (localStorage.getItem("light") == "true") {
        document.documentElement.classList.add("light");
        darkMode.checked = true;
    } else {
        document.documentElement.classList.remove("light");
        darkMode.checked = false;
    }

    //remove preload class
    setTimeout(function () {
        document.body.className = "";
    }, 500);
});


// DARK MODE
const darkMode = document.querySelector("#switch");

darkMode.addEventListener("click", function () {
    document.documentElement.classList.toggle("light");
    if (document.documentElement.classList.contains("light")) {
        localStorage.setItem("light", "true");
    } else {
        localStorage.setItem("light", "false");
    }
});

// SEARCH
const search = document.querySelector("#search");

search.addEventListener("keyup", function (e) {
    search.classList.add("active");

    let searchValue = e.target.value.toLowerCase();

    // wait for input to stop before searching
    clearTimeout(search.timer);
    search.timer = setTimeout(function () {
        searchFiles(searchValue);
    }, 300);
});

function searchFiles(searchValue) {

    let files = document.querySelectorAll("#files li:not(.header)");

    if (searchValue == "") {
        search.classList.remove("active");
        files.map((file) => {
            file.classList.remove("highlight");
        });
        return;
    }



    files.forEach((file) => {
        let fileName = file.querySelector('.name').dataset.name.toLowerCase();
        if (~fileName.indexOf(searchValue)) {
            file.classList.add("highlight");
        } else {
            file.classList.remove("highlight");
        }
    });
}

// MOBILE SEARCH
let searchIcon = document.querySelector("#search-icon");

searchIcon.addEventListener("click", function () {
    let search = document.querySelector("#search");
    let input = search.querySelector("input");

    //if mobile layout, show search
    if (window.innerWidth < 590) {
        (search.classList.contains("active")) ? clearSearch(search, input) : showSearch(search, input);
    }

});


// ESCAPE KEY TO CLEAR SEARCH
document.addEventListener("keyup", function (e) {
    let search = document.querySelector("#search");
    let input = search.querySelector("input");

    if (e.key == "Escape") {
        clearSearch(search, input);
    }
});



// FUNCTIONS
function clearSearch(search, input) {
    search.classList.remove("active");
    //if search has value, clear it
    if (input.value) {
        input.value = "";
    }

    let files = document.querySelectorAll("#files li");
    files.forEach(function (file) {
        file.classList.remove("highlight");
    })
}

function showSearch(search, input) {
    search.classList.add("active");
    input.focus();
}
