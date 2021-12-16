# Code Scout
Search Engine for Smart Contracts Deployed on Flow Network

## Inspiration
Code Scout is inspired by amazing initiative of [SmartContract.Codes](https://hackmd.io/@T6Wf5EsOQKe-6wyPjJPtuw/ryEjJvUkB).

## Problems

### Contract Verification
Currently Flow Network have a review system in place. Every project that wants to deploy it's contracts to mainnet need to submit them for a thorough review to ensure it won't harm users or network stability. In the near future the system will be lifted, which would predictably bring the influx of harmful code to the ecosystem.

### Best Practices
New developers tend to invent their own "wheels" instead of using stable patterns. The goal for this tool is to enable search and highlight of suchs patterns in existings projects

### Deployed Contract Address
Often times you are looking for an address of deployed contract. If you don't have any information, except for the name of the project or single contract.


## Features
### Contract Grouping
Single project can use multiple contracts - one should be able to use innser tools to group them together.

### Tagging
Select users - as well as original code owners - will be able to tag used patterns and add additional comments for blocks of code (think lyrics comments on [Genius](https://genius.com/Spice-genie-lyrics)

### Lookup known transactions and script
You can copy/paste hash of known transaction and get information about what's happening inside of it. Ensuring you that it's safe to sign it, for example.

## Solution
### How to look for deployed contracts
Whenever contract is deployed or upgraded - special system event is emitted: 
- `flow.AccountContractAdded`
- `flow.AccountContractUpdated`


## Prototype Stage Features
### Manual Entry
It should be possible to entry known addresses and contracts manually. It will be good to have this for a long standing contracts like FungibleToken and NonFungible tokens, which were added quite a long time ago.
