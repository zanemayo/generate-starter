var React = require('react');
var InlineQuestion = require('../components/inlineQuestion');

var Test = React.createClass({
  getInitialState: function() {
    return {
      currentQuestion: null
    }
  },
  nextQuestion: function() {
    this.state.timeoutHandle && clearTimeout(this.state.timeoutHandle)

    var nextIndex = this.state.currentQuestion === null ?
      0 : this.state.currentQuestion.number; //1 based
    if(nextIndex >= this.props.questions.length) {
      this.setState({testComplete: true});
    }
    else {
      var timeoutHandle = setTimeout(function() {
        self.nextQuestion();
      }, 3000);

      this.setState({
        currentQuestion: this.props.questions[nextIndex],
        timeoutHandle: timeoutHandle
        });
      var self = this;
    }
  },
  testComplete: function() {
    this.state.timeoutHandle && clearTimeout(this.state.timeoutHandle)
    this.props.testComplete();
  },
  render: function() {
    var inner = null;
    if(this.state.testComplete) {
      inner = <button className="btn btn-primary" onClick={this.testComplete}>See Answers</button>
    }
    else if(this.state.currentQuestion) {
      inner = <div>
        <InlineQuestion question={this.state.currentQuestion} />
        <button className="btn btn-primary" onClick={this.nextQuestion}>Next</button>
      </div>
    }
    else {
      // Test hasn't started yet
      inner = <button className="btn btn-primary" onClick={this.nextQuestion}>Go</button>
    }

    var num = 1;
    return <div>
      {inner}
    </div>
  }
});

module.exports = Test;
