# simplock

[![Build Status](https://travis-ci.org/apoutchika/simplock.svg?branch=master)](https://travis-ci.org/apoutchika/simplock)

> Simple lock async function with key

## Install

```
$ npm install --save simplock
```

## Arguments

* String = ''  : Key to lock
* String = null: Timeout. Default no timeout (milliseconds)
* Function : Callback, execute first parameter for unlock

If the same key is send, the callback is pushed in queue. When you use done()
then next function in queue is executed.

## Examples

```js
var simplock = require('simplock');

simplock('lock key', 2000, function(done){ // 'lock key' expire in 2seconds

    // async code

    done(); // Execute done when is finish for unlock 'lock key';
})


// Exemple with fs
simplock('file-write-'+path, 2000, function(done){
    fs.writeFile('/path/to/media/'+path, 'Hello world', function(err){
        done(); // 'file-write-'+path is unlocked
    });
});
```
