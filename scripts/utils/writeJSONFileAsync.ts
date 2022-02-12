import fs = require('fs')

export const writeJsonFileAsync = (name: string, obj: object): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      `./src/json/${name}/${name}.json`,
      JSON.stringify(obj),
      (err): void => {
        if (err) {
          return reject(err)
        }

        return resolve()
      },
    )
  })
