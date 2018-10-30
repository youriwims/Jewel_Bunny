var imgArray = new Array();
var placeHolderArray = new Array();


for (var i = 1; i < 13; i++) {
    imgArray.push(`jewel${i}.png`);
    placeHolderArray.push(`#myImage${i}`);
}


var imgArray = new Array();
var objectUrl;

for (var i = 0; i < 12; i++) {
    console.log(placeHolderArray[i]);
    document.querySelector(placeHolderArray[i]).src = `https://youriwims.github.io/img/jewel${i}.png`;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}