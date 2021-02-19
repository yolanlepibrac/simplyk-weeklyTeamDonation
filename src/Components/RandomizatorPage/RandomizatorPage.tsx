
import { Drawer, Grid, LinearProgress, makeStyles,} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { resolve } from 'path';
import React from 'react';
import { FirebaseContext } from '../../firebase/firebaseContext';
import { AddManualDonor } from '../AddManualDonor/AddManualDonor';
import { LastDonorList } from '../LastDonorList/LastDonorList';

const useStyles = makeStyles(() => ({
    image: {
        animation: "3s linear 0s  spin",
        backgroundColor:"black", 
        width:400,
        height:400
    },
}));

const LOADING_DURATION = 2000

interface TeamDonor {firstName : string}

export const RandomizatorPage : React.FunctionComponent = () => {

    const { database } = React.useContext(FirebaseContext);

    const addDonor = async () => {
        await database?.collection("teamDonor").add({
            firstName: "Ada",
        })
    }
    const getTeamDonors = async () => {
        const usersData = await database?.collection("teamDonor").get();
        let users : TeamDonor[] = [];
        usersData?.forEach((doc) => {
            users.push(doc.data() as TeamDonor) 
        });
        console.log(users)

    }

    

    const [newDonorOpen, setNewDonorOpen] = React.useState(false)
    const classes = useStyles()
    const [donorIsDisplayed, setDonorIsDisplay] = React.useState(false)
    const [progressIsDisplayed, setProgressIsDisplay] = React.useState(false)
    
    const addNewDonor = async () => {
        setDonorIsDisplay(false)
        setProgressIsDisplay(true)
        setProgress(0)
        await getTeamDonors()
        setTimeout(() => {
            setProgressIsDisplay(false)
            setDonorIsDisplay(true)
        }, LOADING_DURATION)
    }


    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            return Math.min(oldProgress + 13, 100)
          });
        }, LOADING_DURATION/10);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

  

    return(
    <div style={{height:"100vh", position:'relative'}}>
        <div style={{position:'absolute', top:0, left:0}}>
            <LastDonorList/>
        </div>
        
        <Grid container justify='flex-end' style={{padding:20, height:100}}>
            <Grid>
                <Button variant="outlined" color='primary' onClick={() => setNewDonorOpen(prev => !prev)}>Add manually</Button>
            </Grid>
            <Drawer open={newDonorOpen} anchor="right"onClose={() => setNewDonorOpen(prev => !prev)} >
                <AddManualDonor onClose={() => setNewDonorOpen(false)} />
            </Drawer>
        </Grid>

        <Grid  style={{height:"calc(100vh - 100px)", width:"100%"}}>
            <Grid item xs={12} style={{height:100}}>
                <Button  variant="contained" color='primary' onClick={ addNewDonor}>Who give this week ?</Button>
            </Grid>
            <div  style={{ width:"100%", display:'flex', justifyContent:'center'}}>
               {donorIsDisplayed && <div style={{position:'relative'}}>
                    <div className={classes.image}  style={{position:'absolute', top:0, left:-200}}>
                        <img src="https://image-uviadeo.journaldunet.com/image/450/1019233322/411789.jpg" width="400" height='400' />
                    </div>
                </div>}
                {progressIsDisplayed && 
                   <LinearProgress variant="determinate" value={progress} style={{width:400, height:40}}/>
                }
            </div>
            
        </Grid>
        <Grid>Created by Simplyk, All right reserved</Grid>
    </div>    
        )
}