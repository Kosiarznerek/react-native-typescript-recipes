import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

//Style interface
interface Style {
    paneView: ViewStyle,
    paneHeaderText: TextStyle,
    textInput: TextStyle,
    buttonsView: ViewStyle
}

//Exporting style
export default StyleSheet.create<Style>({
    paneView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5998', //'#3b5998',
        borderRightColor: '#ffffff',
        borderRightWidth: 2,
        borderLeftColor: '#ffffff',
        borderLeftWidth: 2,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2,
    },
    paneHeaderText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        padding: 8
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 22,
        backgroundColor: '#ffffff',
        color: '#3b5998',
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsView: {
        flexDirection: 'row',
    }
})