# README #

## What is this? ##

This is an example app for Atlassian Stride.
This app shows how you can use actions to open a modal window in stride.
## How do I get set up? ##

### Prerequisites ###

* Make sure you have node 8.9.x or above on your machine
* Make sure you have the latest version of ngrok installed
* Sign up for an account on [https://developer.atlassian.com](https://developer.atlassian.com)
* [Create a new app](https://developer.atlassian.com/apps/create). Let's call it the 'Stride Actions Example App'. 
* Once your app is created you need to:
  * Go into the 'App Features' tab and enabled the bot account for your app.
  * Go into the 'Enabled APIs' tab and copy the Stride API Client Id and Client Secret, we'll need this later.

### Running the app ###

* Clone this repository to your local machine.
* Open a terminal window and go into your local repository to run ```npm install```.
* Once that command is finished you'll need to run ```PORT=3333 CLIENT_ID={clientId} CLIENT_SECRET={clientSecret} node app.js```
* Now open a second terminal window and run ```ngrok http 3333```.
* Copy the https url from your Ngrok output, this is where your descriptor lives.
* Go back to your app page on [https://developer.atlassian.com/apps](https://developer.atlassian.com/apps)
* Go into the 'Install' tab and paste your ngrok url in the Descriptor url field.
* Click 'Refresh'
* You app is now live and ready for use.

### Installing the app ###

* Copy the installation url from your 'Install' tab in your app page.
* Go into a Stride room and click on the 'Apps' glance on the right side of your screen, this will open up a sidebar.
* Click on the + icon at the top of the sidebar, this will open internal marketplace and show the installed apps for your Stride room.
* Click on the 'Add custom app' link at the top of the page, this will open up a dialog where you can paster your installation URL. This will load your app's information into the dialog.
* Click 'Agree' to install the app.

### Seeing it in action ###

* Mention the app in your room and it will send a message with an application card and a "view dialog" link.Clicking this will open the dialog modal
* Mention the word "action" and a message link that will open a dialog will appear. Clicking this will open the dialog modal
* Click on the "meatball" menu on the right side of the message input and you will see an option for "Open Dialog". Clicking this will open the dialog modal.
* On any submitted message text you can click on the "meatball" menu on the right side of the message text and you will see and option for "Send to Dialog"