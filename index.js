module.exports = {
	render: function(html, view) {
		var arr = html.split(/(<%)|(%>)/);
		var output = "var output='';\n";
		var script = false;
		for(var i=0;i<arr.length;i++) {
			if(arr[i]) {
				if(arr[i].trim()=="<%") {
					script = true;
				}
				else if(arr[i].trim()=="%>") {
					script = false;
				}
				else {
					if(script) {
						var temp = arr[i];
						for(var j=0;j<view.length;j++) {
							var reg = new RegExp("{{"+view[j].name+"}}","g");
							temp = temp.replace(reg,"this."+view[j].name);
						}
						output+=temp;
					}
					else {
						var subout = "";
						var vararr = arr[i].split(/({{)(.*?)(}})/);
						var variable = false;
						for(var j=0;j<vararr.length;j++) {
							if(vararr[j].trim()=="{{"||vararr[j].trim()=="}}") {
								variable = !variable;
							}								
							else {
								if(!variable) {
									subout+=encodeURIComponent(vararr[j]);
								}
								else {
									var flag = false;
									for(var k=0;k<view.length;k++) {
										if(view[k].name==vararr[j].trim()) {
											flag = true;
										}
									}	
									if(flag) {
										subout+="'+"+"this."+vararr[j].trim()+"+'";
									}
									else {
										subout+="'+"+vararr[j].trim()+"+'";
									}
								}
							}
						}
						var temp="output+='"+subout+"';";
						output+=temp;
					}
				}
			}
		}
		output+="\nreturn output;";
		var context = {
		};
		for(var i=0;i<view.length;i++) {
			context[view[i].name] = view[i].value;
		}
		var f= new Function(output).bind(context);
		output = decodeURIComponent(f()).trim();
		return output;
	}
}