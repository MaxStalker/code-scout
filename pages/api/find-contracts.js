import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    const { address } = req.query;
    const contracts = await prisma.contract.findMany({
        where: {
            address
        },
        select: {
            name: true,
            address: true,
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
        ]
    });
    res.json(contracts);
}
