/*jslint indent: 2, nomen: true, maxlen: 120, sloppy: true, vars: true, white: true, plusplus: true */
/*global require, exports, ArangoClusterInfo, ArangoServerState*/

////////////////////////////////////////////////////////////////////////////////
/// @brief Pregel module. Offers all submodules of pregel.
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2014 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Florian Bartels, Michael Hackstein, Guido Schwab
/// @author Copyright 2011-2014, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////
var p = require("org/arangodb/profiler");

var db = require("internal").db;
var _ = require("underscore");
var arangodb = require("org/arangodb");
var ERRORS = arangodb.errors;
var ArangoError = arangodb.ArangoError;

exports.getCollection = function () {
  return db._pregel;
};

exports.getExecutionInfo = function(executionNumber) {
  return _.clone(exports.getCollection().document(executionNumber));
};

exports.updateExecutionInfo = function(executionNumber, infoObject) {
  return exports.getCollection().update(executionNumber, infoObject);
};

exports.removeExecutionInfo = function(executionNumber) {
  return exports.getCollection().remove(executionNumber);
};

exports.getServerName = function () {
  return ArangoServerState.id() || "localhost";
};

exports.genWorkCollectionName = function (executionNumber) {
  return "P_work_" + executionNumber;
};

exports.genMsgCollectionName = function (executionNumber) {
  return "P_messages_" + executionNumber;
};

exports.genGlobalCollectionName = function (executionNumber) {
  return "P_global_" + executionNumber;
};

exports.genCountCollectionName = function (executionNumber) {
  return "P_count_" + executionNumber;
};
exports.createWorkerCollections = function (executionNumber) {
  var t = p.stopWatch();
  var work = db._create(
    exports.genWorkCollectionName(executionNumber)
  );
  work.ensureSkiplist("toShard");
  work.ensureSkiplist("step");
  var message = db._create(
    exports.genMsgCollectionName(executionNumber)
  );
  message.ensureSkiplist("toShard");
  db._create(exports.genGlobalCollectionName(executionNumber));
  p.storeWatch("setupWorkerCollections", t);
  db._create(exports.genCountCollectionName(executionNumber));
};

exports.getWorkCollection = function (executionNumber) {
  return db[exports.genWorkCollectionName(executionNumber)];
};

exports.getTimeoutConst = function (executionNumber) {
  return 300000;
};

exports.getMsgCollection = function (executionNumber) {
  return db._collection(exports.genMsgCollectionName(executionNumber));
};

exports.getGlobalCollection = function (executionNumber) {
  return db._collection(exports.genGlobalCollectionName(executionNumber));
};

exports.getCountCollection = function (executionNumber) {
  return db._collection(exports.genCountCollectionName(executionNumber));
};

exports.getMap = function (executionNumber) {
  return exports.getGlobalCollection(executionNumber).document("map").map;
};

var saveMapping = function (executionNumber, name, map) {
  var col = exports.getGlobalCollection(executionNumber);
  map._key = name;
  col.save(map);
};

exports.saveEdgeShardMapping = function (executionNumber, map) {
  saveMapping(executionNumber, "edgeShards", map);
};

exports.saveShardKeyMapping = function (executionNumber, map) {
  saveMapping(executionNumber, "shardKeys", map);
};

exports.saveShardMapping = function (executionNumber, list) {
  var col = exports.getGlobalCollection(executionNumber);
  col.save({
    _key: "shards",
    list: list
  });
};

exports.saveLocalShardMapping = function (executionNumber, map) {
  saveMapping(executionNumber, "localShards", map[exports.getServerName()]);
};

exports.saveLocalResultShardMapping = function (executionNumber, map) {
  saveMapping(executionNumber, "localResultShards", map[exports.getServerName()]);
};

var loadMapping = function (executionNumber, name) {
  var t = p.stopWatch();
  var res = exports.getGlobalCollection(executionNumber).document(name);
  p.storeWatch("loadMapping", t);
  return res;
};

exports.Conductor = require("org/arangodb/pregel/conductor");
exports.Worker = require("org/arangodb/pregel/worker");
exports.Vertex = require("org/arangodb/pregel/vertex").Vertex;
exports.GraphAccess = require("org/arangodb/pregel/graphAccess").GraphAccess;
exports.Edge = require("org/arangodb/pregel/edge").Edge;
exports.MessageQueue = require("org/arangodb/pregel/messagequeue").MessageQueue;
exports.Mapping = require("org/arangodb/pregel/mapping").Mapping;
