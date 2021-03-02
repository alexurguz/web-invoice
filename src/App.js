/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import SearchAutocomplete from './components/searchAutocomplete';
import Endpoints from './util/Endpoints';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InvoiceDetail from './components/invoiceDetail';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function FreeSolo() {
	const [ customers, setCustomers ] = useState([]);
	const [ products, setProducts ] = useState([]);
	const [ customer, setCustomer ] = useState({});
	const [ selectedDate, setSelectedDate ] = React.useState(new Date());
	const [ total, setTotal ] = useState(0);

	const onSearch = async (value) => {
		console.log(value);
		//const customerRows = await Endpoints.getCustomerByName(value);
		const customerRows = [ { value: 'hola', id: 1 } ];
		setCustomers(customerRows);
	};

	useEffect(
		() => {
			console.log(customer);
		},
		[ customer ]
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const onChange = (event, row) => {
		setCustomer(row);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary
		}
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={12}>
				<Grid item xs={12}>
					<SearchAutocomplete
						rows={customers}
						onsearch={onSearch}
						typingInterval={1000}
						onchange={onChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM-dd-yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Date picker inline"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="address" label="Dirección" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="country" label="País" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="city" label="Ciudad" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField value={total} id="total" label="Total" type="number" editable={true} />
				</Grid>
				<InvoiceDetail setTotal={setTotal} products={products} setProducts={setProducts} />
			</Grid>
		</div>
	);
}
