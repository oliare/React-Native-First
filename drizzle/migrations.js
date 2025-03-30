// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_milky_falcon.sql';
import m0001 from './0001_conscious_marvel_boy.sql';
import m0002 from './0002_fearless_nico_minoru.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002
    }
  }
  