import { BsFillCircleFill } from "react-icons/bs";
import {
	BiSolidChevronDown,
	BiSolidChevronUp,
	BiSolidChevronRight,
} from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiPlus, HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../database/supabaseClient";
import utils from "../helpers/Utils";

export default function Home({ session }) {
	const editForm = useRef();
	const dialog = useRef();
	const [invoicesPending, setInvoicesPending] = useState(false);
	const [invoices, setInvoices] = useState([]);
	const [draft, setDraft] = useState(false);
	const [pending, setPending] = useState(false);
	const [paid, setPaid] = useState(false);
	const [chevron, setChevron] = useState("down");

	const showPopover = () => {
		dialog.current.classList.toggle("d-none");
		chevron === "down" ? setChevron("up") : setChevron("down");
	};
	// dismiss popover when clicked outside
	const handleClickOutside = (e) => {
		if (e.target.classList.contains("popover-button")) {
			return;
		}
		if (dialog.current && !dialog.current.contains(e.target)) {
			dialog.current.classList.add("d-none");
			chevron === "up" ? setChevron("up") : setChevron("down");
		}
	};
	// add event listener to handle click outside
	useEffect(() => {
		// get invoices for the logged in user (user id is stored in session)
		const getInvoices = async () => {
			setInvoicesPending(true);
			const { data: invoices, error } = await supabase
				.from("invoices")
				.select("*")
				.eq("user_id", session.user.id);
			if (error) {
				console.log(error);
				setInvoicesPending(false);
			}
			setInvoicesPending(false);
			setInvoices(invoices);
			// console.log("invoices", invoices);
		};
		getInvoices();
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (invoicesPending) {
		return (
			<section
				className="container d-flex flex-column justify-content-center align-items-center h-100 text-primary"
				style={{ marginTop: "-90px" }}
			>
				<div className="spinner-border me-4" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<h3 className="fs-3 mb-0 mt-4">Loading Invoices</h3>
			</section>
		);
	}

	if (invoices.length === 0 && !invoicesPending) {
		return (
			<div className="empty-invoices">
				<section className="container">
					<div className="row">
						<div className="col">
							<div className="empty-invoices-img"></div>
							<div className="text-center">
								<h1>There is nothing here</h1>
								<p>
									Create an invoice by clicking the <strong>New Invoice</strong>{" "}
									button and get started
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
	return (
		<div className="home">
			<section className="invoice-list container">
				<div className="row mb-3">
					<div className="col-6">
						<h1 className="mb-0 dark-white">Invoices</h1>
						<p className="text-secondaryOther">
							There are {invoices.length} total invoices
						</p>
					</div>
					<div className="col-6">
						<div className="d-flex justify-content-end align-items-center">
							<div
								className="custom-popover position-relative"
								style={{ zIndex: 100 }}
							>
								<button
									className="btn btn-link popover-button"
									type="button"
									onClick={() => showPopover()}
								>
									<span className="dark-white mt-1">Filter By Status</span>
									{chevron === "down" ? (
										<BiSolidChevronDown className="ms-2 text-primary" />
									) : (
										<BiSolidChevronUp className="ms-2 text-primary" />
									)}
								</button>
								<div
									className="d-none position-absolute card shadow border-0 w-100"
									ref={dialog}
								>
									<div className="card-body">
										<div
											className="filter-checkbox d-flex align-items-center"
											onClick={() => {
												setDraft(!draft);
											}}
										>
											<input
												type="checkbox"
												name="draft"
												id="draft"
												checked={draft}
												onChange={() => console.log("draft changed")}
											/>
											<label
												htmlFor="draft"
												className="pb-0 fw-bolder ms-2 text-dark dark-white"
												style={{ paddingTop: "2px" }}
											>
												Draft
											</label>
										</div>
										<div
											className="filter-checkbox d-flex align-items-center"
											onClick={() => {
												setPending(!pending);
											}}
										>
											<input
												type="checkbox"
												name="pending"
												id="pending"
												checked={pending}
												onChange={() => console.log("pending changed")}
											/>
											<label
												htmlFor="pending"
												className="pb-0 fw-bolder ms-2 text-dark dark-white"
												style={{ paddingTop: "2px" }}
											>
												Pending
											</label>
										</div>
										<div
											className="filter-checkbox d-flex align-items-center"
											onClick={() => {
												setPaid(!paid);
											}}
										>
											<input
												type="checkbox"
												name="paid"
												id="paid"
												checked={paid}
												onChange={() => console.log("paid changed")}
											/>
											<label
												htmlFor="paid"
												className="pb-0 fw-bolder ms-2 text-dark dark-white"
												style={{ paddingTop: "2px" }}
											>
												Paid
											</label>
										</div>
									</div>
								</div>
							</div>
							<div>
								<button
									className="btn btn-primary btn-icon"
									data-bs-toggle="offcanvas"
									data-bs-target="#offcanvasCreate"
									aria-controls="offcanvasCreate"
								>
									<HiPlusCircle className="me-2" />
									<span>New Invoice</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{invoices.map((invoice) => {
					console.log("invoice: ", invoice);
					return (
						<Link
							to={`/invoice/${invoice.id}`}
							className="row mb-3 invoice-row"
							key={invoice.id}
						>
							<div className="col-12">
								<div className="card border-0 shadow-sm rounded-4">
									<div className="card-body">
										{/* id, date, name, amt, status, icon (med and up) */}
										<div className="row d-md-none">
											<div className="col-8">
												<p className="mb-3">
													<span className="text-info fs-6">#</span>
													<span className="ms-1 fw-bold fs-6">
														{utils.reduceString(invoice.id)}
													</span>
												</p>
												<p className="text-info mb-2">
													Due {invoice.payment_due}
												</p>
												<p className="fw-bold fs-6 mb-0">
													$ {utils.numberWithCommas(invoice.total)}
												</p>
											</div>
											<div className="col-4 d-flex flex-column align-items-end">
												<p className="text-info text-end">
													{invoice.client_name}
												</p>
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
													<span>
														{utils.capitalizeFirstLetter(invoice.status)}
													</span>
												</div>
											</div>
										</div>
										<div className="row d-none d-md-flex align-items-center justify-content-between">
											<div className="col-6">
												<div className="d-flex">
													<p className="mb-0 flex-grow-1">
														<span className="text-info fs-6">#</span>
														<span className="ms-1 fw-bold fs-6">
															{utils.reduceString(invoice.id)}
														</span>
													</p>
													<p className="text-info mb-0 flex-grow-1">
														Due {invoice.payment_due}
													</p>
													<p className="text-info mb-0 flex-grow-1">
														{invoice.client_name}
													</p>
												</div>
											</div>
											<div className="col-6">
												<div className="d-flex align-items-center gap-4">
													<p className="fw-bold fs-6 mb-0 flex-grow-1 text-end">
														$ {utils.numberWithCommas(invoice.total)}
													</p>
													<div>
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
															<span>
																{utils.capitalizeFirstLetter(invoice.status)}
															</span>
														</div>
													</div>
													<BiSolidChevronRight className="ms-auto text-primary fw-bolder fs-5" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</section>
			{/* Offcanvas Create Form */}
			<div
				className="offcanvas offcanvas-start"
				tabIndex="-1"
				id="offcanvasCreate"
				aria-labelledby="offcanvasLabel"
			>
				<div className="offcanvas-header p-5 pb-4">
					<h5 className="offcanvas-title dark-white" id="offcanvasLabel">
						New Invoice
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
									<span className="fw-bold text-info fs-6">$0.00</span>
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
					<div className="card-body d-flex gap-3 justify-content-between align-items-center p-4 shadow-lg overflow-auto rounded-end-4">
						<button
							className="btn btn-light"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						>
							Discard
						</button>
						<div className="d-flex gap-3 justify-content-end">
							<button className="btn btn-dark">Save as Draft</button>
							<button className="btn btn-primary">Save & Send</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
