import useSWR from "swr";
import styles from "../styles/Home.module.css";
import fetcher from "../lib/fetcher";
import { useState } from "react";

function useQuery(keyword) {
  console.log(keyword);
  if (!keyword) {
    return {
      data: [],
      isLoading: false,
      isError: false,
    };
  }

  const { data, error } = useSWR(`/api/query?keyword=${keyword}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading } = useQuery(keyword);

  console.log({ data });

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={(data) => {
          setKeyword(data.target.value);
        }}
      />
    </div>
  );
}
