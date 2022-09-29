var airtable_api_key = process.env.AIRTABLE_API_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: airtable_api_key}).base('appfeeyxdJVXg9g6q');

exports.handler = async function (event, context){
  let total = 0
  const formData = JSON.parse(event.body)
  const email = formData.Email

  
  await new Promise((resolve, reject) => {
    base('Checkins').select({
      
      maxRecords: 400,
      view: "Checkins list",
      filterByFormula: `Email = "${email}"`,
    
    }).eachPage(function page(records, fetchNextPage) {
      total += records.length
      fetchNextPage();
    }, function done(err) {
      if (err) { return reject()}
      return resolve()
    });
  })

  await new Promise((resolve, reject) => {
    if(total == 3){
      console.log('add to directory')
      base('Dummy Directory Data (Test)').create([
        {
          "fields": {
            "Name": formData.Name,
            "Email (Organizing/ Public Facing Email)":  formData.Email,
            "City (Please use full city name - ie. Chicago, Washington)": formData.City,
            "Country": formData.Country,
            "Crew Name": formData['Crew name - manual'],
            "Address - Zip Code": formData['Postal Code'],
          }
        }
      ], function(err, records) {
        if (err) {
          console.log(err)
          return reject()
        }
        return resolve()
      });
    }
    return resolve()
  })

  const response = await new Promise((resolve, reject) => {
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
          // "Association": formData.Affiliation,
          "Neighborhood": formData.Neighborhood,
          "GDPR consent": formData['GDPR consent'] === 'true' ? true : false,
          "Data consent": formData['Data consent'] === 'true' ? true : false,
          "Liability Consent": true,
          // // 20/Jul/22
          // // Now is set in Airtable that nobody can modify this field
          "Role - new form": formData["Role - new form"],
          "non USA state": formData['non USA state'] ? formData['non USA state'] : '',
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