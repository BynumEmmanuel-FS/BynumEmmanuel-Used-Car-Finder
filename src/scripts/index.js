import "../styles/index.scss";
import data from "../assets/data/car-dataset.json";

class Main {
	constructor() {
		this.inputs = {
			year: document.getElementById("year"),
			make: document.getElementById("make"),
			model: document.getElementById("model"),
		};
		this.filtered = [];

		this.inputs.year.addEventListener("input", (e) => this.handleYear(e));
		this.inputs.make.addEventListener("input", (e) => this.handleMake(e));
		this.inputs.model.addEventListener("input", (e) => this.handleModel(e));

		this.hydrateYearSelect();
	}

	hydrateYearSelect() {
		const years = new Set();
		for (let car of data) {
			years.add(car.year);
		}

		for (let year of Array.from(years).toSorted()) {
			const option = document.createElement("option");
			option.value = year;
			option.innerHTML = year;
			this.inputs.year.append(option);
		}
	}

	emptySelect(...nodes) {
		for (let node of nodes) {
			node.replaceChildren();

			const emptyOption = document.createElement("option");
			emptyOption.disabled = true;
			emptyOption.selected = true;
			node.append(emptyOption);
			node.disabled = true;
		}
	}

	handleYear(e) {
		const value = e.target.value;
		this.emptySelect(this.inputs.make, this.inputs.model);

		const makes = new Set();
		for (let car of data) {
			if (car.year == value) {
				makes.add(car.Manufacturer);
			}
		}

		for (let make of Array.from(makes).toSorted()) {
			const option = document.createElement("option");
			option.value = make;
			option.innerHTML = make;
			this.inputs.make.append(option);
		}

		this.inputs.make.disabled = false;
	}

	handleMake(e) {
		const value = e.target.value;
		this.emptySelect(this.inputs.model);

		const models = new Set();
		for (let car of data) {
			if (car.year == this.inputs.year.value && car.Manufacturer == value) {
				models.add(car.model);
			}
		}

		for (let model of Array.from(models).toSorted()) {
			const option = document.createElement("option");
			option.value = model;
			option.innerHTML = model;
			this.inputs.model.append(option);
		}

		this.inputs.model.disabled = false;
	}

	handleModel(e) {
		const matches = data.filter((car) => {
			return (
				car.year == this.inputs.year.value &&
				car.Manufacturer == this.inputs.make.value &&
				car.model == e.target.value
			);
		});
		for (let match of matches) {
			console.log(match);
		}
	}
}

(() => {
	console.log("Starting index.js script...");

	new Main();
})();
