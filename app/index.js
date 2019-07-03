const db = require('./db');
const app = require('./app');

(async () => {
  await db.waitToBeReady();
  await app.listen();
})()
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
