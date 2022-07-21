var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9z9Pzc5zVNu1Cf'}).base('appfeeyxdJVXg9g6q');

const updateUserData = (formData) => {

  return new Promise((resolve, reject) => {
    base('Checkins').create([
      {
        "fields": {
          "Name": formData.Name,
          "City": formData.City,
          "Email": formData.Email,
          "State": formData.State,
          "Phone": formData.Phone,
          // "Crew Name": formData['Crew Name'],
          "Association": formData.Affiliation,
          "Neighborhood": formData.Neighborhood,
          // 20/Jul/22
          // Now is set in Airtable that nobody can modify this field
          // "Role": formData.Role,
          "Postal Code": formData['Postal Code'],
          // "Country": formData.Country,
          "Longitude": formData.Longitude,
          // "Neighborhood": formData.Neighborhood,
          "Latitude": formData.Latitude,
          "How many women are in your crew?": formData["How many women are in your crew?"]
        }
      },
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      return resolve(true)
    });
  })

}

export { updateUserData };