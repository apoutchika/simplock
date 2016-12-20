"use strict";

var locks = {};

module.exports = function(key, delay, cb) {
    if(typeof cb !== 'function') {
        throw new Error('cb must has function');
    }

    key = String(key);

    var finish = false;
    var next = function(){
        finish = true;
        if (locks[key] === undefined) {
            return true;
        }

        var nextCb = locks[key].shift();
        if (nextCb === undefined) {
            delete locks[key];
        }
        else if (typeof nextCb.cb === 'function'){
            finish = false;
            nextCb.cb(next);
            if(nextCb.delay){
                setTimeout(function() {
                    if (finish === false) {
                        next();
                    }
                }, nextCb.delay);
            }
        }
    };

    if(locks[key] === undefined) {
        locks[key] = [];
        cb(next);
        if (delay) {
            setTimeout(function() {
                if (finish === false) {
                    next();
                }
            }, delay);
        }
    }
    else {
        locks[key].push({
            delay: delay,
            cb: cb
        });
    }
};
