import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import "./UpdateBooksStyles.css";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

var moment = require("moment"); //date

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
  const [idBooks, setId] = React.useState(0);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pageCount, setPageCount] = React.useState(0);
  const [excerpt, setExcerpt] = React.useState("");
  const [publishDate, setPublishDate] = React.useState("");
  const [bookInfo, setBookInfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { id } = useParams();

  //Alert
  const handleClickOpen = ($mess) => {
    setOpen(true);
    setMessage($mess);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getById(id);
  }, []);

  async function getById($id) {
    if ($id === null) {
      console.log("No tiene registro");
    } else {
      const book = await axios.get(
        "https://localhost:44337/api/Books/GetBooks/" + $id
      );

      setId(book.data.id);

      setTitle(book.data.title);
      setDescription(book.data.description);
      setPageCount(book.data.pageCount);
      setExcerpt(book.data.excerpt);
      setPublishDate(book.data.publishDate);

      setBookInfo(book.data);
    }
  }

  //Form
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

  function handleSubmit(event) {
    event.preventDefault();

    console.log(title);
    const booksObject = {
      id: idBooks,
      title: title,
      description: description,
      pageCount: parseInt(pageCount),
      excerpt: excerpt,
      publishDate: publishDate === null ? null : publishDate,
    };
    axios
      .put(`https://localhost:44337/api/Books/UpdateBooks/${id}`, booksObject)
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
        <h2>Actualizar Registro</h2>
        <Container maxWidth="sm">
          <div>
            <TextField
              label="Titulo"
              name="title"
              value={bookInfo.title}
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
              value={bookInfo.description}
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
              value={bookInfo.pageCount}
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
              name="excerpt"
              value={bookInfo.excerpt}
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
              value={moment(bookInfo.publishDate).format("YYYY-MM-DD")}
              onChange={changesPublishDate}
              defaultValue={"2017-05-24"}
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
