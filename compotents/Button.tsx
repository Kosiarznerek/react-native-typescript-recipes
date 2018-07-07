import * as React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";

//Properties interface
interface IProps {
    text?: string,
    onPress?: Function,
    style?: { touchableOpacity?: ViewStyle, text?: TextStyle } | { touchableOpacity?: ViewStyle, text?: TextStyle }[]
}

//State interface
interface IState {

}

//Button class
export default class Button extends React.Component<IProps, IState> {
    render() {
        return (
            <TouchableOpacity
                onPress={() => typeof this.props.onPress === 'function' ? this.props.onPress() : null}
                style={
                    !this.props.style
                        ? {}
                        : Array.isArray(this.props.style)
                        ? this.props.style.reduce((prv: ViewStyle[], curr) => {
                            if (curr.touchableOpacity) return prv.concat(curr.touchableOpacity);
                            else return prv
                        }, [])
                        : this.props.style.touchableOpacity
                }

            >
                <Text style={
                    !this.props.style
                        ? {}
                        : Array.isArray(this.props.style)
                        ? this.props.style.reduce((prv: ViewStyle[], curr) => {
                            if (curr.text) return prv.concat(curr.text);
                            else return prv
                        }, [])
                        : this.props.style.text
                }>{
                    typeof this.props.text === 'string'
                        ? this.props.text
                        : null
                }</Text>
            </TouchableOpacity>
        )
    }
}