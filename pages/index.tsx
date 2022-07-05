import * as React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import * as Input from '../components/MuiInput.component';
import { FormData, ApiData, EnvStruct } from '../types';

const renderInput = (data: FormData, onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void, isDisabled: boolean ) => {
  switch(data.type) {
    default:
      return <Input.MuiInputText data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
    case 'text':
      return <Input.MuiInputText data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
    case 'number':
      return <Input.MuiInputNumber data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
    case 'multiline':
      return <Input.MuiInputMultiline data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
    case 'select':
      return <Input.MuiInputSelect data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
    case 'email':
      return <Input.MuiInputEmail data={data} onChangeHandler={onChangeHandler} isDisabled={isDisabled} label={camelToSpaces(data.fieldName)} />
  }
}

const camelToSpaces = (txt: string): string => { 
  var result = txt.replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult
}

const Home: NextPage<EnvStruct> = (env) => {
  // console.log("PROPS == ",env);
  const datas: Array<FormData> = []
  const [formValues, setFormValues] = React.useState<FormData[]>(datas);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isDisabled, setDisabled] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [showResponseServer, setShowResponseServer] = React.useState<boolean>(false);
  const [snackbarText, setSnackbarText] = React.useState<string>('');
  const [postDataResult, setPostDataResult] = React.useState<any>(null);

  React.useEffect(() => {
    setLoading(true);
    try{
    fetch(env.api_url)
      .then((res) => res.json())
      .then((d) => {
        // console.log("client fetch===",d);
        const parseResp: ApiData = JSON.parse(JSON.stringify(d));
        setFormValues(parseResp.data)
        setLoading(false)
        setSnackbarText(parseResp.message)
        setShowSnackbar(true)
      })
    } catch (err) {
      alert ("Error occured, please contact your app owner!");
      console.log(err);
    }
  },[])

  if (isLoading) return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )



  const postData = () => {
    const payload: {[key: string]: any} = {}
    formValues.map((d)=>{
      return payload[d.fieldName] = d.value
    })
    // console.log("payload=== ",payload)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
    };
    // console.log(requestOptions);
    setDisabled(true);
    fetch(env.api_url, requestOptions)
        .then(response => response.json())
        .then((d)=>{
          const parseResp: ApiData = JSON.parse(JSON.stringify(d));
          setPostDataResult(JSON.stringify(d));
          setSnackbarText(parseResp.message);
          setShowSnackbar(true);
          setShowResponseServer(true);
          setDisabled(false);
        })
  }

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log("on change from ==> ",e)
    const fieldName = e.target.name;
    const newValue = e.target.value;

    const newDatas: Array<FormData> = []
    formValues.map((d)=>{
      if (d.fieldName === fieldName)  {
        d.value = newValue;
      }
      return newDatas.push(d);
    })

    setFormValues(newDatas);

    // console.log("state after change ===",formValues);
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  }

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Dynamic Form</h1>
        <form onSubmit={submitHandler}>
            <Stack spacing={4}>
            {
              formValues.map((d) => {
                // console.log("each data == ",d);
                return (
                    <div key={d.fieldName}>
                      {renderInput(d, handleForm, isDisabled)}
                    </div>
                )
              }
              )
            }
            <Button variant="contained" onClick={postData} disabled={isDisabled}>Save Data</Button>
            </Stack>
        </form>
        <br /><br />
        <Collapse in={showResponseServer}>
          <Alert 
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowResponseServer(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Response from Server:</AlertTitle>
            <code>{postDataResult}</code>
          </Alert>
        </Collapse>
        
        <Snackbar anchorOrigin={{vertical:'top',horizontal:'right'}} open={showSnackbar} autoHideDuration={2000} onClose={()=>{setShowSnackbar(false)}}>
          <Alert variant='filled' severity="success" sx={{ width: '100%' }}>
            {snackbarText}
          </Alert>
        </Snackbar>
      </Box>
    </Container>

  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: 
    {
      api_url: process.env.API_URL?.toString(),
    }
  }
}

export default Home;