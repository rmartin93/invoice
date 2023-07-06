import { useEffect, useRef, useState } from "react";
import { BiSolidChevronLeft } from "react-icons/bi";
import { BsFillCircleFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../database/supabaseClient";
import utils from "../helpers/Utils";
import ItemList from "../components/ItemList";
export default function Invoice({ session }) {
	const navigate = useNavigate();
	const { id } = useParams();
	const editForm = useRef();
	const [deletePending, setDeletePending] = useState(false);
	const [markingPaid, setMarkingPaid] = useState(false);
	const [getInvoicePending, setGetInvoicePending] = useState(false);
	const [invoice, setInvoice] = useState(null);
	const [items, setItems] = useState([]);
	const [updating, setUpdating] = useState(false);

	const getInvoice = async () => {
		setGetInvoicePending(true);
		const { data, error } = await supabase
			.from("invoices")
			.select("*")
			.eq("id", id)
			.single();
		if (error) {
			console.log(error);
			setGetInvoicePending(false);
		}
		setGetInvoicePending(false);
		setInvoice(data);
		setItems(data.items);
	};
	useEffect(() => {
		getInvoice();
	}, []);
	// console.log("invoice", invoice);
	const handleDelete = () => {
		const deleteBtn = document.getElementById("deleteModalBtn");
		deleteBtn.click();
	};
	const deleteInvoice = async () => {
		setDeletePending(true);
		try {
			await supabase.from("invoices").delete().eq("id", id);
			setDeletePending(false);
			document.getElementById("deleteModalCloseBtn").click();
			navigate("/");
		} catch (error) {
			console.log("error", error);
			document.getElementById("deleteModalCloseBtn").click();
			setDeletePending(false);
		}
	};
	const markPaid = async () => {
		setMarkingPaid(true);
		const { data, error } = await supabase
			.from("invoices")
			.update({ status: "paid" })
			.eq("id", id)
			.single();
		if (error) {
			console.error(error);
		}
		setMarkingPaid(false);
		console.log("data", data);
	};

	const calcTotal = () => {
		let total = 0;
		items.forEach((item) => {
			item.total = item.price * item.quantity;
			total += item.total;
		});
		return total;
	};

	const validateForm = (data) => {
		let isValid = true;
		const errors = {};
		if (!data.client_name) {
			isValid = false;
			errors.client_name = "Client name is required";
		}
		if (!data.client_email) {
			isValid = false;
			errors.client_email = "Client email is required";
		}
		if (!data.sender_street) {
			isValid = false;
			errors.sender_street = "Sender street is required";
		}
		if (!data.sender_city) {
			isValid = false;
			errors.sender_city = "Sender city is required";
		}
		if (!data.sender_post_code) {
			isValid = false;
			errors.sender_post_code = "Sender post code is required";
		}
		if (!data.sender_country) {
			isValid = false;
			errors.sender_country = "Sender country is required";
		}
		if (!data.client_street) {
			isValid = false;
			errors.client_street = "Client street is required";
		}
		if (!data.client_city) {
			isValid = false;
			errors.client_city = "Client city is required";
		}
		if (!data.client_post_code) {
			isValid = false;
			errors.client_post_code = "Client post code is required";
		}
		if (!data.client_country) {
			isValid = false;
			errors.client_country = "Client country is required";
		}
		if (!data.payment_terms) {
			isValid = false;
			errors.payment_terms = "Payment terms is required";
		}
		if (!data.description) {
			isValid = false;
			errors.description = "Description is required";
		}
		if (!data.payment_due) {
			isValid = false;
			errors.payment_due = "Payment due is required";
		}
		if (data.items.length === 0) {
			isValid = false;
			errors.items = "Items are required";
		}
		if (!isValid) {
			alert(Object.values(errors).join("\n"));
			setUpdating(false);
			createForm.current.classList.add("was-validated");
		}
		return isValid;
	};

	const handleUpdate = async () => {
		setUpdating(true);
		const formData = new FormData(editForm.current);
		const formObj = Object.fromEntries(formData);
		const total = calcTotal();
		const sendData = {
			total: total,
			items: items,
			created_at: new Date(),
			payment_due: total,
			description: formObj.description,
			payment_terms: formObj.payment_terms,
			client_name: formObj.client_name,
			client_email: formObj.client_email,
			sender_street: formObj.sender_street,
			sender_post_code: formObj.sender_post_code,
			sender_city: formObj.sender_city,
			sender_country: formObj.sender_country,
			client_street: formObj.client_street,
			client_city: formObj.client_city,
			client_post_code: formObj.client_post_code,
			client_country: formObj.client_country,
			user_id: session.user.id,
		};
		const isValid = validateForm(sendData);
		if (!isValid) {
			return;
		}
		const { error } = await supabase
			.from("invoices")
			.update([sendData])
			.eq("id", id)
			.single();
		if (error) {
			console.log(error);
			setUpdating(false);
		}
		setUpdating(false);
		document.getElementById("offcanvasCloseBtn").click();
		getInvoice();
	};

	if (getInvoicePending) {
		return (
			<section
				className="container d-flex flex-column justify-content-center align-items-center h-100 text-primary"
				style={{ marginTop: "-90px" }}
			>
				<div className="spinner-border me-4" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<h3 className="fs-3 mb-0 mt-4">Loading Invoice</h3>
			</section>
		);
	}
	if (!getInvoicePending && invoice !== null) {
		return (
			<div className="invoice">
				<section className="container">
					{/* Go Back Row */}
					<div className="row">
						<div className="col-12">
							<button
								className="btn btn-link btn-icon-sm ps-0"
								onClick={() => navigate(-1)}
							>
								<BiSolidChevronLeft className="text-primary" />
								<span className="dark-white">Go Back</span>
							</button>
						</div>
					</div>
					{/* Mobile Status Row */}
					<div className="card shadow-sm border-0 d-md-none">
						<div className="card-body px-4">
							<div className="row align-items-center">
								<div className="col-6">
									<p className="text-secondaryOther mb-0">Status</p>
								</div>
								<div className="col-6">
									<div
										className={`alert alert-status status border-0 text-center mb-0 alert-${
											invoice.status === "draft"
												? "secondary"
												: invoice.status === "pending"
												? "warning"
												: "success"
										}`}
									>
										<BsFillCircleFill className="me-2" />
										<span>{utils.capitalizeFirstLetter(invoice.status)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Tablet/Desktop Status Row */}
					<div className="card shadow-sm border-0 d-none d-md-block">
						<div className="card-body px-4">
							<div className="row align-items-center">
								<div className="col-4 d-flex align-items-center">
									<p className="text-secondaryOther mb-0 me-3">Status</p>
									<div
										className={`alert alert-status status border-0 text-center mb-0 alert-${
											invoice.status === "draft"
												? "secondary"
												: invoice.status === "pending"
												? "warning"
												: "success"
										}`}
									>
										<BsFillCircleFill className="me-2" />
										<span>{utils.capitalizeFirstLetter(invoice.status)}</span>
									</div>
								</div>
								<div className="col-8 d-flex gap-3 justify-content-end">
									<button
										className="btn btn-light"
										data-bs-toggle="offcanvas"
										data-bs-target="#offcanvasEdit"
										aria-controls="offcanvasEdit"
									>
										<div>Edit</div>
									</button>
									<button
										className="btn btn-danger"
										onClick={() => handleDelete()}
									>
										<div>Delete</div>
									</button>
									<button
										className="btn btn-primary"
										type="button"
										onClick={() => markPaid()}
									>
										{markingPaid && (
											<div
												className="spinner-border spinner-border-sm me-2"
												role="status"
											>
												<span className="visually-hidden">Loading...</span>
											</div>
										)}
										<span>Mark as Paid</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Summary Card */}
					<div className="summaryCard card shadow-sm border-0 mt-4">
						<div className="card-body">
							<div className="row justify-content-between">
								<div className="col-12 col-md-6">
									<p className="mb-0">
										<span className="text-info fs-6">#</span>
										<span className="ms-1 fw-bold fs-6">{id}</span>
									</p>
									<p className="text-info">{invoice.description}</p>
								</div>
								<div className="col-12 col-md-6 text-md-end">
									<p className="text-info mb-0">{invoice.sender_street}</p>
									<p className="text-info mb-0">{invoice.sender_city}</p>
									<p className="text-info mb-0">{invoice.sender_post_code}</p>
									<p className="text-info mb-0">{invoice.sender_country}</p>
								</div>
								<div className="row mt-5">
									<div className="col-6 col-md-4">
										<p className="text-info">Invoice Date</p>
										<p className="fw-bolder fs-5">{invoice.created_at}</p>
										<p className="text-info mt-4">Payment Due</p>
										<p className="fw-bolder fs-5">
											$ {utils.numberWithCommas(invoice.payment_due)}
										</p>
									</div>
									<div className="col-6 col-md-4">
										<p className="text-info">Bill To</p>
										<p className="fw-bolder fs-5">{invoice.client_name}</p>
										<p className="text-info mb-0">{invoice.client_street}</p>
										<p className="text-info mb-0">{invoice.client_city}</p>
										<p className="text-info mb-0">{invoice.client_post_code}</p>
										<p className="text-info mb-0">{invoice.client_country}</p>
									</div>
									<div className="col-12 col-md-4 mt-4 mt-md-0">
										<p className="text-info">Send To</p>
										<p className="fw-bolder fs-5">{invoice.client_email}</p>
									</div>
								</div>
							</div>
							{/* Mobile Price Summary */}
							<div className="card border-0 d-md-none rounded-4 overflow-auto">
								<div className="mobile-price-rows card-body p-4">
									{invoice.items.map((item, index) => {
										return (
											<div className="row align-items-center" key={item.id}>
												<div className="col-6">
													<p className="fw-bolder fs-6 mb-0">{item.name}</p>
													<p className="text-info fs-6 mb-0">
														<span>{item.quantity}</span> x{" "}
														<span>$ {utils.numberWithCommas(item.price)}</span>
													</p>
												</div>
												<div className="col-6">
													<p className="fw-bolder fs-6 text-end mb-0">
														$ {utils.numberWithCommas(item.total)}
													</p>
												</div>
											</div>
										);
									})}
								</div>
								<div className="card-footer bg-dark p-4">
									<div className="row align-items-center">
										<div className="col-6">
											<p className="mb-0 text-white">Grand Total</p>
										</div>
										<div className="col-6">
											<p className="fw-bolder fs-5 mb-0 text-end text-white">
												$ {utils.numberWithCommas(invoice.total)}
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Tablet/Desktop Price Summary */}
							<div className="card border-0 d-none d-md-block rounded-4 overflow-auto">
								<div className="price-table-wrapper card-body p-4">
									<table className="table table-borderless fs-5">
										<thead className="text-info">
											<tr>
												<th className="fw-normal">Item Name</th>
												<th className="text-end fw-normal">QTY.</th>
												<th className="text-end fw-normal">Price</th>
												<th className="text-end fw-normal">Total</th>
											</tr>
										</thead>
										<tbody>
											{invoice.items.map((item) => {
												return (
													<tr key={item.id}>
														<td className="fw-bolder dark-white">
															{item.name}
														</td>
														<td className="fw-bolder text-info text-end">
															{item.quantity}
														</td>
														<td className="fw-bolder text-info text-end">
															$ {utils.numberWithCommas(item.price)}
														</td>
														<td className="fw-bolder text-end dark-white">
															$ {utils.numberWithCommas(item.total)}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div className="card-footer bg-dark p-4">
									<div className="row align-items-center">
										<div className="col-6">
											<p className="mb-0 text-white">Grand Total</p>
										</div>
										<div className="col-6">
											<p className="fw-bolder fs-5 mb-0 text-end text-white">
												$ {utils.numberWithCommas(invoice.total)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Mobile Edit Buttons */}
					<div className="mobile-edit-card card border-0 fixed-bottom d-md-none">
						<div className="card-body d-flex justify-content-center gap-3">
							<button
								className="btn btn-light"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasEdit"
								aria-controls="offcanvasEdit"
							>
								<div>Edit</div>
							</button>
							<button
								className="btn btn-danger"
								type="button"
								onClick={() => handleDelete()}
							>
								<div>Delete</div>
							</button>
							<button className="btn btn-primary">
								<div>Mark as Paid</div>
							</button>
						</div>
					</div>
				</section>
				{/* Offcanvas Edit Form */}
				<div
					className="offcanvas offcanvas-start"
					tabIndex="-1"
					id="offcanvasEdit"
					aria-labelledby="offcanvasLabel"
				>
					<div className="offcanvas-header p-5 pb-4">
						<h5 className="offcanvas-title dark-white" id="offcanvasLabel">
							Edit
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div className="offcanvas-body p-5 pt-0">
						<form ref={editForm} style={{ paddingBottom: "6rem" }}>
							<h6 className="text-primary mb-4">Bill From</h6>
							<div className="mb-3">
								<label className="ps-0" htmlFor="sender_street">
									Street Address
								</label>
								<input
									type="text"
									className="form-control"
									id="sender_street"
									name="sender_street"
									defaultValue={invoice.sender_street}
									required
								/>
							</div>
							<div className="row">
								<div className="col-6 col-md-4 mb-3">
									<label className="ps-0" htmlFor="sender_city">
										City
									</label>
									<input
										type="text"
										className="form-control"
										id="sender_city"
										name="sender_city"
										defaultValue={invoice.sender_city}
										required
									/>
								</div>
								<div className="col-6 col-md-4 mb-3">
									<label className="ps-0" htmlFor="sender_post_code">
										Post Code
									</label>
									<input
										type="text"
										className="form-control"
										id="sender_post_code"
										name="sender_post_code"
										defaultValue={invoice.sender_post_code}
										required
									/>
								</div>
								<div className="col-12 col-md-4 mb-3">
									<label className="ps-0" htmlFor="sender_country">
										Country
									</label>
									<input
										type="text"
										className="form-control"
										id="sender_country"
										name="sender_country"
										defaultValue={invoice.sender_country}
										required
									/>
								</div>
							</div>
							<h6 className="text-primary my-4">Bill To</h6>
							<div className="mb-3">
								<label className="ps-0" htmlFor="client_name">
									Client's Name
								</label>
								<input
									type="text"
									className="form-control"
									id="client_name"
									name="client_name"
									defaultValue={invoice.client_name}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="ps-0" htmlFor="client_email">
									Client's Email
								</label>
								<input
									type="text"
									className="form-control"
									id="email"
									name="client_email"
									defaultValue={invoice.client_email}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="ps-0" htmlFor="client_street">
									Street Address
								</label>
								<input
									type="text"
									className="form-control"
									id="client_street"
									name="client_street"
									defaultValue={invoice.client_street}
									required
								/>
							</div>
							<div className="row">
								<div className="col-6 col-md-4 mb-3">
									<label className="ps-0" htmlFor="client_city">
										City
									</label>
									<input
										type="text"
										className="form-control"
										id="client_city"
										name="client_city"
										defaultValue={invoice.client_city}
										required
									/>
								</div>
								<div className="col-6 col-md-4 mb-3">
									<label className="ps-0" htmlFor="client_post_code">
										Post Code
									</label>
									<input
										type="text"
										className="form-control"
										id="client_post_code"
										name="client_post_code"
										defaultValue={invoice.client_post_code}
										required
									/>
								</div>
								<div className="col-12 col-md-4 mb-3">
									<label className="ps-0" htmlFor="client_country">
										United Kingdom
									</label>
									<input
										type="text"
										className="form-control"
										id="client_country"
										name="client_country"
										defaultValue={invoice.client_country}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-12 col-md-6 mb-3">
									<label className="readonly" htmlFor="created_at">
										Invoice Date
									</label>
									<input
										className="form-control"
										type="date"
										id="created_at"
										name="created_at"
										defaultValue={invoice.created_at}
										readOnly
									/>
								</div>
								<div className="col-12 col-md-6 mb-3">
									<label htmlFor="payment_terms">Payment Terms</label>
									<select
										className="form-select"
										id="payment_terms"
										name="payment_terms"
										defaultValue={invoice.payment_terms}
										required
									>
										<option value="Net 1 Day">Net 1 Day</option>
										<option value="Net 7 Days">Net 7 Days</option>
										<option value="Net 14 Days">Net 14 Days</option>
										<option value="Net 30 Days">Net 30 Days</option>
									</select>
								</div>
								<div className="col-12 mb-3">
									<label htmlFor="description">Project Description</label>
									<input
										className="form-control"
										type="text"
										id="description"
										name="description"
										placeholder="e.g. Graphic Design Service"
										defaultValue={invoice.description}
										required
									/>
								</div>
							</div>
							{/* Item List */}
							<p className="fw-bold fs-5 text-secondaryAccent">Item List</p>
							<ItemList items={items} setItems={setItems} />
						</form>
					</div>
					<div className="card border-0 position-absolute bottom-0 start-0 w-100">
						<div className="card-body d-flex gap-3 justify-content-end align-items-center p-4 shadow-lg overflow-auto rounded-end-4">
							<button
								className="btn btn-light"
								data-bs-dismiss="offcanvas"
								aria-label="Close"
								id="offcanvasCloseBtn"
							>
								Cancel
							</button>
							<button
								className="btn btn-primary"
								type="button"
								onClick={() => handleUpdate()}
								{...(updating && "disabled")}
							>
								{updating && (
									<div
										className="spinner-border spinner-border-sm me-2"
										role="status"
									>
										<span className="visually-hidden">Loading...</span>
									</div>
								)}
								<span>Save Changes</span>
							</button>
						</div>
					</div>
				</div>
				{/* Delete Modal */}
				<button
					type="button"
					className="btn btn-primary d-none"
					data-bs-toggle="modal"
					data-bs-target="#deleteModal"
					id="deleteModalBtn"
				>
					Launch demo modal
				</button>
				<div className="modal fade" tabIndex="-1" id="deleteModal">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content p-5">
							<div className="modal-body">
								<h3 className="fs-2">Confirm Deletion</h3>
								<p className="text-secondaryOther">
									Are you sure you want to delete this invoice?
								</p>
							</div>
							<div className="modal-footer border-0">
								<button
									type="button"
									className="btn btn-light"
									data-bs-dismiss="modal"
									id="deleteModalCloseBtn"
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => deleteInvoice()}
								>
									{deletePending && (
										<div
											className="spinner-border spinner-border-sm me-2"
											role="status"
										>
											<span className="visually-hidden">Loading...</span>
										</div>
									)}
									<span>Delete</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
