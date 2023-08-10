# logger

## Installation

Use the package manager [npm](https://www.npmjs.com/package/custom-logger-node) to install custom-logger-node

## Usage

```javascript
import logEndpoints from 'custom-logger-nodejs'
import express from 'express'

#or

const logEndpoints = require('custom-logger-nodejs')
const express = require('express')

const app = express();

app.use(logEndpoints);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
