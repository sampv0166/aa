import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Product from "../components/Product";
import { deleteProduct, getProduct } from "./api/products";

const ProductScreen = ({ match, history, location }) => {
  const [products, setProducts] = useState([]);

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      deleteProduct(id);
      console.log(id + " product deleted");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProduct();

      setProducts(data.data);
      console.log(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Link to="/addproduct">
        <Button>Add New Product</Button>
      </Link>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} productId={product.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductScreen;
