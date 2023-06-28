import { BsFillCircleFill } from "react-icons/bs";
import {
	BiSolidChevronDown,
	BiSolidChevronUp,
	BiSolidChevronRight,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";

export default function Home() {
	const temp = 0;
	const dialog = useRef();
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
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	if (temp === 1) {
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
						<h1 className="mb-0">Invoices</h1>
						<p className="text-secondaryOther">Invoice Count</p>
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
									<span>Filter By Status</span>
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
												setPending(false);
												setPaid(false);
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
												className="pb-0 fw-bolder ms-2 text-dark"
												style={{ paddingTop: "2px" }}
											>
												Draft
											</label>
										</div>
										<div
											className="filter-checkbox d-flex align-items-center"
											onClick={() => {
												setPending(!pending);
												setDraft(false);
												setPaid(false);
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
												className="pb-0 fw-bolder ms-2 text-dark"
												style={{ paddingTop: "2px" }}
											>
												Pending
											</label>
										</div>
										<div
											className="filter-checkbox d-flex align-items-center"
											onClick={() => {
												setPaid(!paid);
												setDraft(false);
												setPending(false);
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
												className="pb-0 fw-bolder ms-2 text-dark"
												style={{ paddingTop: "2px" }}
											>
												Paid
											</label>
										</div>
									</div>
								</div>
							</div>
							<div>
								<button className="btn btn-primary btn-icon">
									<HiPlusCircle className="me-2" />
									<span>New Invoice</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<Link to="/invoice/3" className="row mb-3 invoice-row">
					<div className="col-12">
						<div className="card border-0 shadow-sm rounded-4">
							<div className="card-body">
								{/* id, date, name, amt, status, icon (med and up) */}
								<div className="row d-md-none">
									<div className="col-8">
										<p className="mb-3">
											<span className="text-info fs-6">#</span>
											<span className="ms-1 fw-bold fs-6">RT3080</span>
										</p>
										<p className="text-info mb-2">Due 19 Aug 2021</p>
										<p className="fw-bold fs-6">$ 1,800.90</p>
									</div>
									<div className="col-4">
										<p className="text-info text-end">Jensen Huang</p>
										<div className="alert alert-status status alert-success border-0 text-center">
											<BsFillCircleFill className="me-2" />
											<span>Paid</span>
										</div>
									</div>
								</div>
								<div className="row d-none d-md-flex align-items-center justify-content-between">
									<div className="col-6">
										<div className="d-flex">
											<p className="mb-0 flex-grow-1">
												<span className="text-info fs-6">#</span>
												<span className="ms-1 fw-bold fs-6">RT3080</span>
											</p>
											<p className="text-info mb-0 flex-grow-1">
												Due 19 Aug 2021
											</p>
											<p className="text-info mb-0 flex-grow-1">Jensen Huang</p>
										</div>
									</div>
									<div className="col-6">
										<div className="d-flex align-items-center gap-4">
											<p className="fw-bold fs-6 mb-0 flex-grow-1 text-end">
												$ 1,800.90
											</p>
											<div>
												<div className="alert alert-status alert-success border-0 text-center mb-0 flex-grow-1">
													<BsFillCircleFill className="me-2" />
													<span>Paid</span>
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
				<Link to="/invoice/4" className="row mb-3 invoice-row">
					<div className="col-12">
						<div className="card border-0 shadow-sm rounded-4">
							<div className="card-body">
								{/* id, date, name, amt, status, icon (med and up) */}
								<div className="row d-md-none">
									<div className="col-8">
										<p className="mb-3">
											<span className="text-info fs-6">#</span>
											<span className="ms-1 fw-bold fs-6">RT3080</span>
										</p>
										<p className="text-info mb-2">Due 19 Aug 2021</p>
										<p className="fw-bold fs-6">$ 1,800.90</p>
									</div>
									<div className="col-4">
										<p className="text-info text-end">Jensen Huang</p>
										<div className="alert alert-status alert-warning border-0 text-center">
											<BsFillCircleFill className="me-2" />
											<span>Pending</span>
										</div>
									</div>
								</div>
								<div className="row d-none d-md-flex align-items-center justify-content-between">
									<div className="col-6">
										<div className="d-flex">
											<p className="mb-0 flex-grow-1">
												<span className="text-info fs-6">#</span>
												<span className="ms-1 fw-bold fs-6">RT3080</span>
											</p>
											<p className="text-info mb-0 flex-grow-1">
												Due 19 Aug 2021
											</p>
											<p className="text-info mb-0 flex-grow-1">Jensen Huang</p>
										</div>
									</div>
									<div className="col-6">
										<div className="d-flex align-items-center gap-4">
											<p className="fw-bold fs-6 mb-0 flex-grow-1 text-end">
												$ 1,800.90
											</p>
											<div>
												<div className="alert alert-status alert-warning border-0 text-center mb-0 flex-grow-1">
													<BsFillCircleFill className="me-2" />
													<span>Pending</span>
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
				<Link to="/invoice/5" className="row mb-3 invoice-row">
					<div className="col-12">
						<div className="card border-0 shadow-sm rounded-4">
							<div className="card-body">
								{/* id, date, name, amt, status, icon (med and up) */}
								<div className="row d-md-none">
									<div className="col-8">
										<p className="mb-3">
											<span className="text-info fs-6">#</span>
											<span className="ms-1 fw-bold fs-6">RT3080</span>
										</p>
										<p className="text-info mb-2">Due 19 Aug 2021</p>
										<p className="fw-bold fs-6">$ 1,800.90</p>
									</div>
									<div className="col-4">
										<p className="text-info text-end">Jensen Huang</p>
										<div className="alert alert-status alert-secondary border-0 text-center">
											<BsFillCircleFill className="me-2" />
											<span>Draft</span>
										</div>
									</div>
								</div>
								<div className="row d-none d-md-flex align-items-center justify-content-between">
									<div className="col-6">
										<div className="d-flex">
											<p className="mb-0 flex-grow-1">
												<span className="text-info fs-6">#</span>
												<span className="ms-1 fw-bold fs-6">RT3080</span>
											</p>
											<p className="text-info mb-0 flex-grow-1">
												Due 19 Aug 2021
											</p>
											<p className="text-info mb-0 flex-grow-1">Jensen Huang</p>
										</div>
									</div>
									<div className="col-6">
										<div className="d-flex align-items-center gap-4">
											<p className="fw-bold fs-6 mb-0 flex-grow-1 text-end">
												$ 1,800.90
											</p>
											<div>
												<div className="alert alert-status alert-secondary border-0 text-center mb-0 flex-grow-1">
													<BsFillCircleFill className="me-2" />
													<span>Draft</span>
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
			</section>
		</div>
	);
}
