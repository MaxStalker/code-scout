import Link from "next/link";
import styles from "../styles/Home.module.css";
import subStyles from "../styles/Subpage.module.css";
import fetcher from "../lib/fetcher";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";

let timer;
const fetchContracts = ({ setContracts, setLoading }, keyword) => {
  clearTimeout(timer);
  setContracts([]);
  timer = setTimeout(async () => {
    setLoading(true);
    const contracts = await fetcher(`/api/query?keyword=${keyword}`);
    setContracts(contracts);
    setLoading(false);
  }, 350);
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [contracts, setContracts] = useState([
    {
      name: "TopShot",
      address: `0x${"1234".padStart(16, 0)}`,
      tags: ["FT", "Interface"],
    },
  ]);

  useEffect(() => {
    if (keyword !== "") {
      fetchContracts({ setContracts, setLoading }, keyword);
    } else {
      setLoading(false);
    }
  }, [keyword]);

  const { container, link } = styles;
  const shallRenderList = !loading;

  const inputClass =
    "shadow-md bg-gray-30 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2";
  const searchResult = `grid grid-cols-3 p-2 items-center bg-zinc-100 rounded-md border-zinc-300 border mb-1 hover:bg-emerald-100 hover:border-emerald-300 hover:cursor-pointer`;
  const tagContainer = `flex justify-end gap-1`;
  const tag = `flex justify-center items-center px-2 py-1 bg-emerald-300 rounded-md text-white font-bold`;
  return (
    <div className="container mx-auto p-8">
      <Header />
      <input
        className={inputClass}
        type="text"
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
      {loading && <p>Loading...</p>}
      {shallRenderList &&
        contracts.map((contract) => {
          const { name, address, tags } = contract;
          return (
            <Link href={`/${address}/${name}`}>
              <div key={`${name}-${address}`} className={searchResult}>
                <p className={"text-big font-bold text-slate-600"}>{name}</p>
                <p className={"text-big"}>Imported by: --</p>
                <div className={tagContainer}>
                  {tags.map((name) => {
                    return <span className={tag}>{name}</span>;
                  })}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
