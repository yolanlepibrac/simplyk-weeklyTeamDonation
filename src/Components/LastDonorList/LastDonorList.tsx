import { Grid, MenuItem, Select, TextField, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { LastDonor } from '../../api/api';
import { FirebaseContext } from '../../firebase/firebaseContext';
import { getTeamDonorFromLastDonor } from '../../helper/helper';

const useStyles = makeStyles(() => ({
    listItem :{
        width: 200,
        margin:5
    }
}));


export const LastDonorList : React.FunctionComponent = () => {
    
    const { teamDonors, notImmuneDonors, immuneDonors } = React.useContext(FirebaseContext);
    const classes = useStyles()

    const getUserName = (lastDonor: LastDonor) => {
        const teamDonor = getTeamDonorFromLastDonor(lastDonor, teamDonors);
        return teamDonor?.firstName
    }

    return(

        <Grid container style={{ padding:20, display:"flex", flexDirection:"column"}}>
            Last weeks
            {notImmuneDonors && notImmuneDonors.map((lastDonor) => {
                 return <Button disableFocusRipple disableRipple disabled variant='outlined' color='primary' className={classes.listItem}>{getUserName(lastDonor) || ""}</Button>
            })}
            {immuneDonors && immuneDonors.map((lastDonor) => {
                 return <Button disableFocusRipple disableRipple disabled variant='contained' color='primary' className={classes.listItem}>{getUserName(lastDonor) || ""}</Button>
            })}
        </Grid>
     
        )
}