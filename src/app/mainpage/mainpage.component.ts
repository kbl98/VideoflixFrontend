import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }
  allVideos:any=[];
  url:any="http://127.0.0.1:8000/"
  


  ngOnInit(): void {
    this.getDataFromServer();
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
    let response= await fetch(this.url + "videos/",{
      method: "GET",
      headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
    },
    mode: "cors",})
    let json=await response.json()
    console.log(json)
    return json
   } 
   
showDetail(){
  let videodetail:any=document.getElementById("video-detail");
  videodetail.style.display="unset"
}
}
