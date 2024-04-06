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
      <div>
        <form onSubmit={handleDelete}>
          <p>{props.product.name}</p>
          <p>{props.product.quantity}</p>
          <div className="button-container">
            <button type="submit">Delete</button>
          </div>
        </form>
      </div>
    );
}