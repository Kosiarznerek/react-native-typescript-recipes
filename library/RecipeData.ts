import searchFoodImage from "./searchFoodImage";

export default class RecipeData {

    public title: string;
    public preparation: string;
    public ingredients: string[];
    public readonly image: {
        url: string | null,
        width: number | null,
        height: number | null
    };

    /**
     * Creates RecipeData object which handle recipe information
     * @param {string} title Title of recipe
     * @param {string} preparation How to prepare
     * @param {string[]} ingredients List of ingredients
     */
    constructor(title: string, preparation: string, ingredients: string[]) {
        this.title = title;
        this.preparation = preparation;
        this.ingredients = ingredients;
        this.image = {
            url: null,
            width: null,
            height: null
        };
    }

    /**
     * Updates image for recipe
     * @return {Promise<void>}
     */
    public updateImageURL(): Promise<void> {
        return searchFoodImage(this.title).then(response => {
            if (response === null) {
                this.image.url = response;
                this.image.width = response;
                this.image.height = response;
            } else {
                this.image.url = response.webformatURL;
                this.image.width = response.webformatWidth;
                this.image.height = response.webformatHeight;
            }
        })
    }

    /**
     * Clones recipe
     * @return {RecipeData}
     */
    public clone(): RecipeData {
        const rep = new RecipeData(this.title, this.preparation, this.ingredients);
        rep.image.url = this.image.url;
        rep.image.width = this.image.width;
        rep.image.height = this.image.height;
        return rep;
    }

    /**
     * Checks is recipe is valid
     * @return {true | string}
     */
    public isValid(): true | string {
        if (this.title.replace(/\s/g, '') === '') return 'Empty title';
        if (this.ingredients.length === 0) return 'Empty ingredient list.';
        if (this.preparation.replace(/\s/g, '') === '') return 'Empty preparation.';
        return true;
    }
}