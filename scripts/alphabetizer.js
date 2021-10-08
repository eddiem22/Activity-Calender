//this function will alphabetize people based on filename
function abcPeoplePics(){
    console.log(`now alphabetizing the people images...`);
    //1. make a get request for current user setting info
    //make AJAX request to get current data
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        console.log('ReadyState: ' + xhr.readyState);
        if (xhr.readyState <= 3) {
            console.log('loading');
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`Success!\n${xhr.responseText}`);
            //var settings = localStorage.setItem('userSettings', xhr.responseText);
            var peopleJSON = JSON.parse(xhr.responseText);
            console.log(peopleJSON);
            //2. append images based on new sorted list into table row
            var peopleTableRow = document.querySelector("#people-imgs-row");
            peopleJSON.forEach((item, index)=>{
                console.log(`PEOPLE ${index}: ${item}`);
                var tableDiv = document.createElement("td");
                var img = document.createElement("img");
                img.src = item;
                img.classList.add("img-lib");
                img.setAttribute("onmousedown", "clickDrag()");
                tableDiv.appendChild(img);
                peopleTableRow.appendChild(tableDiv);
            });
            console.log(peopleTableRow);
            console.log("finished!");
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
    xhr.open("GET", "https://ac-db-server2.aaknox.repl.co/abc-people", true);
    xhr.send();
}

//this function will alphabetize transportation images based on filename
function abcTransportPics(){
    console.log(`now alphabetizing the transportation images...`);
    //1. make a get request for current user setting info
    //make AJAX request to get current data
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        console.log('ReadyState: ' + xhr.readyState);
        if (xhr.readyState <= 3) {
            console.log('loading');
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`Success!\n${xhr.responseText}`);
            //var settings = localStorage.setItem('userSettings', xhr.responseText);
            var transportJSON = JSON.parse(xhr.responseText);
            console.log(transportJSON);
            //2. append images based on new sorted list into table row
            var transportTableRow = document.querySelector("#transport-imgs-row");
            transportJSON.forEach((item, index)=>{
                console.log(`TRANSPORT ${index}: ${item}`);
                var tableDiv = document.createElement("td");
                var img = document.createElement("img");
                img.src = item;
                img.classList.add("img-lib");
                img.setAttribute("onmousedown", "clickDrag()");
                tableDiv.appendChild(img);
                transportTableRow.appendChild(tableDiv);
            });
            console.log(transportTableRow);
            console.log("finished!");
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
    xhr.open("GET", "https://ac-db-server2.aaknox.repl.co/abc-transport", true);
    xhr.send();
}

function abcActivityPics(){
    console.log(`now alphabetizing the activity images...`);
    //1. make a get request for current user setting info
    //make AJAX request to get current data
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        console.log('ReadyState: ' + xhr.readyState);
        if (xhr.readyState <= 3) {
            console.log('loading');
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`Success!\n${xhr.responseText}`);
            //var settings = localStorage.setItem('userSettings', xhr.responseText);
            var activityJSON = JSON.parse(xhr.responseText);
            console.log(activityJSON);
            //2. append images based on new sorted list into table row
            var activityTableRow = document.querySelector("#activity-imgs-row");
            activityJSON.forEach((item, index)=>{
                console.log(`ACTIVITY ${index}: ${item}`);
                var tableDiv = document.createElement("td");
                var img = document.createElement("img");
                img.src = item;
                img.classList.add("img-lib");
                img.setAttribute("onmousedown", "clickDrag()");
                tableDiv.appendChild(img);
                activityTableRow.appendChild(tableDiv);
            });
            console.log(activityTableRow);
            console.log("finished!");
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
    xhr.open("GET", "https://ac-db-server2.aaknox.repl.co/abc-activity", true);
    xhr.send();
}

//call all alphabetizer methods at startup
console.log("1");
abcPeoplePics();
setTimeout(()=>{
    console.log("2");
    abcTransportPics();
    setTimeout(()=>{
        console.log("3");
        abcActivityPics()
    }, 2000);
}, 5000);

