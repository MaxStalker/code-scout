import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const {keyword} = req.query
  const contracts = await prisma.contract.findMany({
    where: {
      name: {
        contains: keyword,
      },
    },
    select: {
      name: true,
      account: {
        select: {
          address: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      {
        interactions: "desc",
      },
    ],
    take: 5,
  });
  res.json(contracts);
}
