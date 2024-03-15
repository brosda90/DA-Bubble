import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide : PathLocationStrategy , useClass : HashLocationStrategy},
    provideRouter(routes),

    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'dabubblesingle',
          appId: '1:246031854958:web:7d60ab4b4dd938339ee57f',
          storageBucket: 'dabubblesingle.appspot.com',
          apiKey: 'AIzaSyBiCCx9AftcK71xZkT0henZK1N34GjU8xU',
          authDomain: 'dabubblesingle.firebaseapp.com',
          messagingSenderId: '246031854958',
          databaseURL: 'https://dabubblesingle-default-rtdb.europe-west1.firebasedatabase.app',
        })
      ),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideDatabase(() => getDatabase()),
      provideMessaging(() => getMessaging()),
    ),
  ],
};
