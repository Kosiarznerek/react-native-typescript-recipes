import * as React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import styles from './../styles/recipe_details'
import RecipeData from "../library/RecipeData";
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

//Properties interface
interface IProps {
    data: RecipeData;
    onScrollViewTouchEnd?: Function;
    onScrollViewTouchCancel?: Function;
    onScrollViewTouchStart?: Function
}

//State interface
interface IState {

}

//RecipeDetails class
export default class RecipeDetails extends React.Component<IProps, IState> {

    render() {
        return (
            <View style={styles.view}>

                /* Recipe data */
                <ScrollView
                    contentContainerStyle={styles.recipeScrollView}
                    onTouchEnd={() => this.props.onScrollViewTouchEnd ? this.props.onScrollViewTouchEnd() : null}
                    onTouchCancel={() => this.props.onScrollViewTouchCancel ? this.props.onScrollViewTouchCancel() : null}
                    onTouchStart={() => this.props.onScrollViewTouchStart ? this.props.onScrollViewTouchStart() : null}>
                    /* Recipe title */
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{this.props.data.title}</Text>
                    </View>

                    /* Recipe image (if available) */
                    {
                        this.props.data.image.url !== null
                            ? <Image source={{uri: this.props.data.image.url}} style={{width, height: 150}}/>
                            : null
                    }

                    /* Recipe ingredients */
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsHeaderText}>Ingredients</Text>
                        {
                            this.props.data.ingredients.map((ingr: string, index) =>
                                // 'u2022' commonly know as 'bullet'
                                <Text style={styles.detailsText} key={index}>{'\u2022 '}{ingr}</Text>
                            )
                        }
                    </View>

                    /* Recipe preparation */
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsHeaderText}>How to prepare?</Text>
                        <Text style={styles.detailsText}>{this.props.data.preparation}</Text>
                    </View>
                </ScrollView>

            </View>
        )
    }

}