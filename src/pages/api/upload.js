import multiparty from 'multiparty'

export default async function handle(req, res) {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    console.log('daasaas', files?.length)
    res.send('ok')
  })
}

export const config = {
  api: { bodyParser: false },
}
