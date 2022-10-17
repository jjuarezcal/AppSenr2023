import { Component, OnInit } from '@angular/core';

import { NewsService, InformacionService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(public _ns: NewsService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
  }
  enviarDetalles(news) {
    this.route.snapshot.paramMap.getAll(news);
    this.router.navigateByUrl('/newsdetail/' + news.id);
  }

}
