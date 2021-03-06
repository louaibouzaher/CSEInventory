import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateRangePicker from './DateRangePicker';
import {IconButton} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ReserveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      elementPic:
        'https://images.unsplash.com/photo-1521405617584-1d9867aecad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    };
  }

  onSubmit = () => {
    if (
      this.state.title == '' ||
      this.state.description == '' ||
      this.state.startDate == '' ||
      this.state.endDate == ''
    ) {
      const alertMsg =
        ' You have forgot to fill in the : \n' +
        (this.state.title == '' ? '- The title' : '') +
        (this.state.description == '' ? '\n- The description' : '') +
        (this.state.startDate == '' || this.state.endDate == ''
          ? '\n- The dates'
          : '');
      alert(alertMsg);
      return;
    }
    const data = {
      reservationTitle: this.state.title,
      reservationBody: this.state.description,
      startsAt: this.state.startDate,
      endsAt: this.state.endDate,
    };

    fetch('https://cse-inventory-api.herokuapp.com/reservations/add', {
      method: 'post',
      body: data,
    })
      .then((res) => {
        console.log(res);
        alert('Added succesfully !');
        this.props.navigation.navigate('Articles');
      })
      .catch((error) => {
        console.log('zerba3i');
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E8F1F5'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.appBar}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              style={{
                flexDirection: 'row',
              }}>
              <Text>
                <Icon name="keyboard-backspace" size={24} color="#3498DB" />
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                flexDirection: 'row',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#3498DB',
              }}>
              Articles
            </Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="height"
            style={{paddingTop: 5, padding: 30}}>
            <View>
              <Image
                source={{
                  uri: this.state.elementPic,
                }}
                style={{
                  resizeMode: 'cover',
                  alignSelf: 'stretch',
                  borderRadius: 10,
                  marginVertical: 5,
                  height: 200,
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 25,
                    color: 'black',
                    fontSize: 16,
                    height: 30,
                    width: 30,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  2
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 25,
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Object Name
                </Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              value={this.state.title}
              placeholder="Title..."
              onChangeText={(text) => {
                this.setState({title: text});
              }}
            />
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.inputMulti}
              placeholder="Description"
              editable
              onChangeText={(text) => {
                this.setState({description: text});
              }}
              value={this.state.description}
            />
            <DateRangePicker
              initialRange={['2018-04-01', '2018-04-10']}
              onSuccess={(s, e) => {
                this.setState({startDate: s, endDate: e});
              }}
              theme={{markColor: '#3498DB', markTextColor: 'white'}}
            />

            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                this.onSubmit();
              }}>
              <Text style={{color: '#FFF'}}> Borrow ! </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageTitle: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderRadius: 5,
    padding: 10,
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#FFF',
  },
  inputMulti: {
    textAlignVertical: 'top',
    borderRadius: 5,
    padding: 10,
    color: '#000',
    marginVertical: 5,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  Button: {
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    fontWeight: 'bold',
    marginTop: 20,
  },
  appBar: {
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginHorizontal: 30,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
