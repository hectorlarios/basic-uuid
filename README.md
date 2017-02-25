# basic-uuid

A time based UUID instance for basic application level ids. The random generation of the uuid value is not secure--it 
uses `Math.random()` and the current time. 

## Installation
``
$ npm install basic-uuid
``
## API

```
import UUID from 'basic-uuid';

const uuidA = UUID.randomUUID();

console.info(uuidA.getId()); //9accce27-9c42-1516-9137-733679383a61
```

### UUID

The UUID class cannot be instantiated directly, the static methods: `randomUUID()`, `fromString(uuid)`, or `fromHex(hex)` 
will return a new instance of the UUID class.

### getId()
Returns a string value that represents the UUID. `00000000-0000-0000-0000-000000000000`

### toJSON()
Returns a string value representing a JSON object containing the uuid value. 
`{"uuid":"00000000-0000-0000-0000-000000000000"}`

### UUID.randomUUID()
This static method will return a random UUID instance.

 const uuid = UUID.randomUUID();

### UUID.fromString(id)
This static method will create a new UUID instance using the `id` parameter value. If the `id` parameter value is not a
valid uuid, a `TypeError` will be thrown.

### UUID.fromHex(hex)
This static method will create a new UUID instance using the `hex` parameter value. If the `hex` parameter value is not a
valid uuid, a `TypeError` will be thrown.

### UUID.isUUD(id)
This static method will return a boolean value after evaluating the `id` parameter value. If the `id` parameter value 
is a valid uuid, `true` will be returned.

### Example

```
import UUID from 'basic-uuid';

const uuidA = UUID.randomUUID();

const uuidB = UUID.fromString('fa83d74b-7d5f-83b2-a1a7-734975afc4fb');

const uuidC = UUID.fromHex('ee21c4a13e38cc45c1a4734975b379ac');

console.info(uuidA.getId()); //9accce27-9c42-1516-9137-733679383a61

console.info(uuidB.getId()); //fa83d74b-7d5f-83b2-a1a7-734975afc4fb

console.info(uuidC.getId()); //ee21c4a1-3e38-cc45-c1a4-734975b379ac

console.info(uuidC.toJSON()); //{"uuid":"ee21c4a1-3e38-cc45-c1a4-734975b379ac"}

console.info(UUID.isUUID('lorem-ipsum')); //false

console.info(UUID.isUUID('2f98e6ba-72a2-ce35-1305-734975b47d05')); //true
```

License [MIT](LICENSE)
