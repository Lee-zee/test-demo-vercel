hexo.on('ready', () => {
  const { version } = require('../../package.json')
  hexo.log.info(`
  ===================================================================
       #####  ####  #     #####  ###### #     # ######   ######
      #      #    # #       #      #    #     # #      # #
       ##### #    # #       #      #    #     # #      # ######
           # #    # #       #      #    #     # #      # #
      ######  ####  ##### #####    #      ###   ######   ######
                            ${version}
  ===================================================================
  主题链接：https://github.com/DuoSco/Hexo-theme-solitude
  `)
})