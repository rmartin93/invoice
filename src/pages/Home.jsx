import ThemeElements from "../components/ThemeElements";
import { BsFillCircleFill } from "react-icons/bs";
import { BiSolidChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home">
			{/* <ThemeElements /> */}
			<section className="invoice-list container">
				<Link to="/#" className="row mb-3">
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
										<div className="alert alert-success border-0 text-center">
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
												<div className="alert alert-success border-0 text-center mb-0 flex-grow-1">
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
				<Link to="/#" className="row mb-3">
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
										<div className="alert alert-success border-0 text-center">
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
												<div className="alert alert-success border-0 text-center mb-0 flex-grow-1">
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
				<Link to="/#" className="row mb-3">
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
										<div className="alert alert-success border-0 text-center">
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
												<div className="alert alert-success border-0 text-center mb-0 flex-grow-1">
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
				<Link to="/#" className="row mb-3">
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
										<div className="alert alert-success border-0 text-center">
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
												<div className="alert alert-success border-0 text-center mb-0 flex-grow-1">
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
			</section>
		</div>
	);
}
