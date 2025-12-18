import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const activeApps = getApps();

// Función para manejar el formato de la clave privada
const getPrivateKey = () => {
  const key = import.meta.env.FIREBASE_PRIVATE_KEY;
  // Si no existe la clave, retornamos undefined para que falle de forma controlada o use default
  if (!key) return undefined;
  // Reemplazamos los saltos de línea literales por saltos reales
  return key.replace(/\\n/g, '\n');
}

const serviceAccount = {
  type: "service_account",
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  private_key: getPrivateKey(), // Usamos la función auxiliar
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

const initApp = () => {
  if (import.meta.env.PROD) {
    console.info('PROD env detected. Using default service account.')
    // Use default config in firebase functions. Should be already injected in the server by Firebase.
    return initializeApp()
  }
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];

export const db = getFirestore(app);