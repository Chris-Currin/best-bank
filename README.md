Directory of practice app for hackathon through Investec 2016

Installation
locate a desired folder (best-bank folder will be created inside it)
"git pull https://github.com/Chris-crisur/best-bank.git"
if this requires a username/password use your GitHub account. If unsuccessfull, download the zip and extract to a "best-bank" folder.

MongoDB installation
install mongodb from https://www.mongodb.org/downloads
start mongod.exe
start mongo.exe
set up dummy data:
    "use best-bank"
    "db.accounts.insert({name: "Chris",balance:1000,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "bike", target:200, current: 50}]});"
    "db.accounts.insert({name: "Mary",balance:10000,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "necklace", target:1000, current: 900},{goal:"skirt",target:50,current:0}]});"
    "db.accounts.insert({name: "Sally",balance:100,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "barbie doll", target:100, current: 10}]});"

NodeJs
ensure nodejs is installed.
in the best-bank folder type:
    "npm install"
    "npm update"

see models/Accounts.js for Schemas

if lost see https://thinkster.io/mean-stack-tutorial

Running
To run type:
    "npm start"
in the best-bank folder
In your browser go to http://localhost:3000
