var dbMath = new PouchDB("https://ncoudeadentrockedgmenden:cf6f11d45378cbe2e8a54340113e6a006453ad97@55644244-4beb-4ca8-b177-8ff6d5c3cc0b-bluemix.cloudant.com/mathchat"); 

function ctrlsTasksGetTaskList(parent, callback){
    var results = [];
    dbMath.allDocs({include_docs: true}, function(err, doc) {
        for(i=0; i<doc.rows.length; i++) {
            if(doc.rows[i].doc["parent"]==parent)
                results[results.length] = doc.rows[i].doc;
        }
        callback(results);
    });
}

function ctrlsTasksAddTask(name, parent, callback) {
    var newTask = mathStepTemplate;
    newTask["name"] = name;
    newTask["_id"] = Date.now().toString();
    newTask["parent"] = parent == "" ? null : parent;
    dbMath.put(newTask).then(function(response){
        dbMath.get(response.id).then(function(newDoc){
            callback(newDoc)
        })
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsTasksGetTask(id, callback){
    dbMath.get(id).then(function(doc){
        callback(doc)
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsTasksUpdateTask(doc){
    dbMath.put(doc).catch(function(err){console.log(err)});
}

function ctrlsTasksDeleteTask(task) {
    dbMath.remove(task).catch(function(err){console.log(err)});
}
