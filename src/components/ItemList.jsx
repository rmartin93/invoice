import { FaTrash } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import utils from "../helpers/Utils";

export default function ItemList({ items, setItems }) {
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
		const newItems = items.filter((item) => item.id !== itemToDelete.id);
		setItems(newItems);
	};
	const calcTotal = (index) => {
		const quantity = document.getElementsByName(`quantity`)[index].value;
		const price = document.getElementsByName(`price`)[index].value;
		const total = quantity * price;
		document.getElementsByName(`total`)[index].value =
			"$ " + utils.numberWithCommas(total);
		const newItems = [...items];
		newItems[index].total = total;
		setItems(newItems);
	};
	return (
		<>
			{items.map((item, index) => {
				return (
					<div className="item" key={item.id}>
						<div className="row item-list align-items-center gx-3">
							<div className="col-12 col-md mb-3">
								<label htmlFor="itemName">Item Name</label>
								<input
									type="text"
									className="form-control"
									id="itemName"
									name="name"
									defaultValue={item.name}
									onChange={(e) => {
										const newItems = [...items];
										newItems[index].name = e.target.value;
										setItems(newItems);
									}}
									required
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
									onChange={(e) => {
										const newItems = [...items];
										newItems[index].quantity = e.target.value;
										setItems(newItems);
										calcTotal(index);
									}}
									required
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
									onChange={(e) => {
										const newItems = [...items];
										newItems[index].price = e.target.value;
										setItems(newItems);
										calcTotal(index);
									}}
									required
								/>
							</div>
							<div className="col mb-3 total">
								<label htmlFor="itemTotal">Total</label>
								<div className="d-flex justify-content-between align-items-center gap-2">
									<input
										className="form-control fw-bold text-info fs-6 border-0"
										name="total"
										defaultValue={"$ " + utils.numberWithCommas(item.total)}
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
