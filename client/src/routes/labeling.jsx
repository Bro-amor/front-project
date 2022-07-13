import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { FormControl } from '@mui/material';
import axios from 'axios';

import * as mnode from "../components/nodelibrary";

const styles = theme => ({
  root: {
    width: '100%',
    minwidth: 1080
  },
  paper: {
    margin: 80
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  dataGrid: {
    marginTop: 20,
    width: '100%',
  },
  grid: {
    marginBottom: 20
  }
});

const columns = [
  { field: 'value', headerName: 'value', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'background', headerName: 'background', flex: 1, headerClassName: 'super-app-theme--header' }
];








class Labeling extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      background: "",
      property: [
        // {'id':1, value:"Airplane", background:"green"},
        // {'id':5, value:"Car", background:"blue"},
        // {'id':7, value:"Building", background:"red"},
      ],
      selected: -1,
      regVal: null,
      regBack: null,
      template: -1,
      html: "",
      labelingName: "",
      regLavel: null,
      labeling: [],
    }
  };
  
  
  
  
  
  
  componentDidMount() {
    this.getSampleHtml();
  }
  
  getSampleHtml = async() => {
    const res = await axios.get('/api/dataSample');
    this.setState({ html: res.data });
  }
  
  postHtml = async() => {
    axios.post('/api/dataHtml', this.state.labeling.at(-1).html, {'Content-Type': 'text/xml'});
  }
  
  postProperty = async() => {
    axios.post('/api/dataProperty', this.state.labeling.at(-1), {'Content-Type': 'text/csv'});
  }
  
  saveFile = () => {
    let fileName = `${mnode.PATH}/${this.state.labeling.at(-1).labelingName}.xml`;

    const config = {
      headers: { "Content-Type": "application/json" } 
    }
    axios
      .post(`${mnode.MY_SERVER}/fileSave?fileName=${fileName}`, { file: this.state.labeling.at(-1).html }, config)
      .then((response) => {
        if(response.status == 200) {
          mnode.getFileFolderList(`${mnode.PATH}`, "xml")
        }
      });

      alert(`${this.state.labeling.at(-1).labelingName} 파일이 ${fileName}에 저장되었습니다.`);
      return;
  }

  regValChk = () => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9]{1,20}$/);
    this.setState({
      regVal: regexp1.test(this.state.value)
    });
  }
  regBackChk = () => {
    const regexp1 = new RegExp(/^[0-9]{6}$/);
    this.setState({
      regBack: regexp1.test(this.state.background)
    });
  }
  regLabelChk = () => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9_-]{1,20}$/);
    this.setState({
      regLavel: regexp1.test(this.state.labelingName)
    });
  }

  onSubmit = () => {
    if(this.state.value == "" || this.state.background == "") {
      alert("value, background 를 모두 입력해주세요.");
    }
    if(this.state.selected != -1) {
      alert("CANCLE 버튼을 눌러 선택을 취소하고 생성해주세요.");
    }
    if(this.state.selected == -1 && this.state.regVal && this.state.regBack) {
      const property = this.state.property.at(-1);
      let id = 0;

      if(property) {
        id = Number(property.id)+1;
      }
  
      const temp_data = {
        id: id,
        value: this.state.value, 
        background: "#"+this.state.background
      };

      this.setState({
        value: "",
        background: "",
        property: this.state.property.concat(temp_data),
        regVal: null,
        regBack: null,
        // html: "",
        html: this.state.html,
        // template: -1
      }, () => this.setHtml());
    }
  }

  onLabelingSubmit = () => {
    if(this.state.labelingName == "") {
      alert("Labeling 이름을 입력해주세요.");
    }
    if(this.state.template == -1) {
      alert("Labeling Template을 선택해주세요.");
    }
    if(this.state.property.length == 0) {
      alert("value를 생성하고 저장해주세요.")
    }
    const existResult = this.state.labeling.some(item => item.labelingName == this.state.labelingName);
    if(existResult) {
      alert("이미 존재하는 Labeling 이름 입니다.")
    }
    if(this.state.labelingName != "" && this.state.regLavel && this.state.template > -1 && this.state.property.length > 0 && existResult != true) {

      const temp_data = {
        labelingName: this.state.labelingName,
        property: this.state.property,
        template: this.state.template,
        html: this.state.html,
      };
        
      this.setState({
        labeling: this.state.labeling.concat(temp_data),
        labelingName: "",
        html: "",
        template: -1
      }, () => {
        this.postHtml();
        this.postProperty();
        this.saveFile();
      });
    }
  }

  handleChangeVal = (e) => {
    this.setState({
        value: e.target.value
    }, () => this.regValChk());
  };
  handleChangeBack = (e) => {
    this.setState({
        background: e.target.value
    }, () => this.regBackChk());
  };
  handleChangeLabel = (e) => {
    this.setState({
        labelingName: e.target.value
    }, () => this.regLabelChk());
  };

  selectedHandler = (ids) => {
    if(ids.length > 0){
      const selected = this.state.property.filter(row => row.id == ids[0])[0]
      
      this.setState({
        selected: selected.id,
        value: selected.value,
        background: selected.background
      });
    }
  };

  deleteRow = () => {
    if(this.state.selected > -1) {
      const remain = this.state.property.filter(row => row.id != this.state.selected)
      this.setState({
        property: remain,
        value: "",
        background: "",
        selected: -1,
        html: this.state.html,
      }, () => this.setHtml());
    }
  };

  onCancle = () => {
    this.setState({
      value: "",
      background: "",
      selected: -1,
      regVal: null,
      regBack: null
    });
  }

  onCancleLabelName = () => {
    this.setState({
      labelingName: "",
      regLavel: null
    });
  }

  setHtml = () => {
    let tag = [];
    let html = "";
    let value = [];
    let backgroud = [];

    this.setState({
        property: this.state.property
    });

    this.state.property.forEach(element => {
        value = value.concat(element.value);
        backgroud = backgroud.concat(element.background);
    });

    if(this.state.template == 0) {
        tag = ["Choices", "Choice", "choice"];
    }
    else if(this.state.template == 1) {
        tag = ["RectangleLabels", "Label", "label"];
    }

    if(this.state.template == 0 || this.state.template == 1) {
        for (let i=0; i<value.length; i++) {
            const temp_html = [];
            temp_html[i] = `<${tag[1]} value='${value[i]}' background='${backgroud[i]}' />`;
            if(i == value.length - 1) {
                html += `        ${temp_html[i]}\n    `;    
            }else {
                html += `        ${temp_html[i]}\n    `;
            }
        }
        html = `<View>\n    <Image name="image" value="$image"/>\n    <${tag[0]} name="${tag[2]}" toName="image">\n    ${html}</${tag[0]}>\n</View>`;
    
        this.setState({
            html: html
        });
    }else {
        this.setState({
            html: ""
        });
    }
  }

  onNativeSelectChange = (e) => {
    this.setState({
        template: e.target.value,
        sampleHtml: ""
    }, () => this.setHtml());
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={6}>
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={6}>
                            <TextField 
                                className={classes.input} 
                                label="value" 
                                name="value" 
                                onChange={this.handleChangeVal} 
                                value={this.state.value} 
                                disabled={this.state.selected > -1} 
                                error={
                                    (this.state.regVal == null) ? false :
                                    (this.state.regVal) ? false : true 
                                } 
                                helperText={
                                    (this.state.regVal == null) ? false :
                                    (this.state.regVal) ? false : "알파벳, 숫자만 사용 가능합니다.(1~20자)"
                                } 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                className={classes.input} 
                                label="background" 
                                name="background" 
                                onChange={this.handleChangeBack} 
                                value={this.state.background} 
                                disabled={this.state.selected > -1} 
                                error={
                                    (this.state.regBack == null) ? false :
                                    (this.state.regBack) ? false : true 
                                } 
                                helperText={
                                    (this.state.regBack == null) ? false :
                                    (this.state.regBack) ? false : "숫자 6자리로 입력해주세요."
                                } 
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
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
              
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={12}>
                            <div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', height: 400 }}>
                                    <div style={{ flexGrow: 1 }}> 
                                        <DataGrid
                                            style={{display: 'flex'}}
                                            className={classes.dataGrid}
                                            rows={this.state.property}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            onSelectionModelChange={this.selectedHandler}
                                            hideFooterSelectedRowCount
                                            sx={{
                                                '& .super-app-theme--header': {
                                                    backgroundColor: '#e7e7e7',
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>         
                        </Grid>
                    </Grid>
                
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    labeling template
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={this.state.template}
                                    inputProps={{
                                        name: 'template',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={this.onNativeSelectChange}
                                >
                                    <option value={-1}>template을 선택하세요.</option>
                                    <option value={0}>Image classification</option>
                                    <option value={1}>Bbox object detection</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={12}>
                            <TextField 
                                className={classes.input}
                                // label="html" 
                                multiline 
                                rows={10} 
                                name="html" 
                                defaultValue={this.state.html}
                                disabled
                                // onChange={this.onValChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={12}>
                            <TextField 
                                className={classes.input} 
                                label="Labeling Name" 
                                name="labelingName"
                                onChange={this.handleChangeLabel} 
                                value={this.state.labelingName} 
                                error={
                                    (this.state.regLavel == null) ? false :
                                    (this.state.regLavel) ? false : true 
                                } 
                                helperText={
                                    (this.state.regLavel == null) ? false :
                                    (this.state.regLavel) ? false : "알파벳, 숫자, -, _ 만 사용 가능합니다.(1~20자)"
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                        <Grid item xs={6}>
                            <Button className={classes.button} variant="contained" onClick={this.onLabelingSubmit}>Save</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.button} variant="contained" onClick={this.onCancleLabelName}>Cancle</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Labeling);
