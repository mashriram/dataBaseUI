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

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function DbTable(props) {
  const [attributes, setAttributes] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    console.log("inside useEffect");
    async function getAttributes() {
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
    }
    async function getData() {
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
    getAttributes();
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
    return (
      <TableBody items={tableData}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
