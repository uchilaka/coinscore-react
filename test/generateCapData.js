const moment = require('moment')
    , path = require('path')
    , jsonfile = require('jsonfile')

const demoDate = new Date("2017-01-01")

describe('Generates demo ICO fundraising data', () => {

    const ICOs = jsonfile.readFileSync(path.join(process.cwd(), 'public/res/sample-data.json'));

    it('Generates demo data in JSON format', (done) => {
        console.log(demoDate)

        const startDay = moment(demoDate);
        const amountSeed = 200000;
        const set = [];

        // run for 30 days 
        let updatedICOs = ICOs.map(ico => {
            ico.stats = [];
            for (i = 0; i < 30; i++) {
                ico.stats.push({
                    time: (new Date(startDay.add(1, 'days').format())).getTime(),
                    amount: Math.round(Math.random() * amountSeed * 100) / 100
                });
            }
            return ico;
        });

        console.log('Simulated dataset => ', updatedICOs);

        // write out data set
        const outputFile = path.join(process.cwd(), 'public', 'res', `sample-trend-${moment().format('YYYYMMDD_HHmmss')}.json`)

        jsonfile.writeFileSync(outputFile, updatedICOs);

        done()
    })

})