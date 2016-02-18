"use strict";

var _name = Symbol();
var _convert = Symbol();
var _prep = Symbol();

module.exports = class returntype 
{
	constructor(name, convert, prep) {
		this[_name] = name; 
		
		if (prep) 
		{
			this[_prep] = prep;
		} 
		
			this[_convert] = convert;
	}

	get name() {
		return this[_name];
	}

	get hasPrep() {
		return !!this[_prep];
	}

	get getConvverterString(index) {
		return _standardTransform(this[_convert], index, this[_name]);
	}
}

function _standardTransform(formatstring, index, name) {
	var validatestrinng = formatstring.replace("[i]", "[" + index.toString() + "]");
	return validatestring.replace("returnvariable", name);
}