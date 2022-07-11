import React, {Component} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import img from '../images/test_img.jpg';
import { DataGrid } from '@mui/x-data-grid';

const styles = theme => ({
  root: {
    width: '100%',
    minwidth: 1080
  },
  paper: {
    margin: 80
  },
  input: {
    paddingLeft: 20,
    width: '100%',
    height: '100%',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%'
  },
  table: {
    marginTop: 20,
    border: '1px solid #ccc'
  },
  tableHead: {
    background: '#ccc'
  },
  img: {
    marginTop: 20,
    height: 300,
    width: '100%'
  }
});

const columns = [
  { field: 'subProjectId', headerName: 'Sub Project ID', flex: 1 },
  { field: 'topicId', headerName: 'Topic ID', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 3 }
];

class Dataset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {'id':1, subProjectId:0, topicId:0, description:0},
        {'id':5, subProjectId:1, topicId:1, description:1},
        {'id':7, subProjectId:2, topicId:2, description:2}
      ],
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>

            <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={4}>

                <div style={{ height: 400, width: '100%' }}>
                  <div style={{ display: 'flex', height: 400 }}>
                    <div style={{ flexGrow: 1 }}> 
                      <DataGrid
                        style={{display: 'flex'}}
                        className={classes.dataGrid}
                        rows={this.state.data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onSelectionModelChange={this.checkHandler}
                        hideFooterSelectedRowCount
                      />
                    </div>
                  </div>
                </div>

                  {/* <Table className={classes.table} height={300} >
                    <TableHead className={classes.tableHead} >
                        <TableRow>
                          <TableCell className={classes.tableHead}>File name list</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody> 
                        <TableRow>
                            <TableCell>file1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>file2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>file3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>file4</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table> */}
                </Grid>
                <Grid item xs={8}>
                    <img className={classes.img} src={img} alt="sample img" />
                </Grid>
            </Grid>
            
            <Table className={classes.table} >
                <TableHead className={classes.tableHead} >
                    <TableRow>
                      <TableCell className={classes.tableHead}>Directory List</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody> 
                    <TableRow>
                        <TableCell>dir1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>dir2</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>dir3</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Dataset);
