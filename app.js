"use strict";

var paramtype = require('./paramtype.js');
var returntype = require('./returntype.js');
var serviceDefinition = require('./example.json');

var cppGeneration = "";

//first cache the types into a data structure
assert(serviceDefinition.paramtypes, "no paramtypes exists in json.");
assert(serviceDefinition.returntypes, "no returntypes exists in json.");
assert(serviceDefinition.namespaces, "no namespaces exists in json.");

// create praram type var
var paramtypes = serviceDefinition.paramtypes;

// create return type var
var returntypes = serviceDefinition.returntypes;

// start look for each namespaces
var namespaces = [];
serviceDefinition.namespaces.forEach(function (namespace) {
	namespaces.push(new nppfile(namespace));
});

// loop through generated nppfiles and create cpp file
namespaces.forEach(function (nppfile) {
	nppfile.generateFile();
});