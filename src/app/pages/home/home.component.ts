import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  postArray;
  latestPostArray;
  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postService.loadData().subscribe((posts) => {
      this.postArray = posts;
    });

    this.postService.loadLatestPost().subscribe((posts) => {
      this.latestPostArray = posts;
    });
  }
}
