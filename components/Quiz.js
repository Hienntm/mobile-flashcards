import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { connect } from 'react-redux'
import { submitAnswer, reset } from '../actions'
import { white, blue } from '../utils/colors'

class Quiz extends Component {
    static navigationOptions = { title: 'Quiz' }

    state = {
        cardIndex: 0,
        rightAnswer: 0,
        result: 0,
        showResult: false
    }

    chooseOption = (card, answer) => {
        const { decks, title } = this.props
        let { result, rightAnswer } = this.state
        const numOfcards = decks[title].cards.length

        if (numOfcards === (this.state.cardIndex + 1) ) {
            //show result
            result = (rightAnswer/numOfcards)*100
            this.setState({
                showResult: true,
                result,
            })
        }else {
            let currentIndex = this.state.cardIndex
            console.log(currentIndex)
            currentIndex = currentIndex + 1
            console.log(currentIndex)
            this.setState({
                cardIndex: currentIndex
            })

            if (card.answer == answer) {
                rightAnswer = rightAnswer + 1
                this.setState({rightAnswer})
            }
        }
    }

    reset = () => {
        const { dispatchReset, title } = this.props
        dispatchReset(title)
    }

    render() {
        const { decks } = this.props
        const { title } = this.props.navigation.state.params
        const { showResult, result, cardIndex } = this.state
        const deck = decks[title]
        const card = deck.cards[cardIndex]
        const numOfcards = decks[title].cards.length

        return (
            <View style={styles.container}>
                {   showResult && 
                    <View>
                        <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>You got {result} %</Text>
                    </View>
                }
                {   !showResult && card && 
                    <FlipCard style={styles.flipCard}>
                        <View>
                            <Text style={{marginTop:30}}>{cardIndex+1}/{numOfcards}</Text>
                            <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>{card.question}</Text>
                            <TouchableOpacity style={styles.answerBtn} onPress={()=>this.chooseOption(card, 'correct')}>
                                <Text style={{color:white}}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.answerBtn} onPress={()=>this.chooseOption(card, 'incorrect')}>
                                <Text style={{color:white}}>Incorrect</Text>
                            </TouchableOpacity>
                            <Text style={{marginTop:30}}>Touch to see Answer</Text>
                        </View>
                        <View>
                            <Text style={{marginTop:50, marginBottom:30, fontSize: 22}}>{card.answer}</Text>
                            <Text>Touch to see Question</Text>
                        </View>
                    </FlipCard>
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
    answerBtn: {
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

    return {
        title,
        decks: state.decks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSubmitAnswer : (title, card) => {
            dispatch(submitAnswer({title, card, answer}))
        },
        reset: (title) => {
            dispatch(reset({title}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)