import prisma from "../../lib/prisma";
import Link from "next/link";
import subStyles from "../../styles/Subpage.module.css";
import Header from "../../components/Header";
import React from "react";

export async function getServerSideProps(context) {
  const { address } = context.query;

  const contracts = await prisma.contract.findMany({
    where: {
      address: {
        contains: address,
      },
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

  return (
    <div className="container mx-auto p-8">
      <Header />
      <h1>{address}</h1>
      {contracts.map((contract) => {
        const { name, address } = contract;
        return (
          <div key={`${name}-${address}`}>
            <Link href={`/${address}/${name}`}>
              <a className={subStyles.link}>{name}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
