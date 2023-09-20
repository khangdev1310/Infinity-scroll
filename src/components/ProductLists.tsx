import { IProducts } from "../types/products";

function ProductLists({ data }: { data: IProducts[] }) {
  return (
    <div>
      {data.map((item: IProducts, index: number) => (
        <div
          key={index}
          style={{
            width: 600,
            margin: "0 auto ",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <img
              src={item.thumbnail}
              alt="Product image"
              style={{
                width: "100%",
                marginTop: 10,
              }}
            />
          </div>
          <div style={{ width: "50%", paddingLeft: 20 }}>
            <b>{item.title}</b> <p>{item.price}$</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductLists;
