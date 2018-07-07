import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

//Style interface
interface Style {
    viewContainer: ViewStyle,
    ingredientView: ViewStyle,
    sideView: ViewStyle,
    centerView: ViewStyle,
    indexText: TextStyle,
    inputText: TextStyle
}

//Exporting style
export default StyleSheet.create<Style>({
    viewContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'stretch'
    },
    ingredientView: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 4
    },
    sideView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 43,
        borderTopColor: '#ffffff',
        borderTopWidth: 2,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2,
    },
    centerView: {
        flex: 1,
    },
    indexText: {
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 22,
        color: '#ffffff',
    },
    inputText: {
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 22,
        backgroundColor: '#ffffff',
        color: '#3b5998',
        textAlign: 'center'
    }
})