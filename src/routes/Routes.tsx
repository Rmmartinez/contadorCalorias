import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { RootStackParams } from "../types";
import Home from '../views/Home/Home'
import AddFood from "../views/AddFood/AddFood";


const Stack = createNativeStackNavigator<RootStackParams>();

const routeScreenDefaultOptions = {
    headerShown: false
}

const Routes = () => {    
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} options={routeScreenDefaultOptions}/>
                <Stack.Screen name='AddFood' component={AddFood} options={routeScreenDefaultOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes