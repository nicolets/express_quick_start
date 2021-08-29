const fs = require('fs');


function getCoupons() {
    return require('../db/coupons.json');
}

function setCoupons(coupons) {
    fs.writeFileSync("./db/coupons.json", JSON.stringify(coupons));
}

function add(coupon) {
    const foundCoupon = getCoupon(coupon.code);
    const coupons = getCoupons();
    if (!foundCoupon) {
        const newCoupon = {
            code: coupon.code,
            date: new Date().getTime(),
            isRedeem: false
        }
        coupons.push(newCoupon);
        setCoupons(coupons);
        return true;
    }
    return false;
}

function getCoupon(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    return foundCoupon;
}

function deleteCoupon(code) {
    const coupons = getCoupons();
    const filteredCoupons = coupons.filter(existingCoupon => existingCoupon.code !== code);
    setCoupons(filteredCoupons);
}

function update(code, data) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    if (!foundCoupon) return false;
    Object.keys(foundCoupon).forEach(key => {
        if (data[key]) {
            foundCoupon[key] = data[key];
        }
    });
    setCoupons(coupons);
    return foundCoupon;
}

function redeem(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    if (!foundCoupon) {
       return 404;
    } else if (foundCoupon.isRedeem) {
        return 400;
    } else {
        foundCoupon.isRedeem = true;
        setCoupons(coupons); 
        return 200;
    }
}


function getAll() {
    return getCoupons();
}

module.exports = {
    update,
    getAll,
    redeem,
    getCoupon,
    deleteCoupon,
    add
}