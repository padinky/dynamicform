export interface FormData {
    fieldName: string;
    type: string;
    value: any;
    options: string[];
}

export interface ApiData {
    success: boolean;
    message: string;
    data: FormData[];
}

export interface InputProps {
    data : FormData;
    onChangeHandler : (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled : boolean;
    label : string;
}

export interface EnvStruct {
    api_url : string;
}

