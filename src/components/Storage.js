export function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

export function checkLocalStorage(key) {
  return localStorage.getItem(key) !== null;
}

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = 'sekai';
var db = null;

export function initIndexedDB() {
    var request = indexedDB.open(dbName, 1);
    request.onerror = function(event) {
        console.log('error opening db');
    };
    request.onsuccess = function(event) {
        db = request.result;
    };
    request.onupgradeneeded = function(event) {
        db = request.result;
        db.onerror = function(event) {
            console.log('error opening db');
        }
        // stores id, name, description, generation options, and version. everything is indexed by id.
        var worksObjectStore = db.createObjectStore('works', {keyPath: 'id'});
        worksObjectStore.createIndex('id', 'id', {unique: true});
        worksObjectStore.createIndex('options', 'options', {unique: false});
        worksObjectStore.createIndex('version', 'version', {unique: false});

        // stores id, json of work, and version. everything is indexed by id.
        var contentObjectStore = db.createObjectStore('workcontent', {keyPath: 'id'});
        contentObjectStore.createIndex('id', 'id', {unique: true});
        contentObjectStore.createIndex('json', 'json', {unique: false});
        contentObjectStore.createIndex('version', 'version', {unique: false});
    };
}

export function saveWorkMetadata(id, name, description, options, version) {
    var transaction = db.transaction(['works'], 'readwrite');
    var objectStore = transaction.objectStore('works');
    var request = objectStore.put({id: id, name: name, description: description, options: options, version: version});
    request.onerror = function(event) {
        console.log('error saving work metadata');
    };
}

export function saveWorkContent(id, json, version) {
    var transaction = db.transaction(['workcontent'], 'readwrite');
    var objectStore = transaction.objectStore('workcontent');
    var request = objectStore.put({id: id, json: json, version: version});
    request.onerror = function(event) {
        console.log('error saving work content');
    };
}