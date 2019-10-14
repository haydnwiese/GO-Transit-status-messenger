const fetch = require('node-fetch');
const convert = require('xml-js');

const baseUrl = 'http://www.gotracker.ca/GoTracker/web/GODataAPIProxy.svc/StationStatus/5?_=';

exports.fetchData = async () => {
    let date = new Date();
    const url = baseUrl + '1570937761057';
    await fetch(url)
        .then(res => res.text())
        .then(str => {
            data = JSON.parse(convert.xml2json(str, {compact: true, spaces: 4}));
            data = data.ReturnValueOfListOfStationStatus.Data.StationStatus;
        });

    return sortData();
}

function sortData() {
    let unionBound = [];
    data.forEach(item => {
        if (item._attributes.Direction === 'Westbound towards Hamilton') {
            unionBound.push(item);
        }
    });

    return unionBound;
}