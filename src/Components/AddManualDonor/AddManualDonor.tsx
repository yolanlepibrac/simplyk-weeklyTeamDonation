import { Grid, MenuItem, Select, TextField, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles(() => ({
    image: {
        animation: "3s linear 0s  spin",
        backgroundColor:"black", 
        width:400,
        height:400
    },
    item: {
        padding:20
    }
}));

const validPassword = "Zidane"

const simplykTeam = ["François", "Thibaut", "Myriam", 'Sam', "Yolan", 'Rowan', 'Florence', 'Lola']

interface ManualDonorProps {
    onClose : () => void
}

export const AddManualDonor : React.FunctionComponent<ManualDonorProps> = ({onClose}) => {

    const classes = useStyles()

    const [selectedPerson, setSelectedPerson] = React.useState<string>(simplykTeam[0])
    const [password, setPassword] = React.useState<string>('')
    
    const addDonorToList = () => {
        if(password === validPassword){
            console.log("add donor")
            onClose()
        }
    }

    return(

        <Grid container style={{width: 400}}>
            <Grid xs={12} className={classes.item}>
                <div >Add the last Donor</div>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value as string)} variant="outlined" fullWidth>
                    {simplykTeam.map((person, index) => {
                        return <MenuItem key={index} value={person}>{person}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <TextField value={password} onChange={(e) => setPassword(e.target.value as string)} variant='outlined' fullWidth label='password'>Add</TextField>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <Button onClick={addDonorToList} fullWidth variant='contained' color="primary">Add</Button>
            </Grid>
            
            
        </Grid>
     
        )
}