module.exports = {
  all: {
    files: {
      src: ['Gruntfile.js', 'src/**/*.js', 'grunt/*.js', 'test/*']
    },
    options: {
      bitwise: true,
      boss: true,
      browser: true,
      camelcase: true,
      curly: true,
      eqeqeq: true,
      esnext: true,
      globalstrict: true,
      immed: true,
      indent: 2,
      latedef: true,
      laxbreak: true,
      newcap: true,
      noarg: true,
      node: true,
      quotmark: 'single',
      shadow: true,
      sub: true,
      strict: true,
      undef: true,
      unused: true,
      '-W008': true,
      '-W117': true,
      globals: {
        jQuery: true
      }
    }
  }
};
