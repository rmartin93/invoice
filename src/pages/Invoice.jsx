import { useRef } from "react";
import { BiSolidChevronLeft } from "react-icons/bi";
import { BsFillCircleFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
export default function Invoice() {
	const navigate = useNavigate();
	const { id } = useParams();
	const editForm = useRef();
	const handleDelete = () => {
		const deleteBtn = document.getElementById("deleteModalBtn");
		deleteBtn.click();
	};
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
								<div className="alert alert-success border-0 text-center mb-0 ms-auto">
									<BsFillCircleFill className="me-2" />
									<span>Paid</span>
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
								<p className="text-secondaryOther mb-0">Status</p>
								<div className="alert alert-status alert-success border-0 text-center mb-0 ms-3">
									<BsFillCircleFill className="me-2" />
									<span>Paid</span>
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
								<button className="btn btn-primary">
									<div>Mark as Paid</div>
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
								<p className="text-info">Graphic Design</p>
							</div>
							<div className="col-12 col-md-6 text-md-end">
								<p className="text-info mb-0">19 Union Terrace</p>
								<p className="text-info mb-0">London</p>
								<p className="text-info mb-0">E1 3EZ</p>
								<p className="text-info mb-0">United Kingdom</p>
							</div>
							<div className="row mt-5">
								<div className="col-6 col-md-4">
									<p className="text-info">Invoice Date</p>
									<p className="fw-bolder fs-5">21 Aug 2021</p>
									<p className="text-info mt-4">Payment Due</p>
									<p className="fw-bolder fs-5">20 Sep 2021</p>
								</div>
								<div className="col-6 col-md-4">
									<p className="text-info">Bill To</p>
									<p className="fw-bolder fs-5">Alex Grim</p>
									<p className="text-info mb-0">84 Church Way</p>
									<p className="text-info mb-0">Bradford</p>
									<p className="text-info mb-0">BD1 9PB</p>
									<p className="text-info mb-0">United Kingdom</p>
								</div>
								<div className="col-12 col-md-4 mt-4 mt-md-0">
									<p className="text-info">Send To</p>
									<p className="fw-bolder fs-5">alexgrim@mail.com</p>
								</div>
							</div>
						</div>
						{/* Mobile Price Summary */}
						<div className="card border-0 d-md-none rounded-4 overflow-auto">
							<div className="mobile-price-rows card-body p-4">
								<div className="row align-items-center">
									<div className="col-6">
										<p className="fw-bolder fs-6 mb-0">Banner Design</p>
										<p className="text-info fs-6 mb-0">
											<span>1</span> x <span>$ 156.00</span>
										</p>
									</div>
									<div className="col-6">
										<p className="fw-bolder fs-6 text-end mb-0">$ 156.00</p>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-6">
										<p className="fw-bolder fs-6 mb-0">Email Design</p>
										<p className="text-info fs-6 mb-0">
											<span>2</span> x <span>$ 200.00</span>
										</p>
									</div>
									<div className="col-6">
										<p className="fw-bolder fs-6 text-end mb-0">$ 400.00</p>
									</div>
								</div>
							</div>
							<div className="card-footer bg-dark p-4">
								<div className="row align-items-center">
									<div className="col-6">
										<p className="mb-0 text-white">Grand Total</p>
									</div>
									<div className="col-6">
										<p className="fw-bolder fs-5 mb-0 text-end text-white">
											$ 556.00
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
										<th className="fw-normal">Item Name</th>
										<th className="text-end fw-normal">QTY.</th>
										<th className="text-end fw-normal">Price</th>
										<th className="text-end fw-normal">Total</th>
									</thead>
									<tbody>
										<tr>
											<td className="fw-bolder dark-white">Banner Design</td>
											<td className="fw-bolder text-info text-end">1</td>
											<td className="fw-bolder text-info text-end">$156</td>
											<td className="fw-bolder text-end dark-white">$156</td>
										</tr>
										<tr>
											<td className="fw-bolder dark-white">Email Design</td>
											<td className="fw-bolder text-info text-end">2</td>
											<td className="fw-bolder text-info text-end">$200</td>
											<td className="fw-bolder text-end dark-white">$400</td>
										</tr>
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
											$ 556.00
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
						<button className="btn btn-danger" onClick={() => handleDelete()}>
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
				tabindex="-1"
				id="offcanvasEdit"
				aria-labelledby="offcanvasLabel"
			>
				<div className="offcanvas-header p-5 pb-4">
					<h5 className="offcanvas-title dark-white" id="offcanvasLabel">
						Edit # {id}
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
							<label className="ps-0" htmlFor="streetAddress">
								Street Address
							</label>
							<input
								type="text"
								className="form-control"
								id="streetAddress"
								placeholder="19 Union Terrace"
								name="fromAddress"
							/>
						</div>
						<div className="row">
							<div className="col-6 col-md-4 mb-3">
								<label className="ps-0" htmlFor="city">
									City
								</label>
								<input
									type="text"
									className="form-control"
									id="city"
									placeholder="London"
									name="fromCity"
								/>
							</div>
							<div className="col-6 col-md-4 mb-3">
								<label className="ps-0" htmlFor="postCode">
									Post Code
								</label>
								<input
									type="text"
									className="form-control"
									id="postCode"
									placeholder="E1 7HP"
									name="fromPostCode"
								/>
							</div>
							<div className="col-12 col-md-4 mb-3">
								<label className="ps-0" htmlFor="country">
									Country
								</label>
								<input
									type="text"
									className="form-control"
									id="country"
									placeholder="United Kingdom"
									name="fromCountry"
								/>
							</div>
						</div>
						<h6 className="text-primary my-4">Bill To</h6>
						<div className="mb-3">
							<label className="ps-0" htmlFor="name">
								Client's Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="Alex Grim"
								name="clientName"
							/>
						</div>
						<div className="mb-3">
							<label className="ps-0" htmlFor="email">
								Client's Email
							</label>
							<input
								type="text"
								className="form-control"
								id="email"
								placeholder="alexgrim@mail.com"
								name="clientEmail"
							/>
						</div>
						<div className="mb-3">
							<label className="ps-0" htmlFor="streetAddress">
								Street Address
							</label>
							<input
								type="text"
								className="form-control"
								id="streetAddress"
								placeholder="84 Church Way"
								name="clientAddress"
							/>
						</div>
						<div className="row">
							<div className="col-6 col-md-4 mb-3">
								<label className="ps-0" htmlFor="city">
									City
								</label>
								<input
									type="text"
									className="form-control"
									id="city"
									placeholder="Bradford"
									name="clientCity"
								/>
							</div>
							<div className="col-6 col-md-4 mb-3">
								<label className="ps-0" htmlFor="postCode">
									Post Code
								</label>
								<input
									type="text"
									className="form-control"
									id="postCode"
									placeholder="BD1 9PB"
									name="clientPostCode"
								/>
							</div>
							<div className="col-12 col-md-4 mb-3">
								<label className="ps-0" htmlFor="country">
									United Kingdom
								</label>
								<input
									type="text"
									className="form-control"
									id="country"
									placeholder="United Kingdom"
									name="clientCountry"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6 mb-3">
								<label className="readonly" htmlFor="invoiceDate">
									Invoice Date
								</label>
								<input
									className="form-control"
									type="date"
									id="invoiceDate"
									name="invoiceDate"
									value="2021-08-30"
									readOnly
								/>
							</div>
							<div className="col-12 col-md-6 mb-3">
								<label htmlFor="paymentTerms">Payment Terms</label>
								<select
									className="form-select"
									id="paymentTerms"
									name="paymentTerms"
								>
									<option value="1">Net 1 Day</option>
									<option value="7">Net 7 Days</option>
									<option value="14">Net 14 Days</option>
									<option value="30">Net 30 Days</option>
								</select>
							</div>
							<div className="col-12 mb-3">
								<label htmlFor="projectDescription">Project Description</label>
								<input
									className="form-control"
									type="text"
									id="projectDescription"
									name="projectDescription"
									placeholder="e.g. Graphic Design Service"
								/>
							</div>
						</div>
						{/* Item List */}
						<p className="fw-bold fs-5 text-secondaryAccent">Item List</p>
						<div className="row item-list align-items-center gx-3">
							<div className="col-12 col-md mb-3">
								<label htmlFor="itemName">Item Name</label>
								<input
									type="text"
									className="form-control"
									id="itemName"
									name="itemName"
								/>
							</div>
							<div className="col mb-3 quantity">
								<label htmlFor="itemQuantity">Qty.</label>
								<input
									type="number"
									className="form-control"
									id="itemQuantity"
									name="itemQuantity"
								/>
							</div>
							<div className="col mb-3 price">
								<label htmlFor="itemPrice">Price</label>
								<input
									type="number"
									className="form-control"
									id="itemPrice"
									name="itemPrice"
								/>
							</div>
							<div className="col mb-3 total">
								<label htmlFor="itemTotal">Total</label>
								<div className="d-flex justify-content-between align-items-center gap-2">
									<span className="fw-bold text-info fs-6">$10,000.00</span>
									<button className="btn btn-link btn-icon text-info pe-1 ms-3">
										<FaTrash className="delete-item fs-6" />
									</button>
								</div>
							</div>
						</div>
						<div className="row item-list align-items-center gx-3">
							<div className="col-12 col-md mb-3">
								<label htmlFor="itemName">Item Name</label>
								<input
									type="text"
									className="form-control"
									id="itemName"
									name="itemName"
								/>
							</div>
							<div className="col mb-3 quantity">
								<label htmlFor="itemQuantity">Qty.</label>
								<input
									type="number"
									className="form-control"
									id="itemQuantity"
									name="itemQuantity"
								/>
							</div>
							<div className="col mb-3 price">
								<label htmlFor="itemPrice">Price</label>
								<input
									type="number"
									className="form-control"
									id="itemPrice"
									name="itemPrice"
								/>
							</div>
							<div className="col mb-3 total">
								<label htmlFor="itemTotal">Total</label>
								<div className="d-flex justify-content-between align-items-center gap-2">
									<span className="fw-bold text-info fs-6">$100.00</span>
									<button className="btn btn-link btn-icon text-info pe-1 ms-3">
										<FaTrash className="delete-item fs-6" />
									</button>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<button className="btn btn-light btn-icon-2 w-100">
									<HiPlus className="me-2" />
									<div>Add New Item</div>
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="card border-0 position-absolute bottom-0 start-0 w-100">
					<div className="card-body d-flex gap-3 justify-content-end align-items-center p-4 shadow-lg overflow-auto rounded-end-4">
						<button
							className="btn btn-light"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						>
							Cancel
						</button>
						<button className="btn btn-primary">Save Changes</button>
					</div>
				</div>
			</div>
			{/* Delete Modal */}
			<button
				type="button"
				class="btn btn-primary d-none"
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
								Are you sure you want to delete invoice #{id}? This action
								cannot be undone.
							</p>
						</div>
						<div className="modal-footer border-0">
							<button
								type="button"
								className="btn btn-light"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-danger">
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
