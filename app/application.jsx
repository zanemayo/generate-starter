var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

require("./styles/style.less");

var Application = React.createClass({
	render: function() {
		return <div>
      Generate a starter
			<RouteHandler />
		</div>;
	}
});
module.exports = Application;
