import React, { useState } from "react";

function FilterInput({ onFilterChange }) {
	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		authorName: "",
		impactFactorMin: 0,
		impactFactorMax: 0.1,
		filterOption: "", // Stores the selected radio option
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const processedValue =
			name === "impactFactorMin" || name === "impactFactorMax"
				? parseFloat(value) || 0 // Convert to float and handle empty values
				: value;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};
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
			impactFactorMin: 0,
			impactFactorMax: 0.1,
			filterOption: "",
		});

		onFilterChange({});
	};

	return (
		<div className="border mt-10 p-4">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap justify-around space-x-4 container items-center">
					<div className="flex flex-col items-end space-y-1">
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
								onChange={handleInputChange}
								className="border p-2 rounded-sm"
							/>
						</div>

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
								onChange={handleInputChange}
								className="border p-2 rounded-sm"
							/>
						</div>
					</div>
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
							onChange={handleInputChange}
							className="border p-2 rounded-sm"
						/>
					</div>

					<div className="flex justify-between items-center">
						<label
							htmlFor="impactFactor"
							className="mr-1 font-semibold text-lg"
						>
							Impact Factor:
						</label>
						<div className="flex flex-col justify-center items-center space-y-2">
							<input
								type="number"
								name="impactFactorMin"
								min="0"
								max="10"
								step="0.1"
								value={filters.impactFactorMin}
								onChange={handleInputChange}
								placeholder="Min"
								className="border p-2 rounded-sm max-w-fit"
							/>
							{/* <span className="font-semibold">to</span> */}
							<input
								type="number"
								name="impactFactorMax"
								min="0"
								max="10"
								step="0.1"
								value={filters.impactFactorMax}
								onChange={handleInputChange}
								placeholder="Max"
								className="border p-2 rounded-sm max-w-fit"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="impactFactor"
							className="mr-1 font-semibold text-lg"
						>
							Indexing
						</label>
						<div className="flex flex-col  items-start ">
							<label className="cursor-pointer">
								<input
									type="radio"
									name="filterOption"
									value="SCI"
									checked={filters.filterOption === "SCI"}
									onChange={handleInputChange}
									className="mr-2 cursor-pointer"
								/>
								SCI
							</label>
							<label className="cursor-pointer">
								<input
									type="radio"
									name="filterOption"
									value="WOS"
									checked={filters.filterOption === "WOS"}
									onChange={handleInputChange}
									className="mr-2 cursor-pointer"
								/>
								Web of Science
							</label>
							<label className="cursor-pointer">
								<input
									type="radio"
									name="filterOption"
									value="other"
									checked={filters.filterOption === "other"}
									onChange={handleInputChange}
									className="mr-2 cursor-pointer"
								/>
								Other
							</label>
							<label className="cursor-pointer">
								<input
									type="radio"
									name="filterOption"
									value=""
									checked={filters.filterOption === ""}
									onChange={handleInputChange}
									className="mr-2 cursor-pointer"
								/>
								NONE
							</label>
						</div>
					</div>
					<div className="grid row-span-2 space-y-2">
						<button
							type="submit"
							className="bg-blue-500 text-white px-2 max-h-max py-1 w-32  rounded-[4px]"
						>
							Submit
						</button>
						<button
							type="button"
							className="bg-orange-600 text-white px-2 items-center max-h-max py-1 w-32  rounded-[4px]"
							onClick={clearFilter}
						>
							Clear Filters
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default FilterInput;
