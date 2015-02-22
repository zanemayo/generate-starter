var React = require('react');

var InlineQuestion = React.createClass({
  render: function() {
    return <div className="question">
      <div className="row">
        <div className="col-xs-1">
          {this.props.question.number}
        </div>
        <div className="col-xs-2">
          {this.props.question.question}
        </div>
        <div className="col-xs-9">
          {this.props.showAnswer ? '= ' + this.props.question.answer : ''}
        </div>
      </div>
    </div>
  }
});

module.exports = InlineQuestion;
