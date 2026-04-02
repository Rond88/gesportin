import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraTeamadminPlist } from '../../../../component/compra/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { ArticuloService } from '../../../../service/articulo';

@Component({
  selector: 'app-compra-teamadmin-plist-page',
  imports: [CompraTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CompraTeamadminPlistPage implements OnInit {
  id_articulo = signal<number | undefined>(undefined);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Compras' },
  ]);

  constructor(private route: ActivatedRoute, private articuloService: ArticuloService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_articulo');
    if (idParam) {
      const id = Number(idParam);
      this.id_articulo.set(id);
      this.articuloService.get(id).subscribe({
        next: (articulo) => {
          const tipo = articulo.tipoarticulo;
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
          ];
          if (tipo?.club) {
            items.push({ label: tipo.club.nombre, route: `/club/teamadmin/view/${tipo.club.id}` });
          }
          if (tipo) {
            items.push({ label: 'Tipos de Artículo', route: '/tipoarticulo/teamadmin' });
            items.push({ label: tipo.descripcion, route: `/tipoarticulo/teamadmin/view/${tipo.id}` });
            items.push({ label: 'Artículos', route: `/articulo/teamadmin/tipoarticulo/${tipo.id}` });
          } else {
            items.push({ label: 'Artículos', route: '/articulo/teamadmin' });
          }
          items.push({ label: articulo.descripcion, route: `/articulo/teamadmin/view/${articulo.id}` });
          items.push({ label: 'Compras' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
