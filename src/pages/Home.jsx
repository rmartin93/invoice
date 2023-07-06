import { BsFillCircleFill } from "react-icons/bs";
import {
	BiSolidChevronDown,
	BiSolidChevronUp,
	BiSolidChevronRight,
} from "react-icons/bi";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../database/supabaseClient";
import utils from "../helpers/Utils";
import ItemList from "../components/ItemList";

export default function Home({ session }) {
	const createForm = useRef();
	const dialog = useRef();
	const [createPending, setCreatePending] = useState(false);
	const [draftPending, setDraftPending] = useState(false);
	const [invoicesPending, setInvoicesPending] = useState(false);
	const [invoices, setInvoices] = useState([]);
	const [draft, setDraft] = useState(true);
	const [pending, setPending] = useState(true);
	const [paid, setPaid] = useState(true);
	const [chevron, setChevron] = useState("down");
	const [items, setItems] = useState([
		{
			id: utils.randomNumber(0, 1000000),
			name: "",
			quantity: 0,
			price: 0,
			total: 0,
		},
	]);

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
	};
	// add event listener to handle click outside
	useEffect(() => {
		getInvoices();
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
			setDraftPending(false);
			setCreatePending(false);
			createForm.current.classList.add("was-validated");
		}
		return isValid;
	};

	const handleCreate = async (status) => {
		status == "draft" ? setDraftPending(true) : setCreatePending(true);
		const formData = new FormData(createForm.current);
		const formObj = Object.fromEntries(formData);
		const sendData = {
			total: calcTotal(),
			items: items,
			created_at: new Date(),
			payment_due: formObj.payment_due,
			description: formObj.description,
			payment_terms: formObj.payment_terms,
			client_name: formObj.client_name,
			client_email: formObj.client_email,
			status: status,
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
		const { data: invoice, error } = await supabase
			.from("invoices")
			.insert([sendData]);
		if (error) {
			console.log(error);
			status == "draft" ? setDraftPending(false) : setCreatePending(false);
		}
		status == "draft" ? setDraftPending(false) : setCreatePending(false);
		document.getElementById("offcanvasCloseBtn").click();
		getInvoices();
	};

	const updateFilter = (filter) => {
		if (filter === "draft") {
			setDraft(!draft);
		} else if (filter === "pending") {
			setPending(!pending);
		} else if (filter === "paid") {
			setPaid(!paid);
		}
	};
	// Listen for changes in the filter values and update the list
	useEffect(() => {
		updateList();
	}, [draft, pending, paid]);
	const updateList = () => {
		// Hide all Links with the data-invoicestatus equal to the filterValue
		document.querySelectorAll(`[data-invoicestatus]`).forEach((link) => {
			let status = link.dataset.invoicestatus;
			if (status === "draft" && !draft) {
				link.classList.add("d-none");
			}
			if (status === "draft" && draft) {
				link.classList.remove("d-none");
			}
			if (status === "pending" && !pending) {
				link.classList.add("d-none");
			}
			if (status === "pending" && pending) {
				link.classList.remove("d-none");
			}
			if (status === "paid" && !paid) {
				link.classList.add("d-none");
			}
			if (status === "paid" && paid) {
				link.classList.remove("d-none");
			}
		});
	};

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
												updateFilter("draft");
											}}
										>
											<input
												type="checkbox"
												name="draft"
												id="draft"
												checked={draft}
												onChange={() => console.log("changed")}
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
												updateFilter("pending");
											}}
										>
											<input
												type="checkbox"
												name="pending"
												id="pending"
												checked={pending}
												onChange={() => console.log("changed")}
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
												updateFilter("paid");
											}}
										>
											<input
												type="checkbox"
												name="paid"
												id="paid"
												checked={paid}
												onChange={() => console.log("changed")}
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
					return (
						<Link
							to={`/invoice/${invoice.id}`}
							className="row mb-3 invoice-row"
							key={invoice.id}
							data-invoicestatus={invoice.status}
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
						id="offcanvasCloseBtn"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body p-5 pt-0">
					<form ref={createForm} style={{ paddingBottom: "6rem" }}>
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
								name="sender_street"
								required
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
									name="sender_city"
									required
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
									name="sender_post_code"
									required
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
									name="sender_country"
									required
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
								name="client_name"
								required
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
								name="client_email"
								required
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
								name="client_street"
								required
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
									name="client_city"
									required
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
									name="client_post_code"
									required
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
									name="client_country"
									required
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6 mb-3">
								<label htmlFor="invoiceDate">Invoice Date</label>
								<input
									className="form-control"
									type="date"
									id="invoiceDate"
									name="payment_due"
									required
								/>
							</div>
							<div className="col-12 col-md-6 mb-3">
								<label htmlFor="paymentTerms">Payment Terms</label>
								<select
									className="form-select"
									id="paymentTerms"
									name="payment_terms"
									required
								>
									<option value="Net 1 Day">Net 1 Day</option>
									<option value="Net 7 Days">Net 7 Days</option>
									<option value="Net 14 Days">Net 14 Days</option>
									<option value="Net 30 Days">Net 30 Days</option>
								</select>
							</div>
							<div className="col-12 mb-3">
								<label htmlFor="projectDescription">Project Description</label>
								<input
									className="form-control"
									type="text"
									id="projectDescription"
									name="description"
									placeholder="e.g. Graphic Design Service"
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
					<div className="card-body d-flex gap-3 justify-content-between align-items-center p-4 shadow-lg overflow-auto rounded-end-4">
						<button
							className="btn btn-light"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						>
							Discard
						</button>
						<div className="d-flex gap-3 justify-content-end">
							<button
								className="btn btn-dark"
								type="button"
								onClick={() => handleCreate("draft")}
								{...(draftPending && "disabled")}
							>
								{draftPending && (
									<div
										className="spinner-border spinner-border-sm me-2"
										role="status"
									>
										<span className="visually-hidden">Loading...</span>
									</div>
								)}
								<span>Save as Draft</span>
							</button>
							<button
								className="btn btn-primary"
								type="button"
								onClick={() => handleCreate("pending")}
								{...(createPending && "disabled")}
							>
								{createPending && (
									<div
										className="spinner-border spinner-border-sm me-2"
										role="status"
									>
										<span className="visually-hidden">Loading...</span>
									</div>
								)}
								<span>Save & Send</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
