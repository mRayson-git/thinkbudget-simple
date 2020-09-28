import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParserProfile } from 'src/app/modules/shared/models/iparser-profile';
import { IMessage } from '../../../shared/models/imessage';
import { ParserProfileService } from 'src/app/modules/shared/services/parser-profile.service';



@Component({
  selector: 'app-parser-profile',
  templateUrl: './parser-profile.component.html',
  styleUrls: ['./parser-profile.component.css']
})
export class ParserProfileComponent implements OnInit {
  parserProfiles: ParserProfile[];
  message: IMessage;
  parserProfile: ParserProfile;
  parserProfileForm = this.fb.group({
    accountName: ['', Validators.required],
    hasHeader: ['', Validators.required],
    numCols: ['', Validators.required],
    amountCol: ['', Validators.required],
    payeeCol: ['', Validators.required],
    descCol: ['', Validators.required],
    dateCol: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private pps: ParserProfileService) { }

  ngOnInit(): void {
    //this.getParsingProfiles();
  }
  getFormValue(value: string) {
    return this.parserProfileForm.controls[value].value;
  }
  
  getParsingProfiles(){
    this.pps.getParsingProfiles().subscribe(profiles => {
      this.parserProfiles = profiles;
      console.log(this.parserProfiles);
    });
  }

  onSubmit(): void {
    this.parserProfile = {
      username: 'mrayson',
      accountName: this.getFormValue('accountName'),
      hasHeader: this.getFormValue('hasHeader'),
      numCols: this.getFormValue('numCols'),
      amountCol: this.getFormValue('amountCol') || 0,
      payeeCol: this.getFormValue('payeeCol') || 0,
      descCol: this.getFormValue('descCol') || 0,
      dateCol: this.getFormValue('dateCol') || 0
    }
    this.pps.saveParsingProfile(this.parserProfile).subscribe(result => {
      this.message = result;
    });
    this.parserProfileForm.reset();
    this.getParsingProfiles();
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

}
