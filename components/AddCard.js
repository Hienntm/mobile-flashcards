import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { addCard } from '../actions';
import { saveNewCard } from '../utils/api'
import { connect } from 'react-redux'
import { blue, white } from '../utils/colors'

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    }
    static navigationOptions = {
        title: "Add Card"
    }

    saveCard = () => {
        // e.preventDefault()
        const card = this.state;
        const { title } = this.props.navigation.state.params;
        const { dispatchCard } = this.props
        saveNewCard(card, title).then(() => {
            dispatchCard(card, title)
            this.props.navigation.goBack()
        })
    }
    cancel = () => {
        this.props.navigation.goBack()
    }
    updateQuestion = (question) => {
        this.setState({question})
    }
    updateAnswer = (answer) => {
        this.setState({answer})
    }

    render() {
        const { question, answer } = this.state
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    placeholder="question?"
                    onChangeText={this.updateQuestion} value={question}
                />
                <TextInput style={styles.textInput}
                    placeholder="correct or incorrect only"
                    onChangeText={this.updateAnswer} value={answer}
                />
                <TouchableOpacity style={styles.btn} onPress={this.saveCard}>
                    <Text style={{color:white}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.cancel}>
                    <Text style={{color:white}}>Cancel</Text>
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
    textInput: {
      width: 300,
      margin: 20,
      height: 50,
      borderWidth: 2,
      paddingLeft: 10,
      borderRadius:5
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

const mapStateToProps = (state, {navigation}) => {
    const { title } = navigation.state.params
    const { cards } = state.decks[title]
    return {
        title,
        cards
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        dispatchCard: (card, title) => {
            dispatch(addCard({card, title}))
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);