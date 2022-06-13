import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo: string | undefined;
  public tituloSub$: Subscription | undefined;

  constructor(private router: Router) {
    this.getArgumentosRuta()
  }
  ngOnDestroy(): void {
    this.tituloSub$?.unsubscribe();
  }

  getArgumentosRuta() {
    this.tituloSub$ =  this.router.events
    .pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    )
    .subscribe(({titulo}) => {
      this.titulo = titulo;
    })
  }
}
