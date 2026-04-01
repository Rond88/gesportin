import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaTeamadminPlist } from '../../../../component/temporada/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-temporada-teamadmin-plist-page',
  imports: [TemporadaTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class TemporadaTeamadminPlistPage {
  id_club = signal<number>(0);
  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas' },
  ]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_club');
    if (idParam) {
      this.id_club.set(Number(idParam));
    }
  }
}
