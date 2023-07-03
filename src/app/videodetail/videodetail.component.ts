import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videodetail',
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}
  selectedVideo:any;
  url="http://127.0.0.1:8000/";
  id:any="";


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDataFromServer();
    
}

getDataFromServer(): void {
  this.getVideosFromServer().then(data => {
    console.log(data);
    this.selectedVideo = data;
    console.log(this.selectedVideo)
  });
}


async getVideosFromServer(){
  //let url="http://127.0.0.1:8000/"
  let response= await fetch(this.url + "videos/"+this.id,{
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



}
