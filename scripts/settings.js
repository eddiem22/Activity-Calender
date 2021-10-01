/*
 * Activity Calendar App
 * 2021-09-12
 * PM: Jack Everard
 * Developers: Vaaranan Yogalingam, Kyle Flores, Azhya Knox
 * 
*/

var peopleFileList = localStorage.getItem("peoplePics");

function selectPeopleFolder(e) {
    var arr = []
    var theFiles = e.target.files;
    Array.prototype.forEach.call(theFiles, file =>{
        arr.push(file.name);
    });
    localStorage.setItem("peopleFiles", arr);
    var relativePath = theFiles[0].webkitRelativePath;
    var pathShower = document.querySelector(".people-folder-path");
    var folder = relativePath.split("/");
    var folderPath = `C:/documents/activity calender/images/${folder[0]}`
    localStorage.setItem("peopleFolder", folder[0]);
    pathShower.innerHTML = folderPath;
    //now saving folderPath to app-settings.json
    saveToJsonFile(folderPath, "PEOPLE");
}

function selectTransportFolder(e) {
    var arr2 = []
    var theFiles = e.target.files;
    Array.prototype.forEach.call(theFiles, file =>{
        arr2.push(file.name);
    });
    localStorage.setItem("transportFiles", arr2);
    var relativePath = theFiles[0].webkitRelativePath;
    var pathShower = document.querySelector(".transport-folder-path");
    var folder = relativePath.split("/");
    var folderPath = `C:/documents/activity calender/images/${folder[0]}`
    localStorage.setItem("transportFolder", folder[0]);
    pathShower.innerHTML = folderPath;
    //now saving folderPath to app-settings.json
    saveToJsonFile(folderPath, "TRANSPORT");
}

function selectPopularFolder(e) {
    var arr4 = []
    var theFiles = e.target.files;
    Array.prototype.forEach.call(theFiles, file =>{
        arr4.push(file.name);
    });
    localStorage.setItem("popularFiles", arr4);
    var relativePath = theFiles[0].webkitRelativePath;
    var pathShower = document.querySelector(".popular-folder-path");
    var folder = relativePath.split("/");
    var folderPath = `C:/documents/activity calender/images/${folder[0]}`
    localStorage.setItem("popularFolder", folder[0]);
    pathShower.innerHTML = folderPath;
    //now saving folderPath to app-settings.json
    saveToJsonFile(folderPath, "POPULAR");
}

function selectActivityFolder(e) {
    var arr3 = []
    var theFiles = e.target.files;
    Array.prototype.forEach.call(theFiles, file =>{
        arr3.push(file.name);
    });
    localStorage.setItem("activityFiles", arr3);
    var relativePath = theFiles[0].webkitRelativePath;
    var pathShower = document.querySelector(".activity-folder-path");
    var folder = relativePath.split("/");
    var folderPath = `C:/documents/activity calender/images/${folder[0]}`
    localStorage.setItem("activityFolder", folder[0]);
    pathShower.innerHTML = folderPath;
    //now saving folderPath to app-settings.json
    saveToJsonFile(folderPath, "ACTIVITY");
}

function saveToJsonFile(folderStr, locationType){
    //make object
    let temp2 = localStorage.getItem('userSettings');
    console.log(`Temp test:\n${temp2}`);
    let temp2Obj = JSON.parse(temp2);
    let settingsTemp = {
        image_folder_settings: [
          {
            activity_folder_location: temp2Obj.image_folder_settings[0].activity_folder_location,
            people_folder_location: temp2Obj.image_folder_settings[0].people_folder_location,
            popular_folder_location: temp2Obj.image_folder_settings[0].popular_folder_location,
            transport_folder_location: temp2Obj.image_folder_settings[0].transport_folder_location
          }
        ],
        last_modified: temp2Obj.last_modified
      };

    //read json file for previous saved data
    //fill template with enclosed data
    setTimeout(()=>{
        //get current datetime
        var currentdate = new Date();
        settingsTemp.last_modified = `${currentdate.getMonth()}/${currentdate.getDay()}/${currentdate.getFullYear()} `+
        `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

        //based on location type, modify template to accept new changes
        switch (locationType) {
            case "PEOPLE":
                console.log("editing people folder location...");
                settingsTemp.image_folder_settings[0].people_folder_location = folderStr;
                console.log(`temp being saved:\n ${JSON.stringify(settingsTemp)}`)
                save(settingsTemp);
                break;
            case "TRANSPORT":
                console.log("editing transport folder location...");
                settingsTemp.image_folder_settings[0].transport_folder_location = folderStr;
                console.log(`temp being saved:\n ${JSON.stringify(settingsTemp)}`)
                save(settingsTemp);
                break;
            case "POPULAR":
                console.log("editing popular folder location...");
                settingsTemp.image_folder_settings[0].popular_folder_location = folderStr;
                console.log(`temp being saved:\n ${JSON.stringify(settingsTemp)}`)
                save(settingsTemp);
                break;
            case "ACTIVITY":
                console.log("editing activity folder location...");
                settingsTemp.image_folder_settings[0].activity_folder_location = folderStr;
                console.log(`temp being saved:\n ${JSON.stringify(settingsTemp)}`)
                save(settingsTemp);
                break;
            default:
                break;
        }
    }, 3000);
}

//send new json data to overwrite json file
function save(temp){
    console.log("now saving settings...");
    console.log(temp);
    setTimeout(()=>{
        var newData = JSON.stringify(temp);
        localStorage.setItem("userSettings", newData);
        var data = JSON.parse(localStorage.getItem("userSettings"));
        console.log(data);
        //now that I have JSON data --> make POST request to server
        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://ac-db-server2.aaknox.repl.co/save", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
        //all done!
        console.log("done");
    }, 1000);
}

//return to index.html page
function returnToMain(){
    window.history.back();
}

function initializeSettings(){
    var myLocation = window.location.href;
    var url = myLocation.split("/");
    var page = url[url.length - 1];
    if(page === "settings.html"){
        console.log("i'm in the settings page");
        var locationDisplays = document.querySelectorAll(".paths");
        //make AJAX request to get current data
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            console.log('ReadyState: ' + xhr.readyState);
            if (xhr.readyState <= 3) {
                console.log('loading');
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(`Success!\n${xhr.responseText}`);
                var settings = localStorage.setItem('userSettings', xhr.responseText);
                var settingsJSON = JSON.parse(xhr.responseText);
                //now load the data into the spans
                locationDisplays[0].innerHTML = settingsJSON.image_folder_settings[0].people_folder_location;
                locationDisplays[1].innerHTML = settingsJSON.image_folder_settings[0].transport_folder_location;
                locationDisplays[2].innerHTML = settingsJSON.image_folder_settings[0].popular_folder_location;
                locationDisplays[3].innerHTML = settingsJSON.image_folder_settings[0].activity_folder_location;
            }
            if (xhr.readyState === 4 && xhr.status !== 200) {
                console.log("Failed. Status Code: " + xhr.status)
                var reason = {
                    code: xhr.status,
                    issue: 'Failed to load table data from server.'
                    //redirect to error page
                };
                console.log(reason);
                sessionStorage.setItem('failMessage', JSON.stringify(reason));
                console.log(sessionStorage.getItem('failMessage'));
            }
            console.log("Processing")
        };
        xhr.open("GET", "https://ac-db-server2.aaknox.repl.co/settings", true);
        xhr.send();
    }else{
        console.log("not the settings page");
    }
}

initializeSettings();