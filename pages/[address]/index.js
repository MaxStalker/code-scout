import prisma from "../../lib/prisma";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import subStyles from "../../styles/Subpage.module.css";

export async function getServerSideProps(context) {
  const { address } = context.query;

  const contracts = await prisma.contract.findMany({
    where: {
      address:{
        contains: address
      }
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
  });

  return {
    props: {
      contracts,
      address,
    },
  };
}


export default function AccountAddress(props) {
  const { contracts, address } = props;

  const { pill } = styles;
  return (
    <>
      <h1>{address}</h1>
      {contracts.map((contract) => {
        const { name, address } = contract;
        return (
          <div key={`${name}-${address}`}>
            <Link href={`/account/${address}/${name}`}>
              <a className={subStyles.link}>{name}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
