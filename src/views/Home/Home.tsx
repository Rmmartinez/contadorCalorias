import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../../components/Header/Header";
import { Button} from '@rneui/themed';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Meal, RootStackParams } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import TodayCalories, {TodayCaloriesProps} from "../../components/TodayCalories/TodayCalories";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import TodayMeals from "../../components/TodayMeals/TodayMeals";

const totalCaloriesPerDay = 2000;

const Home = () => {

    const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>();
    const {onGetTodayFood} = useFoodStorage();
    const [todayFood, setTodayFood] = useState<Meal[]>([]);
    const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
        consumed: 0,
        percentage: 0,
        remaining: 0,
        total: totalCaloriesPerDay
    });


    const calculateTodayStatistics = (meals: Meal[]) => {
        try{
            const caloriesConsumed = meals.reduce(
                (acum, curr) => acum + Number(curr.calories)
                , 0);
            const remainingCalories = totalCaloriesPerDay-caloriesConsumed;
            //const percentage = (remainingCalories / totalCaloriesPerDay) * 100;
            const percentage = ((totalCaloriesPerDay-remainingCalories)/totalCaloriesPerDay) * 100;

            setTodayStatistics({
                consumed: caloriesConsumed,
                percentage,
                remaining: remainingCalories,
                total: totalCaloriesPerDay
            })
        }catch(error){
            console.error(error);
        }
    }


    const loadTodayFood = useCallback(async() => {
        try{
            const todayFoodResponse = (await onGetTodayFood()) as Meal[];
            calculateTodayStatistics(todayFoodResponse);
            setTodayFood(todayFoodResponse);
        }catch(error){
            setTodayFood([]);
            console.log(error);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        loadTodayFood().catch(null);
    },[loadTodayFood]));

    const handleAddCaloriesPress = () => {
        navigate('AddFood');
    }

    console.log(todayFood);

    return (
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.caloriesContainer}>
                <View style={styles.contentLeft}>
                    <Text style={styles.text}>Calorías</Text>
                </View>
                <View style={styles.contentRight}>
                <Button title={"+"} titleStyle={{fontSize: 20, color: "#fff", marginHorizontal:6,fontWeight:'bold'}}radius="lg" color="#4ecb71" onPress={handleAddCaloriesPress}/>
                </View>
            </View>
            <TodayCalories {...todayStatistics}/>
            <TodayMeals foods = {todayFood} onCompleteAddRemove={() => loadTodayFood()}/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        padding:12,
        backgroundColor: "#fff",
        flex: 1
    },
    caloriesContainer: {
        alignItems:'center',
        marginVertical:24,
        flexDirection:'row'
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
    text: {
        color:"#000",
        fontWeight:'bold',
        fontSize:20,

    },
    button: {

    }
})