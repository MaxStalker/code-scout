import { PrismaClient } from "@prisma/client";
import styles from "../../styles/Subpage.module.css";

export async function getServerSideProps(context) {
  const { keyword } = context.query;

  const prisma = new PrismaClient();
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

  return {
    props: {
      contracts,
      keyword,
    },
  };
}

export default function Query(props) {
  const { keyword, contracts } = props;
  if (!contracts) {
    return <p>Can't find anything...</p>;
  }

  const { pill } = styles;
  return (
    <>
      <h1>{keyword}</h1>
      {contracts?.map((contract) => {
        const { name, account, tags } = contract;
        const { address } = account;
        return (
          <div key={name}>
            <p>
              {name} - {address}
            </p>
            {tags?.map((tag) => {
              const { name } = tag;
              return (
                <span key={name} className={pill}>
                  {name}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
