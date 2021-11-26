import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Constants from 'expo-constants';

const HomeScreen = ({navigation}) => {
    const [Tempactual, setTempactual]=useState([""]);
    const [Tempmax, setTempmax]=useState([""]); 
    const [Tempmin, setTempmin]=useState([""]);
    const [Ciudad, setCiudad]=useState([""]);   
    const [consultado, setConsultado]= useState(false);
    const [Lati, setLati]= useState("");
    const [Longi, setLongi]= useState("");
    
    const buscar = (ciudad) => {
        //console.log(peli)
        const apikey ="65c74cf9ff4cbe5bf41e2a609aa3b767";
        const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric`;
        
        fetch(api_url)
          .then(data => {
            return data.json();
          })
          .then(resultado => {
            console.log(resultado);
            if(resultado.cod == 404 || resultado.cod == 400)
            {
                setConsultado(false);
            }
            else
            {
                setTempactual(resultado.main.temp);
                setTempmax(resultado.main.temp_max);
                setTempmin(resultado.main.temp_min);
                setConsultado(true);
                setLati(resultado.coord.lat);
                setLongi(resultado.coord.lon);
            }
          });
    };
     


    return (
        <View style={styles.container}>
            <SearchBar
                round
                containerStyle={{
                    backgroundColor:'transparent',
                    borderTopWidth:0,
                    borderBottomWidth:0,
                }}
                inputStyle={{backgroundColor:'white'}}
                onChangeText={(texto)=>{
                    setCiudad(texto);
                    buscar(texto);
                }}
                onClear={()=>{
                    setCiudad("");
                    setConsultado(false);
                }}
                value={Ciudad}
                placeholder="Escribe aqui..."
            />

            <View style={{margin:10, fontSize:20, alignItems:'center', justifyContent:'center'}}>
                {
                    consultado 
                    ?
                    <Text style={styles.texto}>
                        
                        {Ciudad}{"\n"}
                        Temperatura actual: {Tempactual}°C{"\n"}
                        Temperatura maxima: {Tempmax}°C{"\n"}
                        Temperatura minima: {Tempmin}°C{"\n"}
                        <Button
                        title="Pronostico semanal"
                        onPress={() => navigation.navigate('DetailScreen',{Lati,Longi,Ciudad})}
                        />
                    </Text>
                    :
                    <Text style={styles.texto}>
                        Busca una ciudad
                    </Text>
                }

            </View>
        </View>);
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      justifyContent: 'flex-start',
      backgroundColor: '#fbfbfb',
    },
    images:{
      width: 100, 
      height: 150,
      margin:5,
    },
    texto:{
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    }
});
  