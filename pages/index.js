import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import SearchResult from "../components/SearchResult";

import fetcher from "../lib/fetcher";

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

function getParams(search) {
  let noQuestion = search[0] === "?" ? search.slice(1) : search;
  return noQuestion
    .split("&")
    .map((item) => item.split("="))
    .reduce((acc, item) => {
      const [key, value] = item;
      acc[key] = value;
      return acc;
    }, {});
}

export async function getServerSideProps(context) {
  const { keyword } = context.query;
  return {
    props: {
      keyword: keyword || "",
    },
  };
}

export default function Home(props) {
  const { keyword: initialKeyword } = props;
  const router = useRouter();

  const keywordInitial = "TopShot";
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (keyword !== "") {
      router.push(`/?keyword=${keyword}`, undefined, { shallow: true });
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword !== "") {
      fetchContracts({ setContracts, setLoading }, keyword);
    } else {
      setLoading(false);
    }
  }, [router.query.keyword]);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);

  const shallRenderList = keyword !== "" && !loading;

  const inputClass =
    "shadow-md bg-gray-30 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2";
  return (
    <div className="container mx-auto p-8">
      <Header />
      <input
        className={inputClass}
        type="text"
        value={keyword}
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
      {loading && <p>Loading...</p>}
      {shallRenderList &&
        contracts.map((contract) => {
          const { name, address } = contract;
          return (
            <Link href={`/${address}/${name}`} key={`${name}-${address}`}>
              <a>
                <SearchResult {...contract} />
              </a>
            </Link>
          );
        })}
    </div>
  );
}
