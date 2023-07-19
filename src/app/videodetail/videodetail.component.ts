import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-videodetail',
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit{

  constructor(private route: ActivatedRoute,private service:SharedServiceService) {}
  selectedVideo:any;
  //url="http://127.0.0.1:8000/";
  url="https://backend.kbl-developement.de/"
  id:any="";


  ngOnInit(): void {
    this.service.token=localStorage.getItem('token')
    this.service.updateHeadLogText()
    this.getDataFromServer();
    
}

getDataFromServer(): void {
  this.getVideosFromServer().then(data => {
    this.selectedVideo = data;
  });
}


async getVideosFromServer(){
  this.id = await this.route.snapshot.paramMap.get('id');
  //let url="http://127.0.0.1:8000/"
  let response= await fetch(this.url + "videos/"+this.id,{
    method: "GET",
    headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",Authorization:this.service.token
  },
  //mode: "cors",
})
  let json=await response.json()
  return json
 } 

getFile(size:any){
  let s=parseFloat(size)
  let selectedFile=this.selectedVideo['file_'+s]
  this.selectedVideo.file=selectedFile;
}

getVideoSource(): string {
  return 'https://backend.kbl-developement.de' + this.selectedVideo['file'];
}

}
