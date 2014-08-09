var should = require('chai').should(),
	template = require('../index'),
	render = template.render,
	renderFromFile = template.renderFromFile;

describe('#render', function() {
	it('converts <% if(true) { %><div>hi</div> <% } %>', function() {
		render("<% var i = 1; console.log(i); if(i==1) { %><div>hi{{name}}{{i}}</div> <% } %><div> oh well</div>", [{name:"name",value:"bob"}]).should.equal("<div>hibob1</div> <div> oh well</div>");
	});
});