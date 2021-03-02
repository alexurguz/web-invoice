import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		minWidth: 650
	},
	selectTableCell: {
		width: 60
	},
	tableCell: {
		width: 130,
		height: 40
	},
	input: {
		width: 130,
		height: 40
	}
}));

const CustomTableCell = ({ row, name, onChange }) => {
	console.log('entra aca::::', row);
	const classes = useStyles();
	const { isEditMode } = row;
	return (
		<TableCell align="left" className={classes.tableCell}>
			{isEditMode ? (
				<Input value={row[name]} name={name} onChange={(e) => onChange(e, row)} className={classes.input} />
			) : (
				row[name]
			)}
		</TableCell>
	);
};

export default function InvoiceDetail(props) {
	const { setTotal, products, setProducts } = props;
	//const [ products, setProducts ] = React.useState([]);
	const [ previous, setPrevious ] = React.useState({});
	const classes = useStyles();

	const onToggleEditMode = (id) => {
		setProducts(() => {
			return products.map((product) => {
				if (product.id === id) {
					return { ...product, isEditMode: !product.isEditMode };
				}
				return product;
			});
		});
	};

	const onChange = (e, product) => {
		if (!previous[product.id]) {
			setPrevious((state) => ({ ...state, [product.id]: product }));
		}
		const value = e.target.value;
		const name = e.target.name;
		const { id } = product;
		const newRows = products.map((product) => {
			if (product.id === id) {
				return { ...product, [name]: value };
			}
			return product;
		});
		setProducts(newRows);
		setTotal(getTotal);
	};

	const getTotal = () => {
		const total = products.reduce((a, b) => a.total_price + b.total_price);
		return total;
	};

	useEffect(
		() => {
			console.log(products);
		},
		[ products ]
	);

	const onRevert = (id) => {
		const newRows = products.map((product) => {
			if (product.id === id) {
				return previous[id] ? previous[id] : product;
			}
			return product;
		});
		setProducts(newRows);
		setPrevious((state) => {
			delete state[id];
			return state;
		});
		onToggleEditMode(id);
	};

	const onAddProduct = () => {
		setProducts((state) => {
			const newRows = products;
			newRows.push({
				id: null,
				product: '',
				quantity: 0,
				price: 0,
				total_price: 0,
				isEditMode: true
			});
			return newRows;
		});
		console.log('productos:::', products);
	};

	return (
		<div className={classes.root}>
			<Grid item xs={12}>
				<br />
				<Button variant="contained" onClick={() => onAddProduct()}>
					Nuevo producto
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.root}>
					<Table className={classes.table} aria-label="caption table">
						<TableHead>
							<TableRow>
								<TableCell align="left" />
								<TableCell align="left">Producto</TableCell>
								<TableCell align="left">Cantidad</TableCell>
								<TableCell align="left">Valor unitario</TableCell>
								<TableCell align="left">Valor total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id}>
									<TableCell className={classes.selectTableCell}>
										{product.isEditMode ? (
											<div>
												<IconButton
													aria-label="done"
													onClick={() => onToggleEditMode(product.id)}
												>
													<DoneIcon />
												</IconButton>
												<IconButton aria-label="revert" onClick={() => onRevert(product.id)}>
													<RevertIcon />
												</IconButton>
											</div>
										) : (
											<IconButton
												aria-label="delete"
												onClick={() => onToggleEditMode(product.id)}
											>
												<EditIcon />
											</IconButton>
										)}
									</TableCell>
									<CustomTableCell {...{ product, name: 'product', onChange }} />
									<CustomTableCell {...{ product, name: 'quantity', onChange }} />
									<CustomTableCell {...{ product, name: 'price', onChange }} />
									<CustomTableCell {...{ product, name: 'total_price', onChange }} />
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</Grid>
		</div>
	);
}
