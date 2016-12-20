# simplock

> Simple lock async function with key

## Install

```
$ npm install --save simplock
```

## Arguments

* String = ''  : Key to lock
* String = null: Timeout. Default no timeout (milliseconds)
* Function : Callback, execute first parameter for unlock

## Examples

```js
var simplock = require('simplock');

simplock('lock key', 2000, function(done){ // 'lock key' expire in 2seconds

    // async code

    done(); // Execute done when is finish for unlock 'lock key';
})


simplock('file-write-'+path, 2000, function(done){
    fs.writeAsync('/path/to/media/'+path, function(){
        done(); // 'file-write-'+path is unlocked
    });
});
```
