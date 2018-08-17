// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  MAPBOX_API_KEY: 'pk.eyJ1IjoiZGFnc3NvbiIsImEiOiJjajk0MTRqdWIzZGxwMzNycGtreDhxMmRxIn0.0zk_7FSvF_LlQ0AD2cChWQ',
  firebase: {
    apiKey: "AIzaSyADcYBoe212jY2BBAukN7fRqAL1zpHw3aA",
    authDomain: "eaticeland.firebaseapp.com",
    databaseURL: "https://eaticeland.firebaseio.com",
    projectId: "eaticeland",
    storageBucket: "eaticeland.appspot.com",
    messagingSenderId: "304716417170"
  }
};
