import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  posts = [];
  getDate = d => new Date(d).toLocaleString();
  ngOnInit() {
    this.http
      .post<any>(
        'https://cn-east-1.baasapi.com/',
        {
          appId: 'qinglin-simple-blog',
          api: 'getManyPost',
          version: 'v1',
          args: {}
        },
        {
          headers: {
            envid: 'yorhcDIFv2VLKyKE5YRa-', // 替换为你的环境ID
            keyid: 'frDo9pCfewCfBQ93otisA' // 替换为上面环境的密匙ID
          }
        }
      )
      .subscribe(data => (this.posts = data.posts.data));
  }
}
