import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import config from './config';

app.initializeApp(config);

export default app;