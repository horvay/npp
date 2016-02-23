"use strict";

var _name = Symbol();
var _convert = Symbol();
var _prep = Symbol();

module.exports = class returntype 
{
	constructor(rawReturnObject, keyname) 
	{
		this[_name] = keyname; 
		
		if (rawReturnObject.prep) 
		{
			this[_prep] = rawReturnObject.prep;
		} 
		
		this[_convert] = rawReturnObject.convert;
	}

	get name() 
	{
		return this[_name];
	}

	get hasPrep() 
	{
		return !!this[_prep];
	}
	
	getPrepString()
	{
		return _standardTransform(this[_prep], this[_name]);
	}

	getConverterString() 
	{
		return _standardTransform(this[_convert], this[_name]);
	}
}

function _standardTransform(formatstring, name) {
	return formatstring.replace("returnvariable", name);
}