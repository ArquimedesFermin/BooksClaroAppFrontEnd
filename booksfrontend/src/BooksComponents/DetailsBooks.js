import React, { useEffect } from "react";
import "./DetailsBooksStyle.css";
import axios from "axios";
import Container from "@material-ui/core/Container";

var moment = require("moment"); //

function DetailsBooks() {
  const [bookInfo, setBookInfo] = React.useState([]);

  useEffect(() => {
    getById(2);
  }, []);

  async function getById($id) {
    if ($id === null) {
      console.log("No tiene registro");
    } else {
      const book = await axios.get(
        "https://localhost:44337/api/Books/GetBooks/" + $id
      );
      setBookInfo(book.data);
    }
  }

  return (
    <div>
      <h2>Detalle del Book</h2>
      <Container maxWidth="sm">
        <div>
          <div>
            <label>
              <strong>Titulo:</strong> {bookInfo.title}
            </label>
          </div>

          <div>
            <label>
              <strong>Descripcion:</strong> {bookInfo.description}
            </label>
          </div>
          <div>
            <label>
              <strong>Cantidad de Pagina:</strong> {bookInfo.pageCount}
            </label>
          </div>
          <div>
            <label>
              <strong>Resumen:</strong> {bookInfo.excerpt}
            </label>
          </div>
          <div>
            <label>
              <strong>Fecha de publicacion:</strong>{" "}
              {moment(bookInfo.publishDate).format("DD/MM/YYYY")}
            </label>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default DetailsBooks;
