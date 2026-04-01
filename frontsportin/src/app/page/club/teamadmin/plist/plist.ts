import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubTeamadminPlist } from '../../../../component/club/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-club-teamadmin-plist-page',
  imports: [ClubTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ClubPlistTeamadminPage {
  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes' },
  ]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
