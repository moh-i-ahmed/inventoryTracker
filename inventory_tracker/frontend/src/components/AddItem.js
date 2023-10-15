// import react libraries
import React, { Component } from 'react';
import { Link } from "react-router-dom";

// import mui components
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

// import components
import { MuiDatePicker } from './MuiDatePicker';
import dayjs from "dayjs";


export default class AddItem extends Component {
    constructor(props) {
        super(props);

        // update state with form values
        this.state = {
            name: this.name,
            description: this.description,
            price: this.price,
            count: this.count,
            purchase_date: this.purchase_date
        };

        // bind event listeners
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddItemButtonOnClick = this.handleAddItemButtonOnClick.bind(this);
    }

    // onChange event handler for 'add item' form
    handleInputChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        console.log(value)
        
        this.setState({
            ...this.state,
            [id]: value,
        });
    }

    // onClick event handler for 'add item' button 
    handleAddItemButtonOnClick() {
        console.log(this.state);

        if (typeof this.state.description == 'undefined') { this.state.description = ""}
        if (typeof this.state.purchase_date == "undefined") { this.state.purchase_date = dayjs()}

        // build post request payload
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                count: this.state.count,
                purchase_date: this.state.purchase_date.format('YYYY-MM-DD')
            }),
        };

        // post payload to api
        fetch('/api/add-item', requestOptions)
            .then((response) =>
                response.json())
                    .then((data) => console.log(data));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Add Item
                    </Typography>
                    {/* Add item details */}
                    <Grid item xs={12} align="center">
                        <FormHelperText>
                            <div align="center">Add new item to inventory</div>
                        </FormHelperText>
                        <FormControl component="fieldset">
                            <TextField     id="name"          label="Name" required={true} value={this.name} inputProps={{min: 1,}} onChange={this.handleInputChange} />
                            <TextField     id="description"   label="Description" required={false} value={this.description} defaultValue="" onChange={this.handleInputChange} />
                            <TextField     id="price"         label="Price" required={true} type="number" value={this.price} inputProps={{min: 0.0,}} step="0.25" onChange={this.handleInputChange} />
                            <TextField     id="count"         label="Count" required={true} type="number" value={this.count} inputProps={{min: 1,}} onChange={this.handleInputChange} />
                            <MuiDatePicker id="purchase_date" value={this.purchase_date} onChange={this.handleInputChange} />
                        </FormControl>
                        <Grid item xs={12} align="center">
                            <Button color='secondary' variant='contained' onClick={this.handleAddItemButtonOnClick}>Add Item</Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button color='primary' variant='contained' to='/' component={Link}>Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
