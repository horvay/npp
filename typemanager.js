"use strict";

var globaltypes = require('./globaltypes.json');

var extend = require('extend');
var assert = require('assert');

var paramtype = require('./paramtype.js');
var returntype = require('./returntype.js');

var _paramTypes = Symbol();
var _returnTypes = Symbol();
var _processedParams = Symbol();
var _processedReturns = Symbol();

var _id = Symbol();

module.exports = class typemanager 
{
	constructor(paramtypes, returntypes)
	{
		this[_paramTypes] = globaltypes.paramTypes;
		this[_returnTypes] = globaltypes.returnTypes;

		console.log("returNtypes from global: ");
		console.log(globaltypes.returnTypes + "\n");

		this[_paramTypes] = extend(true, this[_paramTypes], paramtypes);
		this[_returnTypes] = extend(true, this[_returnTypes], returntypes);
		
		this[_id] = Math.random();
		console.log("assigned typemanager id: " + this[_id] + "\n");
		
		this.processTypes();
	}

	processTypes()
	{
		var self = this;
		self[_processedParams] = [];
		self[_processedReturns] = [];
		
		console.log("processing types for typemanager id: " + self[_id] + "\n");
		
		if (self[_paramTypes])
		{
			Object.keys(self[_paramTypes]).forEach(function(element, key, _array) {
				// add new key
				self[_processedParams][element] = new paramtype(this[element], element);
			}, self[_paramTypes]);
		}
		
		if (self[_returnTypes])
		{
			Object.keys(self[_returnTypes]).forEach(function(element, key, _array) {
				// add new key
				self[_processedReturns][element] = new returntype(this[element], element);
			}, self[_returnTypes]);
		}
	}

	get ParamTypes() 
	{
		return this[_paramTypes];
	}

	get ReturnTypes() 
	{
		return this[_returnTypes];
	}

	getParamType(typename)
	{
		assert(this[_processedParams][typename], "param type '" + typename + "' does not exists");
		return this[_processedParams][typename];
	}

	getReturnType(typename)
	{
		console.log("retrevieving return type from typemanager id: " + this[_id] + "\n");
		assert(this[_processedReturns][typename], "return type '" + typename + "' does not exists");
		return this[_processedReturns][typename];
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