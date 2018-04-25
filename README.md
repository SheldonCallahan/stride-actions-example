# Stride {app topic}

This is an example app for Atlassian Stride.

{describe app at a high-level}

## Getting set up

### Prerequisites

* Make sure you have [Node.js 8.x](https://nodejs.org/) or above on your machine
* Make sure you have the latest version of [ngrok](https://ngrok.com/) installed
* Sign up for an account on [https://developer.atlassian.com](https://developer.atlassian.com)
* In the upper right corner click on your avatar and click [Create app](https://developer.atlassian.com/apps/create). Give your app a name, there are no wrong names. You can ignore description and icon at this point.
* In the next step you'll be asked to Enable an Atlassian API for your app, click on **Enable API** for the Stride API.
* Once your app is created you need to:
  * Go into the 'App Features' tab and ensure that the **Enabled a bot account** checkbox is checked.
  * Go into the 'Enabled APIs' tab and copy the Stride API Client Id and Client Secret, we'll need this later.

### Running the app

* Clone this repository to your local machine.
* Open a terminal window and `cd` into your local repository and run ```npm install```.
* One npm finishes installing the node modules we can start up our app.  You can look in `package.json` for all the available scripts to run. We're going to start our app with logging turned on so we can see what's happening behind the scenes. Run `npm run verbose`.
* Now open a second terminal window and run ```ngrok http 3000```.  We need ngrok to expose our app running locally on our machine out to the internet so Stride can see it.
* Once ngrok starts up copy the https url from your ngrok output, this is where your app lives. You can get to the descriptor by navigating to the ngrok url + /descriptor (should look something like this `https://xxxxxxxx.ngrok.io/descriptor`)
* Go back to your app page on [https://developer.atlassian.com/apps](https://developer.atlassian.com/apps) and click on the app we created above
* Go into the 'Install' tab and paste your descriptor url in the *Descriptor Url* field.
* Click 'Refresh', you should see a green indicator
* Your app is now live and ready for use.

### Installing the app

* On the 'Install' tab, copy the **Installation URL**. This is the url we'll use to install the app in Stride.
* Go into a Stride room and click on the 'Apps' glance (the icon looks like a hexagon with a circle in the middle) on the right side of your screen, this will open up a sidebar.
* Click on the + icon at the top of the sidebar, this will open Strides app marketplace.
* Click on the 'Add custom app' link at the top of the page, this will open up a dialog where you can paste your installation URL. This will load your app's information into the dialog.
* Click 'Agree' to install the app.

### Seeing it in action

{TODO talk about what the user should expect to see when running this app}

## The code

There are a lot of files in the repository so lets get you to the right place in the code to look at what's going on.

### `{code file}`

{Walk them through the relevant code in this file}

{repeat and rinse}

### Tests

There are a couple of provided tests in this repository.  We're using [jest](https://facebook.github.io/jest/) to run our tests. You can find the tests in the __tests__ folders.

{Discuss the tests you've written}

## Need help

Need help with this sample code or want to ask a question about Stride app development?  Head over to the [Atlassian Developer Community](https://community.developer.atlassian.com/) and create a new topic in the [Stride Development Category](https://community.developer.atlassian.com/c/stride-development).
