import { Grid, MenuItem, Select, TextField, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles(() => ({
    listItem :{
        width: 200,
        margin:5
    }
}));


const lastDonors = ["François", "Thibaut", "Myriam", 'Sam', "Yolan", 'Rowan', 'Florence', 'Lola']

export const LastDonorList : React.FunctionComponent = () => {

    const classes = useStyles()

    const immuneDonors  = lastDonors.filter((item, index) => index < 3).reverse()
    const notImmuneDonors  = lastDonors.filter((item, index) => index >= 3).reverse()
    console.log(notImmuneDonors)


    return(

        <Grid container style={{ padding:20, display:"flex", flexDirection:"column"}}>
            Last weeks
            {notImmuneDonors.map((lastDonor) => {
                 return <Button disableFocusRipple disableRipple variant='outlined' color='primary' className={classes.listItem}>{lastDonor}</Button>
            })}
            {immuneDonors.map((lastDonor) => {
                 return <Button disableFocusRipple disableRipple variant='contained' color='primary' className={classes.listItem}>{lastDonor}</Button>
            })}
        </Grid>
     
        )
}