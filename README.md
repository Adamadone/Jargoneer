# Jargoneer

My first project, a simple fullstack web app without a database (files are stored in json), where you can store and create word definitions (basically a dictionary) for niche jargon.

I got the idea for this app when I started my first job in IT working for a bank and I didn't understand a lot of the shortcuts and words my coworkers were using. The documentation and implementation of this app was also a part of my university studies.

## Frontend documentation

This is the component diagram of the entire frontend of the app, at first glance you can see a few modals for creating a new word definition, the process of where and how you can add a comment, and everything else you can do.

![frontend-component-diagram](https://github.com/user-attachments/assets/b03e0b05-7c42-4260-bce1-9f93c958262b)

## Backend documentation
This the schema and DAO method list for my main use case, a word definition (ignore the 'uuObject' etc. in the parentheses, it is my uni's special naming system).
For this main object, I implemented a:
* GET request that fetches data about an existing definition from the backend
* CREATE call that inserts a new object with given parameters into the "database" (local storage in json)
* LIST method which lets the user see the definitions next to each other in the program
* REMOVE call, which, well, removes the object
* UPDATE call, which modifies data in the object based on a 16 byte hex id

![backend-schema-DAO](https://github.com/user-attachments/assets/07783115-18d2-4c84-8d68-125183eabf3a)

Every single call also has data validation, so that faulty data doesn't make it into the database. For example, this is an in-depth look into the definition/create call.

![definition-create](https://github.com/user-attachments/assets/38a30b06-cee9-4201-a91c-ad02256d0b8a)

## Installation
Clone the project and run
```
npm install
```
in both the server and client folder. Afterwards, run 
```
npm start
```
with the server folder selected in your terminal and afterwards run it in the client folder. You've successfully run my program.
