"use strict";

require('chai').should();

var lock = require('./index');
var v = {};

function finish(key){
    return function(done){
        setTimeout(function() {
            v[key] = true;
            return done();
        }, 200);
    };
}

describe("Test lock function", function(){

    it("execute in order", function(done){
        v.a = false;
        lock('toto', 2000, finish('a'));
        v.a.should.equal(false);
        setTimeout(function() {
            v.a.should.equal(true);
        }, 250);


        v.ab = false;
        lock('totob', 2000, finish('ab'));
        v.a.should.equal(false);
        setTimeout(function() {
            v.a.should.equal(true);
        }, 250);

        v.b = false;
        lock('toto', 2000, finish('b'));
        v.b.should.equal(false);
        setTimeout(function() {
            v.b.should.equal(false);
        }, 250);
        setTimeout(function() {
            v.b.should.equal(true);
        }, 450);

        v.c = false;
        lock('toto', 2000, finish('c'));
        v.c.should.equal(false);
        setTimeout(function() {
            v.c.should.equal(false);
        }, 250);
        setTimeout(function() {
            v.c.should.equal(false);
        }, 450);
        setTimeout(function() {
            v.c.should.equal(true);
        }, 650);


        setTimeout(function() {
            done();
        }, 800);
    });

    it("Test timeout", function(done){
        v.d = false;
        lock('yo', 60, finish('d'));

        v.e = false;
        lock('yo', 60, function(done){
            v.e = true;
            done();
        });

        v.d.should.equal(false);
        v.e.should.equal(false);

        setTimeout(function() {
            v.e.should.equal(true);
        }, 80);

        setTimeout(function() {
            done();
        }, 500);
    });
});
