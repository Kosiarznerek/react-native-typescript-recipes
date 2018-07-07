import {StyleSheet, ViewStyle} from 'react-native';

//Style interface
interface Style {
    view: ViewStyle
}

//Exporting style
export default StyleSheet.create<Style>({
    view: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    }
})