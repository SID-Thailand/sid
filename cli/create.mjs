import * as fs from 'fs'
import { program } from 'commander'
import * as prettier from 'prettier'

const toCamelCase = str => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const toDashCase = str => {
  return str
    .split(/(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-')
}

function formatFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const formattedContent = prettier.format(fileContent, {
      parser: 'vue',
      trailingComma: 'es5',
      tabWidth: 2,
      semi: false,
      singleQuote: true,
      bracketSpacing: true,
      arrowParens: 'avoid',
      endOfLine: 'auto',
    })

    fs.writeFileSync(filePath, formattedContent)
    console.log(`Formatted ${filePath} with Prettier.`)
  } catch (error) {
    console.error(
      `Error formatting ${filePath} with Prettier: ${error.message}`
    )
  }
}

// Define the version and description of your CLI
program.version('1.0.0').description('A CLI for creating Vue components')

const vueComponentContent = componentName => {
  return `
  <script setup lang="ts">
  </script>

  <template>
    <h1>${componentName}</h1>
  </template>

  <style scoped lang="scss">

  </style>
`
}

const vuePageContent = pageName => {
  return `
  <script setup lang="ts">
  </script>

  <template>
    <h1>${pageName}</h1>
  </template>

  <style scoped lang="scss">
    
  </style>
`
}

// Define the 'component' command
program
  .command('component <componentName>')
  .description('Create a new Vue component')
  .action(async componentName => {
    const vueFilePath = `./components/${toCamelCase(componentName)}.vue`

    if (!fs.existsSync(vueFilePath)) {
      await fs.writeFile(
        vueFilePath,
        vueComponentContent(toCamelCase(componentName)),
        () => {
          console.log(`Created file: ${vueFilePath}`)
          formatFile(vueFilePath)
        }
      )
    } else {
      console.error(`Error: Component '${componentName}' already exists.`)
    }
  })

program
  .command('page <pageName>')
  .description('Create a new Vue page')
  .action(async pageName => {
    const vueFilePath = `./pages/${toDashCase(pageName)}.vue`

    if (!fs.existsSync(vueFilePath)) {
      await fs.writeFile(
        vueFilePath,
        vuePageContent(toCamelCase(pageName)),
        () => {
          console.log(`Created file: ${vueFilePath}`)
          formatFile(vueFilePath)
        }
      )
    } else {
      console.error(`Error: Page '${pageName}' already exists.`)
    }
  })

// Parse the command-line arguments
program.parse(process.argv)
