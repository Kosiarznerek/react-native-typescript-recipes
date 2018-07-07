import RecipeData from "./RecipeData";
import {AsyncStorage} from 'react-native'

//AsyncStorage key
const KEY: string = 'recipes';

/**
 * Gets all recipes from AsyncStorage
 * @return {Promise<RecipeData[]>}
 */
export const GetAllRecipes = async (): Promise<RecipeData[]> => {
    //Getting recipes from storage
    const jsonData: null | string = await AsyncStorage.getItem(KEY);
    if (jsonData === null) return [];

    //Parsing data and mapping to objects
    const data: RecipeData[] = JSON.parse(jsonData).map((v: RecipeData) => new RecipeData(v.title, v.preparation, v.ingredients));

    //Loading images for recipe
    await Promise.all(data.map(rcp => rcp.updateImageURL()));

    //Returning data
    return data;
};

/**
 * Replaces all current data with new one
 * @param {RecipeData[]} data
 * @return {Promise<void>}
 */
export const UpdateAllRecipes = async (data: RecipeData[]): Promise<void> => {
    return await AsyncStorage.setItem(KEY, JSON.stringify(data));
};