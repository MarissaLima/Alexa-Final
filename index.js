/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';

// TODO: replace with facts about yourself
const QUESTIONS = [
  "How many medals have the United States won at the Summer Olympics?",
  "How many countries participated in the first Olympic Games?",
  "Who won the most medals at the first Summer Olympics games?",
  "Who won 263 medals, the most medals at the Winter Games?",
  "When was the last time the gold medals were actually made fully of gold?",
  "In what year did the Olympics start letting women compete?",
  "How many athletes have won medals in both Summer and Winter Games?",
  "What did the Olympic games start as?",
  "How old was the youngest Olympian?",
  "How old was the oldest Olympian?"
];

const ANSWERS = [
  "2189",
  "202",
  "Greece",
  "Norway",
  "1912",
  "1964",
  "Five",
  "A religious celebration",
  "10",
  "72"
];

var handlers = {
  'LaunchRequest': function () { this.emit('GetFact'); },
  'GetNewFactIntent': function () { this.emit('GetFact'); },
  'GetFact': function() {
    // Randomly select a fact from the array
    const factIndex = Math.floor(Math.random() * QUESTIONS.length);
    const randomFact = QUESTIONS[factIndex];

    // Create speech output
    const speechOutput = "Here's your trivia question: " + randomFact;
    this.emit(':tellWithCard', speechOutput, "Major League Hacking (MLH) Facts", randomFact);
  },
  'introIntent': function () 
  {
      const factIndex = Math.floor(Math.random() * QUESTIONS.length);
      this.response.speak(QUESTIONS[factIndex])
            .listen(QUESTIONS[factIndex]); 
      this.emit(':responseReady');
  }, 
  
};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
