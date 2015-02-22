var Q = {
  ADDITION: 1,
  SUBTRACTION: 2,
  MULTIPLY_TWO_TWO_DIGIT_NUMBERS: 3,
  DIVIDE_THREE_DIGIT_BY_ONE_DIGIT_NUMBER: 4,
  MULTIPLY_TWO_SINGLE_DIGIT_NUMBERS_WITH_ONE_DECIMAL_PLACE: 5,
  ROUND_TO_NEAREST_THOUSAND: 6,
}

var QuestionTypes = {
  /*types: [
    {id: Q.ADDITION, name: 'Addition'},
    {id: Q.SUBTRACTION, name: 'Subtraction'},
    {id: Q.MULTIPLY_TWO_TWO_DIGIT_NUMBERS, name: 'multiply_two_two_digit_numbers'},
    {id: Q.DIVIDE_THREE_DIGIT_BY_ONE_DIGIT_NUMBER, name: 'divide_three_digit_by_one_digit_number'},
  ],*/
  types: [],
  Q: Q,
  selected: []
}

for(type in Q) {
  QuestionTypes.types.push({
    id: Q[type],
    name: type.toLowerCase().replace(/_/g, ' ')
  });
}

module.exports = QuestionTypes;
