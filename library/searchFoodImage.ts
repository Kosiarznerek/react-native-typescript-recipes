import {KEY} from '../PIXABAY_API_KEY';

//Interface of image data
interface ImageData {
    id: number;
    pageURL: string;
    type: "all" | "photo" | "illustration" | "vector";
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    fullHDURL: string;
    imageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    favorites: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

/**
 * Search for food images
 * @param {string} searchPhrase Search term
 * @return {Promise<ImageData|null>}
 */
const searchFoodImage = async (searchPhrase: string): Promise<ImageData | null> => {
    //Coding search phrase
    searchPhrase = encodeURI(searchPhrase);

    //Getting images
    const params = `?key=${KEY}&q=${searchPhrase}&image_type=photo&orientation=horizontal&category=food&safesearch=true`;
    const result = await fetch(`https://pixabay.com/api/${params}`)
        .then(response => response.json());

    //Getting first image
    const imageData: ImageData | undefined = result['hits'][0];

    //No image
    if (imageData === undefined) return null;

    //Returning image data
    return imageData;
};

export default searchFoodImage;