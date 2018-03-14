const {Router} = require('express');
const router = new Router();
module.exports = router;

router.use('/auth', require('./auth'));
router.use('/graphql', require('./graphql'));
