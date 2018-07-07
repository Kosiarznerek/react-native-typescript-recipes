import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

//Style interface
interface Style {
    containerView: ViewStyle;
    headerView: ViewStyle;
    headerText: TextStyle;
    recipeList: ViewStyle;
    downArrowView: ViewStyle;
    buttonView: ViewStyle;
}

//Style to export
export default StyleSheet.create<Style>({
    containerView: {
        flex: 1,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    headerView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff'
    },
    headerText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 40
    },
    recipeList: {
        flex: 8,
        alignSelf: 'stretch'
    },
    downArrowView: {
        padding: 10,
        backgroundColor: '#3b5998',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        maxHeight: 100
    }
});