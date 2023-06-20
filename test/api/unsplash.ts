import unsplash from "../../src/services/api/unsplash";

export default function test(){
  unsplash.topics.list({})
  .then(result => result.response)
  .then(response => {
    if(!response) return
    const { total, results } = response
    console.log(`received ${results.length} topics out of ${total}`);
    console.log('first topics: ', results[0]);
  })
}