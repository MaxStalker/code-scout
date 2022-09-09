import { PrismaClient } from "@prisma/client";

export async function getServerSideProps(context) {
  const { str } = context.query;

  console.log({ str });

  const prisma = new PrismaClient();
  const contracts = await prisma.contract.findMany({
      take: 5
  });

  return {
    props: {
      contracts,
    },
  };
}

export default function Query(props) {
  const { contracts } = props;
  console.log({ contracts });
  return <h1>Hello</h1>;
}
