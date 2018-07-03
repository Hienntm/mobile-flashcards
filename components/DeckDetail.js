import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, blue } from '../utils/colors'

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.title
        }
    }
    
    navigateToQuiz = (title) => {
        this.props.navigation.navigate('Quiz', {title})
    }

    navigateToAddCard = (title) => {
        this.props.navigation.navigate('AddCard', {title})
    }

    render() {
        const { title } = this.props.navigation.state.params
        const { decks } = this.props
        const deck = decks[title]

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize:22, marginBottom:50}}>This decks has {deck.cards.length} cards</Text>
                </View>
                <TouchableOpacity style={styles.btn}  onPress = {() => this.navigateToAddCard(deck.title)}>
                    <Text style={{color:white}}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}  onPress = {() => this.navigateToQuiz(deck.title)}>
                    <Text style={{color:white}}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 25,
        alignItems: 'center',
    },
    btn: {
        width: 120,
        backgroundColor: blue, 
        borderRadius: 5,
        alignItems: 'center', 
        padding: 10,
        margin: 5        
    }
})

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params
    return {
        title,
        decks: state.decks
    }
}

export default connect(
    mapStateToProps
)(DeckDetail)