import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent {
  categoryPost;
  category;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.category = params.get('category');
      this.postService.loadCategoryPost(id).subscribe((val) => {
        this.categoryPost = val;
      });
    });
  }

  ngOnInit() {}
}
