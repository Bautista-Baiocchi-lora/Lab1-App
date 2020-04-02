import { View } from "react-native";
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import {Validator} from "class-validator";
import RNPickerSelect from 'react-native-picker-select';

const validator = new Validator();

function userTypeText(){
    return <Text> Seleccione el tipo de usuario </Text>
}

function NameInput({navigation}){

    const [first_name, setFirstName] = useState('')
    const [firstNameMessage, setFirstNameMessage] = useState('')
    const [last_name, setLastName] = useState('')
    const [lastNameMessage, setLastNameMessage] = useState('')
    const [user_type, setUserType] = useState()

    function next(){
        if(validator.isEmpty(first_name)){
            setFirstNameMessage('Nombre Vacio')
        }else if(validator.isEmpty(last_name)){
            setLastNameMessage('Apellido Vacio')
        } else if (!validator.isNumber(user_type)){
        }else{
            navigation.navigate('dni', {payload:{
                first_name,
                last_name,
                user_type
            }})
        }
    }

    return (

        <View>
            <Input 
            placeholder=' Nombre Completo'
            onChangeText={setFirstName}
            errorMessage={firstNameMessage}
            />
            <Input 
            placeholder=' Apellido'
            onChangeText={setLastName}
            errorMessage={lastNameMessage}
            />
            <RNPickerSelect 
            useNativeAndroidPickerStyle = {true}
            onValueChange = {setUserType}
            items={[
                { label: 'Propietario', value: 1},
                { label: 'Trabajador', value: 2 },
            ]}
            placeholder= {
                {label: "Ingrese el tipo de usuario"}
            }
        />
            <Button 
            type='outline'
            icon={
                <Icon
                name='arrow-right'
                size={24}
                color='black'
            />
            }
            onPress={next}
            />
        </View>
    );
}

export default NameInput;