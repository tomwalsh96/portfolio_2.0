export const loadData = {
  data: () => ({
    projects: [
      { name: 'Josh Byrne Photography', image: 'https://josh-byrne.web.app/img/event/bodyandsoul-18/3.jpg', description: 'Photography Portfolio website custom built for Josh Byrne.', more: null, live: 'https://josh-byrne.web.app', code: 'https://github.com/tomwalsh96/josh_byrne', featured: true },
      { name: 'Image Uploader', image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', description: 'Component for uploading images to firebase storage. ', more: null, live: 'https://image-uploader-97673.web.app', code: null, featured: false },
      { name: 'Anna Beth Walsh', image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', description: 'Portfolio for artist Anna Beth Walsh. Includes admin functionality.', more: null, live: 'https://annabethwalsh.com', code: null, featured: true }
    ],
    skill_list: [
      { category: 'Frontend',
        skills: [
          { name: 'HTML5', img_src: './skills/html5.png', featured: true },
          { name: 'CSS3', img_src: './skills/css3.png', featured: true },
          { name: 'Bootstrap', img_src: './skills/bootstrap.png', featured: true },
          { name: 'Materialize', img_src: './skills/materialize.png', featured: true },
          { name: 'Javascript', img_src: './skills/javascript.png', featured: true },
          { name: 'Vue', img_src: './skills/vue.png', featured: true },
          { name: 'Vuetify', img_src: './skills/vuetify.png', featured: true },
          { name: 'Flutter', img_src: './skills/flutter.png', featured: false }
        ] },
      { category: 'Backend',
        skills: [
          { name: 'Firebase', img_src: './skills/firebase.png', featured: true },
          { name: 'GetForm', img_src: './skills/react.png', featured: false },
          { name: 'Zapier', img_src: './skills/react.png', featured: true }
        ] },
      { category: 'Data Science',
        skills: [
          { name: 'Python', img_src: './skills/python.png', featured: true }
        ] },
      { category: 'Other',
        skills: [
          { name: 'Github', img_src: './skills/github.png', featured: true },
          { name: 'Photoshop', img_src: './skills/photoshop.png', featured: false },
          { name: 'Flare', img_src: './skills/flare.png', featured: false },
          { name: 'ESLint', img_src: './skills/eslint.png', featured: true }
        ] },
      { category: 'Planned',
        skills: [
          { name: 'PostgreSQL', img_src: './skills/postgresql.png', featured: false },
          { name: 'React', img_src: './skills/react.png', featured: false },
          { name: 'JSX', img_src: './skills/react.png', featured: false },
          { name: 'NodeJS', img_src: './skills/nodejs.png', featured: false },
          { name: 'Tableau', img_src: './skills/tableau.png', featured: false },
          { name: 'MongoDB', img_src: './skills/mongodb.png', featured: false },
          { name: 'Webpack', img_src: './skills/webpack.png', featured: false },
          { name: 'AWS', img_src: './skills/aws.png', featured: false },
          { name: 'GCP', img_src: './skills/gcp.png', featured: false },
          { name: 'Azure', img_src: './skills/azure.png', featured: false },
          { name: 'SQL', img_src: './skills/sql.png', featured: false },
          { name: 'Kaggle', img_src: './skills/kaggle.png', featured: false },
          { name: 'Bit', img_src: './skills/react.png', featured: false },
          { name: 'D3', img_src: './skills/react.png', featured: false }
        ] }
    ]
  }),
  computed: {
    featuredProjects: function () {
      return this.projects.filter(p => {
        return p.featured
      })
    },
    featuredSkills: function () {
      let featured = []
      let conc = []
      this.skill_list.forEach(cat => {
        conc = cat.skills.filter(s => {
          return s.featured
        })
        featured = featured.concat(conc)
      })
      return featured
    }
  }
}
