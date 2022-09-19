import Link from "next/link";
import styles from "../styles/Home.module.css";
import subStyles from "../styles/Subpage.module.css";
import fetcher from "../lib/fetcher";
import { useEffect, useRef, useState } from "react";


let timer;
const fetchContracts = ({setContracts, setLoading}, keyword) => {
  clearTimeout(timer);
  setContracts([]);
  timer = setTimeout(async () => {
    setLoading(true)
    const contracts = await fetcher(`/api/query?keyword=${keyword}`);
    setContracts(contracts);
    setLoading(false)
  }, 350);
};

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("");
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if(keyword !== ""){
      fetchContracts({setContracts, setLoading}, keyword);
    } else{
      setLoading(false)
    }
  }, [keyword]);

  const { container, link } = styles;
  const inputClass =
    "shadow-md bg-gray-30 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const shallRenderList = keyword !== "" && !loading
  return (
    <div className="container mx-auto p-8">
      <input
        className={inputClass}
        type="text"
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
      {loading && <p>Loading...</p>}
      {shallRenderList && contracts.map((contract) => {
        const { name, address, tags } = contract;
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
