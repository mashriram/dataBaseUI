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

  useEffect(() => {
    console.log("inside useEffect");
    async function getAttributes() {
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
    getAttributes();
  }, [props.tableName]);

  function getTableHeader() {
    console.log("attributesH: ", attributes.length);
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
    console.log("attributesB: ", attributes.length);
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
      <TableBody items={rows}>
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
