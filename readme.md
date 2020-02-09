#### _Created and mantained by Alejandro Fabian Campos_
#### _Contact: camposalejandrofabian@gmail.com_ 

### This is a personal project created with the purpose of practicing the integration of websockets (with socket.io specifically) in a Full Stack environment.

### **NOTE: this is a work in progress and isn't a fully implemented yet, as of 2020-02-09 the username association and create table systems are working.**

#### The steps to launch it locally would be: 

* Open a terminal (I assume you have Node@12~ with NPM, Git and Nodemon installed globally [To install Nodemon you can run `npm install nodemon -g`]).

* Clone the project from github, using https:  
`git clone https://github.com/AlejandroFabianCampos/tictactoeMultiplayer.git`

* Wait until it finishes cloning, then `cd tictactoeMultiplayer`.

* While on the project's root directory, create the server's `.env` file, this is where environment variables are set up. To help you out, the project is loaded with a `.env.sample` file that should have every possible variable defined and therefore you can copy and rename this file to `.env`. 

* Repeat this process inside the client's directory `/client`, copy and rename the `.env.sample` file to `.env`.

* Change the server's .env (located on the root directory of the project) APP_SECRET value to something pseudorandom with a higher number of characters (recommended to use some pseudorandom string generator). _**Note that this step is not necessary, but is important since this variable is used to encrypt/decrypt the JWTs and while using the default value, the info on the tokens can be easily read.**_ 

* Also, remember to checkout `.env.sample` files on each update as it is possible that at some point in the future they could require some confidential api key that for obvious reasons wont be asiggned or have a dummy value.

* Run `npm install` on the root directory, this will automatically download and config the server's dependencies.

* While being on the root directory of the project run `npm start`. This will start a nodemon instance (that autoreloads in case of the project's files being changed) of the node server that serves as the connection between users.

* On a new terminal `cd` into the project root/client.

* Run `npm install` inside this directory, it will set up the dependencies for the web client.

* Run `npm start`, this will set up a development server for the React spa, after a little while it should automatically open a tab on your default web browser pointing to localhost:3000 .

If everything ran correctly you should be able to navigate the webapp on localhost:3000 and create a user/table.
