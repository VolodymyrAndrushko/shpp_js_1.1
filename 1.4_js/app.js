const button2 = document.getElementById("button-02");

button2.onclick = function () {
    const div = document.getElementById("div-02");
    div.remove();
}

const button3 = document.getElementById("button-03");

button3.onclick = function () {
    const div = document.getElementById("div-03");
    if (div.classList.contains("hidden")) {
        div.classList.remove("hidden");
    }
    else {
        div.classList.add("hidden");
    }
}

function addHidden() {
    document.getElementById("div-01").style.display = "None";
}

const button4 = document.getElementById("button-04");

button4.onclick = function () {
    const divs = document.getElementsByClassName("blackDiv");

    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        }
        else {
            element.classList.add("hidden");
        }
    }
}

const button5 = document.getElementById("button-05");

button5.onclick = function () {
    let selector = document.querySelector("#input-01").value;
    let elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        }
        else {
            element.classList.add("hidden");
        }
    }
}

const yellowDiv = document.getElementById('yellowDiv');

yellowDiv.addEventListener("click", firstClickYellowDiv);

function firstClickYellowDiv() {
    alert("Hello");
    yellowDiv.removeEventListener("click", firstClickYellowDiv);
    yellowDiv.addEventListener("click", secondClickYellowDiv);
}

function secondClickYellowDiv() {
    yellowDiv.remove();
}

const redDiv = document.getElementById('redDiv');
const button6 = document.getElementById("button-06");
button6.addEventListener("mouseover", showOnFocus);
button6.addEventListener("mouseout", hideOnOut);

function showOnFocus() {
    redDiv.style.display = "block";
}
function hideOnOut() {
    redDiv.style.display = "none";
}

const greenDiv = document.getElementById('greenDiv');
const input2 = document.getElementById("input-02");
input2.addEventListener("mouseover", showOnFocus);
input2.addEventListener("input", hideOnOut);

function showOnFocus() {
    greenDiv.style.display = "block";
}
function hideOnOut() {
    greenDiv.style.display = "none";
}

const button7 = document.getElementById("button-07");
button7.addEventListener("click", addImage);

function addImage() {
    let input3 = document.querySelector("#input-03").value;
    let urlImage = document.createElement("img");
    urlImage.src = input3;
    const src = document.getElementById("imageDiv");
    src.appendChild(urlImage);
}

const button8 = document.getElementById("button-08");
button8.addEventListener("click", addImages);

function addImages() {
    const textarea1 = document.getElementById("textarea-01").value;
    const images = textarea1.split("\n");
    const src = document.getElementById("imagesDiv");
    for (let i = 0; i < images.length; i++) {
        const url = images[i];
        const image = document.createElement("img");
        image.src = url;
        src.appendChild(image);
    }
}

const cursorPosition = document.getElementById("cursorPosition");
document.onmousemove = function (event) {
    cursorPosition.innerText = `x: ${event.clientX} y: ${event.clientY}`;
}

const language = document.getElementById("language");
language.innerText = window.navigator.language;

const userCoordinates = document.getElementById("userCoordinates");
const successCallback = (position) => {
    console.log(position)
    userCoordinates.innerText = `Lat: ${position.coords.latitude} Lon: ${position.coords.longitude}`
};
const errorCallback = (error) => {
    console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


const button9 = document.createElement("button");
window.onscroll = function (event) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        document.body.appendChild(button9);
        button9.classList.add("buttonAhead")
        button9.addEventListener("click", function () {
            window.scrollTo(0, 0);
        })
    }
};

const largeDiv = document.getElementById("largeDiv");
largeDiv.addEventListener("click", function () {
    alert("Large Div!");
});
const smallDiv = document.getElementById("smallDiv");
smallDiv.addEventListener("click", function (objEvent) {
    objEvent.stopPropagation();
    alert("Small Div!");
});

const button10 = document.getElementById("button-10");
button10.addEventListener('click', function () {
    const div = document.createElement("div");
    const body = document.getElementsByTagName('body')[0];
    div.classList.add("lockDiv");
    document.body.append(div);
    body.style.overflow = 'hidden';
    div.addEventListener("click", function () {
        div.remove();
        body.style.overflow = 'visible';
    })
});

const input4 = document.getElementById("input-04");
input4.addEventListener("dragover", function () {
    input4.classList.add("dropZone");
    const inputBounding = input4.getBoundingClientRect();
    const inputMiddleX = inputBounding.top + (inputBounding.bottom - inputBounding.top) / 2;
    window.scrollTo(inputMiddleX, inputMiddleX);
});
input4.addEventListener("dragover", function () {
    input4.classList.add("dropBackground");
});
input4.addEventListener("mouseout", function () {
    input4.classList.remove("dropBackground");
});
input4.addEventListener("input", function () {
    input4.classList.add("dropZone");
});

const localeStorageDiv = document.getElementById("localStorageDiv");
localeStorageDiv.innerText = (localStorage.getItem(localeStorageDiv) === null) ? localeStorageDiv.innerText : localStorage.getItem(localeStorageDiv);
localeStorageDiv.addEventListener("focusout", function () {
    localStorage.setItem(localeStorageDiv, localeStorageDiv.innerText);
});

const cookieDiv = document.getElementById("cookieDiv");
cookieDiv.innerText = (getCookie(cookieDiv) === undefined) ? cookieDiv.innerText : getCookie(cookieDiv);

cookieDiv.addEventListener("focusout", function () {
    document.cookie = setCookie(cookieDiv, cookieDiv.innerText);
});

const sessionStorageDiv = document.getElementById("sessionStorageDiv");
sessionStorageDiv.innerText = (sessionStorage.getItem(localeStorageDiv) === null) ? sessionStorageDiv.innerText : sessionStorage.getItem(sessionStorageDiv);
sessionStorageDiv.addEventListener("focusout", function () {
    sessionStorage.setItem(sessionStorageDiv, sessionStorageDiv.innerText);
});

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

function getCookie(name) {
    const cookie = document.cookie;
    const reg = new RegExp(`${name}`, 'g');
    let value;
    if (reg.test(cookie)) {
        value = cookie.split('; ').find(s => s.startsWith(`${name}=`)).split('=')[1];
    }
    return value;
}