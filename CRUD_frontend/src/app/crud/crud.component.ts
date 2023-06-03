import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent {
  array : any[] = [];
  isResultloaded = false;
  isUpdateFormActive = false;

  name: string = "";
  mobileNumber: string = "";
  gender: string = "";
  age: string = "";
  currentID = "";

  constructor(private http: HttpClient)
  {
    this.getAllDetails();
  }

  ngOnInit(): void{}

  getAllDetails()
  {
    this.http.get("http://localhost:8808/api/table1/").subscribe((resultData: any) => {
      this.isResultloaded = true;
      console.log(resultData.data);
      this.array = resultData.data;
    });
  }

  register()
  {
    let bodyData = {
      "name" : this.name,
      "mobileNumber" : this.mobileNumber,
      "gender" : this.gender,
      "age" : this.age
    };
  
    this.http.post("http://localhost:8808/api/table1/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registered Successfully")
        this.getAllDetails();
      this.name = '';
      this.mobileNumber  = '';
      this.gender = '';
      this.age = '';
    });
  }
 
  setUpdate(data: any)
  {
   this.name = data.name;
   this.mobileNumber = data.mobileNumber;
   this.gender = data.gender;
   this.age = data.age;
  
 
   this.currentID = data.id;
  }
 
  updateRecords()
  {
    let bodyData =
    {
      "name" : this.name,
      "mobileNumber" : this.mobileNumber,
      "gender" : this.gender,
      "age" : this.age,
    };
    
    this.http.put("http://localhost:8808/api/table1/update"+ "/"+ this.currentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Updateddd")
        this.getAllDetails();
      
    });
  }
  save()
  {
    if(this.currentID == '')
    {
        this.register();
    }
      else
      {
       this.updateRecords();
      }      
 
  }
 
 
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8808/api/table1/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Deletedddd")
        this.getAllDetails();
    });
  }

}
