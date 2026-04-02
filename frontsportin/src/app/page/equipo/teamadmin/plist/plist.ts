import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoTeamadminPlist } from '../../../../component/equipo/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { CategoriaService } from '../../../../service/categoria';

@Component({
  selector: 'app-equipo-teamadmin-plist-page',
  imports: [EquipoTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class EquipoTeamadminPlistPage implements OnInit {
  id_categoria = signal<number>(0);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos' },
  ]);

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_categoria');
    if (idParam) {
      this.id_categoria.set(Number(idParam));
      this.categoriaService.get(this.id_categoria()).subscribe({
        next: (cat) => {
          const temp = cat.temporada;
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
          items.push({
            label: 'Categorías',
            route: temp ? `/categoria/teamadmin/temporada/${temp.id}` : '/categoria/teamadmin',
          });
          items.push({ label: cat.nombre!, route: `/categoria/teamadmin/view/${cat.id}` });
          items.push({ label: 'Equipos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
