const express = require('express');
const router = express.Router();
const couponService = require('../services/couponService');

// Get all coupons
router.get('/', (req, res) => {
    const coupons = couponService.getAll();
    res.send(coupons);
})

// Get a specific coupon
router.get('/:code', (req, res) => {
    const { code } = req.params;
    const coupon = couponService.getCoupon(code);
    if (!coupon) {
        res.status(404).send();
    } else {
        res.send(coupon);
    }
})

// Create a coupon
router.post('/', (req, res) => { // add a coupon
    const coupon = req.body;
    console.log(req.body)
    if (coupon.code) {
        const success = couponService.add(coupon);
        if (success) {
            res.status(201).send('Coupon added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// Redeems the coupon code => if true: status 400
router.post('/:code/redeem', (req, res) => { 
    const {code} = req.params;
    const status = couponService.redeem(code);
    res.status(status).send();
})

// Delete a coupon
router.delete('/:code', (req, res) => {
    const { code } = req.params;
    couponService.deleteCoupon(code);
    res.send();
})

// Update a coupon
router.put('/:code', (req, res) => {
    const toUpdate = req.body;
    console.log(req.body)
    const { code } = req.params;
    const updatedCoupon = couponService.update(code, toUpdate);
    console.log(updatedCoupon)
    if (updatedCoupon) {
        res.send(updatedCoupon);
    } else {
        res.status(400).send();
    }
})


module.exports = router;