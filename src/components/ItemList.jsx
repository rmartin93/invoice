import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import utils from "../helpers/Utils";

export default function ItemList() {
	const [items, setItems] = useState([0, 1]);
	const handleAdd = (e) => {
		e.preventDefault();
		// Make new item sum of all items + 1
		const newItem = items.reduce((a, b) => a + b, 0) + 1;
		setItems([...items, newItem]);
	};
	const handleDelete = (index) => {
		setItems(items.filter((item) => item !== index));
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
					<div className="item" key={item}>
						<div className="row item-list align-items-center gx-3">
							<div className="col-12 col-md mb-3">
								<label htmlFor="itemName">Item Name</label>
								<input
									type="text"
									className="form-control"
									id="itemName"
									name="name"
								/>
							</div>
							<div className="col mb-3 quantity">
								<label htmlFor="itemQuantity">Qty.</label>
								<input
									type="number"
									className="form-control"
									id="itemQuantity"
									name="quantity"
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
										readOnly
									/>
									<button
										className="btn btn-link btn-icon text-info pe-1 ms-3"
										onClick={() => handleDelete(index)}
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
						onClick={(e) => handleAdd(e)}
					>
						<HiPlus className="me-2" />
						<div>Add New Item</div>
					</button>
				</div>
			</div>
		</>
	);
}
