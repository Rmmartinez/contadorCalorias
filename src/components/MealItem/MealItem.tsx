import React, {FC} from "react";
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { Meal } from "../../types";
import { Button } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

type MealItemProps = Meal & {
    isAbleToAdd?: boolean;
    onCompleteAddRemove?: () => void; 
    itemPosition?:number;
}

const MealItem: FC<MealItemProps> = ({calories,portion,name, isAbleToAdd, itemPosition, onCompleteAddRemove}) => {

    const {onSaveTodayFood, onDeleteTodayFood} = useFoodStorage();

    const handleIconPress = async() => {
        try{
            if(isAbleToAdd){
                await onSaveTodayFood({calories,portion,name});
                Alert.alert("Comida agregada")
            }else{
                await onDeleteTodayFood(itemPosition ?? -1);
                Alert.alert("Comida eliminada")
            }
            onCompleteAddRemove?.();
        }catch (error){
            console.log(error);
            Alert.alert("No se agregó la comida")
        } 
    }

    return(
        <View style={styles.container}>
            <View style={styles.contentLeft}>
                <Text style={styles.name}>{name}</Text>  
                <Text style={styles.portion}>{portion}</Text>  
            </View>
            <View style={styles.contentRight}>
                <Button title={isAbleToAdd ? "+" : "×"} titleStyle={{fontSize: 20, color: "#000", marginHorizontal:2, marginVertical: -6,fontWeight:'bold'}} size="sm" type="outline" 
                                    buttonStyle={{borderColor:"#000", borderRadius: 20, borderWidth: 1.5, marginRight:15}}
                                    onPress={handleIconPress}
                />
                <Text style={styles.calories}>{calories} cal</Text>  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ade8af',
        borderRadius:12,
        padding: 12,
        marginBottom:12,
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
    name: {
        color:"#000",
        fontWeight:'500',
        fontSize:18,

    },
    portion: {
        fontSize:13,
        color: "#808080",
        fontWeight:'500',
    }, 
    calories: {
        fontSize:18,
        color: "#000"
    },

})

export default MealItem;