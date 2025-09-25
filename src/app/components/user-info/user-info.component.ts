import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserInformation } from '../../utilerias/model/user-information';
import { CurrentAccessService } from '../../services/current-access.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  userInformation: UserInformation;
  readonly dialog = inject(MatDialog);

  constructor(
    private currentAccessService: CurrentAccessService
  ) {
    this.userInformation = this.currentAccessService.getUserInformation();
  }

  onButtonClick() {
    
  }
}
