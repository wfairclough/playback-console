Example app for creating a BlackBerry WebWorks App that uses the Rdio API

Using code from the rdio/playback-console repo I have repackaged it as a
BlackBerry WebWorks application. 

This project is bundled and runs on a blackberry device, but still with issues
running the Web Playback Flash API.


## Setup

Download the BlackBerry WebWorks SDK:
http://developer.blackberry.com/html5/download/

Get Device Signing Keys from BlackBerry:
https://www.blackberry.com/SignedKeys/codesigning.html

Add the SDK to the environment PATH variable. Example for OS X:
`export BB10_WW_HOME=/Developer/SDKs/Research\ In\ Motion/BlackBerry\ 10\ WebWorks\ SDK\ 1.0.4.11`
`export PATH=$PATH:$BB10_WW_HOME:$BB10_WW_HOME/dependencies/tools/bin/`

Configure the Makefile for your environment by changing the variables at the top of the file.
Then you must register, create a debug-token, and install the token on the development device.
I have included the command in the Makefile for this as well.

When ready to run on the device run the commands:

`make all`
`make deploy`


