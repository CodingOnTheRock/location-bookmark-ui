export const environment = {
  production: true,
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
