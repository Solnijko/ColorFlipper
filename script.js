import auth from "./config.js";

const change_btn = document.getElementById("change-btn");
const main = document.querySelector(".main");
const hex_code = document.querySelector(".hex-code");
const missing = document.querySelector(".missing");
const image = document.querySelector(".image");

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

// Gets an image from unsplash api and displays it inside the image container
function getImage(color) {
    let data;
    fetch(`https://api.unsplash.com/search/photos?query=${color}`, {
        headers:{
            Authorization: auth,
        }})
        .then((response) => response.json())
        .then((responseJSON) =>{
            if (responseJSON.results.length != 0){
                image.src = responseJSON.results[0].urls.small;
                missing.classList.remove(".hidden")
            }
            else{
                missing.classList.add(".hidden")
                image.src = "";
            };
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

            // Get a random image based on image description
            getImage(responseJSON.name.value);
            hex_code.innerHTML = ("#" + new_color + " " + responseJSON.name.value);
            main.style.background = ("#" + new_color);
            hex_code.style.color = ("#" + new_color);
        });
};

