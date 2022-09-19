import prisma from "../../../lib/prisma";
import Link from "next/link";
import subStyles from "../../../styles/Subpage.module.css";

export async function getServerSideProps(context) {
  const { address, name } = context.query;

  const contract = await prisma.contract.findUnique({
    where: {
      name_address: {
        address,
        name,
      },
    },
    select: {
      name: true,
      address: true,
      code: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  return { props: { address, name, contract } };
}

export default function ContractName(props) {
  const { contract } = props;

  if (!contract) {
    return (
      <div>
        <p>Can't find contract on this account with this address</p>
        <p>
          Check
          <Link href={`/account/${address}`}>
            <a className={subStyles.link}>{address}</a>
          </Link>{" "}
          for other available contracts
        </p>
      </div>
    );
  }

  const { code, address, name } = contract;

  return (
    <div>
      <Link href={`/account/${address}`}>
        <a className={subStyles.link}>{address}</a>
      </Link>
      <p>{name}</p>
      <p>{code}</p>
    </div>
  );
}
