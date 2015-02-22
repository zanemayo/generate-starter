var React = require('react');
var QuestionTypes = require('../stores/questionTypes')
var Round = require('../utils/round');

var SelectQuestionTypes = React.createClass({
  getInitialState: function() {
    var selectedTypes = [];
    QuestionTypes.types.forEach(function(type) {
      selectedTypes[type.id] = false;
    });
    return { selectedTypes: selectedTypes };
  },
  submit: function() {
    var selectedTypes = this.state.selectedTypes.map(function(type, id) {
      return type ? id : null;
    }).filter(function(type) {
      return type !== null;
    });
    this.props.onSubmit(selectedTypes);
  },
  handleCheck: function(event) {
    var selectedTypes = this.state.selectedTypes.slice();
    var id = event.target.getAttribute('data-id');
    selectedTypes[id] = event.target.checked;
    this.setState({
      selectedTypes: selectedTypes
    });
  },
  render: function() {
    var listOfTypes = QuestionTypes.types.map(function(type) {
      return <span>
        <input data-id={type.id} onChange={this.handleCheck}
          checked={this.state.selectedTypes[type.id]} type="checkbox"/> {type.name}
          <br />
      </span>;
    }, this);
    return <div className="well">
      {listOfTypes}
      <br />
      <button className="btn btn-primary" onClick={this.submit}>Generate</button>
    </div>;
  }
});

module.exports = SelectQuestionTypes;
