import auth from "./config.js";

const change_btn = document.getElementById("change-btn");
const main = document.querySelector(".main");
const hex_code = document.querySelector(".hex-code");
const image = document.querySelector(".image-container");

// Generate random color
function genColor() {
    const chars = "ABCDEF1234567890";
    let color = "";
    let counter = 0;
    while (counter < 6) {
        color += chars.charAt(Math.floor(Math.random() * chars.length));
        counter++;
    };
    return color;
};

function getRandomImageByHex(color) {
    let data;
    // fetch(`https://api.unsplash.com/photos/random?client_id=eABgtWoa5JmvYg6H5QkN9jcB8RQMf5fN9AJY7jj6se4&color:#${hexCode}`)
    fetch(`https://api.unsplash.com/search/photos?query=color ${color}`, {
        headers:{
            Authorization: auth,
            // color: `#${hexCode}`
        }
    })
    .then((response) => response.json())
    .then((responseJSON) =>{
        console.log(responseJSON)
        image.style.background = "url(" + responseJSON.results[0].urls.small + ")";
    });
    return data;
}

// Changing background color and color description after clicking the button
change_btn.onclick = function () {
    let new_color = genColor();
    // Change color and add description after successful request
    fetch("https://www.thecolorapi.com/id?hex=" + new_color)
        .then((response) => response.json())
        .then((responseJSON) => {
            getRandomImageByHex(responseJSON.name.value);
            hex_code.innerHTML = ("#" + new_color + " " + responseJSON.name.value);
            main.style.background = ("#" + new_color);
            hex_code.style.color = ("#" + new_color);
            
        });   
};