import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      cpassword: ['']
    });
  }
}
