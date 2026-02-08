import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LigaService } from '../../../service/liga';
import { EquipoService } from '../../../service/equipo';
import { ILiga } from '../../../model/liga';
import { IEquipo } from '../../../model/equipo';
import { IPage } from '../../../model/plist';

@Component({
  selector: 'app-liga-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liga-edit.html',
  styleUrl: './liga-edit.css',
})
export class LigaEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private oLigaService = inject(LigaService);
  private oEquipoService = inject(EquipoService);

  idLiga = signal<number>(0);
  loadingLiga = signal(true);
  loadingEquipos = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  nombre = '';
  equipoId: number | null = null;

  oEquipos = signal<IEquipo[]>([]);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idLiga.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.idLiga())) {
      this.error.set('ID no válido');
      this.loadingLiga.set(false);
      this.loadingEquipos.set(false);
      return;
    }
    this.loadLiga(this.idLiga());
    this.loadEquipos();
  }

  loadLiga(id: number) {
    this.oLigaService.get(id).subscribe({
      next: (data: ILiga) => {
        this.nombre = data.nombre ?? '';
        const equipo: any = data.equipo;
        if (typeof equipo === 'number') {
          this.equipoId = equipo;
        } else if (equipo && equipo.id !== undefined && equipo.id !== null) {
          this.equipoId = Number(equipo.id);
        } else {
          this.equipoId = null;
        }
        this.loadingLiga.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando la liga');
        this.loadingLiga.set(false);
        console.error(err);
      },
    });
  }

  loadEquipos() {
    this.oEquipoService.getPage(0, 1000, 'id', 'asc').subscribe({
      next: (data: IPage<IEquipo>) => {
        this.oEquipos.set(data.content || []);
        this.loadingEquipos.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando equipos');
        this.loadingEquipos.set(false);
        console.error(err);
      },
    });
  }

  doSave() {
    if (this.saving()) {
      return;
    }
    if (!this.nombre || this.nombre.trim().length === 0) {
      this.error.set('El nombre es obligatorio');
      return;
    }
    if (!this.equipoId || this.equipoId <= 0) {
      this.error.set('Selecciona un equipo válido');
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const payload: Partial<ILiga> = {
      id: this.idLiga(),
      nombre: this.nombre.trim(),
      equipo: { id: this.equipoId },
    };

    this.oLigaService.update(payload).subscribe({
      next: () => {
        this.saving.set(false);
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error actualizando la liga');
        this.saving.set(false);
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}
