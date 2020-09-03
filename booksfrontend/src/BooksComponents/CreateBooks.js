import React, { useEffect } from "react";
import "./CreateBooksStyle.css";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

function CreateBooks() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pageCount, setPageCount] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [publishDate, setPublishDate] = React.useState("");

  // useEffect({}, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(4),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "50ch",
    },
  }));

  const classes = useStyles();

  function changesTitle(e) {
    setTitle(e.target.value);
    console.log(e.target.value);
  }
  function changesDescription(e) {
    setDescription(e.target.value);
  }
  function changesPageCount(e) {
    setPageCount(e.target.value);
  }
  function changesExcerpt(e) {
    setExcerpt(e.target.value);
  }
  function changesPublishDate(e) {
    setPublishDate(e.target.value);
  }
  function alerta() {
    alert("Error...");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const book = {
      title: title,
      description: description,
      pageCount: parseInt(pageCount),
      excerpt: excerpt,
      publishDate: publishDate === null ? null : publishDate,
    };
    console.log(book.publishDate);
    console.log(book);

    axios
      .post(`https://localhost:44337/api/Books/PostBoks`, { book })
      .then((res) => {
        console.log(res.data);
        if (res.data !== 200) {
          alerta();
        }
      });
  }

  return (
    <div className={"groupForm"}>
      <form onSubmit={handleSubmit}>
        <h2>Registrar libros</h2>
        <Container maxWidth="sm">
          <div>
            <TextField
              label="Titulo"
              name="title"
              onChange={changesTitle}
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </div>
          <p></p>
          <p></p>
          <div>
            <TextField
              label="Descripcion"
              name="description"
              onChange={changesDescription}
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </div>
          <p></p>
          <p></p>
          <div>
            <TextField
              label="Cantidad de paginas"
              name="pageCount"
              onChange={changesPageCount}
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </div>
          <p></p>
          <p></p>
          <div>
            <TextField
              label="Resumen"
              name="pageCount"
              onChange={changesExcerpt}
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </div>
          <p></p>
          <p></p>
          <div className={"datePicker"}>
            <TextField
              id="date"
              label="Fecha de publicacion"
              type="date"
              onChange={changesPublishDate}
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <p></p>
          <div className={"button"}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default CreateBooks;
