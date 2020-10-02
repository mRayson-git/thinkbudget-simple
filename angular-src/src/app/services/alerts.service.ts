// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <alertsService>
import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  alerts: Alert[] = [];

  add(message: string, debug: string) {
    this.alerts.push({message: message, debug: debug});
  }

  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
// </alertsService>
