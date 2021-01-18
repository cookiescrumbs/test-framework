const small = (numberOfEmployees: number) => {
    if( numberOfEmployees <= 10) {
        return 'Small';
    }
}

const medium = (numberOfEmployees: number) => {
    if ((numberOfEmployees > 10 && numberOfEmployees <= 1000)) { 
        return 'Medium'
    }
}

const big = (numberOfEmployees: number) => {
    if (numberOfEmployees > 1000) { 
        return 'Big'
    }
}

export const sizeOfCustomer = (numberOfEmployees: number) => {
    return small(numberOfEmployees) || medium(numberOfEmployees) || big(numberOfEmployees);
}


export const todaysDate = new Date().toDateString();
