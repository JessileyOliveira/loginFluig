/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View, Button} from 'react-native';
import axios from 'axios';
const parseString = require('react-native-xml2js').parseString;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  loga() {
    let xmls=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.foundation.ecm.technology.totvs.com/">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:getColleagueByLogin>
          <username>`+this.state.login+`</username>
          <password>`+this.state.senha+`</password>
       </ws:getColleagueByLogin>
    </soapenv:Body>
 </soapenv:Envelope>`;

  axios.post('http://devfluig.iv2.com.br/webdesk/ECMColleagueService',
           xmls,
           {headers: {'Content-Type': 'text/xml'}
           }).then(res=>{
            parseString(res.data, function (err, result) {
              alert('Bem vindo '+ result["soap:Envelope"]["soap:Body"][0]["ns1:getColleagueByLoginResponse"][0]["colleagueId"][0]["colleagueName"][0])
          });
        }).catch(err=>{alert('Erro ao logar.')});
  }

  constructor(props) {
    super(props);
    this.state = { login: '', senha: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40,  width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(login) => this.setState({login})}
          value={this.state.login}
        />
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(senha) => this.setState({senha})}
          value={this.state.senha}
        />
        <Button
          onPress={() => {
            this.loga();
          }}
          title="Press Me"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
