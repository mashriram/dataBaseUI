"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DropDown(props: any) {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    async function getTables() {
      let resp = await axios.get("http://localhost:8080/tables", {});
      let tables = resp.data.map((item: string) => {
        return {
          key: item.charAt(0).toLowerCase() + item.slice(1),
          label: item,
        };
      });
      console.log(tables);
      setTables(tables);
    }
    getTables();
  }, []);
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid">Select table</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={tables}
        onAction={(item: any) => {
          console.log(
            props.getTableName(item.charAt(0).toLowerCase() + item.slice(1))
          );
          return props.getTableName(
            item.charAt(0).toLowerCase() + item.slice(1)
          );
        }}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
          >
            {/* <Link href={"http://localhost:8080/" + item.key}> */}
            {item.label}
            {/* </Link> */}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
