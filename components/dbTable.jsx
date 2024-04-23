"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import axios from "axios";
import Link from "next/link";

export default function DbTable(props) {
  const [attributes, setAttributes] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    console.log("inside useEffect");

    async function getData() {
      if (props.tableName && props.tableName != "undefined") {
        let resp = await axios.get(
          "http://localhost:8080/tables/" + props.tableName,
          {}
        );
        let response = resp.data.map((attr) => {
          return { key: attr, label: attr.toUpperCase() };
        });
        setAttributes(response);
        console.log(response);
      }

      if (props.tableName && props.tableName != "undefined") {
        let resp = await axios.get(
          "http://localhost:8080/" + props.tableName + "s",
          {}
        );
        let data = resp.data._embedded[props.tableName + "s"];
        setTableData(data);
        console.log(data);
      }
    }
    getData();
  }, [props.tableName]);

  function getTableHeader() {
    if (attributes.length == 0) {
      return (
        <TableHeader>
          <TableColumn>Message</TableColumn>
        </TableHeader>
      );
    }
    return (
      <TableHeader columns={attributes}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
    );
  }
  function getTableCell(item, columnKey) {
    console.log("item['columnKey']:", item[columnKey]);
    if (
      typeof item[columnKey] == "string" &&
      item[columnKey].indexOf("http") != -1
    ) {
      console.log("llinkkk");
      const parts = item[columnKey].split("/");
      const href = parts[parts.length - 2];
      return (
        <Link href={item[columnKey]}>
          {columnKey} {"-"}
          {href}
        </Link>
      );
    }
    return getKeyValue(item, columnKey);
  }

  function getTableBody() {
    if (attributes.length == 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell>No data</TableCell>
          </TableRow>
        </TableBody>
      );
    }
    for (const data of tableData) {
      for (const attribute of attributes) {
        const key = attribute["key"];
        if (!data[key]) {
          if (data["_links"][key]) {
            const val = data["_links"][key]["href"];
            data[key] = val;
          }
        }
      }
    }

    console.log("tableData: ", tableData);
    console.log(getKeyValue(tableData[0], "arrivalTime"));

    return (
      <TableBody items={tableData}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getTableCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    );
  }
  return (
    <Table aria-label="Example table with dynamic content" key={"table"}>
      {getTableHeader()}
      {getTableBody()}
    </Table>
  );
}
