
import * as dotenv from 'dotenv';

import SyncDatabase from './databases';
import StartApolloServer from './server';

dotenv.config();

SyncDatabase()
StartApolloServer()