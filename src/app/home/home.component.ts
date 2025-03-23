import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _MoviesService:MoviesService ){}
  trendingMovies:any[]=[];
  trendingTv:any[]=[];
  trendingPeople:any[]=[];
  term:string='';

  ngOnInit(): void {
   this._MoviesService.getTrending('movie').subscribe({
    next:(data)=> this.trendingMovies=data.results.slice(0,10)
   })

   this._MoviesService.getTrending('tv').subscribe({
    next:(data)=> this.trendingTv=data.results.slice(0,10)
   })

   this._MoviesService.getTrending('person').subscribe({
    next:(data)=> this.trendingPeople=data.results.filter((item:any)=>item.profile_path !==null).slice(0,10)
   })
    
  }

}
