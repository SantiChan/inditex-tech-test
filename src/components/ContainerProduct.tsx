import React from "react";
import ItemProduct from "./ItemProduct";
import { Row, Product } from "@/types/types";

interface NewTestProps {
	rowId: string;
	productsAvailable: Product[];
	rows: Array<{ rowId: string; products: Product[] }>;
	setRows: React.Dispatch<React.SetStateAction<Array<Row>>>;
}

function getColumnStart(
	index: number,
	total: number,
	alignment: "left" | "center" | "right",
): number {
	if (total === 1) {
		if (alignment === "left") return 1;
		if (alignment === "center") return 2;
		return 3;
	}

	if (total === 2) {
		if (alignment === "left") {
			return index === 0 ? 1 : 2;
		}
		if (alignment === "right") {
			return index === 0 ? 2 : 3;
		}
		return index === 0 ? 1 : 3;
	}
	return index + 1;
}

const ContainerProduct: React.FC<NewTestProps> = ({
	rowId,
	productsAvailable,
	rows,
	setRows,
}) => {
	const row = rows.find((r) => r.rowId === rowId);
	const products = row ? row.products : [];

	const handleAddProduct = () => {
		if (products.length < 3) {
			const availableProducts = productsAvailable.filter(
				(product) =>
					!rows.some((row) =>
						row.products.some((p) => p.id === product.id),
					),
			);
			if (availableProducts.length > 0) {
				const randomProduct =
					availableProducts[
						Math.floor(Math.random() * availableProducts.length)
					];
				const newProduct = {
					...randomProduct,
					alignment: "left" as const,
				};
				setRows((prevRows) =>
					prevRows.map((r) =>
						r.rowId === rowId
							? { ...r, products: [...r.products, newProduct] }
							: r,
					),
				);
			}
		}
	};

	const handleAlignmentChange = (
		newAlignment: "left" | "center" | "right",
	) => {
		setRows((prevRows) =>
			prevRows.map((r) => {
				if (r.rowId !== rowId) return r;

				if (r.products.length === 2) {
					return {
						...r,
						products: r.products.map((p) => ({
							...p,
							alignment: newAlignment,
						})),
					};
				}
				if (r.products.length === 1) {
					return {
						...r,
						products: [
							{ ...r.products[0], alignment: newAlignment },
						],
					};
				}
				return r;
			}),
		);
	};

	const handleRemoveProduct = (productId: number) => {
		setRows((prevRows) =>
			prevRows.map((r) => {
				if (r.rowId !== rowId) return r;
				return {
					...r,
					products: r.products.filter((p) => p.id !== productId),
				};
			}),
		);
	};

	return (
		<div className="flex justify-center items-center">
			<div className="w-full">
				<div className="grid grid-cols-3 gap-14 w-full">
					{products.map((product, index) => {
						const alignment = product.alignment || "center";
						const colStart = getColumnStart(
							index,
							products.length,
							alignment,
						);

						return (
							<div
								key={product.id}
								className={`col-span-1 col-start-${colStart} mt-10`}
							>
								<ItemProduct
									user={product}
									rowId={rowId}
									index={index}
									alignment={alignment}
								/>
								<button
									onClick={() =>
										handleRemoveProduct(product.id)
									}
									className="top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
								>
									X
								</button>
							</div>
						);
					})}
				</div>
				{(products.length === 1 || products.length === 2) && (
					<div className="flex justify-center mt-4 space-x-4">
						<button
							onClick={() => handleAlignmentChange("left")}
							className="px-4 py-2 
									border border-black 
									rounded-2xl
									bg-white text-black 
									hover:bg-black hover:text-white 
									transition-colors duration-200"
						>
							Izquierda
						</button>
						<button
							onClick={() => handleAlignmentChange("center")}
							className="px-4 py-2 
									border border-black 
									rounded-full
									bg-white text-black 
									hover:bg-black hover:text-white 
									transition-colors duration-200"
						>
							Centro
						</button>
						<button
							onClick={() => handleAlignmentChange("right")}
							className="px-4 py-2 
									border border-black 
									rounded-full 
									bg-white text-black 
									hover:bg-black hover:text-white 
									transition-colors duration-200"
						>
							Derecha
						</button>
					</div>
				)}
				<button
					onClick={handleAddProduct}
					className="mt-6 px-6 py-2 border border-black 
									rounded-full
									bg-white text-black 
									hover:bg-black hover:text-white 
									transition-colors duration-200"
					disabled={products.length >= 3}
				>
					Añadir Producto
				</button>
			</div>
		</div>
	);
};

export default ContainerProduct;
