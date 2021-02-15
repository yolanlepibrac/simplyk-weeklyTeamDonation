import classes from '*.module.css';
import { Drawer, Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    image: {
        animation: "3s linear 0s  spin",
        backgroundColor:"black", 
        width:400,
        height:400
    },
  }));

export const RandomizatorPage : React.FunctionComponent = () => {

    const [newDonorOpen, setNewDonorOpen] = React.useState(false)
    const classes = useStyles()

    return(
    <div style={{height:"100vh"}}>
        <Grid container justify='flex-end' style={{padding:20, height:100}}>
            <Grid>
                <Button variant="outlined" color='primary' onClick={() => setNewDonorOpen(prev => !prev)}>Add weekly donor</Button>
            </Grid>
            <Drawer open={newDonorOpen} anchor="right"onClose={() => setNewDonorOpen(prev => !prev)} >
                <div style={{width: 400}}>hello</div>
            </Drawer>
        </Grid>

        <Grid  style={{height:"calc(100vh - 100px)", width:"100%"}}>
            <Grid item xs={12} style={{height:100}}>
                <Button  variant="contained" color='primary'>Who give this week ?</Button>
            </Grid>
            <div  style={{ width:"100%", display:'flex', justifyContent:'center'}}>
                <div style={{position:'relative'}}>
                    <div className={classes.image}  style={{position:'absolute', top:0, left:-200}}>
                        <img src="https://image-uviadeo.journaldunet.com/image/450/1019233322/411789.jpg" width="400" height='400' />
                    </div>
                </div>
            </div>
            
        </Grid>
        <Grid>Created by Simplyk, All right reserved</Grid>
    </div>    
        )
}