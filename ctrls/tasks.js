var db = new PouchDB("https://visionpartners:CdMd0215@visionpartners.cloudant.com/timetasker"); 

function ctrlsTasksGetTaskList(parent, callback){
    var results = [];
    db.allDocs({include_docs: true}, function(err, doc) {
        for(i=0; i<doc.rows.length; i++) {
            if(doc.rows[i].doc["parent"]==parent)
                results[results.length] = doc.rows[i].doc;
        }
        callback(results);
    });
}

function ctrlsTasksAddTask(name, parent, callback) {
    var newTask = modelsTasksTaskTemplate;
    newTask["name"] = name;
    newTask["_id"] = Date.now().toString();
    newTask["parent"] = parent == "" ? null : parent;
    db.put(newTask).then(function(response){
        db.get(response.id).then(function(newDoc){
            callback(newDoc)
        })
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsTasksGetTask(id, callback){
    db.get(id).then(function(doc){
        callback(doc)
    }).catch(function (err) {
        console.log(err);
    });
}

function ctrlsTasksUpdateTask(doc){
    db.put(doc).catch(function(err){console.log(err)});
}

function ctrlsTasksDeleteTask(task) {
    db.remove(task).catch(function(err){console.log(err)});
}
