## General info
Your one stop meme application.


## Technologies
Project is created with:
* Reactjs, Semantic UI (Frontend)
* Nodejs, Express (Backend)
* Mongodb (Database)

## Directory Structure

### Frontend

* src
  * assets: Contains assets like images which are to be served.
  * components: Contains various react components which are to be used in the project
  * containers: Contains the containers which uses components to make different pages.
  * axios-meme.js: Instantiates the axios with defined base URL
  * index.js: entry point of the react app
  
* public: contains all the static assets like html and favicons which are to be served

### Backend
* src
  * db/mongoose.js: Configures the database.
  * models: Defines different mongoose models.
  * routers: Defines routers for the main express app.
  * app.js: Instantiates and configures the main app.
  
## Setup
To run this project, install it locally using npm:

### Backend (assuming in the root directory)

Then
For development
```
$ cd ./
$ npm install
$ npm start
```

### Frontend (assuming in the root directory)

```
$ cd ./
$ npm install
$ npm start
```
