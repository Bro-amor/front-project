import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
    background: '#eee'
  },
  tableInnerborder: {
    borderRight: '1px dashed #ccc'
  },
  dataGrid: {
    marginTop: 20,
    width: '100%'
  },
});

const columns = [
  { field: 'subProjectId', headerName: 'Sub Project ID', flex: 1 },
  { field: 'topicId', headerName: 'Topic ID', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 3 }
];

let rows = [];


class Netconfig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subProjectId: "",
      topicId: "",
      description: "",
      data: [],
      selectedId: -1,
      regSid: null,
      regTid: null,
      regDes: null,
    }
  };

  resSidChk = () => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9_-]{4,20}$/);
    this.setState({
      regSid: regexp1.test(this.state.subProjectId)
    });
  }
  resTidChk = () => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9_-]{4,20}$/);
    this.setState({
      regTid: regexp1.test(this.state.topicId)
    });
  }
  resDesChk = () => {
    var regexp2 = this.state.description.length < 2 || this.state.description.length > 100 ? false : true
    this.setState({
      regDes: regexp2,
    });
  }
  patternChk = () => {
    this.resSidChk();
    this.resTidChk();
    this.resDesChk();
  }

  onSubmit = () => {
    if(this.state.subProjectId == "" || this.state.topicId == "" || this.state.description == "") {
      alert("Sub Project ID, Topic ID, Description을 모두 입력해주세요.");
    }
    if(this.state.selectedId != -1) {
      alert("CANCLE 버튼을 눌러 선택을 취소하고 생성해주세요.")
    }
    if(this.state.selectedId == -1 && this.state.regSid && this.state.regTid && this.state.regDes) {
      const data = this.state.data.at(-1)
      let id = 0;
      if (data){
        id = Number(data.id)+1
      }
  
      const temp_data = {
        id: id,
        subProjectId: this.state.subProjectId, 
        topicId: this.state.topicId, 
        description: this.state.description,
      }
  
      this.setState({
        subProjectId: "",
        topicId: "",
        description: "",
        data: this.state.data.concat(temp_data),
        regSid: null,
        regTid: null,
        regDes: null,

      })
    }
  }

  handleChangeSid = (e) => {
      this.setState({
        subProjectId: e.target.value
      }, () => this.resSidChk());
  };
  handleChangeTid = (e) => {
    this.setState({
      topicId: e.target.value
    }, () => this.resTidChk());
  };
  handleChangeDesc = (e) => {
    this.setState({
      description: e.target.value
    }, () => this.resDesChk());
  };

  checkHandler = (ids) => {
    if(ids.length > 0){
      const selected = this.state.data.filter(row => row.id == ids[0])[0]
      
      this.setState({
        selectedId: selected.id,
        subProjectId: selected.subProjectId,
        topicId: selected.topicId,
        description: selected.description,
      });
    }
  };

  deleteRow = () => {
    if(this.state.selectedId > -1) {
      const remain = this.state.data.filter(row => row.id != this.state.selectedId)
      this.setState({
        data: remain,
        subProjectId: "",
        topicId: "",
        description: "",
        selectedId: -1
      })
    }
  };

  onCancle = () => {
    this.setState({
      subProjectId: "",
      topicId: "",
      description: "",
      selectedId: -1,
      regSid: null,
      regTid: null,
      regDes: null,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
              <Grid container rowSpacing={2} columnSpacing={1}>
                  <Grid item xs={6}>
                      <TextField 
                        className={classes.input} 
                        label="Sub Project ID" 
                        name="subProjectId" 
                        onChange={this.handleChangeSid} 
                        value={this.state.subProjectId} 
                        disabled={this.state.selectedId > -1} 
                        error={
                         (this.state.regSid === null) ? false :
                         (this.state.regSid) ? false : true 
                        } 
                        helperText={
                          (this.state.regSid === null) ? false :
                          (this.state.regSid) ? false : "알파벳, 숫자, -, _ 만 사용 가능합니다.(4~20자)"
                        } 
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField 
                        className={classes.input} 
                        label="Topic ID" 
                        name="topicId" 
                        onChange={this.handleChangeTid} 
                        value={this.state.topicId} 
                        disabled={this.state.selectedId > -1} 
                        error={
                          (this.state.regTid === null) ? false :
                          (this.state.regTid) ? false : true 
                        } 
                        helperText={
                          (this.state.regTid === null) ? false :
                          (this.state.regTid) ? false : "알파벳, 숫자, -, _ 만 사용 가능합니다.(4~20자)"
                        } 
                      />
                  </Grid>
                  
                  <Grid height={150} item xs={12}>
                      <TextField 
                        className={classes.input} 
                        label="Description" 
                        multiline 
                        rows={4} 
                        name="description" 
                        onChange={this.handleChangeDesc} 
                        value={this.state.description} 
                        disabled={this.state.selectedId > -1} 
                        error={
                          (this.state.regDes === null) ? false :
                          (this.state.regDes) ? false : true 
                        } 
                        helperText={
                          (this.state.regDes === null) ? false :
                          (this.state.regDes) ? false : "2~200자까지 가능합니다."
                        } 
                      />
                  </Grid>

                  <Grid item xs={4}>
                      <Button className={classes.button} variant="contained" onClick={this.onSubmit}>Create</Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button className={classes.button} variant="contained" onClick={this.onCancle}>Cancle</Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button className={classes.button} variant="contained" onClick={this.deleteRow}>Delete</Button>
                  </Grid>
              </Grid>

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
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Netconfig);
