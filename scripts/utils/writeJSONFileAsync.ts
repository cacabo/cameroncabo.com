import fs = require('fs')

export const writeJsonFileAsync = (
  name: string,
  obj: object,
): Promise<void> => {
  let cleanedName: string = name

  if (name.toLowerCase().endsWith('.json')) {
    cleanedName = cleanedName.substring(0, cleanedName.length - 5)
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(
      `./src/json/${cleanedName}/${cleanedName}.json`,
      JSON.stringify(obj),
      (err): void => {
        if (err) {
          return reject(err)
        }

        return resolve()
      },
    )
  })
}
