"use strict";

var globaltypes = require('globaltypes.json');

var extend = require('extend');
var clone = require('clone');

var paramtype = require('./paramtype.js');
var returntype = require('./returntype.js');

var _paramTypes = Symbol();
var _returnTypes = Symbol();
var _processedParams = Symbol();
var _processedReturns = Symbol();

module.exports = class typemanager 
{
	contructor(paramtypes, returntypes)
	{
		this[_paramTypes] = globaltypes.paramtypes;
		this[_returnTypes] = globaltypes.returntypes;

		this[_paramTypes] = extend(true, this[_paramTypes], paramtypes);
		this[_returnTypes] = extend(true, this[_returnTypes], returntypes);

		this[_processedParams] = [];
		this[_processedReturns] = [];

		processTypes();
	}

	processTypes()
	{
		this[_paramTypes].forEach(function(param) {
			_processedParams.push(new paramtype(param));
		});
		
		this[_returnTypes].forEach(function(returnType) {
			_processedReturns.push(new returntype(returnType));
		});
	}

	getParamType(typename)
	{
		assert(this[_paramTypes][typename], "param type '" + typename + "' does not exists");
		return this[_paramTypes][typename];
	}

	getReturnType(typename)
	{
		assert(this[_returnTypes][typename], "return type '" + typename + "' does not exists");
		return this[_returnTypes][typename];
	}

	extendparams(paramtypes)
	{
		this[_paramTypes] = extend(true, this[_paramTypes], paramtypes);	
	}
	
	extendparams(returntypes)
	{
		this[_returnTypes] = extend(true, this[_returnTypes], returntypes);	
	}
}