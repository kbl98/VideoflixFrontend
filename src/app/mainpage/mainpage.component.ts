import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router,private service:SharedServiceService) { }
  allVideos:any=[];
  //url:any="http://127.0.0.1:8000/"
  url:any="https://backend.kbl-developement.de/"
  
  videofile!: any;
  title!: string;
  description!: string;
  inputTitle: string = '';
  inputDescription: string = '';

  uploading: boolean = false;

  


  ngOnInit(): void {
    this.service.token=localStorage.getItem('token')
    this.service.updateHeadLogText();
    this.getDataFromServer();
  }

  getDataFromServer(): void {
    this.getVideosFromServer().then(data => {
      this.allVideos = data;
    });
  }

  async getVideosFromServer(){
    //let url="http://127.0.0.1:8000/"
    this.service.token=await localStorage.getItem('token')
    let response= await fetch(this.url + "videos/",{
      method: "GET",
      headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",Authorization:this.service.token
    },
   // mode: "cors",
  })
    let json=await response.json()
    return json
   } 


  

   async getDetailView(id:any){


    let response= await fetch(this.url + "videos/"+id,{
      method: "GET",
      headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",Authorization:this.service.token
    },
    mode: "cors",})
    let json=await response.json()
    return json
   } 
   
showDetail(id:any){
  this.router.navigateByUrl('detail/'+id)
 
}

/*onFileSelected(event: any) {
  if (event.target.files.length > 0) {
      this.videofile = event.target.files[0];
  }
}*/

onFileSelected(event: any) {
  const fileInput = event.target;
  this.videofile = fileInput.files[0]; // Save the selected file to your component's variable
}

async uploadVideo(){
  this.uploading = true;
  /*const data = {
    title:this.title,
    description:this.description,
    file:this.videofile
  }
  let body=JSON.stringify(data)
  
  console.log(data)*/
  
   const data=new FormData()
   data.append('title',this.title)
   data.append('description',this.description)
   data.append('file',this.videofile)
   console.log(this.videofile)
  
    this.service.token=await localStorage.getItem('token')
    let response= await fetch(this.url + "videos/",{
      method: "POST",
      headers: {
      //Accept: "application/json, text/plain, */*",
      //"Content-Type": "application/json",
      Authorization:this.service.token
    },
    body:data,
    //mode: "cors",
  }
    )
    let json=await response.json()
    let element:any=document.getElementById("upload-cont")
    element.style.display="none"
   } 

   toggleNone(){
    let element:any=document.getElementById("upload-cont")
    if(element.style.display=="none"){
        element.style.display="block"}
        else{
        element.style.display="none"
    }
   }
 
}

