"use strict";

var _name = Symbol();
var _convert = Symbol();
var _prep = Symbol();

module.exports = class returntype 
{
	constructor(rawReturnObject) {
		this[_name] = rawReturnObject.name; 
		
		if (rawReturnObject.prep) 
		{
			this[_prep] = rawReturnObject.prep;
		} 
		
			this[_convert] = rawReturnObject.convert;
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