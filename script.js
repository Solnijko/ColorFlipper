const change_btn = document.getElementById("change-btn");
const main = document.querySelector(".main");
const hex_code = document.querySelector(".hex-code");

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

// Changing background color and color description after clicking the button
change_btn.onclick = function () {
    let new_color = genColor()

    // Change color and add description after successful request
    fetch("https://www.thecolorapi.com/id?hex=" + new_color)
        .then((response) => response.json())
        .then((responseJSON) => {
            hex_code.innerHTML = ("#" + new_color + " " + responseJSON.name.value);
            main.style.background = ("#" + new_color);
            hex_code.style.color = ("#" + new_color);
        });


};