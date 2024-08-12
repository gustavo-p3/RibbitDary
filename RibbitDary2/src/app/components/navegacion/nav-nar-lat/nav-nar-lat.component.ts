import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
@Component({
  selector: 'app-nav-nar-lat',
  templateUrl: './nav-nar-lat.component.html',
  styleUrl: './nav-nar-lat.component.css'
})
export class NavNarLatComponent {
  @HostBinding('class') classes = 'row';
  usuario: any = [];

  constructor(private proyectsService: ProyectsService,
    private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {

  }


}
