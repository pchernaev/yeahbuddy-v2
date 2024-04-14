import axios from "axios";
import ProductsToDisplay from "../../../model/ProductsToDisplay";
import { ListContext } from "../../../context/ListContext";
import { useContext, useState } from "react";

export const Product: React.FC<{ product: ProductsToDisplay }> = (props) => {
  const listsContext = useContext(ListContext);
 

  async function handleDelete(e: any) {
    e.preventDefault();

    await axios.delete(`http://localhost:8080/api/v1/list/${props.product.id}`);
    listsContext.setChange(!listsContext.change);
  }

    return (
      <div id="recipe-container">
        <form onSubmit={handleDelete}>
          <p id="name">{props.product.name}</p>
          <p id="quantity">{props.product.quantity == 0 ? "" : props.product.quantity}</p>
          <button type="submit">X</button>
        </form>
      </div>
    );
}