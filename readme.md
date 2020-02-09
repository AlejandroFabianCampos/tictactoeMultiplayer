#### _Created and mantained by Alejandro Fabian Campos_
#### _Contact: camposalejandrofabian@gmail.com_ 

### This is a personal project created with the purpose of practicing the integration of websockets (with socket.io specifically) in a Full Stack environment.

### **NOTE: this is a work in progress and isn't a fully implemented yet, as of 2020-02-09 the username association and create table systems are working.**

#### The steps to launch it locally would be: 

* Open a terminal (I assume you have Node@12~ with NPM, git and nodemon installed globally [To install the last one you can run `npm install nodemon -g`]).

* Clone the project from github, using https this would be done like:  
`git clone https://github.com/AlejandroFabianCampos/tictactoeMultiplayer.git`

* Wait until it finishes cloning, then `cd tictactoeMultiplayer`.

* Set up the server's .env file, this is where environment variables are setup, to help you out, the project is loaded with a `.env.sample` file that should have every possible variable defined and therefore you can copy and rename this file to `.env`. Change the APP_SECRET value for something pseudorandom with a higher number of characters (recommended to use some pseudorandom string generator) since this variable is used to encrypt/decrypt the JWTs. Also, remember to checkout `.env.sample` on each update as it is possible that at some point in the future it could require some confidential api key that for obvious reasons wont be asiggned or have a dummy value.

* Repeat this process with the client's `.env` by copying and renaming `.env.sample`. Remember to checkout `.env.sample` on each update as it is possible that at some point in the future it could require some confidential api key that for obvious reasons wont be asiggned.

* While being on the root directory of the project run `npm start`. This will start a nodemon instance (that autoreloads in case of the files being changed) of the node server that serves as the connection between users.

* On a new terminal `cd` into the project root/client.

* Run `npm install` inside this directory, it will set up the dependencies for the web client.

* Run `npm start`, this will set up a development server for the React spa, after a little while it should automatically open a tab on your default web browser pointing to localhost:3000 .

* If everything ran correctly you should be able to navigate the webapp on localhost:3000 and create a user/table.
