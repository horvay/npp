"use strict";

var clone = require('clone');
var fs = require('fs');
var assert = require('assert');

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
		
		console.log("type manager passed to nppfile:")
		console.log(typemanager.ReturnTypes);
		console.log("\n");
		
		this[_name] = namespace.name;
		this[_classname] = namespace.classname;
		this[_methods] = namespace.methods;

		this[_typemanager] = clone(typemanager);
		console.log("clone type manager: ");
		console.log(this[_typemanager].ReturnTypes);
		console.log("\n");
		
		if (namespace.paramtypes)
			this[_typemanager].extendparams(namespace.paramtypes);

		if (namespace.returntypes)
			this[_typemanager].extendreturns(namespace.returntypes);

		this[_typemanager].processTypes();
	}

	generateFile() 
	{
		var filestring = this.getFileString();

		return filestring;
	}

	getFileString()
	{
		var self = this;
		var cppString = "";

		// cpp file setup stuff
		cppString += addLine("#include <node.h>");
		cppString += addLine();
		cppString += addLine("using namespace v8;");
		cppString += addLine();
		cppString += addLine("namespace " + self[_name]);
		cppString += addLine("{");
		cppString += addLine("	class " + self[_classname]);
		cppString += addLine("	{");
		cppString += addLine("	");
		
		assert(self[_methods], "must have at least one method in namespace " + self[_name]);

		self[_methods].forEach(function(method) {
			cppString += addLine("		void " + method.name + "(const FunctionalCallbackInfo<Value>& args) ");
			cppString += addLine("		{");
			
			// loop through each paramtype
			var params = "serfartalot"; // stupid way to remove the first comma
			method.params.forEach(function(param) {
				// create validation and conversion
				var paramTemplate = self[_typemanager].getParamType(param.type);
				assert(paramTemplate, "type" + param.type + "is not defined.");

				if (paramTemplate.hasPrep)
					cppString += addLine(paramTemplate.getPrepString());

				// validation
				cppString += "		if (!(" + addLine(paramTemplate.getValidateString()) + "))";
				cppString += "		{";
				cppString += '			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "validation failed for param: ' + param.name + '")));';
				cppString += "			return;";
				cppString += "		}";

				// conversion
				cppString += addLine();
				cppString += addLine(paramTemplate.getConverterString());
				cppString += addLine();

				// add to praram string for service call
				params += ", " + param.name;
			});
			params.replace("serfaralot, ", "");

			// call the actual service
			cppString += addLine("			auto result = " + self[_classname] + "::" + method.name + "(" + params + ");");

			// get return type
			if (method.return != "void")
			{
				var returnType = self[_typemanager].getReturnType(method.return);
				assert(returnType, "return type, " + method.return + ", must be defined");


				cppString += addLine("		args.GetReturnValue().Set(" + returnType.convert + ");");
			}

			cppString += addLine("		}");
			
		});

		cppString += addLine("	auto* isolate = args.GetIsolate();");
		cppString += addLine("	");
		cppString += addLine("	}");
		cppString += addLine("}");
		
		return cppString;
	}
}

function addLine(string)
{
	if(string)
		return string + "\n";
	else
		return "\n";
}