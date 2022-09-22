import Tag from "./Tag";

export default function SearchResult(props) {
  const { name, tags = [] } = props;
  const classContractName = "text-big font-bold text-slate-600";
  const classSearchResult = `grid grid-cols-3 p-2 items-center bg-zinc-100 rounded-md border-zinc-300 border mb-1 hover:bg-emerald-100 hover:border-emerald-300 hover:cursor-pointer`;
  const classTagContainer = `flex justify-end gap-1`;

  return (
    <div className={classSearchResult}>
      <p className={classContractName}>{name}</p>
      <p className={"text-big"}>Imported by: --</p>
      <div className={classTagContainer}>
        {tags.map((name) => {
          return <Tag name={name} key={name} />;
        })}
      </div>
    </div>
  );
}
