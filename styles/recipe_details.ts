import {StyleSheet, TextStyle, ViewStyle} from "react-native";

//Style interface
interface Style {
    view: ViewStyle,
    recipeScrollView: ViewStyle,
    titleView: ViewStyle,
    titleText: TextStyle,
    detailsView: ViewStyle,
    detailsHeaderText: TextStyle,
    detailsText: TextStyle,
}

//Exporting style
export default StyleSheet.create<Style>({
    view: {
        flex: 1,
        width: '100%',
        paddingBottom: 20, // 'magic-padding', cuz scrollView cuts of text without it :)
        backgroundColor: '#ffffff',
    },
    recipeScrollView: {},
    titleView: {},
    titleText: {
        fontSize: 28,
        padding: 10,
        textAlign: 'center',
        color: '#3b5998',
        fontWeight: '800'
    },
    detailsView: {
        marginBottom: 8,
        paddingLeft: 8,
        paddingRight: 8
    },
    detailsHeaderText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#3b5998',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#3b5998'

    },
    detailsText: {
        fontSize: 20,
        color: '#3b5998',
        textAlign: 'justify'
    },
})