import React from 'react';
import useStore from 'store/globalStore';

interface IProps {
	logout: () => void;
}
const Header: React.FC<IProps> = ({ logout }: IProps) => {
	/**
	 * Import global state parts needed
	 */
	const [goToPage] = useStore((state) => {
		return [state.goToPage];
	});

	return (
		<div className="Header d-flex justify-content-between align-items-center p-2 pointer">
			<h1
				className="h4 p-2"
				onClick={() => {
					goToPage('song-list');
				}}
			>
				Μινόρε του Βορρά
			</h1>
			<button
				className="btn btn-sm btn-secondary m-2"
				onClick={() => {
					return logout();
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default Header;
