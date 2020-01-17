import React from "react";
import axios from "axios";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { waitForElementToBeRemoved } from "@testing-library/dom";

export default function TableEntry(props) {
  const handleClick = e => {};

  const handleEdit = e => {};

  const handleDelete = e => {
    axios
      .delete(`/api/projects/${props.project.id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        props.setError(error.message);
        props.getData();
      });
  };

  return (
    <TableRow key={props.project.id}>
      <TableCell component="th" scope="row">
        {props.project.name}
      </TableCell>
      <TableCell align="right">{props.project.description}</TableCell>
      <TableCell align="right">{props.project.completed}</TableCell>
      <TableCell align="right">
        <button onClick={handleClick}>See actions</button>
      </TableCell>
      <TableCell align="right">
        <button onClick={handleEdit}>Edit</button>
      </TableCell>
      <TableCell align="right">
        <button onClick={handleDelete}>Delete</button>
      </TableCell>
    </TableRow>
  );
}
