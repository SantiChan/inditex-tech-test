import React, { useState } from "react";
import {
	DndContext,
	DragStartEvent,
	DragEndEvent,
	DragOverlay,
	closestCenter,
} from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import NewTest from "./ContainerProduct";
import { Row, Product } from "@/types/types";
import { PRODUCTS_DATA } from "@/data/producstData";
import Image from "next/image";

const Editor: React.FC = () => {
	const [productsAvailable] = useState<Product[]>(PRODUCTS_DATA);
	const [rows, setRows] = useState<Row[]>([
		{ rowId: "row-" + Date.now().toString(), products: [] },
	]);
	const [activeProduct, setActiveProduct] = useState<Product | null>(null);

	const [scale, setScale] = useState(1);

	const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 1));
	const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.8));

	const handleAddRow = () => {
		const newRow = { rowId: "row-" + Date.now().toString(), products: [] };
		setRows((prevRows) => [...prevRows, newRow]);
	};

	const handleMoveRowUp = (rowId: string) => {
		setRows((prevRows) => {
			const index = prevRows.findIndex((r) => r.rowId === rowId);
			if (index <= 0) return prevRows;
			return arrayMove(prevRows, index, index - 1);
		});
	};

	const handleMoveRowDown = (rowId: string) => {
		setRows((prevRows) => {
			const index = prevRows.findIndex((r) => r.rowId === rowId);
			if (index === -1 || index >= prevRows.length - 1) return prevRows;
			return arrayMove(prevRows, index, index + 1);
		});
	};

	const handleRemoveRow = (rowId: string) => {
		setRows((prevRows) => prevRows.filter((r) => r.rowId !== rowId));
	};

	const handleDragStart = (event: DragStartEvent) => {
		const activeId = event.active.id;
		let found: Product | null = null;
		for (const row of rows) {
			const prod = row.products.find((p) => p.id === activeId);
			if (prod) {
				found = prod;
				break;
			}
		}
		setActiveProduct(found);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) {
			setActiveProduct(null);
			return;
		}

		const activeRowId = active.data.current?.rowId;
		const overRowId = over.data.current?.rowId;

		if (activeRowId && overRowId && activeRowId === overRowId) {
			setRows((prevRows) =>
				prevRows.map((row) => {
					if (row.rowId === activeRowId) {
						const oldIndex = row.products.findIndex(
							(p) => p.id === active.id,
						);
						const newIndex = row.products.findIndex(
							(p) => p.id === over.id,
						);
						return {
							...row,
							products: arrayMove(
								row.products,
								oldIndex,
								newIndex,
							),
						};
					}
					return row;
				}),
			);
		} else if (activeRowId && overRowId && activeRowId !== overRowId) {
			setRows((prevRows) => {
				const newRows = prevRows.map((row) => ({
					...row,
					products: [...row.products],
				}));
				const sourceRow = newRows.find(
					(row) => row.rowId === activeRowId,
				);
				const targetRow = newRows.find(
					(row) => row.rowId === overRowId,
				);
				if (!sourceRow || !targetRow) return prevRows;
				const productIndex = sourceRow.products.findIndex(
					(p) => p.id === active.id,
				);
				if (productIndex === -1) return prevRows;
				const [movedProduct] = sourceRow.products.splice(
					productIndex,
					1,
				);
				if (targetRow.products.length < 3) {
					const overIndex = targetRow.products.findIndex(
						(p) => p.id === over.id,
					);
					if (overIndex === -1) {
						targetRow.products.push(movedProduct);
					} else {
						targetRow.products.splice(overIndex, 0, movedProduct);
					}
				} else {
					const overIndex = targetRow.products.findIndex(
						(p) => p.id === over.id,
					);
					if (overIndex !== -1) {
						const [swappedProduct] = targetRow.products.splice(
							overIndex,
							1,
							movedProduct,
						);
						sourceRow.products.splice(
							productIndex,
							0,
							swappedProduct,
						);
					} else {
						sourceRow.products.splice(
							productIndex,
							0,
							movedProduct,
						);
					}
				}
				return newRows;
			});
		}
		setActiveProduct(null);
	};

	return (
		<div className="pl-40 pr-40 relative">
			{/* Header fijo: botones de Añadir Fila y Zoom */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-white shadow p-4 flex justify-center space-x-4">
				<button
					onClick={handleAddRow}
					className="px-8 py-4 border border-black rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
				>
					Añadir Fila
				</button>
				<button
					onClick={handleZoomOut}
					className="px-4 py-2 border border-black rounded bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
				>
					–
				</button>
				<button
					onClick={handleZoomIn}
					className="px-4 py-2 border border-black rounded bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
				>
					+
				</button>
			</div>
			<div className="pt-28">
				<div
					style={{ zoom: scale }}
					className="transition-all duration-200"
				>
					<DndContext
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					>
						{rows.map((row) => (
							<div key={row.rowId} className="mt-10">
								<div className="flex justify-center mb-2 space-x-2">
									<button
										onClick={() =>
											handleMoveRowUp(row.rowId)
										}
										className="px-3 py-2 border border-black rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
									>
										↑ Subir fila
									</button>
									<button
										onClick={() =>
											handleMoveRowDown(row.rowId)
										}
										className="px-3 py-2 border border-black rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
									>
										↓ Bajar fila
									</button>
									<button
										onClick={() =>
											handleRemoveRow(row.rowId)
										}
										className="px-2 py-1 bg-red-500 text-white rounded-full"
									>
										Eliminar fila
									</button>
								</div>
								<SortableContext
									key={row.rowId}
									items={row.products.map((p) => p.id)}
									strategy={horizontalListSortingStrategy}
								>
									<NewTest
										rowId={row.rowId}
										productsAvailable={productsAvailable}
										rows={rows}
										setRows={setRows}
									/>
								</SortableContext>
							</div>
						))}
						<DragOverlay>
							{activeProduct ? (
								<div className="bg-white p-2 rounded shadow-md my-2 text-slate-900 cursor-grab w-[400px]">
									{activeProduct.imageUrl && (
										<div className="relative h-[300px] mb-2 flex justify-center">
											<Image
												src={activeProduct.imageUrl}
												alt={activeProduct.name}
												width={200}
												height={50}
												className="object-cover rounded"
											/>
										</div>
									)}
									<h2 className="font-semibold text-sm mb-1">
										{activeProduct.name}
									</h2>
									<p className="text-xs text-gray-600">
										{activeProduct.price} €
									</p>
								</div>
							) : null}
						</DragOverlay>
					</DndContext>
				</div>
			</div>
		</div>
	);
};

export default Editor;
