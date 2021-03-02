/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchAutocomplete(props) {
	let typingTimer;

	const { rows, onsearch, onchange, typingInterval } = props;

	const onKeyDown = (event) => {
		console.log('Down');
		clearTimeout(typingTimer);
	};

	const onKeyUp = (event) => {
		console.log('Up');
		clearTimeout(typingTimer);
		typingTimer = setTimeout(finishTyping, typingInterval);
	};

	const finishTyping = () => {
		console.log('Finish');
		onsearch(inputValue);
	};

	const [ inputValue, setInputValue ] = useState('');
	return (
		<div style={{ width: 300 }}>
			<Autocomplete
				freeSolo
				id="autoComplete"
				disableClearable
				options={rows}
				getOptionLabel={(row) => row.value}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				onChange={onchange}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search input"
						margin="normal"
						variant="outlined"
						InputProps={{ ...params.InputProps, type: 'search' }}
						onKeyDown={onKeyDown}
						onKeyUp={onKeyUp}
					/>
				)}
			/>
		</div>
	);
}

SearchAutocomplete.defaultProps = {
	rows: [],
	onsearch: () => {},
	onchange: () => {},
	typingInterval: 500
};
