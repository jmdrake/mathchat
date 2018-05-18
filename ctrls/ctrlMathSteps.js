var dbMath = new PouchDB("https://ncoudeadentrockedgmenden:cf6f11d45378cbe2e8a54340113e6a006453ad97@55644244-4beb-4ca8-b177-8ff6d5c3cc0b-bluemix.cloudant.com/mathchat"); 

function ctrlsMathStepsRetrieveAll(parent, callback){
    var results = [];
    dbMath.allDocs({include_docs: true}, function(err, doc) {
        for(var i=0; i<doc.rows.length; i++) {
            if(doc.rows[i].doc["parent"]==parent)
                results[results.length] = doc.rows[i].doc;
        }
        callback(results);
    });
}

function ctrlsMathStepsAdd(text, parent, callback) {
    var newStep = mathStepTemplate;
    newStep["text"] = text;
    newStep["_id"] = Date.now().toString();
    newStep["parent"] = parent == "" ? null : parent;
    dbMath.put(newStep).then(function(response){
        dbMath.get(response.id).then(function(newDoc){
            callback(newDoc)
        })
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsMathStepsRetrieveStep(id, callback){
    dbMath.get(id).then(function(doc){
        callback(doc)
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsMathStepsUpdateStep(doc){
    dbMath.put(doc).catch(function(err){console.log(err)});
}

function ctrlsMathStepsDeleteStep(task) {
    dbMath.remove(task).catch(function(err){console.log(err)});
}
