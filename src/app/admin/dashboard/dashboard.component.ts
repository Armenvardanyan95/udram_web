import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import * as FileSaver from 'file-saver';
import { AdminUserService } from '../admin-user-service.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { RequestStatus } from '../../common/request.status.enum';
import { IdentificationType } from '../../common/identification.type.enum';
import { PROVINCES } from '../../common/provinces';
import { Environment } from '../../common/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: IUser[] = [];
  public totalCount: number = 0;
  public statuses = RequestStatus;
  public identificationTypes = IdentificationType;
  public provinces = PROVINCES;
  public isDialogVisible: boolean = false;
  public selectedUser: IUser;

  constructor(private backend: AdminUserService, public environment: Environment) { }

  ngOnInit() {

  }

  loadUsers(event: LazyLoadEvent): void {
    this.backend.getUsers({page: (event.first / event.rows) + 1, filters: event.filters})
      .do(console.log)
      .subscribe((result: {users: IUser[], count: number}) => {
        this.users = result.users;
        this.totalCount = result.count;
      });
  }

  changeStatus(user: IUser, status: RequestStatus): void {
    this.backend.changeRequestStatus(user._id, status)
      .subscribe(
        res => user.request.status = status,
        err => console.log(err)
      );
  }

  showDialog(user: IUser): void {
    this.isDialogVisible = true;
    this.selectedUser = user;
  }
  
  downloadPDF(): void {
    this.backend.getPDF(this.selectedUser._id).subscribe(pdf => FileSaver.saveAs(pdf.fileBlob, `${pdf.fileName}.pdf`));
  }
}
