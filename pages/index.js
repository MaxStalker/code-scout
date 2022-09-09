import useSWR from "swr";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import subStyles from "../styles/Subpage.module.css";
import fetcher from "../lib/fetcher";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const timer = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [contracts, setContracts] = useState([]);

  const fetchContracts = () => {
    clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const contracts = await fetcher(`/api/query?keyword=${keyword}`);
      setContracts(contracts);
    }, 150);
  };

  useEffect(() => {
    fetchContracts();
  }, [keyword]);

  const { container, link } = styles;
  return (
    <div className={container}>
      <input
        type="text"
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
      {contracts.map((contract) => {
        const { name, account } = contract;
        const { address } = account;

        return (
          <div>
            <p>
              <Link href={`/account/${address}/${name}`}>
                <a className={subStyles.link}>{name}</a>
              </Link>{" "}
              deployed at{" "}
              <Link href={`/account/${address}`}>
                <a className={subStyles.link}>{address}</a>
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}
