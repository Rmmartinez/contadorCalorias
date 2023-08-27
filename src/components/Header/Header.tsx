import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button} from '@rneui/themed';

const staticInfo = {
    name: 'Magui',
    uri: 'https://avatars.githubusercontent.com/u/10101138?v=4'
}

const Header = () => {

    const {canGoBack, goBack} = useNavigation();

    return (
        <View style={styles.container}>
            {canGoBack() ? (    
                <View style={styles.arrowContainer}>
                    <Button title={"←"} titleStyle={{fontSize: 30, color:"#000",fontWeight:"bold"}} size="sm" type="clear" onPress={()=>goBack()}/>    
                </View>
            ):undefined}
            <View style={styles.contentLeft}>
                <Text style={styles.title}>{`Hola ${staticInfo.name}`}</Text>
                <Text style={styles.text}>¡Bienvenida a tu objetivo! </Text>  
            </View>
            <View style={styles.contentRight}>
                <Image source={{uri: staticInfo.uri}} style={styles.image}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    contentLeft: {
        flex: 1,
        justifyContent: 'center'
    },
    contentRight: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',

    }, 
    title: {
        color:"#000",
        fontWeight:'bold',
        fontSize:18,

    },
    text: {
        fontSize:16,
        color: "#808080"
    }, 
    image: {
        width:50,
        height:50,
        borderRadius:24
    },
    arrowContainer: {
        marginLeft: -15
    }

})

export default Header;

