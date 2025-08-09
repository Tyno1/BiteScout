import { Button, Input } from "@/components/atoms";
import { Popover } from "@/components/molecules";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { Filter, Search } from "lucide-react";
import type { ColumnType } from "./Table";

type TableFilterProps = {
	columnFilters?: ColumnFiltersState;
	setColumnFilters?: (
		value:
			| ColumnFiltersState
			| ((prev: ColumnFiltersState) => ColumnFiltersState),
	) => void;
	filterName?: string;
	setFilterName?: (value: string) => void;
	column: ColumnType[];
};

export const TableFilter = ({
	columnFilters = [],
	setColumnFilters,
	filterName,
	setFilterName,
	column,
}: TableFilterProps) => {
	const name =
		(columnFilters.find((filter) => filter.id === filterName)
			?.value as string) || "";

	const handleFilterChange = (id: string, value: string) => {
		if (setColumnFilters) {
			setColumnFilters((prev: ColumnFiltersState) =>
				prev.filter((filter) => filter.id !== id).concat({ id, value }),
			);
		}
	};

	return (
		<div className="flex flex-col gap-4 mb-4 items-center w-full md:w-[30%] p-2">
			<div className="flex gap-2 items-center w-full">
				<Input
					label="Filter"
					name="filter"
					type="text"
					outlineType="round"
					placeholder="filter text here"
					fullWidth
					value={name}
					icon={<Search size={17} className="text-secondary" />}
					onChange={(e) =>
						filterName && handleFilterChange(filterName, e.target.value)
					}
				/>
				<Popover
					trigger={
						<Button
							color="secondary"
							variant="outline"
							text="Filter"
							size="sm"
							IconBefore={<Filter size={17} />}
						/>
					}
					color="secondary"
					variant="glass"
				>
					<div className="flex flex-col gap-2 items-start">
						{column.map((col: ColumnType) => {
							// Only render buttons for columns that have a string header
							if (!col.header || typeof col.header !== "string") {
								return null;
							}

							return (
								<Button
									key={col.id}
									color="secondary"
									variant="plain"
									size="sm"
									fullWidth
									text={col.header}
									className="items-left"
									onClick={() => col.id && setFilterName?.(col.id)}
								/>
							);
						})}
					</div>
				</Popover>
			</div>

			<div className="flex gap-2 text-sm w-full text-secondary p-2 rounded-lg">
				<p>Current Filter:</p>
				<p className="text-secondary font-bold">
					{filterName
						? filterName.charAt(0).toUpperCase() + filterName.slice(1)
						: "None"}
				</p>
			</div>
		</div>
	);
};
