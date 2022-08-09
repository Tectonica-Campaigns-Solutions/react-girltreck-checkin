var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9z9Pzc5zVNu1Cf'}).base('appfeeyxdJVXg9g6q');
var stringSimilarity = require("string-similarity");

const checkSimilarMail = (letter, email) => {

  let mails = [];
  console.time()
  return new Promise((resolve, reject) => {
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
      console.timeEnd()
      if (err) { console.error(err); return; }
      return resolve(mails);
    });
  })
}

export { checkSimilarMail };