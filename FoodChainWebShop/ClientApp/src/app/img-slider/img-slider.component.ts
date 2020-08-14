import { Component, OnInit, Input } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.scss']
})
export class ImgSliderComponent implements OnInit {

  @Input('imgList') imgList: string[];
  swiper: Swiper;
  constructor() { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      // loop: true,
      slidesPerView: 1,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }

  ngOnInit() { }

}
