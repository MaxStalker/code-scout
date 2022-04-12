import { GraphQLClient, request, gql } from "graphql-request";
import dot from "dotenv";
import {writeDB} from "./db";

dot.config();

const endpointFlowScan = "https://query.flowgraph.co";

const client = new GraphQLClient(endpointFlowScan, {
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`,
  },
});

const fragment = gql`
  fragment Edge on EventConnection {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        time
        fields
      }
    }
  }
`;

const firstRequest = gql`
  ${fragment}
  query ContractDeployed {
    events(
      first: 50
      typeId: "flow.AccountContractAdded"
      ordering: Ascending
    ) {
      ...Edge
    }
  }
`;

const sequentalRequest = gql`
  ${fragment}
  query ContractDeployed($cursor: ID) {
    events(
      first: 50
      typeId: "flow.AccountContractAdded"
      ordering: Ascending
      after: $cursor
    ) {
      ...Edge
    }
  }
`;

const mapEdges = (edge) => {
  const { node } = edge;
  const { time, fields } = node;
  const [address, hash, name] = fields;
  return {
    time,
    address: address.value,
    name: name.value,
  };
};

(async () => {
  const response = await client.request(firstRequest);
  let events = response.events.edges.map(mapEdges);

  if (response.events.pageInfo.hasNextPage) {
    let cursor = response.events.pageInfo.endCursor;
    let stop = false;
    let loops = 0;
    while (!stop) {
      console.log("Loop:", loops);
      // Fetch next call with updated query
      const response = await client.request(sequentalRequest, { cursor });
      const { edges, pageInfo } = response.events;
      const { hasNextPage, endCursor } = pageInfo;
      const transformed = edges.map(mapEdges);
      events = events.concat(transformed);

      // If there are more items to fetch, update cursor and restart loop
      if (hasNextPage) {
        cursor = endCursor;
      } else {
        stop = true;
      }

      loops += 1;
    }
  }

  writeDB("./scrapper/events-contract-deployed.json", events)
})();
