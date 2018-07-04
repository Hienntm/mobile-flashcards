import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { saveNewDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, blue } from '../utils/colors'

class AddDeck extends Component {
  state = {
    deckTitle: ""
  }

  static navigationOption = {
    title: 'Add Deck'
  }

  updateDeckTitle = (deckTitle) => {
    this.setState({deckTitle})
  }

  submit = () => {
    const { deckTitle } = this.state
    const { dispatchAddDeck } = this.props
    saveNewDeck(deckTitle).then(() => {
      dispatchAddDeck(deckTitle)
      this.props.navigation.navigate('DeckDetail', { title: deckTitle})
    })
  }

  render() {
    const { deckTitle } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Type here your new Deck Title</Text>
        <TextInput style={styles.textInput} value ={deckTitle} onChangeText={this.updateDeckTitle} />
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style= {{color: white}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50, 
  },
  textInput: {
    width: 300,
    margin: 20,
    height: 50,
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius:5
  }, 
  button: {
    borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: blue,
  },
  heading: {
    color: blue, 
    fontSize: 20
  }  
})

const mapStateToProps = state => {
  return {
    deckTitle: state.deckTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddDeck:(title) => {
      dispatch(addDeck({title}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
