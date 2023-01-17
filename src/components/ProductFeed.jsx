import Product from "./Product";

function ProductFeed({ products }) {
	return (
		<div className="grid grid-cols-2 gap-0 ">
			{products.map((product, i) => (
				<Product
					key={i}
					id={product.node.id}
					title={product.node.title}
					price={product.node.price}
					description={product.node.description}
					category={product.node.itemCategory.name}
					image={product.node.featuredImage[0].url}
				/>
			))}
		</div>
	);
}

export default ProductFeed;
