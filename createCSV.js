const createCsvWriter = require('csv-writer').createObjectCsvWriter;


function createCSV (usersArray) {
    const csvWriter = createCsvWriter({
        path: './users.csv',
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'owner', title: 'OWNER'},
        ]
    });

    csvWriter.writeRecords(usersArray);
}

module.exports = createCSV;