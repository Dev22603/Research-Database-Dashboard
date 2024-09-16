import React, { useState } from "react";
import { fetchConferences } from "../services/api.mjs";

function FilterInput({ onFilterChange }) {
	// Manage the filter values in one state object
	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		authorName: "",
		impactFactor: 0,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	}; //This function does same work as previous one but is just implemented in a different way. This is purely for learning purpose

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(filters);
		onFilterChange(filters);
	};

	const clearFilter = () => {
		setFilters({
			startDate: "",
			endDate: "",
			authorName: "",
			impactFactor: 0,
		});

		onFilterChange({});
	};

	return (
		<div className="border mt-10 p-4">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap space-x-4 justify-center container mx-auto">
					{/* Start Date */}
					<div>
						<label
							htmlFor="startDate"
							className="mr-1 font-semibold text-lg"
						>
							Start Date:
						</label>
						<input
							type="month"
							name="startDate"
							value={filters.startDate}
							onChange={handleInputChange} // Pass "startDate" to handleChange
							className="border p-2 rounded-sm"
						/>
					</div>

					{/* End Date */}
					<div>
						<label
							htmlFor="endDate"
							className="mr-1 font-semibold text-lg"
						>
							End Date:
						</label>
						<input
							type="month"
							name="endDate"
							value={filters.endDate}
							onChange={handleInputChange} // Pass "startDate" to handleChange
							className="border p-2 rounded-sm"
						/>
					</div>

					{/* Author Name */}
					<div>
						<label
							htmlFor="authorName"
							className="mr-1 font-semibold text-lg"
						>
							Author Name:
						</label>
						<input
							type="text"
							name="authorName"
							placeholder="Author Name"
							value={filters.authorName}
							onChange={handleInputChange} // Pass "startDate" to handleChange
							className="border p-2 rounded-sm"
						/>
					</div>

					{/* Impact Factor */}
					<div className="flex justify-between items-center">
						<label
							htmlFor="impactFactor"
							className="mr-1 font-semibold text-lg"
						>
							Impact Factor:
						</label>
						<input
							type="range"
							name="impactFactor"
							min="0"
							max="10"
							step="0.1"
							value={filters.impactFactor}
							onChange={handleInputChange} // Pass "startDate" to handleChange
							className="border p-2 rounded-sm max-w-fit"
						/>
						<div className="min-w-6 text-center">
							{filters.impactFactor}
						</div>
					</div>

					{/* Submit and Clear Buttons */}
					<button
						type="submit"
						className="bg-blue-500 text-white p-2"
					>
						Submit
					</button>
					<button
						type="button"
						className="bg-red-500 text-white p-2"
						onClick={clearFilter}
					>
						Clear Filters
					</button>
				</div>
			</form>
		</div>
	);
}

export default FilterInput;
