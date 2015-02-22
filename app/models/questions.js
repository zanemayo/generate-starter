var Round = require('../utils/round');
var QuestionTypes = require('../stores/questionTypes');
var Q = QuestionTypes.Q;
//var Q = require('../qTypes');

var Questions = {
  getRandomInt: function(max)  {
    return Math.floor(Math.random() * max);
  },
  // number between min(inclusive) and max(inclusive)
  getInt: function(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  },
  // number between min(inclusive) and max(excludive)
  getReal: function(min, max, round) {
    return Round(Math.random() * (max - min) + min, round);
  },
  generateQuestions: function(questionTypes) {
    var questions = [];
    for(var i = 0; i < 10; i++) {
      questionId = questionTypes[this.getRandomInt(questionTypes.length)];
      var questionType = _.find(QuestionTypes.types, function(type) {
        return questionId == type.id
      });
      var question = this.generateQuestion(questionType);
      question.number = i + 1;
      questions.push(question);
    }
    return questions;
  },

  multiplication: function(num1, num2, round) {
    round = round === undefined ? 2 : round;
    var parts = [];
    parts.push(num1);
    parts.push(num2);
    var question = parts[0] + ' x ' + parts[1];
    var answer = Round(parts[0] * parts[1], round);
    return { question: question, answer: answer };
  },
  division: function(num1, num2, round) {
    round = round === undefined ? 2 : round;
    var parts = [];
    parts.push(num1);
    parts.push(num2);
    var question = parts[0] + ' ÷ ' + parts[1];
    var answer = Round(parts[0] / parts[1], 2);
    return { question: question, answer: answer };
  },
  generateRounding: function(num, round, roundWord) {
    var parts = [];
    parts.push(num);
    return {
      question: "Round " + num + " to the nearest " + roundWord,
      answer: Round(num, round)
    }
  },

  generateQuestion: function(questionType) {
    var g = {};
    g[Q.ADDITION] = function() {
      var parts = [];
      parts.push(this.getInt(1, 100));
      parts.push(this.getInt(1, 100));
      return {
        question: parts[0] + ' + ' + parts[1],
        answer: parts[0] + parts[1]
      };
    };
    g[Q.SUBTRACTION] = function() {
      var parts = [];
      parts.push(this.getInt(1, 100));
      parts.push(this.getInt(1, 100));
      return {
        question: parts[0] + ' - ' + parts[1],
        answer: parts[0] - parts[1]
      };
    };
    g[Q.MULTIPLY_TWO_TWO_DIGIT_NUMBERS] = function() {
      return this.multiplication(this.getInt(10, 99), this.getInt(10, 99));
    };
    g[Q.DIVIDE_THREE_DIGIT_BY_ONE_DIGIT_NUMBER] = function() {
      return this.division(this.getInt(100, 999), this.getInt(2, 9));
    };
    g[Q.MULTIPLY_TWO_SINGLE_DIGIT_NUMBERS_WITH_ONE_DECIMAL_PLACE] = function() {
      return this.multiplication(this.getReal(1, 10, 1), this.getReal(1, 10, 1));
    };
    g[Q.ROUND_TO_NEAREST_THOUSAND] = function() {
      return this.generateRounding(this.getInt(1, 100000), -3, "thousand");
    };
    /*
    g[Q.] = function() {
      return { question: question, answer: answer };
    };
    */
    return g[questionType.id].apply(this);
  }
};

module.exports = Questions;
