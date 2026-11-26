export interface IUser{
    name:string;
    email:string;
    password:string;
    age?:number|null;
    is_active?:boolean;
}