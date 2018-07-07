import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

//Style interface
interface Style {
    touchableOpacity: ViewStyle,
    text: TextStyle
}

//Exporting style
export default StyleSheet.create<Style>({
    touchableOpacity: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#ffffff',
        borderTopColor: '#3b5998',
        borderTopWidth: 1,
        borderBottomColor: '#3b5998',
        borderBottomWidth: 1,
        borderLeftColor: '#3b5998',
        borderLeftWidth: 0,
        borderRightColor: '#3b5998',
        borderRightWidth: 0,
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: '600',
        color: '#3b5998'
    }
})