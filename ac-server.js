const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const getUserIP = require('./utils/getUserIP');
const jsonread = require('./utils/readfile');
const lists = require('./utils/getLists');

// Load environment variables
dotenv.config({ path: './config/config.env'});

// Database
const db = require('./config/db');
const Settings = require('./models/Settings');

// Connect database
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
      } catch (err) {
        console.log('Database error: ' + err.message);
      }
}

// Initialize server
const app = express();

// Body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set views folder
app.set('views', path.join(__dirname, 'public'));

// Map EJS to HTML files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const settingsjson = './_data/settings.json';

// Populate image lists
/*
let PeopleList = lists.getPeople();
let TransportationList= lists.getTransportation();
let PopularList = lists.getPopular();
let ActivitiesList = lists.getActivities();
let all_images = lists.getAll();
let settings = jsonread.get(settingsjson);
*/

/* Routes */

// Create User
// POST /api/users
// If IP exists, get user. If not, create user
app.post('/api/users', async (req, res) => {
    // get current User's IP
    const userIP = getUserIP(req, res);

    // Find or Create User
    const [existingUser, newUser] = await User.findOrCreate({ where: { ipAddress: userIP} });
    
    // If existing user was found respond with user data
    if (existingUser) return res.status(200).json({ success: true, data: existingUser});
    
    // Else respond with new user data
    else res.status(201).json({ success: true, data: newUser})
});

// Update Settings
// PUT /api/users/:userId/settings
// Update settings with new file path, or create setting if it doesn't exist
app.put('/api/users/:userId/settings', async (req, res) => {
    // set requested user to entered user id
    const reqUser = await User.findByPk(req.params.userId);

    // get current User's IP
    const userIP = getUserIP(req, res);

    // if current IP doesn't match requested user's IP, block access to settings
    if (reqUser.ipAddress !== userIP) return res.status(401).json({ success: false, msg: 'Unauthorized'});

    /********************************************************************************
     * 
    We need a way to get the selected path and store it here from request data
     *
    *********************************************************************************/
    const newLocation;

    // Find settings
    let settings = await Project.findOne({ where: { userId: reqUser.id } });

    // Initialize status code to be returned
    let statusCode;
    // If settings exist, update and reload
    if (settings) {
        settings.folderLocation = newLocation;
        await settings.reload();
        statusCode = 200;
    // else create new settings
    } else {
        settings = await Settings.create({ 
            folderLocation: newLocation,
            userId: reqUser.id,
        });
        statusCode = 201;
    }

    // Respond with status code and settings
    res.status(statusCode).json({ success: true, data: settings })
});

// default path for node app -> opens on index.html
app.get('*', async (req, res) => {
    // initialize user
    let user;

    // make post request to /api/users on page load
    // set user from post response
    await fetch('/api/users', { method: 'POST' })
        .then(res => res.json())
        .then(data => user = data)
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: 'Something went wrong'});
        });

    // make put request to /api/users/:userId/settings
    // set settings from put response
    await fetch(`/api/users/${user.id}/settings`, { method: 'PUT' })
        .then(res => res.json())
        .then(data => settings = data)
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: 'Something went wrong'});
        });

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