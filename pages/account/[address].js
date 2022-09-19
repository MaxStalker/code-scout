// import { PrismaClient } from "@prisma/client";
import styles from "../../styles/Subpage.module.css";


export async function getServerSideProps(context) {
  const { address } = context.query;

  const prisma = new PrismaClient();
  const account = await prisma.account.findFirst({
    where: {
      address: address,
    },
    select: {
      address: true,
      contracts: {
        select: {
          name: true,
          tags: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      account,
      address,
    },
  };
}


export default function AccountAddress(props) {
  const { account, address } = props;
  const { contracts } = account;

  if (!account) {
    return <p>Can&apost find account with this address</p>;
  }

  const { pill } = styles;
  return (
    <>
      <h1>{address}</h1>
      {contracts.map((contract) => {
        const { name, tags } = contract;
        return (
          <div key={`${name}-${address}`}>
            <p>{name}</p>
            {tags.map((tag) => {
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
