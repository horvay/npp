"use strict";

var paramtype = require('./paramtype.js');
var returntype = require('./returntype.js');
var nppfile = require('./nppfile.js');
var typemanager = require('./typemanager.js');
var serviceDefinition = require('./example.json');

var cppGeneration = "";

// first cache the types into a data structure
assert(serviceDefinition.paramTypes, "no paramTypes exists in json.");
assert(serviceDefinition.returnTypes, "no returnTypes exists in json.");
assert(serviceDefinition.namespaces, "no namespaces exists in json.");

// create  type vars
var paramTypes = serviceDefinition.paramTypes;
var returnTypes = serviceDefinition.returnTypes;

// initaie the typemanager
var typemanager = new typemanager(paramTypes, returnTypes);

// start look for each namespaces
var namespaces = [];
serviceDefinition.namespaces.forEach(function (namespace) {
	namespaces.push(new nppfile(namespace, typemanager));
});

// loop through generated nppfiles and create cpp file
namespaces.forEach(function (nppfile) {
	nppfile.generateFile();
});