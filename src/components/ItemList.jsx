import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import utils from "../helpers/Utils";

export default function ItemList({ defaultItems }) {
	const [items, setItems] = useState(defaultItems);
	const handleAdd = () => {
		const newItem = {
			id: utils.randomNumber(1, 1000000),
			name: "",
			quantity: 0,
			price: 0,
			total: 0,
		};
		setItems([...items, newItem]);
	};
	const handleDelete = (itemToDelete) => {
		setItems(items.filter((item) => item !== itemToDelete));
	};
	const calcTotal = (index) => {
		const quantity = document.getElementsByName(`quantity`)[index].value;
		const price = document.getElementsByName(`price`)[index].value;
		const total = utils.numberWithCommas(quantity * price);
		document.getElementsByName(`total`)[index].value = "$ " + total;
	};
	return (
		<>
			{items.map((item, index) => {
				return (
					<div className="item" key={index}>
						<div className="row item-list align-items-center gx-3">
							<div className="col-12 col-md mb-3">
								<label htmlFor="itemName">Item Name</label>
								<input
									type="text"
									className="form-control"
									id="itemName"
									name="name"
									defaultValue={item.name}
								/>
							</div>
							<div className="col mb-3 quantity">
								<label htmlFor="itemQuantity">Qty.</label>
								<input
									type="number"
									className="form-control"
									id="itemQuantity"
									name="quantity"
									defaultValue={item.quantity}
									onChange={() => {
										{
											calcTotal(index);
										}
									}}
								/>
							</div>
							<div className="col mb-3 price">
								<label htmlFor="itemPrice">Price</label>
								<input
									type="number"
									className="form-control"
									id="itemPrice"
									name="price"
									defaultValue={item.price}
									onChange={() => {
										{
											calcTotal(index);
										}
									}}
								/>
							</div>
							<div className="col mb-3 total">
								<label htmlFor="itemTotal">Total</label>
								<div className="d-flex justify-content-between align-items-center gap-2">
									<input
										className="form-control fw-bold text-info fs-6 border-0"
										name="total"
										defaultValue={item.total}
										readOnly
									/>
									<button
										className="btn btn-link btn-icon text-info pe-1 ms-3"
										type="button"
										onClick={() => handleDelete(item)}
									>
										<FaTrash className="delete-item fs-6" />
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<div className="row">
				<div className="col-12">
					<button
						className="btn btn-light btn-icon-2 w-100"
						type="button"
						onClick={(e) => handleAdd()}
					>
						<HiPlus className="me-2" />
						<div>Add New Item</div>
					</button>
				</div>
			</div>
		</>
	);
}
