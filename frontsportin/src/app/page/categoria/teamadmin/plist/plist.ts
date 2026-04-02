import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaTeamadminPlist } from '../../../../component/categoria/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { TemporadaService } from '../../../../service/temporada';

@Component({
  selector: 'app-categoria-teamadmin-plist-page',
  imports: [CategoriaTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CategoriaTeamadminPlistPage implements OnInit {
  id_temporada = signal<number>(0);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías' },
  ]);

  constructor(private route: ActivatedRoute, private temporadaService: TemporadaService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_temporada');
    if (idParam) {
      this.id_temporada.set(Number(idParam));
      this.temporadaService.get(this.id_temporada()).subscribe({
        next: (temp) => {
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
          ];
          if (temp.club) {
            items.push({ label: temp.club.nombre, route: `/club/teamadmin/view/${temp.club.id}` });
          }
          items.push({ label: 'Temporadas', route: '/temporada/teamadmin' });
          items.push({ label: temp.descripcion, route: `/temporada/teamadmin/view/${temp.id}` });
          items.push({ label: 'Categorías' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
