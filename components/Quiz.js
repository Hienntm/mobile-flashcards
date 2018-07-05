import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, blue, pink } from '../utils/colors'
import { clearLocalNotification, setLocalNotification} from '../utils/api'

class Quiz extends Component {
    static navigationOptions = { title: 'Quiz' }

    state = {
        cardIndex: 0,
        rightAnswer: 0,
        result: 0,
        showResult: false,
        showQuestion: true,
        showAnswer: false
    }

    chooseOption = (card, answer) => {
        const { decks, title } = this.props
        let { result, rightAnswer } = this.state
        const numOfcards = decks[title].cards.length

        if (card.answer == answer) {
            rightAnswer = rightAnswer + 1
            this.setState({rightAnswer})
        }

        if (numOfcards === (this.state.cardIndex + 1) ) {
            //show result
            result = (rightAnswer/numOfcards)*100
            this.setState({
                showResult: true,
                result,
            })
            clearLocalNotification().then(setLocalNotification)
        }else {
            let currentIndex = this.state.cardIndex
            currentIndex = currentIndex + 1
            this.setState({
                cardIndex: currentIndex
            })
        }
    }

    reset = () => {
        const { dispatchReset, title } = this.props
        dispatchReset(title)
    }

    showAnswer = () => {
        this.setState({
            showAnswer: true,
            showQuestion: false
        })
    }

    showQuestion = () => {
        this.setState({
            showAnswer: false,
            showQuestion: true
        })
    }

    restartQuiz = () => {
        this.setState({
            cardIndex: 0,
            rightAnswer: 0,
            result: 0,
            showResult: false,
            showQuestion: true,
            showAnswer: false
        })        
    }
    
    goBackToDeck = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { decks } = this.props
        const { title } = this.props.navigation.state.params
        const { showResult, result, cardIndex, showQuestion, showAnswer } = this.state
        const deck = decks[title]
        const card = deck.cards[cardIndex]
        const numOfcards = decks[title].cards.length

        return (
            <View style={styles.container}>
                {   showResult && 
                    <View>
                        <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>You got {result} %</Text>
                        <TouchableOpacity style={styles.btn} onPress={()=>this.restartQuiz()}>
                            <Text style={{color:white}}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={()=>this.goBackToDeck()}>
                            <Text style={{color:white}}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                }
                {   !showResult && card && 
                    <View>
                        { showQuestion &&
                        <View style={{alignItems:'center'}}>
                            <Text style={{marginTop:30}}>{cardIndex+1}/{numOfcards}</Text>
                            <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>{card.question}</Text>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.chooseOption(card, 'correct')}>
                                <Text style={{color:white}}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.chooseOption(card, 'incorrect')}>
                                <Text style={{color:white}}>Incorrect</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flipBtn} onPress={this.showAnswer}>
                                <Text style={{color:white}}>Show Answer</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        { showAnswer &&
                        <View>
                            <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>{card.answer}</Text>
                            <TouchableOpacity style={styles.flipBtn} onPress={this.showQuestion}>
                                <Text style={{color:white}}>Show Question</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    flipCard: {
      borderWidth: 0,
      flex: 1,
    },
    btn: {
        width: 120,
        backgroundColor: blue, 
        borderRadius: 5,
        alignItems: 'center', 
        padding: 10,
        margin: 5
    },
    flipBtn: {
        width: 120,
        backgroundColor: pink, 
        borderRadius: 5,
        alignItems: 'center', 
        padding: 10,
        margin: 5,
        marginTop: 20
    }
})

const mapStateToProps = (state, {navigation}) => {
    const { title } = navigation.state.params

    return {
        title,
        decks: state.decks
    }
}


export default connect(mapStateToProps)(Quiz)