import { useContext, useEffect, useState } from "react";
import { Product } from "./components/Product";
import ProductsToDisplay from "../../model/ProductsToDisplay";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { ListContext } from "../../context/ListContext";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

export const ShoppingList = () => {
  const [products, setProducts] = useState<ProductsToDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const user = useContext(UserContext);
  const listsContext = useContext(ListContext);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();

  function changeName(e: any) {
    setName(e.target.value);
  }

  function changeQuantity(e: any) {
    setQuantity(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newProduct = {
      name: name,
      quantity: quantity,
      email: user.email,
    };
    await axios.post(
      "http://localhost:8080/api/v1/list/new-product",
      newProduct
    );

    history.push("/list");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      if (products == null) {
        return (
          <Audio height="80" width="80" color="blue" ariaLabel="loading" />
        );
      }

      const url: string = `http://localhost:8080/api/v1/list/email=${user.email}`;

      await axios.get(url).then(function (response) {
        const responseData = response.data;
        const loadedProducts: ProductsToDisplay[] = [];
        for (const key in responseData) {
          loadedProducts.push({
            id: responseData[key].id,
            name: responseData[key].name,
            quantity: responseData[key].quantity,
          });
        }

        setProducts(loadedProducts);
        setIsLoading(false);
      });
    };
    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [listsContext.change]);

  if (isLoading) {
    return <Audio height="80" width="80" color="blue" ariaLabel="loading" />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <Popup trigger={<button className="button"> + </button>} modal nested>
        <form className="add-food-form">
          <input type="text" id="name-input" onChange={changeName} />
          <label htmlFor="name-input">Name</label>
          <input type="number" id="quantity-input" onChange={changeQuantity} />
          <label htmlFor="name-input">Quantity</label>
          <div className="btn-container">
            <button onClick={handleSubmit}>Add</button>
          </div>
        </form>
      </Popup>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};
