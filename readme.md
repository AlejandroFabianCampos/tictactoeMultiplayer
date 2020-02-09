### Created and mantained by Alejandro Fabian Campos. Contact: camposalejandrofabian@gmail.com .

#### This is a personal project created with the purpose of practicing the integration of websockets (with socket.io specifically) in a Full Stack environment.

#### **NOTE: this is a work in progress and isn't a full implementation yet, as of 2020-02-09 the username asociation and create table systems are working.**

##### The steps to launch it locally would be: 

Open a terminal (I assume you have installed Node@12~ with NPM, and git, also have nodemon installed globally (if you don't have it  you can run `npm install nodemon -g`).

Clone the project from github (using https this would be done with `git clone https://github.com/AlejandroFabianCampos/tictactoeMultiplayer.git`).

After it finishes cloning `cd tictactoeMultiplayer`.

Set up the server's .env file, this is where environment variables are setup, to help you out, the project is loaded with a .env.sample file that should have every possible variable defined and therefore you can copy this file as .env . Change the APP_SECRET value for something pseudorandom with a higher number of characters (recommended to use some pseudorandom string generator) since this variable is used to encrypt/decrypt the JWTs. Also, remember to checkout .env.sample on each update as it is possible that at some point in the future it could require some confidential api key that for obvious reasons wont be asiggned.

Repeat this process with the client's .env by copying and renaming .env.sample. Remember to checkout .env.sample on each update as it is possible that at some point in the future it could require some confidential api key that for obvious reasons wont be asiggned.

While being on the root directory of the project run `npm start`. This will start a nodemon instance (that autoreloads in case of the files being changed) of the node server that serves as the connection between users.

On a new terminal `cd` into the project root/client.

Run `npm install` inside this directory, it will set up the dependencies for the web client.

Run `npm start`, this will set up a development server for the React spa, after a little while it should automatically open a tab on your default web browser pointing to localhost:3000 .

If everything ran correctly you should be able to navigate the webapp on localhost:3000 and create a user/table.
