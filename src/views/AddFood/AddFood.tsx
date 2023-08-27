import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Input} from '@rneui/themed';
import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem/MealItem";

const AddFood = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const {onGetFood} = useFoodStorage();
    const [allFoods, setAllFoods] = useState<Meal[]>([]);
    const [search, setSearch] = useState<string>('');

    const loadFoods = async() => {
        try{
            const foodsResponse = await onGetFood();
            setAllFoods(foodsResponse);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        loadFoods().catch(null);
    }, [])

    const handleModalClose = async(shouldUpdate?: boolean) =>{
        
        if(shouldUpdate){
            Alert.alert("Comida guardada exitosamente");
            loadFoods();
        }
        setVisible(false);
    }

    const handleSearchPress = async() => {
        try{
            const result = await onGetFood();
            setAllFoods(result.filter((item:Meal) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
        }catch(error){
            console.error(error);
            setAllFoods([]);
        }
    }

    return (
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.foodContainer}>
                <View style={styles.containerLeft}>
                    <Text style={styles.text}>Agregar Comida</Text>
                </View>
                <View style={styles.containerRight}>
                <Button title={"+"} titleStyle={{fontSize: 20, color: "#fff", marginHorizontal:6,fontWeight:'bold'}}radius="lg" color="#4ecb71" onPress={()=>setVisible(true)}/>
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder="manzana, arroz..." value={search} onChangeText={(text:string) => setSearch(text)}/>
                </View>
                <Button title="Buscar" onPress={handleSearchPress} color="#ade8af" titleStyle={styles.searchBtn} radius="lg"/>
            </View>
            <ScrollView style={styles.content}>
                {allFoods?.map(meal => <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd/>)}
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handleModalClose}></AddFoodModal>
            
        </View>
        
    )
}

export default AddFood;

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        flex:1,
        padding:12,
    },
    foodContainer: {
        alignItems:'center',
        marginVertical:24,
        flexDirection:'row'
    },
    containerLeft: {
        flex: 1,
        justifyContent: 'center'
    },
    containerRight: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',

    }, 
    text: {
        color:"#000", 
        fontSize:20,

    },
    searchContainer: {
        flexDirection:'row',
    },
    inputContainer: {
        flex: 1,
        marginLeft: -12
    },
    searchBtn: {
        color: "#000",
        fontSize: 14
    },
    content: {

    }
})