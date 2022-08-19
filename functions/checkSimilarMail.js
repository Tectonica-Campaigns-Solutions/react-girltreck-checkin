var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9z9Pzc5zVNu1Cf'}).base('appfeeyxdJVXg9g6q');
var stringSimilarity = require("string-similarity");

exports.handler = async function (event, context){
  let data = JSON.parse(event.body)
  let email = data.email
  let letter = email[0]
  let mails = [];
  const response = new Promise((resolve, reject) => {
    base('Checkins').select({
      // Selecting the first 3 records in ROLL CALL: DID YOU WALK WITH US?:
      maxRecords: 400,
      view: "Checkins list",
      filterByFormula: `first_letter="${letter}"`,
    
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        var similarity = stringSimilarity.compareTwoStrings(email,record.get('Email'));

        if(similarity > 0.8 && similarity < 1){
          mails.push(record.get('Email'));
        }
          
      });
    
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
     
    
    }, function done(err) {
      if (err) { return { statusCode: 500} }
      return resolve({statusCode:200, body: JSON.stringify(Array.from(new Set(mails)))})
    });
  })
  return response
  
}