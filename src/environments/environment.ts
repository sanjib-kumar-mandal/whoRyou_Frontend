const apiDomains = {
  local: 'http://localhost:3333',
  staging: 'https://staging-whoryou.cyclic.cloud'
}

export const environment = {
  production: false,
  apiBasePath: apiDomains.staging,
  firebaseConfig: {
    apiKey: "AIzaSyC30578aTlyVqBDFnLsC9l-bpkJB2Q65-s",
    authDomain: "whoryou-6a7d5.firebaseapp.com",
    projectId: "whoryou-6a7d5",
    storageBucket: "whoryou-6a7d5.appspot.com",
    messagingSenderId: "485684163401",
    appId: "1:485684163401:web:b82b7a8c644c14a6316098",
    measurementId: "G-T5DS6SR1TJ"
  }
};
