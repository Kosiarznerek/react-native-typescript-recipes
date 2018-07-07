import * as React from 'react';
import {View} from 'react-native';
import Button from './Button';
import styles from '../styles/single_recipe_menu'
import buttonStyle from '../styles/button_menu';

interface MenuOption {
    key: number,
    name: string,
}

//Properties interface
interface IProps {
    options?: MenuOption[] //Options to display
    onPress?: (s: MenuOption) => any //On menu option press callback
}

//State interface
interface IState {

}

//Component class
export default class SingleRecipeMenu extends React.Component<IProps, IState> {
    render() {
        return (
            <View style={styles.view}>
                {
                    typeof this.props.options !== 'undefined'
                        ? this.props.options.map((option, index) => <Button
                            key={index}
                            onPress={() => this.props.onPress ? this.props.onPress(option) : null}
                            text={option.name}
                            style={buttonStyle}
                        />)
                        : null
                }
            </View>
        )
    }
}