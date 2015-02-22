var React = require('react');
var InlineQuestion = require('../components/inlineQuestion');

var PreviewQuestions = React.createClass({
  render: function() {
    return <div>
      Here are the answers
      {this.props.questions.map(function(question, index) {
        return <InlineQuestion question={question} showAnswer={true} />
      })}
      <button className="btn btn-primary" onClick={this.props.resetTest}>Generate another test</button>
    </div>
  }
});

module.exports = PreviewQuestions;
