export default {
  state: {
    roles: [
      {
        id: 1,
        title: 'Facilitator',
        workingGroup: 'Action and Logistics',
        localGroup: 'XR Zwolle',
        location: 'Zwolle',
        timeCommitment: {
          min: 6,
          max: 10
        },
      },
      {
        id: 2,
        title: 'Representative',
        workingGroup: 'Political Strategy and Change',
        localGroup: 'XR Amsterdam',
        location: 'Amsterdam',
        timeCommitment: {
          min: 6,
          max: 10
        },
      },
      {
        id: 3,
        title: 'Photographer',
        workingGroup: 'Media and Communication',
        localGroup: 'XR NL',
        location: 'Amsterdam',
        timeCommitment: {
          min: 1,
          max: 5
        },
      },
      {
        id: 4,
        title: 'Fundraiser',
        workingGroup: 'Finance',
        localGroup: 'XR NL',
        location: 'Amsterdam',
        timeCommitment: {
          min: 11,
          max: 20
        },
      },
      {
        id: 5,
        title: 'Lawyer',
        workingGroup: 'Legal',
        localGroup: 'XR NL',
        location: 'Amsterdam',
        timeCommitment: {
          min: 21,
          max: 30
        },
      },
      {
        id: 6,
        title: 'Action coordinator',
        workingGroup: 'Actions & Logistics',
        localGroup: 'XR Den Haag',
        location: 'Den Haag',
        timeCommitment: {
          min: 6,
          max: 10
        },
      }
    ],
    workingGroups: [
      'Media and Communication',
      'Outreach and Training',
      'Political Strategy',
      'Regenerative Culture',
      'Action and Logistics',
      'Arts',
      'Finance',
      'Tech',
      'Legal'
    ],
    localGroups: [
      'XR Amsterdam',
      'XR Arnhem/Nijmegen',
      'XR Brabant',
      'XR Castricum',
      'XR Delft',
      'XR Den Haag',
      'XR Deventer',
      'XR Enschede',
      'XR Groningen',
      'XR Haarlem',
      'XR Leeuwarden/Fryslân',
      'XR Leiden',
      'XR Maastricht',
      'XR Rotterdam',
      'XR Utrecht',
      'XR Wageningen',
      'XR Ysselvallei',
      'XR Zaandam',
      'XR Zwolle',
      'XR NL'
    ],
    timeCommitment: {min: 1, max:30}
  },
  getters: {
  },
  mutations: {
  },
  actions: {},
}
