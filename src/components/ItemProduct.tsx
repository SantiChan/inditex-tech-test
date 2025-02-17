import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface TestProductProps {
	user: {
		id: number;
		name: string;
		price: number;
		alignment?: "left" | "center" | "right";
		imageUrl?: string;
	};
	rowId: string;
	alignment: "left" | "center" | "right";
	index: number;
}

const ItemProduct: React.FC<TestProductProps> = ({ user, rowId }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: user.id,
			data: { rowId },
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white p-2 rounded shadow-md my-2 text-slate-900 cursor-grab w-full"
		>
			{user.imageUrl && (
				<div className="relative h-[300px] mb-2 flex justify-center">
					<Image
						src={user.imageUrl}
						alt={user.name}
						width={200}
						height={50}
						className="object-cover rounded"
					/>
				</div>
			)}
			<h2 className="font-semibold text-sm mb-1">{user.name}</h2>
			<p className="text-xs text-gray-600">{user.price} €</p>
		</div>
	);
};

export default ItemProduct;
