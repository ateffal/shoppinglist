const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;


//Listen for app to be ready
app.on('ready', function() {
    //Create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
        

    }));

    //Quit app when closed
    mainWindow.on('closed', function(){

        app.quit();
    })

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);

});

function createAddWindows() {

    addWindow = new BrowserWindow({

        width: 200,
        height: 250,
        title: 'Add Shopping List Item'
    });
    //Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
        

    }));

    //Garbage collection handle
    addWindow.on('close', function() {
        addWindow = null;
    })

}

//Create menu template
const mainMenuTemplate = [

    {
        label: 'File',
        submenu: [
            {
                label: 'Add item',
                click(){
                    createAddWindows();
                } 
            },
            {
                label: 'Clear items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
                click() {app.quit();}
            }

        ]
    }
];



//Add developer tools item if not in prod
if(process.env.MODE_ENV !='production') {

    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
            
        },
        {
            role : 'reload'
        }
    
    ]

    })
}