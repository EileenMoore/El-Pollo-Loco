let imagePaths = [
    './img/pepe/I-1.png', './img/pepe/I-2.png', './img/pepe/I-3.png', './img/pepe/I-4.png', './img/pepe/I-5.png', './img/pepe/I-6.png', './img/pepe/I-7.png', './img/pepe/I-8.png', './img/pepe/I-9.png', './img/pepe/I-10.png',
    './img/pepe/IL-1.png', './img/pepe/IL-2.png', './img/pepe/IL-3.png', './img/pepe/IL-4.png', './img/pepe/IL-5.png', './img/pepe/IL-6.png', './img/pepe/IL-7.png', './img/pepe/IL-8.png', './img/pepe/IL-9.png', './img/pepe/IL-10.png',
    './img/pepe/I-11.png', './img/pepe/I-12.png', './img/pepe/I-13.png', './img/pepe/I-14.png', './img/pepe/I-15.png', './img/pepe/I-16.png', './img/pepe/I-17.png', './img/pepe/I-18.png', './img/pepe/I-19.png', './img/pepe/I-20.png',
    './img/pepe/IL-11.png', './img/pepe/IL-12.png', './img/pepe/IL-13.png', './img/pepe/IL-14.png', './img/pepe/IL-15.png', './img/pepe/IL-16.png', './img/pepe/IL-17.png', './img/pepe/IL-18.png', './img/pepe/IL-19.png', './img/pepe/IL-20.png',
    './img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png',
    './img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png',
    './img/pepe/J-31.png', './img/pepe/J-32.png', './img/pepe/J-33.png', './img/pepe/J-34.png', './img/pepe/J-35.png', './img/pepe/J-36.png', './img/pepe/J-37.png', './img/pepe/J-38.png', './img/pepe/J-39.png',
    './img/pepe/JL-31.png', './img/pepe/JL-32.png', './img/pepe/JL-33.png', './img/pepe/JL-34.png', './img/pepe/JL-35.png', './img/pepe/JL-36.png', './img/pepe/JL-37.png', './img/pepe/JL-38.png', './img/pepe/JL-39.png',
    './img/pepe/D-51.png', './img/pepe/D-52.png', './img/pepe/D-53.png', './img/pepe/D-54.png', './img/pepe/D-55.png', './img/pepe/D-56.png',
    './img/pepe/DL-51.png', './img/pepe/DL-52.png', './img/pepe/DL-53.png', './img/pepe/DL-54.png', './img/pepe/DL-55.png', './img/pepe/DL-56.png',
    './img/pepe/H-41.png', './img/pepe/H-42.png', './img/pepe/H-43.png',
    './img/pepe/HL-41.png', './img/pepe/HL-42.png', './img/pepe/HL-43.png', 
    './img/pepe/J-40.png',
    './img/chicken/chicken1.png', './img/chicken/chicken2.png', './img/chicken/chicken3.png', 'img/chicken/chicken_dead.png',
    './img/chicken/hen1.png', './img/chicken/hen2.png', './img/chicken/hen3.png', 'img/chicken/hen_dead.png',
    './img/boss/G1.png', './img/boss/G2.png', './img/boss/G3.png', './img/boss/G4.png',
    './img/boss/GR1.png', './img/boss/GR2.png', './img/boss/GR3.png', './img/boss/GR4.png',
    './img/boss/G5.png', './img/boss/G6.png', './img/boss/G7.png', './img/boss/G8.png', './img/boss/G9.png', './img/boss/G10.png', './img/boss/G11.png', './img/boss/G12.png',
    './img/boss/G13.png', './img/boss/G14.png', './img/boss/G15.png', './img/boss/G16.png', './img/boss/G17.png', './img/boss/G18.png', './img/boss/G19.png', './img/boss/G20.png',
    './img/background/sky.png', './img/background/clouds.png',
    './img/background/ground1.png', './img/background/ground2.png', './img/background/ground3.png',
    './img/bottle/bottle.png', './img/bottle/bottle1.png', './img/bottle/bottle2.png', './img/bottle/bottle3.png', './img/bottle/bottle4.png', './img/bottle/bottle5.png',
    'img/coins/coin1.png', 'img/coins/coin2.png', './img/bars/live.png',
    './img/bars/bossenergy1.png', './img/bars/bossenergy2.png', './img/bars/bossenergy3.png', './img/bars/bossenergy4.png', './img/bars/bossenergy5.png', './img/bars/bossenergy6.png',
    './img/bottle/tabasco1.png', './img/bottle/tabasco2.png', './img/bottle/tabasco3.png', './img/bottle/tabasco4.png', './img/bottle/tabasco5.png', './img/bottle/tabasco6.png'
];

let images = [];

/**
* Preload all images. This function should be executed before starting the game.
* imagePaths should contain all images that will be loaded: ['img/image1.png', 'img/image2.png', 'img/image3.png', ...]
*/
function preloadImages() {

    for (let i = 0; i < imagePaths.length; i++) {
        let image = new Image();
        image.src = imagePaths[i];
        images.push(image); // push image-path to images-array (which contains all image-paths)
    }

}

/**
   * Check if background-image is already loaded in cache; if not, create new image
   * @param {string} src_path - scr-path of background-image 
   */
function checkBackgroundImageCache(src_path) {

    // Check if image is found in images-array.


    let base_image = images.find(function (img) {

        return img.src.endsWith(src_path.substring(0, src_path.length));
    });

    // Create new image if not found in cache

    if (!base_image) {
        base_image = new Image();
        base_image.src = src_path;
    }

    return base_image;

}