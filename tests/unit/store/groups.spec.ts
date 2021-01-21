import groupsStore, { GroupsState } from "@/store/modules/groups";
import { apolloClient } from "@/plugins/vue-apollo";
import { ApolloQueryResult } from "apollo-client";

describe("Groups Store", () => {
  const localGroups = [
    {
      id: 1,
      title: "Group 1"
    },
    {
      id: 2,
      title: "Group 2"
    }
  ];
  const workingCircles = [
    {
      id: 3,
      title: "Circle 1"
    },
    {
      id: 4,
      title: "Circle 2"
    }
  ];
  const mockState: GroupsState = {
    localGroups,
    workingCircles
  };
  const apolloQuerySpy = jest.spyOn(apolloClient, "query");

  describe("getters", () => {
    describe("localGroupIds", () => {
      it("returns localGroups ids", () => {
        expect(groupsStore.getters.localGroupIds(mockState)).toEqual([1, 2]);
      });
    });

    describe("workingCircleIds", () => {
      it("returns workingCircles ids", () => {
        expect(groupsStore.getters.workingCircleIds(mockState)).toEqual([3, 4]);
      });
    });
  });

  describe("mutations", () => {
    describe("setLocalGroups", () => {
      it("updates the localGroups state", () => {
        const state: Partial<GroupsState> = {};
        groupsStore.mutations.setLocalGroups(state, localGroups);
        expect(state.localGroups).toEqual(localGroups);
      });
    });

    describe("setWorkingCircles", () => {
      it("updates the workingCircles state", () => {
        const state: Partial<GroupsState> = {};
        groupsStore.mutations.setWorkingCircles(state, workingCircles);
        expect(state.workingCircles).toEqual(workingCircles);
      });
    });
  });

  describe("actions", () => {
    apolloQuerySpy.mockReturnValue(
      Promise.resolve({ data: mockState } as ApolloQueryResult<GroupsState>)
    );

    describe("loadGroups", () => {
      it("commits setLocalGroups and setWorkingCircles", async () => {
        const commit = jest.fn();
        await groupsStore.actions.loadGroups({ commit });
        expect(apolloQuerySpy).toBeCalled();
        expect(commit).nthCalledWith(1, "setLocalGroups", localGroups);
        expect(commit).nthCalledWith(2, "setWorkingCircles", workingCircles);
      });
    });
  });
});
