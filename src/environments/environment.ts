// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  application: {
    security: {
      token_key: 'token',
      profile_key: 'profile'
    }
  },
  apis: {
    google_map: {
      key: 'AIzaSyD6inFvJXlyP2HYPouCdT8kTpdk46HFw3E',
      default_coordinates : {
        lat: 13.7563,
        lng: 100.5018
      }
    }
  }
};
