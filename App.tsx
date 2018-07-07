import * as React from 'react';
import {ScrollView, Text, View, Alert, Image} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import RecipeData from "./library/RecipeData";
import {GetAllRecipes, UpdateAllRecipes} from './library/RecipeStorage';
import styles from './styles/app'
import buttonPrimaryStyle from './styles/button_primary';

//Only for debugging purposes
import loremHipsum from 'lorem-hipsum';

//Components
import SingleRecipe from './compotents/SingleRecipe'
import Button from "./compotents/Button";
import RecipeDetails from './compotents/RecipeDetails'
import RecipeEditor from "./compotents/RecipeEditor";

//Properties interface
interface IProps {

}

//State interface
interface IState {
    recipeData: RecipeData[],
    allowDragging: boolean, //Allows or not allows moving slide up panel
    currentRecipeIndex: number | null, //Currently index of recipe details / edit
    editorEnabled: boolean, //Editor is a component where you can edit or add new recipe
}

//App class
export default class App extends React.Component<IProps, IState> {

    /**
     * Constructor
     * @param {IProps} props
     */
    constructor(props: IProps) {
        super(props);

        //App state
        this.state = {
            recipeData: [],
            allowDragging: true,
            currentRecipeIndex: null, //null,
            editorEnabled: false,//  false
        };

        //Starting with random recipes only for debugging purposes
        const randRecipeData = ['French fries', 'Pizza', 'Lasagne', 'Spaghetti Carbonara', 'Hamburger', 'Burrito']
            .map(value => new RecipeData(
                value,
                loremHipsum({count: 1000, units: 'words'}),
                new Array(5)
                    .join('0')
                    .split('')
                    .map((v, index) => `ingredient ${index + 1}`)
            ));

        //Saving to storage only for debugging purposes
        UpdateAllRecipes(randRecipeData)
            .then(r => GetAllRecipes())
            .then(recipeData => this.setState({recipeData}))
    }

    /**
     * Executes when user executed some action on recipe
     * @param {{action: "DETAILS" | "EDIT" | "DELETE", index: number}} evt
     */
    onRecipeActionHandler = (evt: { action: 'DETAILS' | 'EDIT' | 'DELETE' | 'ADD', index: number | null }): void => {
        //Details
        if (evt.action === 'DETAILS' && evt.index !== null) this.setState({currentRecipeIndex: evt.index});

        //Deleting recipe
        if (evt.action === 'DELETE' && evt.index !== null) Alert.alert(
            'Confirm action',
            `Do you want to delete recipe: '${this.state.recipeData[evt.index].title}'`,
            [
                {text: 'Cancel'},
                {
                    text: 'Delete',
                    onPress: async () => {
                        await UpdateAllRecipes(this.state.recipeData.filter((v, i) => i !== evt.index));
                        this.setState(prevState => ({
                            recipeData: prevState.recipeData.filter((v, i) => i !== evt.index)
                        }));
                        Alert.alert('Success', 'Recipe deleted successfully', [{text: 'OK'}])
                    }
                }
            ]
        );

        //Add new
        if (evt.action === 'ADD') this.setState({editorEnabled: true});

        //Editing
        if (evt.action === 'EDIT' && evt.index !== null) this.setState({
            editorEnabled: true,
            currentRecipeIndex: evt.index
        })
    };

    /**
     * Render
     * @return {any}
     */
    render() {
        //Adding new or editing
        if (this.state.editorEnabled) return (
            <View style={styles.containerView}>
                <RecipeEditor
                    data={this.state.currentRecipeIndex !== null
                        ? this.state.recipeData[this.state.currentRecipeIndex]
                        : new RecipeData('', '', [])
                    }
                    onExit={() => this.setState({currentRecipeIndex: null, editorEnabled: false})}
                    onSave={rcp => this.setState(prevState => {
                        prevState.currentRecipeIndex === null
                            ? prevState.recipeData.push(rcp)
                            : prevState.recipeData[prevState.currentRecipeIndex] = rcp;
                        UpdateAllRecipes(prevState.recipeData).then();
                        return {
                            currentRecipeIndex: null,
                            editorEnabled: false,
                            recipeData: prevState.recipeData
                        }
                    })}
                />
            </View>
        );

        //Default view with recipes list
        else return (
            <View style={styles.containerView}>

                /* App header */
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Recipes</Text>
                </View>

                /* Recipe list */
                <View style={styles.recipeList}>
                    <ScrollView>
                        {
                            this.state.recipeData.map((rep: RecipeData, index: number) => <SingleRecipe
                                recipeData={rep}
                                key={index}
                                onAction={action => this.onRecipeActionHandler({action, index})}
                            />)
                        }
                    </ScrollView>
                </View>

                /* Add recipe button */
                <View style={styles.buttonView}>
                    <Button
                        text={'Add new'}
                        style={buttonPrimaryStyle}
                        onPress={() => this.onRecipeActionHandler({action: 'ADD', index: -1})}
                    />
                </View>

                /* Sliding up panel for recipe details */
                <SlidingUpPanel
                    visible={this.state.currentRecipeIndex !== null}
                    onRequestClose={() => this.setState({currentRecipeIndex: null})}
                    allowDragging={this.state.allowDragging}
                >
                    <View style={{flex: 1}}>
                        /* Down arrow */
                        <View style={styles.downArrowView}>
                            <Image source={require('./assets/down-arrow.png')}/>
                        </View>
                        /* Recipe details */
                        <RecipeDetails
                            data={this.state.recipeData[this.state.currentRecipeIndex || 0]}
                            onScrollViewTouchEnd={() => this.setState({allowDragging: true})}
                            onScrollViewTouchCancel={() => this.setState({allowDragging: true})}
                            onScrollViewTouchStart={() => this.setState({allowDragging: false})}
                        />
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}
