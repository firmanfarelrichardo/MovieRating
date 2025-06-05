import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import Sidebar from '../../components/common/Sidebar';

function HomePage() {
	const [feedType, setFeedType] = useState("forYou");
	const [page, setPage] = useState("forYou");
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get('tweet') === '1') {
			setPage('tweet');
		} else if (params.get('search') === '1') {
			setPage('search');
		} else {
			setPage('forYou');
		}
	}, [location.search]);

	const handleHeaderClick = (type) => {
		setFeedType(type);
		setPage('forYou');
		navigate('/');
	};

	return (
		<div className='home-container'>
			{/* Header */}
			<div className='home-container__header'>
				<div
					className={`home-container__header__title${page === "forYou" && feedType === "forYou" ? " active" : ""}`}
					onClick={() => handleHeaderClick("forYou")}
				>
					For you
					{page === "forYou" && feedType === "forYou" && (
						<div className='home-container__header__title__active'></div>
					)}
				</div>
				<div
					className={`home-container__header__title${page === "forYou" && feedType === "following" ? " active" : ""}`}
					onClick={() => handleHeaderClick("following")}
				>
					Following
					{page === "forYou" && feedType === "following" && (
						<div className='home-container__header__title__active'></div>
					)}
				</div>
			</div>

			{/* CREATE POST INPUT (khusus page tweet dari sidebar) */}
			{page === "tweet" && <CreatePost />}

			{/* SEARCH PAGE (khusus page search dari sidebar) */}
			{page === "search" && <SearchPage />}

			{/* POSTS (khusus page forYou/following) */}
			{page === "forYou" && <Posts feedType={feedType} />}
		</div>
	);
}

export default HomePage
