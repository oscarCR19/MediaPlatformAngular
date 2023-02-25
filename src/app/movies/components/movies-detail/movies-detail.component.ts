import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies/movies.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MoviesDetailComponent implements OnInit {
  public safeURL!: SafeResourceUrl;
  
  movieDetails: any;
  movieVideos: any;
  videoId!: string;
  movieId!: number;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService,private _sanitizer: DomSanitizer) { 
    
   
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.loadMovieDetail(this.movieId);  
      this.loadMovieVideos(this.movieId);
       
    });
  }

   loadMovieVideos(movieId: number){
    this.moviesService.getMovieVideos(movieId)
      .subscribe(
        (data: any) => {
          this.movieVideos = data.results;
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.movieVideos[0].key+'');      
        }
      );
  }

  loadMovieDetail(movieId: number){
    this.moviesService.getMovieDetail(movieId)
      .subscribe(
        (data: any) => {
          this.movieDetails = data; 
          
        }
      );      
  }



}
