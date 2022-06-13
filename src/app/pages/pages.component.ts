import { Component, OnInit } from '@angular/core';
declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector("#theme");


  ngOnInit(): void {

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
    customInitFunctions()

  }

  year = new Date().getFullYear();

}
