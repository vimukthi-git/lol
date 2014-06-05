#!/usr/bin/env node
var cradle = require('cradle');
var c = new(cradle.Connection)('http://localhost', 5984, {
      cache: true,
      raw: false,
      forceSave: true,
  auth: { username: '****', password: '****' }
  });
var db = c.database('testvb');


db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      //db.create();
      /* populate design documents */
    }
  });

var walk    = require('walk');
var path = require('path');
var fs = require('fs');
var $ = require('jquery');
var files   = [];
var docs = {};

// Walker options
var walker  = walk.walk('******************', { followLinks: false });

walker.on('file', function(root, stat, next) {
  // Add this file to the list of files
  //console.log(path.basename(root));
  if(root.indexOf("i18n") > -1 && stat.name.indexOf('modulename') == -1) {
    var i18nobj = JSON.parse(fs.readFileSync(root + '/' + stat.name, "utf8"))[0];

    var dirs = root.split("/");
    var module = dirs[dirs.length - 3];
    var localetype = dirs[dirs.length - 1];
    //console.log(localetype);
    if(!docs.hasOwnProperty(module)) {
      docs[module] = {
        "Type": "locale",
	"documentType" : "****",
        "Strings": {
        },
        "Name": module,
        "SupportedLocales": [
          "en",
          "fr"
        ]
      };
      if(localetype == 'fr-fr'){
        for(var key in i18nobj){
          if(!docs[module].Strings.hasOwnProperty(key)){
            docs[module].Strings[key] = {};
            docs[module].Strings[key]['fr'] = i18nobj[key];
          } else {
            docs[module].Strings[key]['fr'] = i18nobj[key];
          }

        }
      } else {
        for(var key in i18nobj){
          if(!docs[module].Strings.hasOwnProperty(key)){
            docs[module].Strings[key] = {};
            docs[module].Strings[key]['en'] = i18nobj[key];
          } else {
            docs[module].Strings[key]['en'] = i18nobj[key];
          }
        }
      }

    } else {
      if(localetype == 'fr-fr'){
        for(var key in i18nobj){
          if(!docs[module].Strings.hasOwnProperty(key)){
            docs[module].Strings[key] = {};
            docs[module].Strings[key]['fr'] = i18nobj[key];
          } else {
            docs[module].Strings[key]['fr'] = i18nobj[key];
          }
        }
      } else {
        for(var key in i18nobj){
          if(!docs[module].Strings.hasOwnProperty(key)){
            docs[module].Strings[key] = {};
            docs[module].Strings[key]['en'] = i18nobj[key];
          } else {
            docs[module].Strings[key]['en'] = i18nobj[key];
          }
        }
      }
    }
//    for(key in i18nobj){
//      console.log(docs[module].Strings[key]);
//    }


//    addtocouch(dirs[dirs.length - 3], i18nobj);
//    files.push(stat.name);
  }
  next();
});

walker.on('end', function() {
  for(var key in docs) {
    db.save('locale-' + key, docs[key], function (err, res) {
      console.log(err);
    });

  }

});
