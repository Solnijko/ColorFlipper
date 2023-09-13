const change_btn = document.getElementById("change-btn");
const main = document.querySelector(".main");
const hex_code = document.querySelector(".hex-code");


function genColor(){
    const chars = "ABCDEF1234567890";
    let color = "#";
    let counter = 0;
    while (counter < 6){
        color += chars.charAt(Math.floor(Math.random() * chars.length));
        counter++;
    };
    return color;
};

change_btn.onclick = function(){
    let new_color = genColor()
    main.style.background = new_color;
    hex_code.innerHTML = new_color;
    hex_code.style.color = new_color;
};