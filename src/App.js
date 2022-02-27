import React, { useEffect, useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import { ImageLarge } from './Components/ImageGalleryItem/ImageGalleryItem.styled';
import './App.module.css';
import PropTypes from 'prop-types';
import imageAPI from './Service/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
	const [img, setImg] = useState([]);
	const [imageName, setImageName] = useState('');
	const [imageLarge, setImageLarge] = useState('');
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [prevImg, setPrevImg] = useState('');

	useEffect(() => {
		if (!imageName) {
			return;
		}

		setLoading(true);
		imageAPI
			.getImages(imageName, pageNumber)
			.then((images) => {
				if (images.hits.length === 0) {
					toast('No photos with this word!');
				}
				if (prevImg !== imageName) {
					setImg(images.hits);
				} else {
					setImg([...img, ...images.hits]);
				}
			})
			.finally(() => {
				setLoading(false);
				setPrevImg(imageName);
			});
	}, [imageName, pageNumber]);

	const modalStyles = {
		content: {
			padding: '0',
			overflow: 'hidden',
			width: '975px',
			height: '660px',
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const modalHandler = (image) => {
		setImageLarge(image);
		setModal(!modal);
	};

	const getImage = (imageName) => {
		setImageName(imageName);
		setPageNumber(1);
	};

	const onClickLoadMoreButtton = () => {
		setPageNumber(pageNumber + 1);
		scroll.scrollToBottom();
	};

	return (
		<>
			<SearchBar getImage={getImage} />
			<ImageGallery
				modal={modalHandler}
				isLoading={loading}
				images={img}
				onClickMoreBtn={onClickLoadMoreButtton}
			/>
			<Modal isOpen={modal} onRequestClose={modalHandler} style={modalStyles}>
				<ImageLarge width='975' height='650' src={imageLarge} />
			</Modal>
			<ToastContainer />
		</>
	);
};

export default App;

App.propTypes = {
	imageName: PropTypes.string,
};
