var airtable_api_key = process.env.AIRTABLE_API_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: airtable_api_key}).base('appfeeyxdJVXg9g6q');

exports.handler = async function (event, context){
  let userData;
  let data = JSON.parse(event.body)
  let email = data.email
  const response =  new Promise((resolve, reject) => {
    base('Checkins').select({
      view: 'Checkins list',
      filterByFormula: `Email = "${email}"`,
      fields: [
        'Name', 
        'Email', 
        'Role', 
        'Postal Code', 
        'City', 
        'State', 
        'Association',
        'Neighborhood',
        'How many women are in your crew?',
        'Data consent',
        'GDPR consent',
        "Crew name - manual",
        "Role - new form",
      ]
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record, index) {
          if(index == 0){
            userData = {...record.fields, "id": record.id, ['Data consent']: typeof(record.fields['Data consent']) === 'undefined' ? 'false' : 'true', ['GDPR consent']: typeof(record.fields['GDPR consent']) === 'undefined' ? 'false' : 'true'  };
          }
          
        });
  
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
  
    }, function done(err) {
      if (err) { console.error(err); return { statusCode: 500}; }
      return resolve({ statusCode: 200, body: JSON.stringify(userData)});
    });
  })

  return response;
  
}