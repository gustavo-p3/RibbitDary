import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @HostBinding('class') classes = 'row';
  usuario: any = [];

  constructor(private proyectsService: ProyectsService,
    private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {

  }
}
