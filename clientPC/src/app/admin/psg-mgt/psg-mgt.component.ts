import {Component, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {HttpService} from '../../service/http.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpErrorResponse} from '@angular/common/http';
import {Passage} from '../../../assets/model/Passage.model';

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
  selector: 'app-psg-mgt',
  templateUrl: './psg-mgt.component.html',
  styleUrls: ['./psg-mgt.component.css']
})
export class PsgMgtComponent implements OnInit {

  displayData: ItemData[] = [];
  isLoading = false;
  allChecked = false;
  indeterminate = false;

  isCreateVisible = false;
  loadedPsgs: Passage[] = [];
  loadedUsers:User[] = [];

  createEmail: string;
  createNickName: string;
  createPassword: string;
  selectedUser:string = null;
  generateId: string;
  createTitle: string;
  createContent: string;

  constructor(private httpService: HttpService,
              private modalService: NzModalService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isLoading = true;
    this.httpService.fetchPsgs().subscribe( () => {
      this.httpService.psgs.subscribe(psgs => {
        this.loadedPsgs = psgs;
        if (this.loadedPsgs.length == 0) this.isLoading = false;
        for(let i = 0; i < this.loadedPsgs.length; i++){
          console.log("in");
          this.httpService.getUser(this.loadedPsgs[i].author).subscribe(user => {
            this.loadedPsgs[i].authorUser = user;
            console.log(this.loadedPsgs);
            this.isLoading = false;
          })
        }
      });
    });

    this.httpService.fetchUsers().subscribe(() => {
      this.httpService.users.subscribe(users => {
        this.loadedUsers = users;
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

  showInfo(psg: Passage) {
    this.modalService.create({
      nzTitle: 'test',
      nzContent: `<nz-modal>
                    <p>${psg.title}</p>
                    <p>Content two</p>
                    <p>Content three</p>
                  </nz-modal>`,
      nzOnOk: () => {
        this.httpService.getUser(psg.id);
      }
    })
  }

  updateInfo(user: User){

  }

  delete(psg: Passage){
    console.log(psg);
    this.modalService.confirm({
      nzTitle: '你确定要删除这篇文章吗？',
      nzContent: '<b style="color: red;">文章删除后将无法找回，且预期相关联数据也将被删除，请确认后再删除</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.httpService.deletePsg(psg.id).subscribe(()=> {
          this.httpService.fetchPsgs().subscribe(() => {
            this.httpService.psgs.subscribe(psgs => {
              this.loadedPsgs = psgs;
            })
          });
          this.notification.create(
            'success',
            '删除文章成功',
            '成功删除文章'
          )
        },error => {
          this.notification.create(
            'error',
            '删除文章失败',
            '删除文章失败，请稍后重试'
          )
        })
      },
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  createPsg() {
    this.generateId ="psg" + (new Date()).valueOf();
    this.isCreateVisible = true;
  }

  createOk(): void {
    console.log('Button ok clicked!');
    let createUser: User = this.loadedUsers.find(u => u.nickName == this.selectedUser);
    this.isCreateVisible = false;
    this.httpService.insertPsg(this.generateId, this.createTitle, createUser.id, this.createContent).subscribe(massage =>{
        this.isCreateVisible = false;
        this.notification.create(
          'success',
          '添加文章成功',
          '成功添加文章'
        )
      },
      (error: HttpErrorResponse) => {
        if(error.error.message.indexOf('Duplicate') != -1){
          this.notification.create(
            'error',
            '重复的文章标题',
            '文章标题重复，请更换其他文章标题'
          )
        }else {
          this.notification.create(
            'error',
            '添加文章失败',
            '添加文章失败，请稍后尝试'
          )
        }
      })
  }

  createCancel(): void {
    console.log('Button cancel clicked!');
    this.isCreateVisible = false;
  }

}
