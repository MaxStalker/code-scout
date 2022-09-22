import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className={"w-full flex flex-row justify-between mb-3"}>
      <div className={"grow-0"}>
        <Link href={"/"}>
          <Image width={135} height={19} src={"/logo-codescout-header.png"} />
        </Link>
      </div>
      <a
        href={"https://github.com/MaxStalker/code-scout/issues"}
        className={"flex flex-row gap-1 text-sm items-center"}
      >
        <span className={"text-slate-400"}>Submit issues on</span>
        <Image src={"/logo-github.png"} width={24} height={24} />
        <span className={"text-slate-600 font-bold"}>GitHub</span>
      </a>
    </div>
  );
}
