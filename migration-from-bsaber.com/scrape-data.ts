import * as fs from 'node:fs';
const historicMotwData = JSON.parse(fs.readFileSync('./historic-motw-data.json', {encoding: 'utf-8'}));

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

for(const singleMotw of historicMotwData) {
    await sleep(1000);
    const { docs: reviews } = await fetch(`https://beatsaver.com/api/review/map/${singleMotw.beatsaverId}/0`).then(x => x.json());
    singleMotw.allReviews = reviews;
    singleMotw.review = reviews[0];
}

fs.writeFileSync('./enriched-historic-motw-data.json', JSON.stringify(historicMotwData), {encoding: 'utf-8'});