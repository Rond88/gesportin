import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloTeamadminPlist } from '../../../../component/articulo/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { TipoarticuloService } from '../../../../service/tipoarticulo';

@Component({
  selector: 'app-articulo-teamadmin-plist-page',
  imports: [ArticuloTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ArticuloTeamadminPlistPage implements OnInit {
  breadcrumbItems = signal<BreadcrumbItem[]>([{ label: 'Mis Clubes', route: '/club/teamadmin' }, { label: 'Tipos de Artículo', route: '/tipoarticulo/teamadmin' }, { label: 'Artículos' }]);

  id_tipoarticulo = signal<number | undefined>(undefined);

  private route = inject(ActivatedRoute);
  private tipoarticuloService = inject(TipoarticuloService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_tipoarticulo');
    if (idParam) {
      const id = Number(idParam);
      this.id_tipoarticulo.set(id);
      this.tipoarticuloService.get(id).subscribe({
        next: (t) => {
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
          ];
          if (t.club) {
            items.push({ label: t.club.nombre, route: `/club/teamadmin/view/${t.club.id}` });
          }
          items.push({ label: 'Tipos de Artículo', route: '/tipoarticulo/teamadmin' });
          items.push({ label: t.descripcion, route: `/tipoarticulo/teamadmin/view/${t.id}` });
          items.push({ label: 'Artículos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
