import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"finance-dashboard-46505","appId":"1:959168120206:web:9b388a3ef16198026b90df","databaseURL":"https://finance-dashboard-46505-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"finance-dashboard-46505.appspot.com","apiKey":"AIzaSyC5YfGpP6XexjqN5q_9GVlTsNTNX-HxL-Y","authDomain":"finance-dashboard-46505.firebaseapp.com","messagingSenderId":"959168120206","measurementId":"G-GX0K1LWQ77"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
