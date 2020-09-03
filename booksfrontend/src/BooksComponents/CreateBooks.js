import React, { useEffect } from "react";
import "./CreateBooksStyle.css";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CreateBooks() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pageCount, setPageCount] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [publishDate, setPublishDate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //Alert
  const handleClickOpen = ($mess) => {
    setOpen(true);
    setMessage($mess);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

    axios
      .post(`https://localhost:44337/api/Books/PostBooks`, { book })
      .then((res) => {
        console.log(res.data);
        if (res.data === 200) {
          handleClickOpen("Success");
        } else {
          handleClickOpen("Error!!");
        }
      });
  }

  const style = {
    color: "black",
    textDecoration: "none",
  };
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
          <Link to={``} style={style}>
            {" "}
            Volver atras!!{" "}
          </Link>
        </Container>
      </form>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Alerta
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBooks;
