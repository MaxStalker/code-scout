export default function Tag(props) {
  const { name } = props;
  const tag = `flex justify-center items-center px-2 py-1 bg-emerald-300 rounded-md text-white font-bold`;

  return (
    <span className={tag} key={name}>
      {name}
    </span>
  );
}
