import * as React from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';
import SwipeRecognizer, {swipeDirections} from './SwipeRecognizer';
import styles from '../styles/recipe_editor'

import Button from './Button'
import buttonPrimary from './../styles/button_primary';
import RecipeData from "../library/RecipeData";
import IngredientsEditor from "./IngredientsEditor";
import RecipeDetails from "./RecipeDetails";

//Properties interface
interface IProps {
    data: RecipeData,
    onExit: Function,
    onSave: (r: RecipeData) => any
}

//State interface
interface IState {
    activePane: number;
    data: RecipeData
}

//RecipeEditor class
export default class RecipeEditor extends React.Component<IProps, IState> {

    //Object properties
    private readonly panes: any[];
    private panesWrapper: any;

    /**
     * Constructor
     * @param {IProps} props
     */
    constructor(props: IProps) {
        super(props);

        //Panes data
        this.panes = [];
        this.panesWrapper = null;

        //State
        this.state = {
            activePane: 1,
            data: props.data.clone()
        }
    }

    /**
     * Executes when component is ready
     */
    componentDidMount() {
        this.panes[0].warpCenter();
        this.panes[1].warpRight();
        this.panes[2].warpRight();
        this.panes[3].warpRight();
        this.panesWrapper.childPanes = this.panes;
        this.setState({activePane: 1});
    }

    /**
     * Executes when user did a swipe gesture
     * @param {swipeDirections} gestureName
     */
    private onSwipe(gestureName: swipeDirections): void {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                this.panesWrapper.slideAllLeft();
                this.state.activePane < this.panes.length
                    ? this.setState(p => ({activePane: p.activePane + 1}))
                    : null;
                break;
            case SWIPE_RIGHT:
                this.panesWrapper.slideAllRight();
                this.state.activePane > 1
                    ? this.setState(p => ({activePane: p.activePane - 1}))
                    : null;
                break;
            default:
                break;
        }
    }

    /**
     * Renders buttons
     * @return {View}
     */
    private renderButtonsView(): Element {
        return (
            <View style={styles.buttonsView}>
                <Button
                    text={'Cancel'}
                    style={[buttonPrimary, {
                        touchableOpacity: {
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            borderRightWidth: 1
                        }
                    }]}
                    onPress={this.props.onExit}
                />
                <Button
                    text={this.state.activePane < this.panes.length ? 'Next' : 'Save'}
                    style={[buttonPrimary, {touchableOpacity: {borderTopWidth: 0, borderBottomWidth: 0}}]}
                    onPress={() => this.state.activePane < this.panes.length
                        ? this.panesWrapper.slideAllLeft() || this.setState(p => ({activePane: p.activePane + 1}))
                        : this.onSaveRecipeHandler()
                    }
                />
            </View>
        )
    }

    /**
     * Executes when user wants to save recipe
     */
    private onSaveRecipeHandler = () => {
        const err: string | true = this.state.data.isValid();
        if (typeof err === 'string') Alert.alert('Unable to save', err, [{text: 'OK'}], {cancelable: false});
        else this.props.onSave(this.state.data);
    };

    /**
     * Rendering component
     * @return {any}
     */
    render() {
        return (
            <SwipeRecognizer
                onSwipe={direction => this.onSwipe(direction)}
                config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}>

                /* To keep width of SlidingPaneWrapper 100% */
                <View style={{width: '100%', flexDirection: 'row'}}><View style={{flex: 1}}/></View>

                /* Panels */
                <SlidingPaneWrapper style={{}} ref={(ref: any) => this.panesWrapper = ref}>

                    /* Title pane */
                    <SlidingPane style={[]} ref={(ref: any) => this.panes[0] = ref}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
                            <ScrollView scrollEnabled={false} contentContainerStyle={styles.paneView}>
                                <View><Text style={styles.paneHeaderText}>Title</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    maxLength={35}
                                    value={this.state.data.title}
                                    onChangeText={text => {
                                        this.setState(prevState => {
                                            prevState.data.title = text;
                                            return {data: prevState.data};
                                        });
                                        this.state.data.updateImageURL().then()
                                    }}
                                />
                                {this.renderButtonsView()}
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SlidingPane>

                    /* Ingredients pane */
                    <SlidingPane style={[styles.paneView]} ref={(ref: any) => this.panes[1] = ref}>
                        <Text style={styles.paneHeaderText}>Ingredients</Text>
                        <IngredientsEditor
                            list={this.props.data.ingredients}
                            onChange={list => this.setState(prevState => {
                                prevState.data.ingredients = list;
                                return {data: prevState.data};
                            })}
                        />
                        {this.renderButtonsView()}
                    </SlidingPane>

                    /* Preparation pane */
                    <SlidingPane style={[]} ref={(ref: any) => this.panes[2] = ref}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'} keyboardVerticalOffset={20}>
                            <ScrollView scrollEnabled={false} contentContainerStyle={styles.paneView}>
                                <Text style={styles.paneHeaderText}>Preparation</Text>
                                <TextInput
                                    multiline={true}
                                    style={[styles.textInput, {flex: 1, textAlign: 'justify'}]}
                                    value={this.state.data.preparation}
                                    onChangeText={text => this.setState(prevState => {
                                        prevState.data.preparation = text;
                                        return {data: prevState.data}
                                    })}
                                />
                                {this.renderButtonsView()}
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SlidingPane>

                    /* Sum up pane */
                    <SlidingPane style={[styles.paneView]} ref={(ref: any) => this.panes[3] = ref}>
                        <RecipeDetails data={this.state.data}/>
                        {this.renderButtonsView()}
                    </SlidingPane>
                </SlidingPaneWrapper>
            </SwipeRecognizer>
        )
    }
}