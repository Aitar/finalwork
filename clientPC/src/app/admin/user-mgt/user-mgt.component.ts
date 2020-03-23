import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {User} from '../../../assets/model/User.model';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpErrorResponse} from '@angular/common/http';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.css']
})

export class UserMgtComponent implements OnInit {
  displayData: ItemData[] = [];
  isLoading = false;
  allChecked = false;
  indeterminate = false;

  isCreateVisible = false;
  loadedUsers:User[] = [];

  createEmail: string;
  createNickName: string;
  createPassword: string;
  passwordVisible = false;
  generateId: string;

  constructor(private httpService: HttpService,
              private modalService: NzModalService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.httpService.fetchUsers().subscribe(() => {
      this.httpService.users.subscribe(users => {
        this.loadedUsers = users;
        this.isLoading = false;
      })
    });
  }

  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  showInfo(user: User) {
    this.modalService.create({
      nzTitle: 'test',
      nzContent: `<nz-modal>
                    <p>${user.nickName}</p>
                    <p>Content two</p>
                    <p>Content three</p>
                  </nz-modal>`,
      nzOnOk: () => {
        this.httpService.getUser(user.id);
      }
    })
  }

  updateInfo(user: User){

  }

  delete(user: User){
    console.log(user);
    this.modalService.confirm({
      nzTitle: '你确定要删除这个用户吗？',
      nzContent: '<b style="color: red;">用户删除后将无法找回，且与其相关联数据将会被一起删除，请确认后再删除</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.httpService.deleteUserById(user.id).subscribe(()=> {
          this.httpService.fetchUsers().subscribe(() => {
            this.httpService.users.subscribe(users => {
              this.loadedUsers = users;
            })
          });
          this.notification.create(
            'success',
            '删除用户成功',
            '成功删除用户'
          )
        },error => {
          this.notification.create(
            'error',
            '删除用户失败',
            '删除用户' + this.createNickName + '失败，请稍后重试'
          )
        })
      },
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  createUser() {
    this.generateId ="user" + (new Date()).valueOf();
    this.isCreateVisible = true;
  }

  createOk(): void {
    console.log('Button ok clicked!');
    this.isCreateVisible = false;
    this.httpService.insertUser(this.createNickName, this.createEmail, this.createPassword).subscribe(massage =>{
      this.isCreateVisible = false;
        this.notification.create(
          'success',
          '添加用户成功',
          '成功添加用户' + this.createNickName
        )
    },
      (error: HttpErrorResponse) => {
        if(error.error.message.indexOf('Duplicate') != -1){
          this.notification.create(
            'error',
            '重复的昵称或邮箱',
            '昵称或者邮箱重复，请更换其他用户名或者邮箱'
          )
        }else {
          this.notification.create(
            'error',
            '添加用户失败',
            '添加用户失败，请稍后尝试'
          )
        }
      })
  }

  createCancel(): void {
    console.log('Button cancel clicked!');
    this.isCreateVisible = false;
  }
}
