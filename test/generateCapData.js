const moment = require('moment')
    , path = require('path')
    , jsonfile = require('jsonfile')

const demoDate = new Date("2017-01-01")

describe('Generates demo ICO fundraising data', () => {

    it('Generates demo data in JSON format', (done) => {
        console.log(demoDate)

        const startDay = moment(demoDate);
        const amountSeed = 200000;
        const set = [];

        // run for 30 days 
        for (i = 0; i < 30; i++) {
            set.push({
                time: (new Date(startDay.add(1, 'days').format())).getTime(),
                amount: Math.round(Math.random() * amountSeed * 100) / 100
            });
        }

        console.log('Simulated dataset => ', set);

        // write out data set
        const outputFile = path.join(process.cwd(), 'public', 'res', `sample-trend-${moment().format('YYYYMMDD_HHmmss')}.json`)

        jsonfile.writeFileSync(outputFile, set);

        done()
    })

})