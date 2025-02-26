import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    setOffset(newOffset);
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (searchTerm) => {
    const filteredProducts = data.filter((product) => {
      if (!searchTerm) {
        return product;
      }
      return product.tags.find(({ title }) => title === searchTerm);
    });

    setOffset(0);
    setProducts(filteredProducts.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-1)} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePagination(1)} disabled={offset + limit >= data.length} />
      </div>
    </div>
  );
};

export default CardList;