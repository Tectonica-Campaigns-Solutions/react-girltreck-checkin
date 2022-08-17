var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9z9Pzc5zVNu1Cf'}).base('appfeeyxdJVXg9g6q');

const getUserData = (email) => {

  let userData;

  return new Promise((resolve, reject) => {
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
        'GDPR consent'
      ]
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
  
        records.forEach(function(record) {
          userData = {...record.fields, "id": record.id, ['Data consent']: typeof(record.fields['Data consent']) === 'undefined' ? 'false' : 'true', ['GDPR consent']: typeof(record.fields['GDPR consent']) === 'undefined' ? 'false' : 'true'  };
        });
  
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
  
    }, function done(err) {
        if (err) { console.error(err); return; }
        return resolve(userData);
    });
  })

}

export { getUserData };