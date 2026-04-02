import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaTeamadminPlist } from '../../../../component/factura/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';
import { UsuarioService } from '../../../../service/usuarioService';

@Component({
  selector: 'app-factura-teamadmin-plist-page',
  imports: [FacturaTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class FacturaTeamadminPlistPage implements OnInit {
  id_usuario = signal<number | undefined>(undefined);

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Usuarios', route: '/usuario/teamadmin' },
    { label: 'Facturas' },
  ]);

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_usuario');
    if (idParam) {
      const id = Number(idParam);
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
          items.push({ label: 'Facturas' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
