import React, { useEffect, useState } from 'react';
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








function Labeling_copy(props) {

  const [value, setValue] = useState("");
  const [background, setBackground] = useState("");
  const [property, setProperty] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [regVal, setRegVal] = useState(null);
  const [regBack, setRegBack] = useState(null);
  const [template, setTemplate] = useState(-1);
  const [html, sethtml] = useState("");
  const [labelingName, setLabelingName] = useState("");
  const [regLabel, setRegLabel] = useState(null);
  const [labeling, setLabeling] = useState([]);
  
  // const getSampleHtml = async() => {
  //   const res = await axios.get('/api/dataSample');
  //   sethtml(res.data);
  // }
  
  // const postHtml = async() => {
  //   axios.post('/api/dataHtml', labeling.at(-1).html, {'Content-Type': 'text/xml'});
  // }
  
  // const postProperty = async() => {
  //   axios.post('/api/dataProperty', labeling.at(-1), {'Content-Type': 'text/csv'});
  // }
  
  const saveFile = () => {
    if(labeling.length > 0) {

      let fileName = `${mnode.PATH}/${labeling.at(-1).labelingName}.xml`;
      
      const config = {
        headers: { "Content-Type": "application/json" } 
      }
      axios
      .post(`${mnode.MY_SERVER}/fileSave?fileName=${fileName}`, { file: labeling.at(-1).html }, config)
      .then((response) => {
        if(response.status == 200) {
          mnode.getFileFolderList(`${mnode.PATH}`, "xml")
        }
      });
      
      alert(`${labeling.at(-1).labelingName} 파일이 ${fileName}에 저장되었습니다.`);
      return;
    }
  }

  const regValChk = (val) => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9]{1,20}$/);
    setRegVal(regexp1.test(value));
    return regexp1.test(val);
  }
  const regBackChk = (back) => {
    const regexp1 = new RegExp(/^[0-9]{6}$/);
    setRegBack(regexp1.test(background));
    return regexp1.test(back);
  }
  const regLabelChk = (lab) => {
    const regexp1 = new RegExp(/^[a-zA-Z0-9_-]{1,20}$/);
    setRegLabel(regexp1.test(labelingName));
    return regexp1.test(lab);
  }

  const onSubmit = () => {
    const temp_regVal = regValChk(value);
    // setRegVal(temp_regVal);
    const temp_regBack = regBackChk(background);
    // setRegVal(temp_regBack);
    console.log(regVal);
    if(value == "" || background == "") {
      alert("value, background 를 모두 입력해주세요.");
    }
    if(selected != -1) {
      alert("CANCLE 버튼을 눌러 선택을 취소하고 생성해주세요.");
    }
    if(selected == -1 && temp_regVal && temp_regBack) {
      const temp_property = property.at(-1);
      let id = 0;

      if(temp_property) {
        id = Number(temp_property.id)+1;
      }
  
      const temp_data = {
        id: id,
        value: value, 
        background: "#"+background
      };

      setValue("");
      setBackground("");
      // setProperty(property.concat(temp_data));
      setProperty((prevState) => [
        ...prevState,
        temp_data
      ]);
      // setRegVal(null);
      // setRegBack(null);
      sethtml(html);
    }
  }
  useEffect(() => {
    setHtml();
  }, [property]);

  const onLabelingSubmit = () => {
    const temp_regLab = regLabelChk(labelingName);
    // regLabelChk();
    if(labelingName == "") {
      alert("Labeling 이름을 입력해주세요.");
    }
    if(template == -1) {
      alert("Labeling Template을 선택해주세요.");
    }
    if(property.length == 0) {
      alert("value를 생성하고 저장해주세요.")
    }
    const existResult = labeling.some(item => item.labelingName == labelingName);
    if(existResult) {
      alert("이미 존재하는 Labeling 이름 입니다.")
    }
    if(labelingName != "" && temp_regLab && template > -1 && property.length > 0 && existResult != true) {

      const temp_data = {
        labelingName: labelingName,
        property: property,
        template: template,
        html: html,
      };
        
      setLabeling(labeling.concat(temp_data));
      setLabelingName("");
      sethtml("");
      setTemplate(-1);

      // useEffect(() => {
      //   postHtml();
      //   postProperty();
      //   saveFile();
      // }, [html]);
    }
  }
  useEffect(() => {
    saveFile();
  }, [labeling]);

  const handleChangeVal = (e) => {
    setValue(e.target.value);
  };

  const handleChangeBack = (e) => {
    setBackground(e.target.value);
  };

  const handleChangeLabel = (e) => {
    setLabelingName(e.target.value);
  };

  const selectedHandler = (ids) => {
    if(ids.length > 0){
      const selected = property.filter(row => row.id == ids[0])[0]
      
      setSelected(selected.id);
      setValue(selected.value);
      setBackground(selected.background);
    }
  };

  const deleteRow = () => {
    if(selected > -1) {
      const remain = property.filter(row => row.id != selected);

      setProperty(remain);
      setValue("");
      setBackground("");
      setSelected(-1);
      sethtml(html);

      // useEffect(() => {
      //   setHtml();
      // }, [html]);
    }
  };

  const onCancle = () => {
    setValue("");
    setBackground("");
    setSelected(-1);
    setRegVal(null);
    setRegBack(null);
  }

  const onCancleLabelName = () => {
    setLabelingName("");
    setRegLabel(null);
  }

  const setHtml = () => {
    let tag = [];
    let html = "";
    let value = [];
    let backgroud = [];

    // setProperty(property);

    property.forEach(element => {
        value = value.concat(element.value);
        backgroud = backgroud.concat(element.background);
    });

    if(template == 0) {
        tag = ["Choices", "Choice", "choice"];
    }
    else if(template == 1) {
        tag = ["RectangleLabels", "Label", "label"];
    }

    if(template == 0 || template == 1) {
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
    
        sethtml(html);
    }else {
      sethtml("");
    }
  }

  const onNativeSelectChange = (e) => {
    setTemplate(e.target.value);

    // useEffect(() => {
    //   setHtml();
    // }, [template]);
  }
  useEffect(() => {
    setHtml();
  }, [template]);


  const { classes } = props;
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
                              onChange={handleChangeVal} 
                              value={value} 
                              disabled={selected > -1} 
                              error={
                                  (regVal == null) ? false :
                                  (regVal) ? false : true 
                              } 
                              helperText={
                                  (regVal == null) ? false :
                                  (regVal) ? false : "알파벳, 숫자만 사용 가능합니다.(1~20자)"
                              } 
                          />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField 
                              className={classes.input} 
                              label="background" 
                              name="background" 
                              onChange={handleChangeBack} 
                              value={background} 
                              disabled={selected > -1} 
                              error={
                                  (regBack == null) ? false :
                                  (regBack) ? false : true 
                              } 
                              helperText={
                                  (regBack == null) ? false :
                                  (regBack) ? false : "숫자 6자리로 입력해주세요."
                              } 
                          />
                      </Grid>
                  </Grid>
                  
                  <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                      <Grid item xs={4}>
                          <Button className={classes.button} variant="contained" onClick={onSubmit}>Create</Button>
                      </Grid>
                      <Grid item xs={4}>
                          <Button className={classes.button} variant="contained" onClick={onCancle}>Cancle</Button>
                      </Grid>
                      <Grid item xs={4}>
                          <Button className={classes.button} variant="contained" onClick={deleteRow}>Delete</Button>
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
                                          rows={property}
                                          columns={columns}
                                          pageSize={5}
                                          rowsPerPageOptions={[5]}
                                          onSelectionModelChange={selectedHandler}
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
                                  defaultValue={template}
                                  inputProps={{
                                      name: 'template',
                                      id: 'uncontrolled-native',
                                  }}
                                  onChange={onNativeSelectChange}
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
                              defaultValue={html}
                              disabled
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
                              onChange={handleChangeLabel} 
                              value={labelingName} 
                              error={
                                  (regLabel == null) ? false :
                                  (regLabel) ? false : true 
                              } 
                              helperText={
                                  (regLabel == null) ? false :
                                  (regLabel) ? false : "알파벳, 숫자, -, _ 만 사용 가능합니다.(1~20자)"
                              }
                          />
                      </Grid>
                  </Grid>

                  <Grid container rowSpacing={2} columnSpacing={1} className={classes.grid}>
                      <Grid item xs={6}>
                          <Button className={classes.button} variant="contained" onClick={onLabelingSubmit}>Save</Button>
                      </Grid>
                      <Grid item xs={6}>
                          <Button className={classes.button} variant="contained" onClick={onCancleLabelName}>Cancle</Button>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Labeling_copy);
