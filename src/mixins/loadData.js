import firebase from '@/firebase/init'

// mixin for loading projects data from firebase
export const loadProjects = {
  data: () => ({
    projects: null
  }),
  methods: {
    loadProjects () {
      // listen for snapshot of data in projects collection
      firebase.firestore().collection('projects')
        .onSnapshot((querySnapshot) => {
          // create blank array
          var proj = []
          querySnapshot.forEach((doc) => {
            // for each project object, append to new array
            proj.push({
              id: doc.id,
              name: doc.data().name,
              thumbUrl: doc.data().thumbUrl,
              shortDesc: doc.data().shortDesc,
              live: doc.data().live,
              code: doc.data().code,
              featured: doc.data().featured,
              created: doc.data().created,
              updated: doc.data().updated
            })
          })
          // save completed array to local
          this.projects = proj
        })
    },
    // delete project from firebase, given id
    deleteProject (id) {
      firebase.firestore().collection('projects').doc(id).delete()
    }
  }
}
