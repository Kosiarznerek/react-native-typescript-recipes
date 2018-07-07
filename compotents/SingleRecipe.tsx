import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

const SideMenu = require('react-native-side-menu').default;
import RecipeData from "../library/RecipeData";
import cropText from './../library/cropText';
import styles from '../styles/single_recipe';
import SingleRecipeMenu from "./SingleRecipeMenu";

const {width} = Dimensions.get('window');

//Properties interface
interface IProps {
    recipeData: RecipeData,
    key: number,
    onAction: (action: 'DETAILS' | 'EDIT' | 'DELETE') => any
}

//State interface
interface IState {

}

//Component class
export default class SingleRecipe extends React.Component<IProps, IState> {

    //Data
    private readonly menuOptions: { key: number, name: string }[];

    /**
     * Constructor
     * @param {IProps} props
     */
    constructor(props: IProps) {
        super(props);

        //Recipe options
        this.menuOptions = [
            {key: 0, name: 'Details'},
            {key: 1, name: 'Edit'},
            {key: 2, name: 'Delete'}
        ];
    }

    /**
     * Executes when user pressed option from menu
     * @param {{key: number, name: string}} event
     */
    private onMenuPressHandler = (event: { key: number, name: string }): void => {
        if (event.key === 0) this.props.onAction('DETAILS');
        else if (event.key === 1) this.props.onAction('EDIT');
        else if (event.key === 2) this.props.onAction('DELETE');
    };

    /**
     * Render
     * @return {any}
     */
    render() {
        return (
            <View style={styles.containerView}>
                <SideMenu
                    menu={<SingleRecipeMenu
                        options={this.menuOptions}
                        onPress={this.onMenuPressHandler}
                    />}
                    menuPosition={'right'}
                    openMenuOffset={width / 3}
                >
                    /* Recipe title */
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>{this.props.recipeData.title}</Text>
                    </View>

                    /* Recipe image (if available) */
                    {
                        this.props.recipeData.image.url !== null
                            ? <Image
                                source={{uri: this.props.recipeData.image.url}}
                                style={{width: width, height: 150}}
                            />
                            : null
                    }

                    /* Recipe preparation text (if image not available) */
                    {
                        this.props.recipeData.image.url === null
                            ? <View style={styles.preparationView}>
                                <Text style={styles.preparationText}>{
                                    cropText(this.props.recipeData.preparation, 300)
                                }</Text>
                            </View>
                            : null
                    }
                </SideMenu>
            </View>
        )
    }
}