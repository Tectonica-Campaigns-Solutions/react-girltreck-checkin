var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9z9Pzc5zVNu1Cf'}).base('appfeeyxdJVXg9g6q');

exports.handler = async function (event, context){
  const formData = JSON.parse(event.body)
  const response = new Promise((resolve, reject) => {
    base('Checkins').create([
      {
        "fields": {
          "Name": formData.Name,
          "City": formData.City,
          "Email": formData.Email,
          "State": formData.State,
          "Phone": formData.Phone,
          //"Crew Name": formData['Crew Name'],
          "Crew name - manual": formData['Crew name - manual'],
          "Association": formData.Affiliation,
          "Neighborhood": formData.Neighborhood,
          "GDPR consent": formData['GDPR consent'] === 'true' ? true : false,
          "Data consent": formData['Data consent'] === 'true' ? true : false,
          "Liability Consent": true,
          // 20/Jul/22
          // Now is set in Airtable that nobody can modify this field
          "Role - new form": formData.Role,
          "non USA state": formData['non USA state'],
          "Postal Code": formData['Postal Code'],
          "Country": formData.Country,
          "Longitude": formData.Longitude,
          "Latitude": formData.Latitude,
          "How many women are in your crew?": formData["How many women are in your crew?"]
        }
      },
    ], function(err, records) {
      if (err) {
        return { statusCode: 500 }
      }

      return resolve({ statusCode:200 })
    });
  })
  
  return response;
}