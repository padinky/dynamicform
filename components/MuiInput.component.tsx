import { TextField, Select, MenuItem } from "@mui/material";
import { InputProps } from '../types';

export const MuiInputText: React.FC<InputProps> = ({data, onChangeHandler, isDisabled, label}) => {
    return (
        <TextField name={data.fieldName} style={{width:700}} label={label} value={data.value} onChange={onChangeHandler} disabled={isDisabled}></TextField>
    )
}

export const MuiInputNumber: React.FC<InputProps> = ({data, onChangeHandler, isDisabled, label}) => {
    return (
        <TextField name={data.fieldName} style={{width:700}} label={label} type='number' value={data.value} onChange={onChangeHandler} disabled={isDisabled} ></TextField>
    )
}

export const MuiInputMultiline: React.FC<InputProps> = ({data, onChangeHandler, isDisabled, label}) => {
    return (
        <TextField name={data.fieldName} style={{width:700}} multiline={true} rows={7} label={label} value={data.value} onChange={onChangeHandler} disabled={isDisabled} ></TextField>
    )
}

export const MuiInputSelect: React.FC<InputProps> = ({data, onChangeHandler, isDisabled, label}) => {
    return (
        <TextField name={data.fieldName} select style={{width:700}} value={data.value} label={label} onChange={onChangeHandler} disabled={isDisabled}>
            {
                data.options.map((opt)=>{
                    return(
                        <MenuItem value={opt} key={opt}>{opt}</MenuItem>
                    )
                })
            }
        </TextField>
    )
}

export const MuiInputEmail: React.FC<InputProps> = ({data, onChangeHandler, isDisabled, label}) => {
    return (
        <TextField name={data.fieldName} style={{width:700}} value={data.value} label={label} type='Email' onChange={onChangeHandler} disabled={isDisabled} ></TextField>
    )
}