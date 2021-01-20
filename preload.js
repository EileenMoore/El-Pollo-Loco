let imagePaths = ['img/charakter_1.png', 'img/charakter_2.png', 'img/charakter_3.png', 'img/charakter_4.png',
    'img/charakter_left_1.png', 'img/charakter_left_2.png', 'img/charakter_left_3.png', 'img/charakter_left_4.png',
    'img/chicken1.png', 'img/chicken2.png',
    'img/cloud1.png', 'img/cloud2.png',
    'img/bg_elem_1.png', 'img/bg_elem_2.png',
    'img/sand.png', 'img/tabasco.png',
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
        return img.src.endsWith(src_path.substring(src_path, src_path.length));
    });

    // Create new image if not found in cache

    if (!base_image) {
        base_image = new Image();
        base_image.src = src_path;
    }

    return base_image;

}