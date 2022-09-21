import Tag from "./Tag";

export default function SearchResult(props) {
  const { name, tags = [] } = props;
  const searchResult = `grid grid-cols-3 p-2 items-center bg-zinc-100 rounded-md border-zinc-300 border mb-1 hover:bg-emerald-100 hover:border-emerald-300 hover:cursor-pointer`;

  return (
    <div className={searchResult}>
      <p className={"text-big font-bold text-slate-600"}>{name}</p>
      <p className={"text-big"}>Imported by: --</p>
      {tags.map((name) => {
        return <Tag name={name} key={name} />;
      })}
    </div>
  );
}
