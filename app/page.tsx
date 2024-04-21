"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import SearchBox from "@/components/searchBox";
import DropDown from "@/components/dropDown";
import DbTable from "@/components/dbTable";
import { Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [table, setTable] = useState<string>();
  function getTableName(tableName: string) {
    console.log("page ", tableName);
    setTable(tableName);
  }
  return (
    <div>
      <SearchBox getTableName={getTableName}></SearchBox>
      <Spacer y={10}></Spacer>
      <DbTable tableName={table}></DbTable>
    </div>
  );
}
