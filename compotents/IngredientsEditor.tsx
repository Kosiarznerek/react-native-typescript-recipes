import * as React from 'react';
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from '../styles/ingredients_editor';
import Button from './Button';
import buttonPrimary from "../styles/button_primary";

//Properties interface
interface IProps {
    list: string[],
    onChange: (newList: string[]) => any
}

//State interface
interface IState {
    list: string[]
}

//Ingredients editor
export default class IngredientsEditor extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            list: props.list
        }
    }

    /**
     * Executes when user wants to add new ingredient to list
     */
    private onAddNextHandler = () => {
        if (this.state.list[this.state.list.length - 1] === '') return;
        this.setState(prevState => ({list: prevState.list.concat([''])}));
        this.props.onChange(this.state.list);
    };

    /**
     * Executes when user deletes ingredient
     * @param {number} index
     */
    private onDeleteHandler = (index: number) => {
        this.setState(prevState => {
            prevState.list.splice(index, 1);
            return {list: prevState.list}
        });
        this.props.onChange(this.state.list);
    };

    /**
     * Executes when user edits ingredient
     * @param {number} index
     * @param {string} text
     */
    private onEditHandler = (index: number, text: string) => {
        this.setState(prevState => {
            prevState.list[index] = text;
            return {list: prevState.list}
        });
        this.props.onChange(this.state.list);
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                /* Rendering list */
                <FlatList
                    data={this.state.list.map(((val, key) => ({key: key.toString(), val})))}
                    renderItem={({item, index}) =>
                        <View style={styles.ingredientView}>
                            /* Number */
                            <View style={styles.sideView}>
                                <Text style={styles.indexText}>{index + 1}</Text>
                            </View>

                            /* Ingredient name */
                            <View style={styles.centerView}>
                                <TextInput
                                    value={item.val}
                                    style={styles.inputText}
                                    maxLength={30}
                                    placeholder={item.val === '' ? 'New ingredient' : undefined}
                                    onChangeText={text => this.onEditHandler(index, text)}
                                />
                            </View>

                            /* Trash icon */
                            <TouchableOpacity style={styles.sideView} onPress={() => this.onDeleteHandler(index)}>
                                <Image source={require('./../assets/garbage.png')}/>
                            </TouchableOpacity>
                        </View>
                    }
                />

                /* Add next ingredient button */
                <Button
                    text={'Add next'}
                    style={[buttonPrimary, {touchableOpacity: {minHeight: 43, maxHeight: 43,}}]}
                    onPress={this.onAddNextHandler}
                />
            </View>
        )
    }
}