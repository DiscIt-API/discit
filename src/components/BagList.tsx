"use client";

import toast from "react-hot-toast";

import { useApi, useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";

import type { BagListProps } from "@types";

export const BagList = ({ onClose }: BagListProps) => {
	const { isLoading, error, deleteBag } = useApi();
	const { bags, selectedBag, setSelectedBag, showNewBagModal } = useAppContext();

	if (!selectedBag || !bags || bags.length === 0) return null;

	return (
		<List>
			{bags.map(bag => (
				<ListItem
					key={bag.id}
					secondaryAction={
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={async e => {
								e.stopPropagation();
								const res = await deleteBag({ bagId: bag.id });
								if (res.error) {
									toast.error("Error deleting bag");
									return;
								}
								toast.success(`Deleted ${bag.name}`);
							}}
							disabled={isLoading}
						>
							<DeleteIcon />
						</IconButton>
					}
					className="bag-list-item"
					onClick={() => {
						setSelectedBag(bag);
						onClose();
					}}
				>
					<ListItemText
						sx={{ padding: "0.25rem 1rem 0.25rem 0.25rem", minWidth: "10rem" }}
						primary={bag.name}
					/>
				</ListItem>
			))}
			<ListItem
				key="new-bag"
				secondaryAction={
					<IconButton edge="end" aria-label="add">
						<AddIcon />
					</IconButton>
				}
				className="bag-list-item"
				onClick={() => {
					onClose();
					showNewBagModal();
				}}
			>
				<ListItemText
					sx={{
						padding: "0.25rem 1rem 0.25rem 0.25rem",
						minWidth: "10rem",
						color: "#212121"
					}}
					primary="Add new bag..."
				/>
			</ListItem>
		</List>
	);
};
