import React, { useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./GetBookStyle.css";
import AddIcon from '@material-ui/icons/Add';

var moment = require("moment"); // 

function GetBooks() {
  const [books, setBooks] = React.useState([]);

  useEffect(() => {
    getBooksList();
  }, []);

  async function getBooksList() {
    const book = await axios.get("https://localhost:44337/api/Books/GetBooks");
    setBooks(book.data);
    console.log(books);
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 11,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const classes = useStyles();

  return (
    <div className="table">
      {" "}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Titulo</StyledTableCell>
              <StyledTableCell align="center">Descripcion</StyledTableCell>
              <StyledTableCell align="center">Pagina</StyledTableCell>
              <StyledTableCell align="center">Resumen</StyledTableCell>
                          <StyledTableCell align="center">Publicacion</StyledTableCell>
                          <StyledTableCell align="center"></StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell className="cell" align="left">
                  {item.title}{" "}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="left">{item.pageCount}</StyledTableCell>
                <StyledTableCell align="left">{item.excerpt}</StyledTableCell>
                <StyledTableCell align="left">
                  {moment(item.publishDate).format("DD/MM/YYYY")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <AddIcon style={{ fontSize: 40 }} />

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GetBooks;
