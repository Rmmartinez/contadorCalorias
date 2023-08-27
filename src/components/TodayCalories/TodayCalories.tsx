import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";


export type TodayCaloriesProps = {
    total: number | string; 
    consumed: number | string; 
    remaining: number | string;
    percentage: number;
}

const TodayCalories: FC<TodayCaloriesProps> = ({
    total = 2000, 
    consumed = 0, 
    remaining = 0,
    percentage = 0
}) => {
    return(
        <View style={styles.container}>
            <View style={styles.caloriesContainer}>
                <View style={styles.contentLeft}>
                    <CircularProgress 
                        value={percentage}
                        valueSuffix="%"
                    />
                </View>
                <View style={styles.contentRight}>
                    <Text style={styles.text}>Hoy</Text>
                    <View style={styles.caloriesContainer}>
                        <View style={styles.contentLeft}>
                            <Text style={styles.subtext}>Total</Text>
                            <Text style={styles.subtext}>Consumido</Text>
                            <Text style={styles.subtext}>Restante</Text>
                        </View>
                        <View style={styles.contentRightDatos}>
                            <Text style={styles.subtext}>{total}</Text>
                            <Text style={styles.subtext}>{consumed}</Text>
                            <Text style={styles.subtext}>{remaining}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

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
        alignItems: 'flex-start',
        justifyContent: 'center',

    }, 
    text: {
        color:"#000",
        fontWeight:'500',
        fontSize:20,
    },
    subtext: {
        color:"#808080",
        fontWeight:'500',
        fontSize:16,
    },
    contentRightDatos: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});

export default TodayCalories;