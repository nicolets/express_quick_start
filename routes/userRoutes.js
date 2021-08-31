const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get all users
router.get('/', async (req, res) => {
    const users = await userService.getAll();
    res.send(users);
})

// Get a specific user
router.get('/:id', async (req, res) => { // user/shahar@gmail.com
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.send(user);
})

// Create a user
router.post('/', (req, res) => { // add a user
    const user = req.body;
    console.log(req.body)
    if (user.email && user.password && user.name) {
        const success = userService.add(user);
        if (success) {
            res.status(201).send('User added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.send('deleted successfully');
})

// Update a user
router.put('/:id', async (req, res) => {
    const toUpdate = req.body;
    console.log(req.body)
    const { id } = req.params;
    const updatedUser = await userService.update(id, toUpdate);
    console.log(updatedUser)
    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(400).send();
    }
})


module.exports = router;