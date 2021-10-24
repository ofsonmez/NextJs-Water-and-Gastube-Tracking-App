import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import * as React from 'react';
import Moment from 'react-moment';

// Generate Order Data
type getData = {
  id: number;
  Product: string;
  FullName: string;
  CreatedAt: Date;
  Price: number;
  Count: number;
};

const Orders = ({ rows }: { rows: getData[] | null }) => {
  console.log(rows);
  return (
    <React.Fragment>
      <h1 style={{ marginTop: 0, marginLeft: 15, marginBottom: 5 }}>
        <u>Orders</u>
      </h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Moment>{row.CreatedAt}</Moment>
              </TableCell>
              <TableCell>{row.Product}</TableCell>
              <TableCell>{row.FullName}</TableCell>
              <TableCell>{row.Price} $</TableCell>
              <TableCell>{row.Count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Orders;
