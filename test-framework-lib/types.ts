export interface CustomerAppApi {
    name: string;
    timestamp: number;
    customers: Array<Customer>
}

export interface Customer {
    id: number;
    name: string;
    employees: number;
    contactInfo: ContactInfo;
    size: number;
}

export interface ContactInfo { 
    name: string;
    email: string;
}
