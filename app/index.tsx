import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [greenPoints, setGreenPoints] = useState(0);
  const [redPoints, setRedPoints] = useState(0);

  // Function to generate a new math question
  const generateQuestion = () => {
    const operators = ['+', '-', '*', '/'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let num1 = 0, num2 = 0, answer = 0;

    switch(op) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      case '/':
        num2 = Math.floor(Math.random() * 9) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        break;
      default:
        break;
    }

    setNumber1(num1);
    setNumber2(num2);
    setOperator(op);
    setCorrectAnswer(answer);
  };

  // Generate the first question when the app loads
  useEffect(() => {
    generateQuestion();
  }, []);

  // Function to handle the answer submission
  const handleSubmit = () => {
    const parsedAnswer = parseFloat(userAnswer);
    if (parsedAnswer === correctAnswer) {
      setGreenPoints(prev => prev + 1);
    } else {
      setRedPoints(prev => prev + 1);
    }
    setUserAnswer('');
    generateQuestion();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60} // adjust this value if needed
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.question}>
          {number1} {operator} {number2} = ?
        </Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Your answer"
        />
        <Button title="Submit" onPress={handleSubmit} />
        <View style={styles.scoreContainer}>
          <Text style={styles.greenScore}>Green Points: {greenPoints}</Text>
          <Text style={styles.redScore}>Red Points: {redPoints}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  question: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  scoreContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  greenScore: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold'
  },
  redScore: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
