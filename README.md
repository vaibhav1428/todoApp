# Todo Application

The Todo application provides a set of CRUD (Create, Read, Update, Delete) operations that can be tested using Postman. These operations allow you to manage your tasks effectively by creating new tasks, retrieving existing tasks, updating task details, and deleting tasks. Use Postman to interact with the API endpoints and verify the functionality of each operation.

---
## Requirements

For development, you will only need Node.js , postgress and a node global package, Yarn, installed in your environement.

## API Documentation 

For Postman documentation
 https://documenter.getpostman.com/view/10993065/2sA3XQhh68#d674771c-cefe-4978-a292-9799d1c77205

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm


- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.11.3

    $ npm --version
    8.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/vaibhav1428/todoApp.git
    $ cd todoApp
    $ npm install

## Configure app
- To configure the application, copy `env.example` and create a `.env` file with the same settings.
- Import the  postman file from `postman/`
- Additionally, take the database from `project/db/` and import it into your PostgreSQL instance.


## Running the project

 #### For development mode
    $ yarn dev
    
 #### For prod development mode
    $ yarn dev-prod 
    
 #### For production mode
    $ yarn start  

