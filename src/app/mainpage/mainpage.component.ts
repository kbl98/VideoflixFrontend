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
  

  


  ngOnInit(): void {
    this.service.token=localStorage.getItem('token')
    this.service.updateHeadLogText();
    this.getDataFromServer();
    
    console.log(this.service.token)
  }

  getDataFromServer(): void {
    this.getVideosFromServer().then(data => {
      console.log(data);
      this.allVideos = data;
      console.log(this.allVideos)
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
    mode: "cors",})
    let json=await response.json()
    console.log(json)
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
    console.log(json)
    return json
   } 
   
showDetail(id:any){
  this.router.navigateByUrl('detail/'+id)
 
}
}
