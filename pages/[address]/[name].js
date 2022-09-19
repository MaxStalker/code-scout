import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Link from "next/link";

import prisma from "../../lib/prisma";
import { configureCadence, CADENCE_LANGUAGE_ID } from "../../lib/monaco";

import subStyles from "../../styles/Subpage.module.css";
import monacoStyles from "../../styles/Monaco.module.css";

export async function getServerSideProps(context) {
  const { address, name } = context.query;

  const contract = await prisma.contract.findUnique({
    where: {
      name_address: {
        address,
        name,
      },
    },
    select: {
      name: true,
      address: true,
      code: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  return { props: { address, name, contract } };
}

export default function ContractName(props) {
  const editorRef = useRef(null);
  const [line, setCurrentLine] = useState(1);

  function handleHash(editor, monaco) {
    const { hash } = window.location;
    if (/#L\d+(-L\d+)?/.test(hash)) {
      const [start, end] = hash
        .slice(1)
        .split("-")
        .map((item) => parseInt(item.slice(1)));

      const range = new monaco.Range(start, 1, end || start, 1);
      editor.revealPositionInCenter({ lineNumber: start, column: 1 });
      editor.deltaDecorations(
        [],
        [
          {
            range,
            options: {
              isWholeLine: true,
              className: monacoStyles.selected,
            },
          },
        ]
      );
    }
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    configureCadence(monaco);
    handleHash(editor, monaco);
    console.log("succesfully selected");
  }

  const { contract } = props;

  if (!contract) {
    return (
      <div>
        <p>Can&apost find contract on this account with this address</p>
        <p>
          Check
          <Link href={`/account/${address}`}>
            <a className={subStyles.link}>{address}</a>
          </Link>{" "}
          for other available contracts
        </p>
      </div>
    );
  }

  const { code, address, name } = contract;

  return (
    <div>
      <Link href={`/account/${address}`}>
        <a className={subStyles.link}>{address}</a>
      </Link>
      <p>{name}</p>
      <Editor
        className={monacoStyles.test}
        language={CADENCE_LANGUAGE_ID}
        line={line}
        defaultValue={code}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
