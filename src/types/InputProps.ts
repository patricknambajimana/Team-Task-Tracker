

export type InputProps={
    label:string,
    name:string,
    value:string,
    error:string,
    placeholder?:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}