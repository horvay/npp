"use strict";

var globaltypes = require('globaltypes.json');
var extend = require('extend');
var extend = require('clone');

var _paramtypes = Symbol();
var _returntypes = Symbol();

module.exports = class typemanager 
{
	contructor(paramtypes, returntypes)
	{
		this[_paramtypes] = globaltypes.paramtypes;
		this[_returntypes] = globaltypes.returntypes;

		this[_paramtypes] = extend(true, this[_paramtypes], paramtypes);
		this[_returntypes] = extend(true, this[_returntypes], returntypes);
	}

	getParamType(typename)
	{
		assert(this[_paramtypes][typename], "param type '" + typename + "' does not exists");
		return this[_paramtypes][typename];
	}

	getReturnType(typename)
	{
		assert(this[_returntypes][typename], "return type '" + typename + "' does not exists");
		return this[_returntypes][typename];
	}

	extendparams(paramtypes)
	{
		this[_paramtypes] = extend(true, this[_paramtypes], paramtypes);	
	}
	
	extendparams(returntypes)
	{
		this[_returntypes] = extend(true, this[_returntypes], returntypes);	
	}
}