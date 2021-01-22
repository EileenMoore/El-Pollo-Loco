let imagePaths = ['./img/pepe/I-1.png', './img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png',
    './img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png',
    './img/chicken/chicken1.png', './img/chicken/chicken2.png', './img/chicken/chicken3.png',
    './img/chicken/hen1.png', './img/chicken/hen2.png', './img/chicken/hen3.png',
    './img/background/sky.png', './img/background/clouds.png',
    './img/background/ground1.png', './img/background/ground2.png', './img/background/ground3.png',
    './img/bottle/bottle1.png', './img/bottle/bottle1.png',
    'img/chicken_big.png', 'img/chicken_dead.png'];

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