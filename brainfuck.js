var Brainfuck = function(){
	var me = this,
		debug = false;

	me.evaluate = function(code){
		var data =  [],
			dataptr = 0,
			ip = 0,
			braceMap = {},
			output = [];

		debug && console.log("Evaluating: " + code);

		braceMap = me.buildBraceMap(code);
		debug && console.log(braceMap);

		while( ip < code.length ){
			var command = code[ip];

			switch(command){

				case ">":
					dataptr++;
					debug && console.log('>', dataptr);
					break;

				case "<":
					dataptr--;
					if ( dataptr < 0 )
						dataptr = 0;
					debug && console.log('<', dataptr);
					break;

				case "+":
					data[dataptr] = data[dataptr] || 0;
			      	data[dataptr]++;
			      	debug && console.log('+', dataptr, data);
					break;

				case "-":
					data[dataptr] = data[dataptr] || 0;
			      	data[dataptr]--;
			      	debug && console.log('-', dataptr, data);
					break;

				case ".":
					var c = String.fromCharCode(data[dataptr]);
				    output.push(c);
				    debug && console.log('.', c);
					break;

				case ",":
					break;

				case "[":
					if(data[dataptr] == 0){
						ip = braceMap[ip];
					}
					debug && console.log('[');
					break;

				case "]":
					if(data[dataptr] != 0){
						ip = braceMap[ip];
					}
					debug && console.log(']');
					break;

				default:
					// do nothing
			}

			ip++;
		}

		return output.join("");
	};

	me.buildBraceMap = function(code){
		var stack = [],
			map = {};

		for( var i = 0; i < code.length; i++){
			if(code[i] === "[" ){
				stack.push(i);
			}
			if(code[i] === "]"){
				var start = stack.pop();
				map[start] = i;
				map[i] = start;
 			}
		}
		return map;
	}

}