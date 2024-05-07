import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient() ,provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"blossom-75550","appId":"1:638931342334:web:b7c756142e646870e7a6af","storageBucket":"blossom-75550.appspot.com","apiKey":"AIzaSyAO0-qJUZIp0m91Yh0glKQTgQ3kkUqk4pA","authDomain":"blossom-75550.firebaseapp.com","messagingSenderId":"638931342334","measurementId":"G-PRZ6VPMJGS"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
