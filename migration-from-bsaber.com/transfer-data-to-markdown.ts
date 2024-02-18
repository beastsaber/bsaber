import * as fs from 'node:fs'

const createMarkdown = (data: any) => {
  if (data?.review?.text?.includes('\n')) {
    return `---
mapId: "${data.beatsaverId}"
review: |-
${data?.review?.text?.replace(/\n/g, '\n    ').replace(/(^)/g, '    ')}
startDate: "${new Date(data.publishedTime).toISOString()}"
---
`
  }

  return `---
mapId: "${data.beatsaverId}"
review: "${data?.review?.text}"
startDate: "${new Date(data.publishedTime).toISOString()}"
---
`
}

const historicMotwData = JSON.parse(
  fs.readFileSync('./enriched-historic-motw-data.json', { encoding: 'utf-8' }),
)
for (const singleMotw of historicMotwData) {
  const sortedReviews = [...singleMotw.allReviews.filter((x) => x.sentiment === 'POSITIVE')]
  sortedReviews.sort(
    (a, b) =>
      new Date(b.curatedAt ?? '2025-01-01').getTime() -
      new Date(a.curatedAt ?? '2025-01-01').getTime(),
  )
  const firstCuratedReview = sortedReviews[sortedReviews.length - 1]
  if (firstCuratedReview) {
    singleMotw.review = firstCuratedReview
    // BeastSaber account already says who the reviewer is
    if (firstCuratedReview && !firstCuratedReview.creator.name.startsWith('BeastSaber')) {
      singleMotw.review.text = singleMotw.review.text + `\n\n- ${singleMotw.review.creator.name} -`
    }
  } else {
    singleMotw.review = { text: 'No review found.' }
  }

  fs.writeFileSync(
    `./src/collections/map-of-the-week/${new Date(singleMotw.publishedTime).toISOString()}.md`,
    createMarkdown(singleMotw),
    { encoding: 'utf-8' },
  )
}
