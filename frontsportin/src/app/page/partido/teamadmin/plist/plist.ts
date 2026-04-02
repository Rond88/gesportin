import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoTeamadminPlist } from '../../../../component/partido/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { LigaService } from '../../../../service/liga';

@Component({
  selector: 'app-partido-teamadmin-plist-page',
  imports: [PartidoTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PartidoTeamadminPlistPage implements OnInit {
  id_liga = signal<number | undefined>(undefined);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos', route: '/equipo/teamadmin' },
    { label: 'Ligas', route: '/liga/teamadmin' },
    { label: 'Partidos' },
  ]);

  constructor(private route: ActivatedRoute, private ligaService: LigaService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_liga');
    if (idParam) {
      const id = Number(idParam);
      this.id_liga.set(id);
      this.ligaService.get(id).subscribe({
        next: (liga) => {
          const equipo = liga.equipo;
          const cat = equipo?.categoria;
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
          if (equipo) {
            items.push({ label: 'Equipos', route: cat ? `/equipo/teamadmin/categoria/${cat.id}` : '/equipo/teamadmin' });
            items.push({ label: equipo.nombre!, route: `/equipo/teamadmin/view/${equipo.id}` });
          } else {
            items.push({ label: 'Equipos', route: '/equipo/teamadmin' });
          }
          items.push({ label: 'Ligas', route: equipo ? `/liga/teamadmin/equipo/${equipo.id}` : '/liga/teamadmin' });
          items.push({ label: liga.nombre, route: `/liga/teamadmin/view/${liga.id}` });
          items.push({ label: 'Partidos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
