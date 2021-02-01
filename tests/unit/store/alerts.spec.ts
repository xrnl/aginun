import alertsStore, { AlertsState } from "@/store/modules/alerts";

describe("Alerts Store", () => {
  describe("mutations", () => {
    describe("setAlert", () => {
      it("updates the alertOn and alert state", () => {
        const state: AlertsState = {
          alertOn: false,
          alert: {}
        };
        const alert = {
          message: "You succeeded",
          color: "success",
          icon: "mdi-checkbox-marked-circle-outline"
        };

        alertsStore.mutations.setAlert(state, alert);
        expect(state.alertOn).toBe(true);
        expect(state.alert).toBe(alert);
      });
    });

    describe("disableAlert", () => {
      it("updates the alertOn state", () => {
        const state = {
          alertOn: true
        };

        alertsStore.mutations.disableAlert(state);
        expect(state.alertOn).toBe(false);
      });
    });
  });

  describe("actions", () => {
    const commit = jest.fn();

    describe("displaySuccess", () => {
      it("commits setAlert using the provided message", () => {
        const message = "success!";
        alertsStore.actions.displaySuccess({ commit }, message);
        expect(commit).toBeCalledWith("setAlert", {
          message,
          color: "success",
          icon: "mdi-checkbox-marked-circle-outline"
        });
      });
    });

    describe("displayError", () => {
      it("commits setAlert using the provided message", () => {
        const message = "error!";
        alertsStore.actions.displayError({ commit }, message);
        expect(commit).toBeCalledWith("setAlert", {
          message,
          color: "error",
          icon: "mdi-alert"
        });
      });
    });
  });
});
