import { useParams } from "react-router-dom";
export default function Invoice() {
	const { id } = useParams();
	return (
		<div className="invoice">
			<section className="container">
				<div className="row">
					<div className="col-12">
						<h2>Invoice ID: {id} </h2>
					</div>
				</div>
			</section>
		</div>
	);
}
