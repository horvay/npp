"use strict";

var _name = Symbol();
var _prep = Symbol();
var _convert = Symbol();
var _validate = Symbol();

module.exports = class paramtype 
{
	constructor(name, validate, convert, prep) {
		this[_name] = name; 
		
		if (prep) 
		{
			this[_prep] = prep;
		} 
		
		this[_validate] = validate;
		
		if (convert)
		{
			this[_convert] = convert;
		}
	}

	get name() {
		return this[_name];
	}

	get hasConvert() {
		return !!this[_convert];
	}

	get hasPrep() {
		return !!this[_prep];
	}

	get getValidateString(index) {
		return _standardTransform(this[_validate], index, this[_name]);
	}

	get getConvverterString(index) {
		return _standardTransform(this[_convert], index, this[_name]);
	}
}

function _standardTransform(formatstring, index, name) {
	// put in the actual index
	var validatestrinng = formatstring.replace("[i]", "[" + index.toString() + "]");
	// replace the variable with the actual variable name
	return validatestring.replace("variable", name);
}