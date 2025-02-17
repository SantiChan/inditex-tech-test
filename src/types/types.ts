export interface Product {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	alignment?: "left" | "center" | "right";
}

export interface Row {
	rowId: string;
	products: Product[];
}
