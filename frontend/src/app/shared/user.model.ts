export class User {
    fullName: string;
    email:string;
    password:string;
    ipaddress:string;
    mobileNo: string;
    userType: string;
}

export class Contact {
    fullName: string;
    email:string;
    subject:string;
    ipaddress:string;
    mobileNo: string;
    message: string;
}

export class AddLink{
    category: string;
    url: string;
    label: string;
}

export class AddNotification{
    idNo:number;
    description: string;
    date: number;
}

