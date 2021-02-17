const faker = require('faker');
const fs = require('fs');
const express = require('express');
const app = express();

class Faker {
    constructor(){
        this.fakerData = {"people":[]};
    }

    generateData(){
        let counter = 1;
        while(counter <= 100){
            let firstName = faker.name.firstName();
            let lastName  = faker.name.lastName();
            let fullName  = `${firstName} ${lastName}`
            let email     = firstName.toLowerCase()+lastName.toLowerCase()+'@example.com';
            this.fakerData.people.push({"id": counter, "first_name": firstName, "last_name": lastName,"full_name": fullName, "email": email});
            counter++;
        }
        
        let data = JSON.stringify(this.fakerData,null, 2);
        return data;
    }
}


app.get('/people', (req, res) => {
    fs.readFile('./faker-data.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.get('/people/new', (req,res) => {})

app.listen(3000);