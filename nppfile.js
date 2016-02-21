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

		this[_typemanager].processTypes();
	}

	generateFile() 
	{
		var filestring = getFileString();


	}

	getFileString()
	{
		var cppString = "";

		// cpp file setup stuff
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
			
			// loop through each paramtype
			var params = "serfartalot"; // stupid way to remove the first comma
			method.params.forEach(function(param) {
				// create validation and conversion
				var paramTemplate = this[_typemanager].getParamType(param.type);
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
			cppString += addLine("			auto result = " + namespace.classname + "::" + method.name + "(" + params + ");");

			// get return type
			if (method.return != "void")
			{
				var returnType = this[_typemanager].getReturnType(method.return);
				assert(returnType, "return type, " + method.return + ", must be defined");


				cppString += addLine("		args.GetReturnValue().Set(" + returnType.convert + ")"
			}

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