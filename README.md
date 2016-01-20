# Directory of practice app for hackathon through Investec 2016

## Installation
1. locate a desired folder (best-bank folder will be created inside it)
2. in the command line type (assuming git is installed):

```
git pull https://github.com/Chris-crisur/best-bank.git
```

3. if this requires a username/password use your GitHub account. If unsuccessfull, download the zip and extract to a "best-bank" folder.

## MongoDB installation
1. install mongodb from [https://www.mongodb.org/downloads](https://www.mongodb.org/downloads)
2. start mongod.exe
3. start mongo.exe
4. set up dummy data (in mongo.exe window):

```
$ use best-bank
```

$ db.accounts.insert({name: "Chris",balance:1000,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "bike", target:200, current: 50}]});
$ db.accounts.insert({name: "Mary",balance:10000,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "necklace", target:1000, current: 900},{goal:"skirt",target:50,current:0}]});
$ db.accounts.insert({name: "Sally",balance:100,pendingTransactions:[],lastLogin: new Date(2016,01,12,10,0,0), goals:[{goal: "barbie doll", target:100, current: 10}]});


## NodeJs
1. ensure nodejs is installed.
2. in the best-bank folder type:

```
$ npm install
```

```
$ npm update
```

see models/Accounts.js for Schemas

if lost see https://thinkster.io/mean-stack-tutorial

## Running
1. To run type:
`$ npm start`
under the best-bank folder
2. In your browser go to [http://localhost:3000](http://localhost:3000)
