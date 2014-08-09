AmoebicTemplating
=================
A somewhat complete template engine that uses Javascript logic.

## Usage
Place your javascript inside <% %> tags.

If you want to refer to a javascript variable inside your HTML, put the variable name inside of {{ }}.

To pass variables, create an array of objects with a name property and a value property.

To render a template:

var amoebic = require("amoebictemplating");
var data = [{name:"name",value:"bob"}];
var html = amoebic.render("<% var i = 1; console.log(i); if(i==1) { %><div>hi{{name}}{{i}}</div> <% } %><div> oh well</div>", data);
