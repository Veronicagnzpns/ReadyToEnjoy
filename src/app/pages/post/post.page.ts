import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  photos: string[]= [];

  constructor(
    private postService: PostService
  ) {
    this.photos = this.postService.photos;
   }

  ngOnInit() {
  }

  async takePhoto(){
    await this.postService.addNewPhoto();
  }

}
