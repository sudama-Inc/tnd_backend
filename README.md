# Think & DO

tndbackend is a service system.

#### Tech

- [node.js] - evented I/O for the backend
- mysql
- [Npm] - Node package manager
- [db-migrate] - for database migrations
- [gulp] - to install - npm install -g gulp

### Installation

- Install [Node.js](https://nodejs.org/) v10+.
- Install mysql
- Install [Npm] - Node package manager
- Install [gulp] - npm install -g gulp

```sh
move  <to project root directory>
$ npm install // for installing dependencies and only when new dependencies needs to be installed
open src/settings/env.ts
update the  settings as required
move  <to project root directory>
open database.json
update the database credentials as required
$ npm run db-migrate-up-dev  // only when migrations need to be run for dev env
```

### Starting the server

```sh
$ npm install // only when new dependencies needs to be installed
$ npm run db-migrate-up-dev  // only when migrations need to be run for dev env
$ npm start
if everything works fine you will see - "Executing (default): SELECT 1+1 AS result"
```

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[gulp]: http://gulpjs.com
[npm]: https://www.npmjs.com
[db-migrate]: https://www.npmjs.com/package/db-migrate
[sequelize]: https://sequelize.org/
[gulp]: https://www.npmjs.com/package/gulp
