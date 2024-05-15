import multiparty from 'multiparty'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { analytics } from '../../app/firebase/firebase-config'
import fs from 'fs'
import mime from 'mime-types'

export default async function handle(req, res) {
  const form = new multiparty.Form()
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
  const data = []

  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop()
    const newFileName = Date.now() + '.' + ext
    const fileRef = ref(analytics, 'newfiles/notes/' + newFileName)
    const fileData = file.path
      ? fs.readFileSync(file.path)
      : file._readableState.buffer.head.data

    await uploadBytes(fileRef, fileData, {
      contentType: mime.lookup(file.path),
    })

    const downloadURL = await getDownloadURL(fileRef)
    data.push(downloadURL)
  }

  return res.send(data)
}

export const config = {
  api: { bodyParser: false },
}
