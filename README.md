************RESOURCES***********
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
https://www.youtube.com/watch?v=2yddJwL1Tpg&amp;t=263s


# klack
A basic messaging service written with NodeJS+Express, with a web client using the Fetch API.

## Step one
Clone it to your machine.

## Step two
Install the dependencies (Express) by running:

    npm install

## Step three
Find your IP address on the local network. On OS X, you may be able to do this by running:

    ifconfig | grep inet
    
which should yield a line of output like:

    inet 192.168.1.106 netmask 0xffffff00 broadcast 192.168.1.255

OR by opening the network preferences dialog and looking for the message
"Wi-Fi is connected to <NETWORKNAME> and has the IP address **192.168.1.106**."

## Step four
Run the app with the command:

    node app

## Step five
Connect to http://**your.IP.address.here**:3000/ from your web browser AND from your friends and neighbors browsers!
This is a multiuser messaging app, the more the merrier.
Enter a nickname at the prompt upon loading the page.

![Screenshot of klack client](/screenshot-klack.png)


**********RUBRIC**************

* Your app should connect to a MongoDB database named klack. 2.0 pts
* Your app defines a Message model with an appropriate schema. 2.0 pts
* Every posted message to klack gets stored as an instance of the Message model.2.
* When the Node.js server for klack is exited and restarted, message history should be preserved. 2.0 pts
* Last active times for users (used to show which users have been recently active) should also be based on the message history in MongoDB and should persist across restarts of the server. 2.0 pts
Total Points: 10.0
