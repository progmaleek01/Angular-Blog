import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  postData;
  category;
  similarPosts;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // this.postService.countViews(id);
      this.postService.loadSingleData(id).subscribe((val) => {
        this.postData = val;
        this.loadSimilarPosts(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPosts(id) {
    this.postService.loadSimilar(id).subscribe((data) => {
      this.similarPosts = data;
    });
  }
}
