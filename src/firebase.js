import app from 'firebase/app';
import 'firebase/auth';
import config from 'config';

app.initializeApp(config);

export default app;