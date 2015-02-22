var React = require('react');
var InlineQuestion = require('../components/inlineQuestion');

var PreviewQuestions = React.createClass({
  render: function() {
    var num = 1;
    return <div>
      Here are your questions
      {this.props.questions.map(function(question, index) {
        return <InlineQuestion question={question} questionNumber={num++} />
      })}
      <button className="btn btn-primary" onClick={this.props.startTest}>Start</button>
    </div>
  }
});

module.exports = PreviewQuestions;
