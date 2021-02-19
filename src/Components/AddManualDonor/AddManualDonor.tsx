import { Grid, MenuItem, Select, TextField, makeStyles, CircularProgress, Button } from '@material-ui/core';
import React from 'react';
import { saveLastDonor, TeamDonor } from '../../api/api';
import { FirebaseContext } from '../../firebase/firebaseContext';

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

    const { teamDonors, database } = React.useContext(FirebaseContext);
    const classes = useStyles()

    const [selectedPerson, setSelectedPerson] = React.useState<TeamDonor | null>(null)
    const [loading, setLoading] = React.useState(false)
    const [password, setPassword] = React.useState<string>('')
    
    const addDonorToList =  async() => {
        if(password === validPassword && selectedPerson){
            setLoading(true)
            await saveLastDonor(database, selectedPerson)
            onClose()
            setLoading(false)
        }
    }

    const handleSelectPerson = (id : string) => {
        const selectedPerson = teamDonors?.find((person) => {
            return person.id === id
        })
        if(selectedPerson){
            setSelectedPerson(selectedPerson)
        }
    }

    return(

        <Grid container style={{width: 400}}>
            <Grid xs={12} className={classes.item}>
                <div >Add the last Donor</div>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <Select value={selectedPerson} onChange={(e) => handleSelectPerson(e.target.value as string)} variant="outlined" fullWidth>
                    {teamDonors && teamDonors.map((person, index) => {
                        return <MenuItem key={index} value={person.id}>{person.firstName}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <TextField value={password} onChange={(e) => setPassword(e.target.value as string)} variant='outlined' fullWidth label='password'>Add</TextField>
            </Grid>
            <Grid xs={12} className={classes.item}>
                <Button 
                startIcon={(loading && <CircularProgress size={16} />)} 
                disabled={loading} 
                onClick={addDonorToList} 
                fullWidth 
                variant='contained' 
                color="primary">Add</Button>
            </Grid>
            
            
        </Grid>
     
        )
}