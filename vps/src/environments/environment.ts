// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aesPublicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ+GJdSSEeaNFBLqyfM3DIOgQgWCwJ0INfeZZV7ITsLeuA7Yd02rrkYGIix1IWvoebWVmzhncUepYxHwK1ARCdUCAwEAAQ==',
  apiVersion: {
    login: 'v3/',
    api: 'v2/'
  },

  projectIds: {
    
    // vps: '7ad28864dcb411ec845e0022480d6e6c',
    vps: '603dcdb6dbeb11ec84380022480d6e6c'
  },

  // host:' http://178.128.125.44/appiyo/',
  host: 'https://vpshealth.karix.ae/appiyo/',
  encryptionType: true,
  appiyoDrive: "d/drive/upload/",
  driveLocation: "d/drive/docs/"
};

// https://vpshealth.karix.ae/appiyo/account/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
