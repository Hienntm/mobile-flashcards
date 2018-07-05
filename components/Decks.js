import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, initializeDecks } from '../utils/api'
import { receiveDecks, resetDecks } from '../actions'
import { white, black, blue } from '../utils/colors'
import { AppLoading} from 'expo'

class Decks extends Component {
  state = {
    ready: false,
  }

  static navigationOptions = {
      title: "Decks"
  }
  
  navigateToDeckDetail = (title) => {
    this.props.navigation.navigate('DeckDetail', {title})
  }

  clickResetDecks = () => { //back to original decks
    const decks = initializeDecks()
    const { dispatchResetDecks } = this.props
    dispatchResetDecks(decks)
  }

  componentDidMount () {
    const { dispatchFetchDecks} = this.props;
    fetchDecks().then(decks => {
      dispatchFetchDecks(decks)
    })
    .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    const { decks } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => this.clickResetDecks()}><Text style={{color:white, fontSize: 22}}>RESET</Text></TouchableOpacity>
        {Object.keys(decks).map((key) => {
          return  (<View key={key} style={styles.main}>
                  <TouchableOpacity style={styles.card}  onPress={() => this.navigateToDeckDetail(decks[key].title)}>
                    <Text style={{color:blue, fontSize: 22}}>{decks[key].title}</Text>
                    <Text style={{color:black, fontSize: 20}}>{decks[key].cards.length} cards</Text>
                  </TouchableOpacity>
              </View>)
          }
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70
  },
  main: {
    marginBottom: 20, 
    width: 200, 
    alignItems: 'center', 
  },
  resetBtn: {
    width: 120,
    backgroundColor: blue, 
    borderRadius: 5,
    alignItems: 'center', 
    padding: 10,
    position: 'absolute', 
    top: 10,
    right: 10
  },
  card: {
    
    height: 50,
    alignItems: 'center',
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})


function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchDecks: (decks) => {
      dispatch(receiveDecks({decks}));
    },
    dispatchResetDecks: (decks) => {
      dispatch(resetDecks({decks}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)