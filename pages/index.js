import Link from "next/link";
import styles from "../styles/Home.module.css";
import subStyles from "../styles/Subpage.module.css";
import fetcher from "../lib/fetcher";
import { useEffect, useRef, useState } from "react";


let timer;
const fetchContracts = (setContracts) => {
  clearTimeout(timer);
  setContracts([]);
  timer = setTimeout(async () => {
    const contracts = await fetcher(`/api/query?keyword=${keyword}`);
    setContracts(contracts);
  }, 150);
};

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts(setContracts);
  }, [keyword]);

  const { container, link } = styles;
  const inputClass =
    "shadow-md bg-gray-30 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  return (
    <div className="container mx-auto p-8">
      <input
        className={inputClass}
        type="text"
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
      {contracts.map((contract) => {
        const { name, account } = contract;
        const { address } = account;

        return (
          <div
            key={`${name}-${address}`}
            className=""
          >
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
