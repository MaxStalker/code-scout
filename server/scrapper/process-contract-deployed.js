import {readDB} from "./db";

(async ()=>{
	const data = readDB("./data/events-contract-deployed.json");
	const filteredCollectible = data.filter(contract => contract.name === "Collectible")
	console.log(filteredCollectible.length)
})()