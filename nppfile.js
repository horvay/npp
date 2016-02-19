"use strict";

var clone = require('clone');
var fs = require('fs');

var _name = Symbol();
var _classname = Symbol();
var _methods = Symbol();
var _paramtypes = Symbol();
var _typemanager = Symbol();

module.exports = class nppfile 
{
	constructor(namespace, typemanager) 
	{
		assert(namespace.classname, "namespace must have classname.")

		this[_name] = namespace.name;
		this[_classname] = namespace.classname;
		this[_methods] = namespace.methods;

		this[_typemanager] = clone(typemanager);

		if (namespace.paramtypes)
			this[_typemanager].extendparams(namespace.paramtypes);

		if (namespace.returntypes)
			this[_typemanager].extendreturns(namespace.returntypes);
	}

	generateFile() 
	{
		var filestring = getFileString();


	}

	getFileString()
	{
		var cppString = "";

		cppString += addLine("#include <node.h>");
		cppString += addLine();
		cppString += addLine("using namespace v8;");
		cppString += addLine();
		cppString += addLine("namespace " + namespace.name);
		cppString += addLine("{");
		cppString += addLine("	class " + namespace.classname);
		cppString += addLine("	{");
		cppString += addLine("	");
		
		namespace.methods.forEach(function(method) {
			cppString += addLine("		void " + method.name + "(const FunctionalCallbackInfo<Value>& args) ");
			cppString += addLine("		{");
			cppString += addLine("		");
			cppString += addLine("		}");
			
		});

		cppString += addLine("	auto* isolate = args.GetIsolate();");
		cppString += addLine("	");
		cppString += addLine("	}");
		cppString += addLine("}");

	}


}

function addLine(string)
{
	if(string)
		return string + "\n";
	else
		return "\n";
}