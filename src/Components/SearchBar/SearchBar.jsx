import React, { useState } from 'react';
import { Header } from './SearchBarStyles';
import SearchIcon from '@mui/icons-material/Search';
import { Paper, IconButton, InputBase } from '@mui/material';
import PropTypes from 'prop-types';

const SearchBar = ({ getImage }) => {
	const [image, setImage] = useState('');

	const getImageName = (e) => {
		setImage(e.target.value);
	};

	return (
		<Header>
			<Paper
				component='form'
				sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
				<InputBase
					onChange={getImageName}
					type='text'
					autoComplete='off'
					sx={{ ml: 1, flex: 1 }}
					placeholder='Search images and photos'
					inputProps={{ 'aria-label': 'Search images and photos' }}
				/>
				<IconButton
					onClick={(e) => {
						e.preventDefault();
						getImage(image);
					}}
					type='submit'
					sx={{ p: '10px' }}
					aria-label='search'>
					<SearchIcon />
				</IconButton>
			</Paper>
		</Header>
	);
};

export default SearchBar;

SearchBar.propTypes = {
	imageName: PropTypes.string,
};
