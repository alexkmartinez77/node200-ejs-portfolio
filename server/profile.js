var express = require('express');
var router = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    const today = new Date();
    res.locals.date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    res.locals.time = today.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Today's Date: ${res.locals.date} Time: ${res.locals.time}`);
    next();
});
// define the home page route
router.get('/', function (req, res) {
  res.render('index');
});

// define the contact route
router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/about', function (req, res) {
    res.render('about');
});

// define the thanks route
router.route('/thanks')
    .post(function (req, res) {
        // This is the contact information posted by the contact.ejs form
        const contact = req.body;
        // If modifying these scopes, delete token.json, compared to the quick start example we left off .readonly because we want to write data as well.
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = '../token.json';
    
        // Load client secrets from a local file, it is possible that you will need to update the filepath to crednetials.json depending on where in your file structure you placed it. 
        fs.readFile('./server/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            //This uses the authorize function below, having passed in the function 'updateSheets' as the callabck. authorize() calls updateSheets once it's authorized and passes those credentials into uppdateSheets. 
            authorize(JSON.parse(content), updateSheets);
        });
        //Logs expiration date
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) console.log('Error obtaining Token Expiration Date');
            else {
                let expire = JSON.parse(token);
                console.log(`Token expires: ${new Date(expire.expiry_date).toISOString().substr(0, 10)}`)
            }
        });
    
        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         */
        function authorize(credentials, callback) {
            //As compared to the Quick start example we changed this to credentials.web because this is pulling data from the credentials.json file and the version of that file that google generates for us has 'web' as the object property. 
            const {client_secret, client_id, redirect_uris} = credentials.web;
    
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);
    
            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) return getNewToken(oAuth2Client, callback);
                oAuth2Client.setCredentials(JSON.parse(token));
    
                //calling the callback function which we have set to be 'updateSheets'
                callback(oAuth2Client);
            });
        }
    
        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * This function only runs when your token has expired, this function automatically runs to generate you a new one.
         */
        function getNewToken(oAuth2Client, callback) {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
    
            console.log('Authorize this app by visiting this url:', authUrl);
    
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
    
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err) return console.error('Error while trying to retrieve access token', err);
                    oAuth2Client.setCredentials(token);
    
                    // Store the token to disk for later program executions
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    });
    
                    callback(oAuth2Client);
                });
            });
        }
    
        /**
         * This is our function that is getting called as the callback from our authorize function. 
         */
        function updateSheets(auth) {
            const sheets = google.sheets({version: 'v4', auth});
            //This variable will need to be the 'Sheet ID' of the google sheet you created
            const mySpreadsheetId = '1dvc_Ezeg39yg8qRStHTP8ZG4Ns_x2qxxQ5YrjkAX95g';
    
            //this is the basic call to retreive data
            sheets.spreadsheets.values.get({
                spreadsheetId: mySpreadsheetId,
                range: 'Sheet1',
            }, (err, sheetRes) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = sheetRes.data.values;
                //This is setting a variable that is the current number or rows in your sheet, this will be useful so that you can append data on the next row as you need to manually specify which row you want data appended to.
                let existingRowsLength = rows.length;
                if (rows.length) {
                    console.log('********************* GOOGLE SHEET *********************');
                    // Print the existing sheet data to the terminal.
                    rows.map((row, index) => {
                        console.log(`Row ${index + 1}: ${row}`);
                    });
                    console.log('********************* GOOGLE SHEET *********************');
                } else {
                    console.log('No data found.');
                }
    
                //This section will append data, You will need to specify the values yourself rather than the place holders "1, 2, 3"
                let values = [
                    [
                        contact.firstName, contact.lastName, contact.email, res.locals.date, res.locals.time,
                    ],
                    //additional rows would go here if you require them
                ];
                const resource = {
                    values
                };
                //this is the funciton to append data, take note of the config variables as you will likely need to update or change them to customize what data you are appending to your sheet
                sheets.spreadsheets.values.update({
                    //your spreadsheet
                    spreadsheetId: mySpreadsheetId,
                    //The range in A1 notation of where you want to append, in this example it is using the current height of your sheet from the previous call to determine where to put the next row
                    range: `Sheet1!A${existingRowsLength + 1}`,
                    valueInputOption: "USER_ENTERED",
                    //This is the value of the variable resourse above that will be populated with the data you want to append to your sheet
                    resource
                }, (err, result) => {
                    if (err) {
                        //This will be firing if there was an error posting data, you should decide what you want to happen for the user on the front end if this happens and make it happen here. Most likely you will want tthem to stay on the same page and show them some sort of message. 
                        console.log(`Sheets update error: `, err);
                    } else {
                        console.log(`Result: `, result);
                        //This else statement will only be getting fired if you connected to the API correctly, posted your data and got a response back. This is the scenario where you will want to then forward your user on to the thanks page. 
                        res.render('thanks', { contact: req.body})
                    }
                })
    
            });
        }
    });

module.exports = router;