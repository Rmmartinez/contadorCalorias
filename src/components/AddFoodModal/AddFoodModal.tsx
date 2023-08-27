import { Button, Input } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text, useAnimatedValue } from "react-native";
import useFoodStorage from "../../hooks/useFoodStorage";

type AddFoodModalsProps = {
    onClose: (shouldUpdate?: boolean) => void; 
    visible: boolean;
}

const AddFoodModal: FC<AddFoodModalsProps> = ({onClose,visible}) => {
    
    const [calories, setCalories] = useState<string>(''); 
    const [name, setName] = useState<string>('');
    const [portion, setPortion] = useState<string>(''); 
    const {onSaveFood} = useFoodStorage();

    useEffect(() => {
        setCalories('');
        setName('');
        setPortion('');
    }, [visible])

    const handleAddPress = async() => {
        try{    
            await onSaveFood({
                calories,
                name,
                portion
            });

            onClose(true);
        }catch (error){
            console.error(error);
        }
        
        
    }

    return(
        <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.btnClose}>
                        <Button title={"×"} titleStyle={{fontWeight:"bold", fontSize:28,color:"#000"}} onPress={() => onClose()} type="clear"/>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={calories} onChangeText={(text:string) => setCalories(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>CAL</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={name} onChangeText={(text:string) => setName(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Nombre</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={portion} onChangeText={(text:string) => setPortion(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Porción</Text>
                        </View>
                    </View>
                    <View style={styles.btnClose}>
                        <Button 
                            title={"+ Agregar"} 
                            titleStyle={{fontSize:16,color:"#000"}} 
                            radius="lg" 
                            color="#ade8af" 
                            disabled={calories === '' || name === '' || portion === ''}
                            onPress={handleAddPress}
                        />
                    </View>
                    
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    content: {
        width: "75%",
        backgroundColor:"#fff",
        padding:18,
        borderRadius:24,
        shadowColor:"#000",
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    btnClose: {
        alignItems: 'flex-end'
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
    },
    legendContainer: {
        flex:1
    },
    legend: {
        fontWeight: "500",
        color: "#000"
    }
})

export default AddFoodModal;