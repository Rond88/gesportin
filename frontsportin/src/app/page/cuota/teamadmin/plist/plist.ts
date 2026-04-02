import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaTeamadminPlist } from '../../../../component/cuota/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { EquipoService } from '../../../../service/equipo';

@Component({
  selector: 'app-cuota-teamadmin-plist-page',
  imports: [CuotaTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CuotaTeamadminPlistPage implements OnInit {
  id_equipo = signal<number | undefined>(undefined);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos', route: '/equipo/teamadmin' },
    { label: 'Cuotas' },
  ]);

  constructor(private route: ActivatedRoute, private equipoService: EquipoService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_equipo');
    if (idParam) {
      const id = Number(idParam);
      this.id_equipo.set(id);
      this.equipoService.get(id).subscribe({
        next: (equipo) => {
          const cat = equipo.categoria;
          const temp = cat?.temporada;
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
          ];
          if (temp?.club) {
            items.push({ label: temp.club.nombre, route: `/club/teamadmin/view/${temp.club.id}` });
          }
          items.push({ label: 'Temporadas', route: '/temporada/teamadmin' });
          if (temp) {
            items.push({ label: temp.descripcion, route: `/temporada/teamadmin/view/${temp.id}` });
          }
          if (cat) {
            items.push({
              label: 'Categorías',
              route: temp ? `/categoria/teamadmin/temporada/${temp.id}` : '/categoria/teamadmin',
            });
            items.push({ label: cat.nombre!, route: `/categoria/teamadmin/view/${cat.id}` });
          } else {
            items.push({ label: 'Categorías', route: '/categoria/teamadmin' });
          }
          items.push({ label: 'Equipos', route: cat ? `/equipo/teamadmin/categoria/${cat.id}` : '/equipo/teamadmin' });
          items.push({ label: equipo.nombre!, route: `/equipo/teamadmin/view/${equipo.id}` });
          items.push({ label: 'Cuotas' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
