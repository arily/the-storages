﻿# the-storages
### Enhanced, Support data binding localStorage and sessionStorage.

provide various api (async/sync methods) and storage event listeners.

In addition to supporting general use, support for vue data binding and even multi-page data binding and sync.


### Description
- Multi-page data binding and sync.

- Provide storage change event listeners.

- Various calling methods.

- Automatic JSON parsing.

- Mainly written using es6 and proxy. 


## Simple Demos:

You can open multiple pages at the same time and experience data binding between multiple pages

- #### [the-storages in Vue.js 3](http://miya.ink/the-storages/index.html)

- #### [the-storages in Vue.js 2](http://miya.ink/the-storages/vue2.html)

- #### [the-storages in Vue.js 2 zh](http://miya.ink/the-storages/vue2_zh.html)

### Basic usage:

#### Vue:

See [index.html](https://github.com/Pure-Peace/the-storages/blob/master/index.html) for details (vue3).
[vue2.html](https://github.com/Pure-Peace/the-storages/blob/master/vue2.html),
[vue2_zh.html](https://github.com/Pure-Peace/the-storages/blob/master/vue2_zh.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- storages test page for vue2 -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>the-storages | vue2</title>
  <script src="https://unpkg.com/vue"></script>
</head>

<body>
  <div id="app">
    <h1>the-storage | vue2</h1>
    <div>storageData (storage mirror object): {{ storageData }}</div>
    <div>storageProxyObj (storage proxy object): {{ storageProxyObj }}</div>
    <div>
      <button @click="test">click me, set a message</button>
    </div>
  </div>
  
  <script>
  import { createLocal, createSession, createStorage } from 'the-storages'

  // create storage mirror object (localStorage)
  // mirror object used for data binding, get data
  const mirror = createLocal() 

  // storage proxy object (enhanced storage)
  // used to operate storage
  const storage = mirror._prx 

  new Vue({
    el: '#app',
    data() {
      return {
        // the mirror object can make the data update automatically
        // so it's more suitable for obtaining storage data
        storageData: mirror,

        // the storage proxy object has all the methods and features 
        // (but it is not recommended to put it directly into the view)
        // so it's more suitable for storage operation
        storage: storage
      }
    },
    created() {
      // ensure that the storage data on the view can be updated automatically
      this.storage.bindVm(this)
    
      console.log(this.storageData)
      this.storage.set('hello', 'firstData')
      console.log(this.storageData)
    },
    methods: {
      test () {
        this.storage.set('foo', { bar: 1 })
      }
    }
  })

  </script>
</body>

</html>
```


#### Common:
```javascript
// npm i the-storages
import { createLocal, createSession, createStorage } from 'the-storages'

// create storage mirror object (localStorage)
// mirror object used for data binding, get data
const mirror = createLocal() 

// storage proxy object (enhanced storage)
// used to operate storage
const storage = mirror._prx 

storage.set('test', 'aa!')

```

#### Methods:
```javascript
// set data to localStorage
storage.set('test', { message: 'im an object' }) // set a object
storage.setItem('test2', 'hello2') // set a string
storage.test3 = { hello111: 'im an object too' } // set a object

// set multiple data to localStorage
storage.set(['a','b','c'], [1,2,'g']) // parameter [keys ... ]:[values... ]
storage.set({a: 1, b: 2, c: 'g'}) // { key1: value1, key2: value2 ... }

// set data to localStorage, recursive creation
storage.a.b.c.d.e = 'test' 
storage.setChain('aa.bb.cc.dd', 'testChain')

// each sync method has a sync copy method
storage.setAsync('async foo', 'bar').then(res => { console.log('set async complete') })
storage.setChainAsync('gg.ee.rr', 'haha').then(res => { console.log('set asyncChain complete') })


// get data from localStorage
storage.get('test') // will get object

console.log(storage.test) // the same
storage.getItem('test') // the same
localStorage.getItem('test') // the same

storage.get('test', false) // will get json string

// get multiple results
storage.get(['test', 'test2', 'test3']) // will get object { key1: value1, key2: value2 ... }

// recursive acquisition
storage.getChain('a.b.c.d.e')
storage.a.b.c.d.e

// each sync method has a sync copy method
storage.getAsync('test').then(res => { console.log(res) })

// remove key from localStorage
storage.remove('test') // none return
storage.remove('test', true) // will return test's value
storage.pop('test') // the same

// watchers
// active: events triggered by the current page
storage.watchActive('get', e => { console.log(e) })

// passive: events triggered by the other page
storage.watchPassive('set', e => { console.log(e) })

// valid events
console.log(storage._activeEvents) // active events
console.log(storage._passiveEvents) // passive events

// unwatch
storage.unwatchActive('get')
storage.unwatchPassive('get')
```


## Development / test

You are willing to help me improve this project. Or you need to do some testing.

#### 1. Clone this repository
```
git clone https://github.com/Pure-Peace/the-storages
```

#### 2. Installation dependencies
```
npm i
```

#### 3. Start
```
npm run dev
```

#### 4. Open the test page (Default port is 8080)

I provide two sample pages: vue.js 3 and vue.js 2 (CDN unpkg.com)

You can open two pages to experience multi-page data binding and data synchronization.

##### vue.js 3
```
http://localhost:8080
```

##### vue.js 2
```
http://localhost:8080/vue2
```

##### vue.js 2 中文版页面
```
http://localhost:8080/vue2_zh
```


### Snowpack
It is recommended to use snowpack to run or build (instead of webpack with babel, beacuse snowpack natively supports es6, and faster)
