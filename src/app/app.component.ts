import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICat } from './interface/icat';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cat Finger Test';
  tags: string[] = [];
  selectedTags: string[] = [];
  cats: ICat[] = [];
  catModal: any;
  limit = 100;

  constructor(private api: ApiService, private modalService: NgbModal) {
    this.getTags();
  }

  getTags() {
    this.api.getTags().subscribe(res => {
      this.tags = res;
    });
  }

  onChangesTags() {
    try {
      if (this.selectedTags?.length) {
        this.api.getCats(this.selectedTags, this.limit).subscribe(res => {
          this.cats = res.map(obj => {
            obj.created_at = new Date(obj.created_at);
            return obj;
          });
        });
      } else {
        this.cats = [];
      }
    } catch (e) {}
  }

  openModal(content: any, cat: any) {
    this.catModal = cat;
    this.modalService.open(content, { size: 'xl', centered: true});
  }

}
