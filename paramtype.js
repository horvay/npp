"use strict";

var _name = Symbol();
var _prep = Symbol();
var _convert = Symbol();
var _validate = Symbol();

module.exports = class paramtype 
{
	constructor(rawParamObject) {
		this[_name] = rawParamObject.name; 
		
		if (rawParamObject.prep) 
		{
			this[_prep] = rawParamObject.prep;
		} 
		
		this[_validate] = rawParamObject.validate;
		
		if (rawParamObject.convert)
		{
			this[_convert] = rawParamObject.convert;
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

	getPrepString(index)
	{
		return _standardTransform(this[_prep], index, this[_name]);
	}

	getValidateString(index) 
	{
		return _standardTransform(this[_validate], index, this[_name]);
	}

	getConverterString(index) 
	{
		return _standardTransform(this[_convert], index, this[_name]);
	}
}

function _standardTransform(formatstring, index, name) {
	// put in the actual index
	var validatestrinng = formatstring.replace("[i]", "[" + index.toString() + "]");
	// replace the variable with the actual variable name
	return validatestring.replace("variable", name);
}