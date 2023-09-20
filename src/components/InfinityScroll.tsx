import { useEffect, useRef, useState } from "react";
import { IProducts } from "../types/products";
import ProductLists from "./ProductLists";
import Search from "./Search";

function InfiniteScroll() {
  const [data, setData] = useState<IProducts[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<IProducts[]>([]);

  // Search item

  const loader = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skip * 20}`
    );
    const newData = await response.json();
    if (newData.products.length === 0) {
      setIsMore(false);
    } else {
      setData((prev) => [...prev, ...newData.products]);
      setSkip((prevSkip) => prevSkip + 1);
    }
  };

  const fetchDataSearch = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}`
    );
    const newData = await response.json();

    if (newData.products.length === 0 && searchTerm !== "") {
      setDataSearch(newData.products);
    } else {
      setDataSearch((prev) => [...prev, ...newData.products]);
    }
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];

    if (!firstEntry.isIntersecting) return;
    if (firstEntry.isIntersecting && isMore && searchTerm === "") {
      fetchData();
    }
  };
  // Search products

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loader.current) {
      observer.observe(loader.current);
    }
    if (searchTerm !== "") {
      console.log("call again 123");

      fetchDataSearch();
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data, searchTerm]);

  return (
    <div>
      <Search onChange={(value) => setSearchTerm(value)} />
      <ProductLists data={searchTerm === "" ? data : dataSearch} />

      {isMore && searchTerm === "" && (
        <div
          ref={loader}
          style={{
            textAlign: "center",
          }}
        >
          Loading more items ...{" "}
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
