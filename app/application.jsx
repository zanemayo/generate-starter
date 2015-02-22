var React = require("react");
var RouteHandler = require("react-router").RouteHandler;
var SelectQuestionTypes = require("pages/select-question-types");
var PreviewQuestions = require("pages/previewQuestions");
var QuestionsModel = require("models/questions");
var Test = require("pages/test");
var ShowAnswers = require("pages/showAnswers");

require("./styles/style.less");

var Application = React.createClass({
	getQueryParam: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	getInitialState: function() {
		var page = this.getQueryParam('page');
		return {
			page: page ? page : 'selectQuestionTypes'
		}
	},
	questionTypesSelected: function(questionTypes) {
		var questions = QuestionsModel.generateQuestions(questionTypes);
		this.setState({
			page: 'previewQuestions',
			questionTypes: questionTypes,
			questions: questions
		});
	},
	startTest: function() {
		this.setState({
			page: 'test'
		});
	},
	testComplete: function() {
		this.setState({page: 'showAnswers'});
	},
	resetTest: function() {
		this.replaceState(this.getInitialState());
	},
	selectPage: function(pageName) {
		var pages = {
			selectQuestionTypes: function() {
				return <SelectQuestionTypes onSubmit={this.questionTypesSelected}/>
			},
			previewQuestions: function() {
				return <PreviewQuestions questions={this.state.questions} startTest={this.startTest} />
			},
			test: function() {
				return <Test questions={this.state.questions} testComplete={this.testComplete} />
			},
			showAnswers: function() {
				return <ShowAnswers questions={this.state.questions} resetTest={this.resetTest} />
			}
		}
		return pages[pageName].apply(this);
	},
	render: function() {
		return <div>
			{this.selectPage(this.state.page)}
		</div>;
	}
});
module.exports = Application;
