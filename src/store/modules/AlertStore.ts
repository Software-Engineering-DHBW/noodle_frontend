import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { Alert } from '@/classes/Alert';
import AlertType from '@/classes/AlertType';

const ALERT_TIME_IN_MILLISECONDS = 3000;

@Module({ namespaced: true })
class AlertStore extends VuexModule {
  alerts: Array<Alert> = [];

  alertCount = 0;

  @Mutation
  clearAlerts(): void {
    this.alerts = [];
    this.alertCount = 0;
  }

  @Mutation
  addAlert(alert: Alert): void {
    this.alerts.push(alert);
    this.alertCount += 1;
  }

  @Mutation
  removeAlert(alertToDelete: Alert): void {
    this.alerts = this.alerts.filter((alert) => alert.id !== alertToDelete.id);
  }

  @Action
  resetAlerts(): void {
    this.context.commit('clearAlerts');
  }

  @Action
  showInfo(message: string): void {
    const alert: Alert = {
      id: this.alertCount,
      type: AlertType.INFO,
      message,
    };

    this.context.commit('addAlert', alert);
    setTimeout(() => {
      this.context.commit('removeAlert', alert);
    }, ALERT_TIME_IN_MILLISECONDS);
  }

  @Action
  showSuccess(message: string): void {
    const alert: Alert = {
      id: this.alertCount,
      type: AlertType.SUCCESS,
      message,
    };

    this.context.commit('addAlert', alert);
    setTimeout(() => {
      this.context.commit('removeAlert', alert);
    }, ALERT_TIME_IN_MILLISECONDS);
  }

  @Action
  showWarning(message: string): void {
    const alert: Alert = {
      id: this.alertCount,
      type: AlertType.WARNING,
      message,
    };

    this.context.commit('addAlert', alert);
    setTimeout(() => {
      this.context.commit('removeAlert', alert);
    }, ALERT_TIME_IN_MILLISECONDS);
  }

  @Action
  showError(message: string): void {
    const alert: Alert = {
      id: this.alertCount,
      type: AlertType.ERROR,
      message,
    };

    this.context.commit('addAlert', alert);
    setTimeout(() => {
      this.context.commit('removeAlert', alert);
    }, ALERT_TIME_IN_MILLISECONDS);
  }
}

export default AlertStore;
