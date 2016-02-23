"use strict";

var assert = require('assert');
var nppfile = require('./nppfile.js');
var TypeManager = require('./typemanager.js');
var serviceDefinition = require('./example.json');

var cppGeneration = "";

// first cache the types into a data structure
assert(serviceDefinition.namespaces, "no namespaces exists in json.");

// create  type vars
var paramTypes = serviceDefinition.paramTypes;
var returnTypes = serviceDefinition.returnTypes;

// initaie the typemanager
var typeManager = new TypeManager(paramTypes, returnTypes);
console.log("created type manager: ");
console.log(typeManager.ReturnTypes);
console.log("\n");

// start look for each namespaces
var namespaces = [];
serviceDefinition.namespaces.forEach(function (namespace) {
	namespaces.push(new nppfile(namespace, typeManager));
});

// loop through generated nppfiles and create cpp file
namespaces.forEach(function (nppfile) {
	console.log(nppfile.generateFile());
});