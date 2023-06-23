import { HiPlusCircle, HiPlus } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
export default function ThemeElements() {
	// Sample code for grabbing the date from a date input
	// const dateControl = document.querySelector('input[type="date"]');
	// dateControl.value = "2017-06-01";
	// console.log(dateControl.value); // prints "2017-06-01"
	// console.log(dateControl.valueAsNumber); // prints 1496275200000, a
	const { theme, toggleTheme } = useTheme();
	return (
		<section className="theme-elements">
			<div className="container bg-white py-3 rounded-4">
				<div className="row">
					<div className="col-12">
						<h1>Colors</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<div className="color-box text-center bg-primary rounded-4 p-3">
							<h5 className="text-light mb-0">Primary</h5>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="color-box text-center bg-secondary rounded-4 p-3">
							<h5 className="text-info mb-0">Secondary</h5>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="color-box text-center bg-dark rounded-4 p-3">
							<h5 className="text-info mb-0">Dark</h5>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="color-box text-center bg-light rounded-4 p-3">
							<h5 className="text-dark mb-0">Light</h5>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-sm-3">
						<div className="color-box text-center bg-danger rounded-4 p-3">
							<h5 className="text-light mb-0">Light</h5>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-12">
						<h1>Typography</h1>
						<h1>h1</h1>
						<h2>h2</h2>
						<h3>h3</h3>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
							eum tenetur eligendi quidem ipsa, cum quisquam quos impedit dicta
							officiis doloremque, amet quis nihil facere necessitatibus
							exercitationem qui laboriosam at.
						</p>
					</div>
				</div>
				<div className="row mt-5">
					<h1>Buttons</h1>
				</div>
				<div className="row mt-3">
					<div className="col-3">
						<button className="btn btn-primary">
							<div>Mark as Paid</div>
						</button>
					</div>
					<div className="col-3">
						<button className="btn btn-primary btn-icon">
							<HiPlusCircle className="me-2" />
							<span>New Invoice</span>
						</button>
					</div>
					<div className="col-3">
						<button className="btn btn-light">
							<div>Edit</div>
						</button>
					</div>
					<div className="col-3">
						<button className="btn btn-dark">
							<div>Edit</div>
						</button>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-3">
						<button className="btn btn-danger">
							<div>Delete</div>
						</button>
					</div>
					<div className="col">
						<button className="btn btn-light btn-icon-2 w-100">
							<HiPlus className="me-2" />
							<div>Add New Item</div>
						</button>
					</div>
				</div>
				<div className="row py-5" data-bs-theme={theme}>
					<div className="col-6">
						<h1>Form Elements</h1>
					</div>
					<div className="col-6">
						<button
							type="button"
							className={`btn btn-icon-only ms-auto btn-${
								theme === "dark" ? "light" : "dark"
							}`}
							onClick={() => toggleTheme(theme)}
						>
							{theme === "dark" ? <BsSun /> : <BsMoon />}
						</button>
					</div>
				</div>
				<div className="row py-5" data-bs-theme={theme}>
					<div className="col-3">
						<p className="text-center text-info">Text</p>
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" id="name" />
					</div>
					<div className="col-3">
						<p className="text-center text-info">Dropdown</p>
						<label htmlFor="name">Payment Terms</label>
						<select className="form-select" id="payment-terms">
							<option value="1">Net 1 Day</option>
							<option value="7">Net 7 Days</option>
							<option value="14">Net 14 Days</option>
							<option value="30">Net 30 Days</option>
						</select>
					</div>
					<div className="col-3">
						<p className="text-center text-info">Date Picker</p>
						<label for="start">Start date:</label>
						<input
							className="form-control"
							type="date"
							id="start"
							name="trip-start"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
