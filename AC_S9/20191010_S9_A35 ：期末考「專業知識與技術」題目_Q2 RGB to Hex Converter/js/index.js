const rPanel = document.getElementById("r-panel");
const gPanel = document.getElementById("g-panel");
const bPanel = document.getElementById("b-panel");

let rVal = rPanel.value;
let gVal = gPanel.value;
let bVal = bPanel.value;

const hexCopy = document.getElementById("btn-copy-hex");
const rgbCopy = document.getElementById("btn-copy-rgb");
const textTextBg = document.getElementById("test-text");

document.body.style.backgroundColor = rgb(rVal, gVal, bVal);
textTextBg.style.backgroundColor= rgb(rVal, gVal, bVal);


rPanel.addEventListener("change", function() {
    rVal = rPanel.value;
    document.getElementById("rNum").value = rVal;
    display();
});

gPanel.addEventListener("change", function() {
    gVal = gPanel.value;
    document.getElementById("gNum").value = gVal;
    display();
});

bPanel.addEventListener("change", function() {
    bVal = bPanel.value;
    document.getElementById("bNum").value = bVal;
    display();
});

function display() {
    document.getElementById("rgb-output").value = rgb(rVal, gVal, bVal);
    document.getElementById("hex-output").value = rgbToHex(rVal, gVal, bVal);
    document.body.style.backgroundColor = rgb(rVal, gVal, bVal);
    textTextBg.style.backgroundColor= rgb(rVal, gVal, bVal);
}

function rgb(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ["rgb(", r, ",", g, ",", b, ")"].join("");
}


function rgbToHex(r, g, b) {
    r = Math.abs(r);
    g = Math.abs(g);
    b = Math.abs(b);
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex
    }).join('');
}

// copy功能相關內容
rgbCopy.addEventListener("click", function() {
    copyText(document.getElementById("rgb-output"));
})

hexCopy.addEventListener("click", function() {
    copyText(document.getElementById("hex-output"));
})


function copyText(obj) {
    let copytarget = obj;
    copytarget.select();
    copytarget.setSelectionRange(0, 20);
    document.execCommand("copy");
}