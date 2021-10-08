const p= require('./readfile');
var data = 'raw_data.json';
var file = p.get(data);


exports.getPeople = function getPeopleList() {
    var peopleList = [];
    for(i in file['people_list'])
    {
        peopleList[i]= file['people_list'][i];
    }
    return peopleList;
}

exports.getAll = function getEverything() {
    var Everything = [];
    for(i in file)
    {
        Everything[i]= file[i];
    }
    return Everything;
}

exports.getTransportation = function getTransportList() {
    var transportList = [];
    for(i in file['transport_list'])
    {
        transportList[i]= file['transport_list'][i];
    }
    return transportList;
}

exports.getActivities = function getActivityList() 
{
    var activityList = [];
    for(i in file['activity_list'])
    {
        activityList[i]= file['activity_list'][i];
    }
    return activityList;
}

/*
var PeopleImages = this.getPeople();
var TransportationImages = this.getTransportation();
var ActivitiesImages = this.getActivities();
console.log(PeopleImages);
console.log(TransportationImages);
console.log(ActivitiesImages);
console.log(PeopleImages[0].name);
console.log(PeopleImages[0].URL);
var e = this.getAll();
console.log(e);
*/