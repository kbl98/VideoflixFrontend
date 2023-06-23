import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  allVideos:any=[];

  


  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer(): void {
    this.getVideosFromServer().then(data => {
      console.log(data);
      this.allVideos = data;
    });
  }

  async getVideosFromServer(){
    let url="http://127.0.0.1:8000/"
    let response= await fetch(url + "videos/",{
      method: "GET",
      headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    mode: "cors",})
    let json=await response.json()
    return json
   } 

}
