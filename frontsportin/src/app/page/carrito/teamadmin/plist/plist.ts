import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoTeamadminPlist } from '../../../../component/carrito/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { ArticuloService } from '../../../../service/articulo';
import { UsuarioService } from '../../../../service/usuarioService';

@Component({
  selector: 'app-carrito-teamadmin-plist-page',
  imports: [CarritoTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CarritoTeamadminPlistPage implements OnInit {
  id_articulo = signal<number | undefined>(undefined);
  id_usuario = signal<number | undefined>(undefined);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Carritos' },
  ]);

  constructor(
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    const articuloParam = this.route.snapshot.paramMap.get('id_articulo');
    const usuarioParam = this.route.snapshot.paramMap.get('id_usuario');

    if (articuloParam) {
      const id = Number(articuloParam);
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
          items.push({ label: 'Carritos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    } else if (usuarioParam) {
      const id = Number(usuarioParam);
      this.id_usuario.set(id);
      this.usuarioService.get(id).subscribe({
        next: (usuario) => {
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
          ];
          if (usuario.club) {
            items.push({ label: usuario.club.nombre, route: `/club/teamadmin/view/${usuario.club.id}` });
          }
          items.push({ label: 'Usuarios', route: '/usuario/teamadmin' });
          items.push({ label: `${usuario.nombre} ${usuario.apellido1}`, route: `/usuario/teamadmin/view/${usuario.id}` });
          items.push({ label: 'Carritos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
