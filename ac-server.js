const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const database = require('./config/db')
const jsonread = require('./readfile')
const lists = require('./getLists');

const User = require('./models/User');
const Image = require('./models/Image');

// Load environment variables
dotenv.config({ path: './config/config.env'});

// Connect database
database();

// Initialize server
const app = express();

// Body parser
app.use(express.urlencoded({extended: true}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set views folder
app.set('views', path.join(__dirname, 'public'));

// Map EJS to HTML files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const settingsjson = 'settings.json';

// Populate image lists
let PeopleList = lists.getPeople();
let TransportationList= lists.getTransportation();
let PopularList = lists.getPopular();
let ActivitiesList = lists.getActivities();
let all_images = lists.getAll();
let settings = jsonread.get(settingsjson);

/* Routes */

// POST /users
// If ip doesn't belong to a user, create new user with ip
app.post('/users', async (req, res) => {
    try {
        let userIP = req.header('x-forwarded-for') || req.socket.remoteAddress;
    } catch (err) {
        res.status(400).json({success: false, msg: "Couldn't get user ip address"})
    }
    
    const savedUser = await User.findOne({ ip: userIP });

    if (savedUser) res.status(200).json({ success: true, data: savedUser, msg: `Getting user ${savedUser.id}` });
    
    const user = await User.create({ ip: userIP });
    res.status(201).json({ success: true, data: user });
});

// default path for node app -> opens on index.html
app.get('*', function(req, res){
    res.render('index.html');
});

/*
// Get settings page
app.get('/settings', function(req, res) {
    res.render(settings);
    console.log(settings);
});

// Get all people images in alphabetical order
app.get('/abc-people', function(req, res) {
    res.render(PeopleList);
    console.log(PeopleList);
});

// Get all transport images in alphabetical order
app.get('/abc-transport', function(req, res){
    res.render(TransportationList);
    console.log(TransportationList);
});

// Get all popular images in alphabetical order
// Would be a separate field for existing objects?
app.get('/popular', function(req, res) {
    res.render(PopularList);
    console.log(PopularList);
});

// Get all activity images in alphabetical order
app.get('/abc-activity', function(req, res) {
     res.render(ActivitiesList);
     console.log(ActivitiesList);
});

// Get all images in alphabetical order
app.get('/all', function(req, res) {
     res.render(all_images);
     console.log(all_images);
});
*/

/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
10. (POST) https://<host-name>:<port-number>/:<user-address>/this-week/save -> saves progress on thisWeek calendar for logged in user
11. (POST) https://<host-name>:<port-number>/:<user-address>/next-week/save -> saves progress on nextWeek calendar for logged in user
12. (POST) https://<host-name>:<port-number>/:<user-address>/settings/save -> saves settings (aka folder locations on local machine) for logged in user
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set port
app.set('port', (process.env.PORT || 5000));

// Launch server
app.listen(app.get('port'), function() {
    console.log(`Activity Calendar server listening on port ${app.get('port')}`);
});