import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
private _addresses = new BehaviorSubject<any>([]);

get addresses() {
  return this._addresses.asObservable();
}

  constructor(){}

 async addAddress(fromData: any) {
  try{
    let addresses = this._addresses.value;
    if (addresses?.length == 0) {
      fromData = {...fromData, primary: true };
    }

    
      const address = {
        ...fromData,
        id: '1'
      };

     
      addresses = addresses.concat(address);
      this._addresses.next(addresses);

      return address;
  }   catch(e){
       throw(e);
  }
 }

 async getAddresses(){
  const dummyData = [ 
  {
  
    zipcode: '12345',
    address: '123 Main Street',
    house_no: 'A-1',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    save_as: 'Home',
    landmark: 'Near Central Park',
    primary: false
  },
  {
    
    zipcode: '54321',
    address: '456 Elm Street',
    house_no: 'B-2',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    save_as: 'Work',
    landmark: 'Downtown',
    primary: true
  },
  {
    
    zipcode: '67890',
    address: '789 Oak Street',
    house_no: 'C-3',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    save_as: 'Other',
    landmark: 'Near Lake Michigan',
    primary: false
  }
  ];
  this._addresses.next(dummyData);
  return dummyData;
 }
}


