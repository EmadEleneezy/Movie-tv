import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-moviedetails',
  standalone: false,
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css'
})
export class MoviedetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute,private _MoviesService:MoviesService ){}


  item:any;
  similarMovies:any []=[];
  mediaType: string ='';

  ngOnInit(): void {
  let {id,media_type}= this._ActivatedRoute.snapshot.params;
  this.mediaType=media_type;
    this._MoviesService.getItemDetails(id,media_type).subscribe({
      next:(data)=>this.item=data,

    })
    this._MoviesService.getSimilar(id,media_type).subscribe({
      next:(data)=>this.similarMovies=data.results.slice(0,6),

    })
} 
getSimilar(id:string ,media_type:string)
{
  this._MoviesService.getItemDetails(id,media_type).subscribe({
    next:(data)=>this.item=data,

  })
  this._MoviesService.getSimilar(id,media_type).subscribe({
    next:(data)=>this.similarMovies=data.results.slice(0,6),

  })
 
}
}
