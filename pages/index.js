import Link from "next/link";
import fetcher from "../lib/fetcher";
import { useEffect, useState } from "react";
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
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (keyword !== "") {
      fetchContracts({ setContracts, setLoading }, keyword);
    } else {
      setLoading(false);
    }
  }, [keyword]);

  const shallRenderList = keyword !=="" && !loading;

  const inputClass =
    "shadow-md bg-gray-30 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2";
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
            <Link href={`/${address}/${name}`} key={`${name}-${address}`}>
              <div className={searchResult}>
                <p className={"text-big font-bold text-slate-600"}>{name}</p>
                <p className={"text-big"}>Imported by: --</p>
                <div className={tagContainer}>
                  {tags.map((name) => {
                    return (
                      <span className={tag} key={name}>
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
