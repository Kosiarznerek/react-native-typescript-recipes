import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

//Style interface
interface Style {
    containerView: ViewStyle;
    headerView: ViewStyle;
    headerText: TextStyle;
    preparationView: ViewStyle;
    preparationText: TextStyle;
}

//Styles to export
export default StyleSheet.create<Style>({
    containerView: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginBottom: 6,
        backgroundColor: '#ffffff',
        height: 200
    },
    headerView: {
        height: 50,
        backgroundColor: '#ffffff',
        padding: 10
    },
    headerText: {
        fontSize: 24,
        color: '#3b5998',
        fontWeight: '700'
    },
    preparationView: {
        height: 150,
        backgroundColor: '#ffffff',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10
    },
    preparationText: {
        color: '#3b5998',
        textAlign: 'justify'
    }
})