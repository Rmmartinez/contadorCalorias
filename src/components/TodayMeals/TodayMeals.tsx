import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../types";
import MealItem from "../MealItem/MealItem";


type todayMEalsProps = {
    foods: Meal[];
    onCompleteAddRemove?: () => void;
}

const TodayMeals: FC<todayMEalsProps> = ({foods, onCompleteAddRemove}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Comidas</Text>
            <ScrollView style = {styles.content}>
                {foods?.map((meal:Meal, index) => (
                <MealItem 
                key={`today-meal-item-${meal.name}-${index}`}{...meal} 
                onCompleteAddRemove={onCompleteAddRemove}
                itemPosition={index}
                />))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:-250,
        flex: 1,
    },
    text: {
        fontSize:16,
        color: "#000"
    },
    content: {
        marginVertical:16,
    }
});

export default TodayMeals;