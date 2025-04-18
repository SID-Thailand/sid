const fs = require('fs')

const cb = () => {}

const appendToScss = (path, fontname) => {
  fs.appendFile(
    path,
    '@use "./mixins" as *;' +
      '@include font("' +
      fontname +
      '", "' +
      fontname +
      '", "400", "normal");\r\n',
    cb
  )
}

const appendToMetaList = (path, fontname, cb) => {
  fs.appendFile(
    path,
    `
  {
    rel: 'preload',
    type: 'font/woff2',
    href: '/fonts/${fontname}.woff2',
    crossorigin: 'anonymous',
    as: 'font'
  },\r\n`,
    cb
  )
}

function fontsStyle() {
  const path = './assets/styles/helpers/fonts-include.scss'
  const path2 = './composables/fonts.ts'
  const buildFontsPath = './public/fonts'

  fs.writeFile(path, '', cb)
  fs.writeFile(path2, '', cb)
  return fs.readdir(buildFontsPath, function (_, fonts) {
    if (fonts) {
      fs.writeFile(path2, 'const fontsMetaList = [', cb)
      fonts.forEach((font, i) => {
        const fontname = font.split('.')[0]

        const onFinishCycle = () => {
          if (i + 1 === fonts.length) {
            fs.appendFile(
              path2,
              `\r\n]\r\nexport const useFonts = () => {
              useHead({
                link: [...fontsMetaList],
              })
            }`,
              cb
            )
          }
        }

        appendToScss(path, fontname)
        appendToMetaList(path2, fontname, onFinishCycle)
      })
    } else {
      fs.writeFile(
        path2,
        `\r\nconst fontsMetaList = []\r\nexport const useFonts = () => {
        useHead({
          link: [...fontsMetaList],
        })
      }`,
        cb
      )
    }
  })
}

module.exports = fontsStyle()
