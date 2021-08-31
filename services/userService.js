const fs = require('fs');
const { usersCollection } = require('../db');
const ObjectId = require('mongodb').ObjectId;

/*
    given an interface of user (from above) make the following functions:
    add, delete, get, update
*/

async function add(user) {
    const existingUser = await usersCollection().findOne({email: user.email});
    if (existingUser) {
        return false;
    } else {
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        usersCollection().insertOne(newUser);
    }
}

async function getUser(oid) {
    return await usersCollection().findOne({"_id": ObjectId(oid)});
}

async function deleteUser(oid) { 
    return await usersCollection().deleteOne({"_id": ObjectId(oid)})
}

async function update(oid, data) { //updateOne({ a: 3 }, { $set: { b: 1 } })
    const foundUser = getUser(oid);
    if (!foundUser) return false;
    Object.keys(foundUser).forEach(key => {
        if (data[key]) {
            foundUser[key] = data[key];
        }
    });
    return await usersCollection.updateOne({"_id": ObjectId(oid)}, {$set: {key: data});
}

async function getAll() {
    return await usersCollection().find({}).toArray();
}

module.exports = {
    update,
    getAll,
    getUser,
    deleteUser,
    add
}