import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

//Style interface
interface Style {
    touchableOpacity: ViewStyle,
    text: TextStyle
}

//Exporting style
export default StyleSheet.create<Style>({
    touchableOpacity: {
        alignSelf: 'stretch',
        padding: 5,
        backgroundColor: '#ffffff',
        borderTopColor: '#3b5998',
        borderTopWidth: 1,
        borderBottomColor: '#3b5998',
        borderBottomWidth: 1,
        marginTop: 1,
        marginBottom: 1
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: '600',
        color: '#3b5998'
    }
})