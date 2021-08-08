import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ product, productId }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card
        className="my-2 p-1 rounded"
        style={{ height: "270px", objectFit: "cover" }}
      >
        <Card.Img
          style={{ height: "150px", objectFit: "contain" }}
          src={product.variations[0].images[0]}
          variant="top"
        />

        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
